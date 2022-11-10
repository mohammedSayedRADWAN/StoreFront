# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Users
- Index [token required]: `'api/users/showall' [GET] (token)`
- Show [token required]: `'api/users/showById' [GET] (token)`
- Create[not token required]: `'api/users/create' [POST]`
- Delete [token required]: `'api/users/delete' [DELETE] (token)`
- login[not token required]: `'api/users/login' [POST]`

#### Products
- Index [token required]: `'api/products/showall' [GET] (token)`
- Show  [token required]: `'api/products/showById' [GET] (token)`
- Create[token required]: `'api/products/create' [POST] (token)`
- productsOfCategory [token required]: `'api/products/productsOfCategory' [PUT] (token)`
- Delete[token required]: `'api/products/delete' [DELETE] (token)`

#### Orders
- Index [token required]: `'api/orders/showall' [GET] (token)`
- create [token required]: `'api/orders/create' [POST] (token)`
- create [token required]: `'api/orders/addProduct' [POST] (token)`
- Current Order by user [token required]: `'api/orders/showCrruntOrder' [GET] (token)`
- Completed Orders by user [token required]: `'api/orders/completOrder' [GET] (token)`
- Active Orders by user [token required]: `'api/orders/activeOrder' [GET] (token)`
- Update order's status [token required]: `'api/orders/updateStatus' [PATCH] (token)`
- Delete [token required]: `'api/orders/deletOrder' [DELETE] (token)`

## Data Shapes
#### Product
-  id
- name
- price
- category

```
Table: Product (id:serial[primary key], name:name VARCHAR(100) NOT NULL, price:NUMERIC NOT NULL, category:VARCHAR(100))
```
#### User
 -  id
 -  firstname
 -  password_digest
 - lastname:string

```
Table: User (id:serial[primary key], firstname:VARCHAR(100), password_digest:VARCHAR NOT NULL, lastname:VARCHAR(100) NOT NULL)
```
#### Orders
    id
    product_id
    user_id
    quantity
    status_order
    order_id


```
Table: Orders (id:serial[primary key], user_id:integer(foreign key to users table), status: VARCHAR(50) NOT NULL)
```
Table: order_products (id:serial[primary key], product_id:integer(foreign key to products table),quantity integer,
order_id:integer(foreign key to orders table) )