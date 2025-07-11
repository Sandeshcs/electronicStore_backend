# ELECTRONIC STORE APP
An e-commerece app to buy products of category mobile and tablets and user can search for any product and has option to add or remove product to or from wishlist and cart and filter by processor and sort by price, ratings and increase or decrease product quantity, and add-update-delete address, and save orders placed in checkout page.

---

## App Live Demo Link
[App Live Demo](https://electronic-store-frontend-six.vercel.app/)

---

## Qucik Start
```
git clone https://github.com/Sandeshcs/electronicStore_backend.git
cd electronicStore_backend
npm install
npm start
```

---

## Technologies
- React.js
- React Router
- Node.js
- Express.js
- MongoDB
- Bootstrap

---

## App Demo Video
Watch a walkthrough (13 min) of all the major features of this app: [App Demo Video](https://drive.google.com/file/d/1LSGHss_iH8cP3lAYDaOLKBtsnUhMmy5l/view?usp=sharing)

---

## Features
### Navbar (included in all pages)
- Search bar to search for products.
- Wishlist button to see products in wishlist with bage showing number of wishlist products.
- Cart button to see products in cart with bage showing number of cart products.
- User profile includes user info, address, order history.

### Home page
- Categories mobile and tablet.

### Product lisiting page
- Display of all products (product - image, name, price).
- Add or remove product to or from cart or wishlist.
- Buy now button will take directly to checkout page.
- Filter by processor, clear filter.
- Sort by ratings, price (low to high, high to low).
- Price range slider.
- Clicking on image will take you to product details page.

### Product details page
- Display of product image, name, price, quantity, description (specification) of product.
- Increase and decrease of product quantity with alert message.
- Recommending products of same category.
- Wishlist, add to cart, buy now buttton.

### Wishlist page
- Display of products in wishlist (product - image, name, price).
- Wishlist, add to cart, buy now buttton.
- Clicking on image will take you to product details page.

### Cart page
- Display of products in cart (product - image, name, price).
- Increase or decrease quantity.
- Add to Wishlist, remove from cart.
- Clicking on image will take you to product details page.
- Price details will change dynamicaly when we perform remove from cart/ increase or decrease quantity operation.
- Place order button will take to checkout.

### Checkout page
- User info details.
- Option to select address to deliver the product.
- Order summary shows products from cart or if u have clicked buy now than that only product is shown.
- Display of products info (product - image, name, price).
- Increase or decrease quantity.
- Add to Wishlist.
- Clicking on image will take you to product details page.
- Payment options (upi, cash on delivery).
- Price details.
- Confirm order will place order shows **`order placed successfully`** message.

### User profile information
- profile info (name, gender, email-id, phNo).
- Manage address - add, update, delete address.
- Order history (login, address, ordered products, payment, date and time details)

---

## API References
### Products API's
#### POST /api/product/add
This api Add's new product.
- Status 201 for new product creation.
- Status 404 for data not found.
- Status 500 for internal server error.

Sample Response:
```
{category, title, rating, price, ram, rom, freeDelivery, returnTime, details(specs), prouductImage, quantity}
```

---

#### GET /api/products/all
Display all products.
- Status 200 ok for fetching all products.
- Status 404 not found if no products are present.
- Status 500 for internal server error.

Sample Response:
```
[{category, title, rating, price, ram, rom, freeDelivery, returnTime, details(specs), prouductImage, quantity}, ...]
```

#### GET /api/products/id/:productId
Display one product.
- Status 200 ok for fetching a product.
- Status 404 not found if no product are present.
- Status 500 for internal server error.

Sample Response:
```
{category, title, rating, price, ram, rom, freeDelivery, returnTime, details(specs), prouductImage, quantity}
```

#### GET /api/products/category
Display products of specific category(mobile , tablet).
- Status 200 ok for fetching products from a category( mobile or tablets ).
- Status 404 not found if no products in that category are present.
- Status 500 for internal server error.

Sample Response:
```
[{category, title, rating, price, ram, rom, freeDelivery, returnTime, details(specs), prouductImage, quantity}]
```

#### POST /api/product/update/:productId
Updates specific product.
- Status 200 ok for updating a product details.
- Status 404 not found if no product to update are present.
- Status 500 for internal server error.

Sample Response:
```
{category, title, rating, price, ram, rom, freeDelivery, returnTime, details(specs), prouductImage, quantity}
```

#### DELETE /api/product/delete/:productId
Delete specific product.
- Status 200 ok for deleting a product.
- Status 404 not found if no product to delete are present.
- Status 500 for internal server error.

Sample Response:
```
{category, title, rating, price, ram, rom, freeDelivery, returnTime, details(specs), prouductImage, quantity}
```

### Wishlist API's
#### POST /api/product/wishlist/addproduct
This api Add's new product to wishlist.
- Status 201 for new wishlist product creation.
- Status 404 for data not found.
- Status 500 for internal server error.

Sample Response:
```
{productsInWishlist(containes object id of that product)}
```

---

#### GET /api/product/wishlist/get
Display all products in wishlist.
- Status 200 ok for fetching all wishlist products.
- Status 404 not found if no wishlist products are present.
- Status 500 for internal server error.

Sample Response:
```
[{productsInWishlist: {category, title, rating, price, ram, rom, freeDelivery, returnTime, details(specs), prouductImage, quantity}}, ...]
```

#### POST /api/product/wishlist/update/:productId
Updates specific product in wishlist.
- Status 200 ok for updating a wishlist product details.
- Status 404 not found if no wishlsit product to update are present.
- Status 500 for internal server error.

Sample Response:
```
{productsInWishlist: {category, title, rating, price, ram, rom, freeDelivery, returnTime, details(specs), prouductImage, quantity}}
```

#### DELETE /api/product/wishlist/delete/:productId
Delete specific product in wishlist.
- Status 200 ok for deleting a product details.
- Status 404 not found if no wishlsit products to delete are present.
- Status 500 for internal server error.

Sample Response:
```
{productsInWishlist: {category, title, rating, price, ram, rom, freeDelivery, returnTime, details(specs), prouductImage, quantity}}
```

### Cart API's
#### POST /api/product/cart/add
This api Add's new product to cart.
- Status 201 for new cart product creation.
- Status 404 for data not found.
- Status 500 for internal server error.

Sample Response:
```
{productInCart(containes object id of that product), quantity}
```

---

#### GET /api/product/cart/get
Display all products in cart.
- Status 200 ok for fetching all cart products.
- Status 404 not found if no cart products are present.
- Status 500 for internal server error.

Sample Response:
```
[{productInCart: {category, title, rating, price, ram, rom, freeDelivery, returnTime, details(specs), prouductImage, quantity}, quantity}, ...]
```

#### POST /api/product/cart/update/:productId
Updates specific product in cart.
- Status 200 ok for updating a cart product details .
- Status 404 not found if no cart product to update are present.
- Status 500 for internal server error.

Sample Response:
```
{productsInWishlist: {category, title, rating, price, ram, rom, freeDelivery, returnTime, details(specs), prouductImage, quantity}, quantity}
```

#### DELETE /api/product/cart/delete/:productId
Delete specific product in cart.
- Status 200 ok for deleting a cart product details.
- Status 404 not found if no cart product to delete are present.
- Status 500 for internal server error.

Sample Response:
```
{productsInWishlist: {category, title, rating, price, ram, rom, freeDelivery, returnTime, details(specs), prouductImage, quantity}, quantity}
```

### Address API's
#### POST /api/address/add
This api Add's new address.
- Status 201 for new address creation.
- Status 404 for data not found.
- Status 500 for internal server error.

Sample Response:
```
{fullName, phNo, pincode, locality, address, cityDistrictTown, state, landmark, alterantePhNo, selected}
```

---

#### GET /api/address/get
Display all address.
- Status 200 ok for fetching all addresses.
- Status 404 not found if no addresses are present.
- Status 500 for internal server error.

Sample Response:
```
[{fullName, phNo, pincode, locality, address, cityDistrictTown, state, landmark, alterantePhNo, selected}, ...]
```

#### POST /api/address/update/:updateId
Updates specific address details.
- Status 200 ok for updating a address details.
- Status 404 not found if no address to update are present.
- Status 500 for internal server error.

Sample Response:
```
{fullName, phNo, pincode, locality, address, cityDistrictTown, state, landmark, alterantePhNo, selected}
```

#### DELETE /api/address/delete/:deleteId
Delete specific address details.
- Status 200 ok for deleting a address.
- Status 404 not found if no address to delete are present.
- Status 500 for internal server error.

Sample Response:
```
{fullName, phNo, pincode, locality, address, cityDistrictTown, state, landmark, alterantePhNo, selected}
```

### Orderhistory API's
#### POST /api/orderhistory/add
This api Add's new orderhistory.
- Status 201 for new orderhistory after placing order successfully.
- Status 404 for data not found.
- Status 500 for internal server error.

Sample Response:
```
{ordersFrom, loginDetails, addressDetails, prodQuantity, orderedProductsFromCart, orderedProductsFromBuyNow, totalAmountPayable, paymentMode, dateTimeOfOrder}
```

---

#### GET /api/orderhistory/get
Display all order history.
- Status 200 ok for fetching all orderhistory details.
- Status 404 not found if no orderhistory are present.
- Status 500 for internal server error.

Sample Response:
```
[{ordersFrom, loginDetails, addressDetails, prodQuantity, orderedProductsFromCart, orderedProductsFromBuyNow, totalAmountPayable, paymentMode, dateTimeOfOrder}, ...]
```

#### POST /api/orderhistory/update/:orderId
Updates specific ordered history details.
- Status 200 ok for updating a orderhistory details.
- Status 404 not found if no orderhistory to update are present.
- Status 500 for internal server error.

Sample Response:
```
{ordersFrom, loginDetails, addressDetails, prodQuantity, orderedProductsFromCart, orderedProductsFromBuyNow, totalAmountPayable, paymentMode, dateTimeOfOrder}
```

#### DELETE /api/orderhistory/delete/:orderedId
Delete specific order history details.
- Status 200 ok for deleting a orderhistory details.
- Status 404 not found if no orderhistory to delete are present.
- Status 500 for internal server error.

Sample Response:
```
{ordersFrom, loginDetails, addressDetails, prodQuantity, orderedProductsFromCart, orderedProductsFromBuyNow, totalAmountPayable, paymentMode, dateTimeOfOrder}
```

## Contact 
For bugs or feature request please reach out to sandeshcs2921@gmail.com.