import chromedriver_autoinstaller
from selenium import webdriver
from bs4 import BeautifulSoup
import time

#Using selenium to load javascript automatically generated page content
starting_points = "https://spesaonline.esselunga.it/commerce/nav/supermercato/grandi-vini/landing/mix/best-seller/240926/centrale?breadcrumbs=0&menuItemId=600000001040512"

chromedriver_autoinstaller.install()

options = webdriver.ChromeOptions()
options.add_experimental_option("detach", True)
driver=webdriver.Chrome(options=options)
driver.get(starting_points)

time.sleep(3)


html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

products = soup.find_all("div", {"ng-class": "productCtrl.product.classBrand"})

for prod in products:

    name = prod.find("a", {"ng-if" : "productCtrl.enableProductDetailLink"}).text
    cost = prod.find("span", {"class" : "product-label-price-unit"}).text
    print("{0} - {1}".format(name, cost))
