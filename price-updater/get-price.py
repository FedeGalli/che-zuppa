import chromedriver_autoinstaller
from selenium import webdriver
from bs4 import BeautifulSoup
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import json
import re

def get_num_uom(s):
    num = ""
    uom = ""
    for i, char in enumerate(s):
        if (ord(char) >= ord('0') and ord(char) <= ord('9')) or char == ".":
            num += char
        else:
            uom = s[i:]
            break

    return round(float(num), 2), uom


#Using selenium to load javascript automatically generated page content
def get_product_price(starting_points, product):
    #go to the search page and find the product
    driver.get(starting_points + '%20'.join(product.lower().split(' ')))
    time.sleep(10)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    entry = {}
    products = soup.find_all("div", {"ng-class": "productCtrl.product.classBrand"})
    sum = 0
    items = 0
    for prod in products:
        name = prod.find("a", {"ng-if" : "productCtrl.enableProductDetailLink"}).text.lower().replace(" ", "_")
        #Removing special characters
        name = re.sub(r'\W+', '', name)
        splitted_name = name.split("_")
        if product.lower().replace(" ", "_") in name:
            cost_text = prod.find("span", {"class" : "product-label-price-unit"}).text.replace(",", ".").replace(" ", "")

            #separating the number from the uom
            cost, uom = get_num_uom(cost_text)
            entry[name] = {"cost" : cost, "oum" : uom, "quantity" : splitted_name[-2] + splitted_name[-1]}
            sum += cost
            items += 1

    if items == 0:
        entry["avg_price"] = 0
    else:
        entry["avg_price"] = round(sum / items, 2)
    return entry


firebase_db = ""
with open("../credentials.json", "r") as f:
    credential = json.load(f)


# Fetch the service account key JSON file contents
cred = credentials.Certificate('../credentials.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': credential["firebase_database"]
})

ref = db.reference('/products')
products = ref.get()

starting_points = "https://spesaonline.esselunga.it/commerce/nav/supermercato/store/ricerca/"
chromedriver_autoinstaller.install()
options = webdriver.ChromeOptions()
options.add_experimental_option("detach", True)
options.add_argument('headless')
driver=webdriver.Chrome(options=options)

for product in products:
    products[product]['italy'] = get_product_price(starting_points, product)

    ref = db.reference('/products')
    ref.update({
        product : products[product]
    })
