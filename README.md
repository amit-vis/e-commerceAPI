# Ecommerce API
I made an eCommerce API. It has a category feature, where you can add products by giving a category id and you can also check the product list and details with an ID. Users have a signup and login page. To keep things secure, certain sections like the cart and order placement need authentication.

The cart lets users add, update quantity, and remove items. You can view details of the products in the cart. The order placement section allows users to place orders from the cart. They can also check their order history and details.

## Installation
Install My Projects Using npm
```bash
    git clone https://github.com/amit-vis/e-commerceAPI.git
    npm install
    cd e-commerceAPI
```

## Running Test
To run tests, run the following command
```bash
    npm start
```

## Routes
### category routes
    1. get the all the category list: [get]: /category/view
    2. create the category: [post]: /category/add
    3. get the product list category wise : [get]: /category/category-wise/:id
   