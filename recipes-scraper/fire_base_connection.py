import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from recipe_scraper import get_recipes
import json

firebase_db = ""
credential = None
with open("credentials.json", "r") as f:
    credential = json.load(f)


# Fetch the service account key JSON file contents
cred = credentials.Certificate('credentials.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': credential["firebase_database"]
})

ref = db.reference('/')

recipes, products = get_recipes()

ref.update(
    {
        "recipes" : recipes,
        "products" : products
    }
)
