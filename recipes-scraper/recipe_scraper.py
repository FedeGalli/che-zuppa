from bs4 import BeautifulSoup
import requests
import math

starting_points = {"starter" : "https://www.giallozafferano.it/ricette-cat/page1/Antipasti/",
    "main_course": "https://www.giallozafferano.it/ricette-cat/Primi/",
    "second_course": "https://www.giallozafferano.it/ricette-cat/Secondi-piatti/",
    "dessert": "https://www.giallozafferano.it/ricette-cat/Dolci-e-Desserts/"}

page_recipes_links = {"starter" : [], "main_course": [], "second_course": [], "dessert": []}


def get_recipes():
    # Extract recipes from Giallo Zafferano by starting from a starting page and iterating trough the pages
    for course in starting_points:
        for i in range(1, 2):

            html_content = requests.get(starting_points[course]).text
            soup = BeautifulSoup(html_content, "lxml")

            page_recipes = soup.find_all("h2", {"class": "gz-title"})

            for recipe_link in page_recipes:
                page_recipes_links[course].append(recipe_link.a['href'])

            starting_points[course] = starting_points[course].replace(str(i), str(i + 1))

    recipes = {"starter": {}, "main_course": {}, "second_course": {}, "dessert": {}}
    products= {}
    # Iterate trough each recipe link and extract information
    for course in page_recipes_links:
        max_recipes = 0
        for recipe_link in page_recipes_links[course]:
            if max_recipes > 2:
                break
            max_recipes += 1
            # Make a GET request to fetch the raw HTML content
            html_content = requests.get(recipe_link).text

            # Parse the html content
            soup = BeautifulSoup(html_content, "lxml")

            # Getting recipe name
            recipe = {}
            recipe["name"] = soup.find_all("h1", {"class": "gz-title-recipe gz-mBottom2x"})[0].get_text()
            print(recipe["name"])
            # getting kcal and macros
            macros_name = soup.find_all("span", {"class": "gz-list-macros-name"})[:-3]
            macros_g = soup.find_all("span", {"class": "gz-list-macros-value"})[:-3]
            # if the recipe does not have macros tab, remove it
            if macros_name == []:
                continue
            macros = {}

            for i in range(len(macros_name)):
                macros[macros_name[i].get_text().encode('ascii', 'ignore').decode('ascii')] = macros_g[i].get_text()

            recipe["macros"] = macros

            # Getting other information (vegan, vegetarian, gluten and lactose free)
            other_info = soup.find_all("span", {"class": "gz-name-featured-data-other"})
            recipe["vegetarian"] = False
            recipe["light"] = False
            recipe["gluten_free"] = False
            recipe["lactose_free"] = False
            for info in other_info:
                property = info.get_text().lower().replace(" ", "")
                if property == "vegetariano":
                    recipe["vegetarian"] = True
                if property == "light":
                    recipe["light"] = True
                if property == "senzaglutine":
                    recipe["gluten_free"] = True
                if property == "senzalattosio":
                    recipe["lactose_free"] = True

            quantity = 0
            # Getting recipe info
            info = soup.find_all("div", {"class": "gz-list-featured-data"})[0]
            info = info.find_all("span", {"class" : "gz-name-featured-data"})[:5]

            for i in range(len(info)):
                pair = info[i].get_text().split(":")
                if "Cottura" in pair[0] or "Preparazione" in pair[0]:
                    recipe[pair[0]] = time_normalizer(pair[1].strip())
                elif "Difficoltà" in pair[0]:
                    recipe[pair[0]] = difficulty_normalizer(pair[1].strip())
                elif "Dosi per" in pair[0]:
                    quantity = quantity_normalizer(pair[1].strip())
                    print("Quantity: ", quantity)
                elif "Nota" not in pair[0]:
                    recipe[pair[0]] = pair[1].strip()

            # Getting recipe ingredients
            ingredients = soup.find_all("dl", {"class": "gz-list-ingredients"})[0]
            ingredients = ingredients.find_all("dd", {"class" : "gz-ingredient"})
            ing = {}

            for elem in ingredients:
                products[elem.a.get_text()] = {"italy": 0}
                ing[elem.a.get_text()] = ingredient_normalizer(' '.join(elem.span.get_text().split()), quantity)
                print(elem.a.get_text(), ing[elem.a.get_text()])
            recipe["ingredients"] = ing
            recipes[course][recipe["name"]] = recipe

    return recipes, products

def ingredient_normalizer(s:str, divisor:int):
    n_found = False
    res = ""
    for i in range(len(s) - 1, -1, -1):
        if (ord(s[i]) >= ord('0') and ord(s[i]) <= ord('9')):
            n_found = True
        elif n_found:
            return (quantity_check(res, divisor))
        res = s[i] + res

    return (quantity_check(res, divisor))

def quantity_check(s, divisor):
    if "kg" in s:
        return math.ceil((extract_ingredient_value(s) * 1000) / divisor)
    elif " g" in s:
        return math.ceil((extract_ingredient_value(s)) / divisor)
    elif "cucchiaino" in s or "cucchiaini" in s or "pizzico" in s:
        return "q.b."
    return s

def time_normalizer(s):
    time = 0

    splitted_s = s.split(" ")
    counter = 0
    for i in range(len(splitted_s) - 2, -1, -2):
        time = int(splitted_s[i]) * (60 ** counter)

    return time

def difficulty_normalizer(s):
    if s == "Molto facile":
        return 0
    elif s == "Facile":
        return 1
    elif s == "Media":
        return 2
    elif s == "Difficile":
        return 3

    return -1

def extract_ingredient_value(s):
    res = ""
    for char in s:
        if (ord(char) >= ord('0') and ord(char) <= ord('9')):
            res += char
        else:
            break
    return int(res)

def quantity_normalizer(s):
    #Default value if 'pezzi' is found in dosi
    if "pezzi" in s:
        return 4
    res = ""
    for char in s:
        if (ord(char) >= ord('0') and ord(char) <= ord('9')):
            res += char
        else:
            break
    return int(res)
