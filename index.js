const {connectToDb} = require("./db/db.connect");
connectToDb();

const ElectronicProduct = require("./models/electronicProducts.models");
const ElectronicWishlist = require("./models/electronicProductWishlist.models");
const CartManagement = require("./models/cartManagement.models");
const UserAddress = require("./models/userAddress.models");
const OrderHistory = require("./models/orderHistory.models");
const ErrorChecking = require("./models/errorChecking.models");

const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;
app.listen(PORT, (req, res) => {
    console.log("server is running on ", PORT);
});

const cors = require("cors");
const corsOrigin = {
    origin: '*',
    credential: true
};
app.use(cors(corsOrigin));

app.get('/', (req, res) => {
    res.send('hi i am electronic products api');
});

//api to create new product.
const addNewProduct = async (newProduct) => {
    try{
        const newProductPosted = new ElectronicProduct(newProduct);
        const savingProduct = await newProductPosted.save();
        return savingProduct; 
    }
    catch (error) {
        console.log('error occured while posting new data: ', erro);
    }
};

app.post('/product/add', async (req, res) => {
    try{
        const product = await addNewProduct(req.body);
        if(product){
            res.status(201).send({message: 'new product added.', data: product});
        }else{
            res.status(404).send({error: "no product found."})
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to add new product."})
    }
})

//api to get all products.
const getAllProducts = async () => {
    try{
        const allProducts = await ElectronicProduct.find();
        return allProducts;
    }
    catch (error) {
        console.log("error occured while getting all products: ",error);
    }
}
app.get('/products/all', async (req, res) => {
    try{
        const product = await getAllProducts();
        if(product.length > 0){
            res.status(200).send({message: 'all products found.', data: product});
        }else{
            res.status(404).send({error: "no products found."})
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to get products."})
    }
})

//api to get products by id.
const getProductById = async (productId) => {
    try{
        const product = await ElectronicProduct.findById(productId);
        return product;
    }
    catch (error) {
        console.log("error occured while getting product: ",error);
    }
}
app.get('/products/id/:productId', async (req, res) => {
    try{
        const product = await getProductById(req.params.productId);
        if(product){
            res.status(200).send({message: 'product found.', data: product});
        }else{
            res.status(404).send({error: "no product found."})
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to get product."})
    }
})

//api to get all products by category.
const getProductByCategory = async (productCategory) => {
    try{
        const product = await ElectronicProduct.find({category: productCategory});
        return product;
    }
    catch (error) {
        console.log("error occured while getting product: ",error);
    }
}
app.get('/products/category/:productCategory', async (req, res) => {
    try{
        const product = await getProductByCategory(req.params.productCategory);
        if(product.length>0){
            res.status(200).send({message: 'product found.', data: product});
        }else{
            res.status(404).send({error: "no product found."})
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to get product."})
    }
});

//api to update product.
const updateProduct = async (productId, updateDetails) => {
    try{
        const updatedProduct = await ElectronicProduct.findByIdAndUpdate(productId, updateDetails, {new: true});
        //console.log(updatedProduct);
        const saveProduct = await updatedProduct.save();
        return saveProduct;
    }
    catch (error) {
        console.log("error occured while updating product: ",error);
    }
}
app.post('/product/update/:productId', async (req, res) => {
    try{
        const product = await updateProduct(req.params.productId, req.body);
        if(product){
            res.status(200).send({message: 'product updated successfully.', data: product});
        }else{
            res.status(404).send({error: "no product found."})
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to update product."})
    }
})

//api to delete product.
const deleteOriginalProduct = async (productId) => {
    try{
        const deletedProduct = await ElectronicProduct.findByIdAndDelete(productId, {new: true});
        //console.log(updatedProduct);
        return deletedProduct;
    }
    catch (error) {
        console.log("error occured while deleting original product: ",error);
    }
}
app.delete('/product/delete/:productId', async (req, res) => {
    try{
        const product = await deleteOriginalProduct(req.params.productId);
        if(product){
            res.status(200).send({message: 'product deleted successfully.', data: product});
        }else{
            res.status(404).send({error: "no product found."})
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to delete product."})
    }
})

//api to add product to wishlist.
const addProdToWishlist = async (product) => {
    try{
        const productCreated = new ElectronicWishlist(product);
        //console.log("hi", typeof productCreated.productsInWishlist);
        const saveProduct = await productCreated.save();
        return saveProduct;
    }
    catch (error) {
        console.log("error occured while adding product to wishlist: ", error);
    }
};

app.post("/product/wishlist/addproduct", async (req, res) => {
    try{
        const productCreated = await addProdToWishlist(req.body);
        if(productCreated){
            res.status(201).send({message: 'Product added to wishlist.', data: productCreated});
        }else{
            res.status(404).send({error: "No product found."});
        }
    }
    catch (error) {
        res.status(500).send({error: `failed to add product to wishlist`});
    }
})

//api to get wishlist all products.
const getWishlistProductById = async () => {
    try{
        const product = await ElectronicWishlist.find().populate("productsInWishlist");
        return product;
    }
    catch (error) {
        console.log("error occured while getting wishlist products: ",error);
    }
}
app.get('/product/wishlist/get', async (req, res) => {
    try{
        const product = await getWishlistProductById();
        if(product.length > 0){
            res.status(200).send({message: 'Wishlist products found.', data: product});
        }else{
            res.status(404).send({error: "no wishlist products found."})
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to get wishlist products."})
    }
})

//api to delete wishlist product by id.
const delteWishlistProductById = async (productId) => {
    try{
        const product = await ElectronicWishlist.findByIdAndDelete(productId).populate("productsInWishlist");
        return product;
    }
    catch (error) {
        console.log("error occured while deleting wishlist product: ",error);
    }
}
app.delete('/product/wishlist/delete/:productId', async (req, res) => {
    try{
        const product = await delteWishlistProductById(req.params.productId);
        if(product){
            res.status(200).send({message: 'Wishlist product deleted successfully.', data: product});
        }else{
            res.status(404).send({error: "no wishlist product found."})
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to delete wishlist product."})
    }
})

//api to update wishlist product.
const updateWishlistProduct = async (productId, updateDetails) => {
    try{
        const updatedProduct = await ElectronicWishlist.findByIdAndUpdate(productId, updateDetails, {new: true}).populate("productsInWishlist");
        //console.log(updatedProduct);
        const saveProduct = await updatedProduct.save();
        return saveProduct;
    }
    catch (error) {
        console.log("error occured while updating wishlist product: ",error);
    }
}
app.post('/product/wishlist/update/:productId', async (req, res) => {
    try{
        const product = await updateWishlistProduct(req.params.productId, req.body);
        if(product){
            res.status(200).send({message: 'wishlist product updated successfully.', data: product});
        }else{
            res.status(404).send({error: "no wishlist product found."})
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to update wishlist product."})
    }
})

//api to add product to cart.
const addProdToCart = async (productId) => {
    try{
        const productCreated = new CartManagement(productId);
        const saveProduct = await productCreated.save();
        return saveProduct;
    }
    catch (error) {
        console.log("error occured while adding product to cart: ", error);
    }
};

app.post("/product/cart/add", async (req, res) => {
    try{
        const productCreated = await addProdToCart(req.body);
        if(productCreated){
            res.status(201).send({message: 'Cart product updated successfully.', data: product});
        }else{
            res.status(404).send({error: "No product found."});
        }
    }
    catch (error) {
        res.status(500).send({error: `failed to add product to cart`});
    }
})

//api to get cart all products.
const getCartProductById = async () => {
    try{
        const product = await CartManagement.find().populate("productInCart");
        return product;
    }
    catch (error) {
        console.log("error occured while getting cart product: ",error);
    }
}
app.get('/product/cart/get', async (req, res) => {
    try{
        const product = await getCartProductById();
        if(product.length > 0){
            res.status(200).send({message: 'cart products found.', data: product});
        }else{
            res.status(404).send({error: "no cart products found."})
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to get cart products."})
    }
})

//api to delete cart product by id.
const delteCartProductById = async (productId) => {
    try{
        const product = await CartManagement.findByIdAndDelete(productId).populate("productInCart");
        return product;
    }
    catch (error) {
        console.log("error occured while deleting cart product: ",error);
    }
}
app.delete('/product/cart/delete/:productId', async (req, res) => {
    try{
        const product = await delteCartProductById(req.params.productId);
        if(product){
            res.status(200).send({message: 'Cart product deleted successfully.', data: product});
        }else{
            res.status(404).send({error: "no Cart product found."})
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to delete cart product."})
    }
})

//api to update cart product.
const updateCartProduct = async (productId, updateDetails) => {
    try{
        const updatedProduct = await CartManagement.findByIdAndUpdate(productId, updateDetails, {new: true}).populate("productInCart");
        //console.log(updatedProduct);
        const saveProduct = await updatedProduct.save();
        return saveProduct;
    }
    catch (error) {
        console.log("error occured while updating cart product: ",error);
    }
}
app.post('/product/cart/update/:productId', async (req, res) => {
    try{
        const product = await updateCartProduct(req.params.productId, req.body);
        if(product){
            res.status(200).send({message: 'Cart product updated successfully.', data: product});
        }else{
            res.status(404).send({error: "no Cart product found."})
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to update Cart product."})
    }
});

//function to add new address.
const createNewAddress = async (newAddressData) => {
    try{
        const newAddress = new UserAddress(newAddressData);
        const addressSaved = await newAddress.save();
        return addressSaved;
    }
    catch (error){
        console.log("error occured while creating new address, ",error);
    }
}

app.post("/address/add", async (req, res) =>{
    try{
        const newAddressCreated = await createNewAddress(req.body);
        if(newAddressCreated){
            res.status(201).send({message: "New Address Created Successfully.", data: newAddressCreated});
        }else{
            res.status(404).send({error: "No address found."});
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to add new address."});
    }
})

//function to get all address.
const getAllAddress = async () => {
    try{
        const foundAddress = await UserAddress.find();
        return foundAddress;
    }
    catch (error){
        console.log("error occured while getting all addresses, ",error);
    }
}

app.get("/address/get", async (req, res) =>{
    try{
        const allAddressFound = await getAllAddress();
        if(allAddressFound.length > 0){
            res.status(200).send({message: "All address found.", data: allAddressFound});
        }else{
            res.status(404).send({error: "No addresses found."});
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to get all addresses."});
    }
})

//function to delete one address by id.
const deleteAddressById = async (addressId) => {
    try{
        const foundAddress = await UserAddress.findByIdAndDelete(addressId, {new: true});
        return foundAddress;
    }
    catch (error){
        console.log("error occured while deleting address, ",error);
    }
}

app.delete("/address/delete/:deleteId", async (req, res) =>{
    try{
        const addressFound = await deleteAddressById(req.params.deleteId);
        if(addressFound){
            res.status(200).send({message: "Address deleted successfully.", data: addressFound});
        }else{
            res.status(404).send({error: "No address found."});
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to delete address."});
    }
});

//function to update one address by id.
const updateAddressById = async (addressId, updateData) => {
    try{
        const foundAddress = await UserAddress.findByIdAndUpdate(addressId, updateData, {new: true});
        const addressSaved = await foundAddress.save();
        return addressSaved;
    }
    catch (error){
        console.log("error occured while updating address, ",error);
    }
}

app.post("/address/update/:updateId", async (req, res) =>{
    try{
        const addressFound = await updateAddressById(req.params.updateId, req.body);
        if(addressFound){
            res.status(200).send({message: "Address updated successfully.", data: addressFound});
        }else{
            res.status(404).send({error: "No address found."});
        }
    }
    catch (error) {
        res.status(500).send({error: "failed to update address."});
    }
});

//function to add ordered products.
const addOrderedProducts = async (orderData) => {
    try{
        const productsAdded = new OrderHistory(orderData);
        const savedOrders = await productsAdded.save();
        return savedOrders;
    }
    catch (error) {
        console.log("error occured while adding ordered products, ", error);
    }
}

//api to add orderd products.
app.post('/orderhistory/add', async (req, res) => {
    try{
        const dataFound = await addOrderedProducts(req.body);
        if(dataFound){
            res.status(201).send({message: 'added successfully', data: dataFound});
        }else{
            res.status(404).send({error: 'no data found.'});
        }
    }
    catch (error) {
        res.status(500).send({error: 'failed to add orders.'});
    }
})

//function to get ordered products.
const getOrderedProducts = async () => {
    try{
        const productsFound = await OrderHistory.find().populate({
            path: "orderedProductsFromCart",
            populate: {
                path: "productInCart", // Fetch actual product
                model: "ElectronicProduct"
            }
        }).populate("orderedProductsFromBuyNow");
        return productsFound;
    }
    catch (error) {
        console.log("error occured while getting ordered products, ", error);
    }
}

//api to add orderd products.
app.get('/orderhistory/get', async (req, res) => {
    try{
        const dataFound = await getOrderedProducts();
        if(dataFound.length > 0){
            res.status(200).send({message: 'all orders found.', data: dataFound});
        }else{
            res.status(404).send({error: 'no orders found.'});
        }
    } 
    catch (error) {
        res.status(500).send({error: 'failed to get orders.'});
    }
})

//function to delete ordered product.
const DeleteOrderedProducts = async (orderId) => {
    try{
        const productsFound = await OrderHistory.findByIdAndDelete(orderId, {new: true}).populate("orderedProductsFromCart").populate("orderedProductsFromBuyNow");
        return productsFound;
    }
    catch (error) {
        console.log("error occured while deleting ordered products, ", error);
    }
}

//api to delete orderd products.
app.delete('/orderhistory/delete/:orderedId', async (req, res) => {
    try{
        const dataFound = await DeleteOrderedProducts(req.params.orderedId);
        if(dataFound){
            res.status(200).send({message: 'order deleted successfully.', data: dataFound});
        }else{
            res.status(404).send({error: 'no order found.'});
        }
    }
    catch (error) {
        res.status(500).send({error: 'failed to delete order.'});
    }
})

//function to update ordered products.
const updateOrderedProducts = async (orderId, updateDetails) => {
    try{
        const productsFound = await OrderHistory.findByIdAndUpdate(orderId, updateDetails, {new: true}).populate("orderedProducts");
        return productsFound;
    }
    catch (error) {
        console.log("error occured while getting ordered products, ", error);
    }
}

//api to update orderd products.
app.post('/orderhistory/update/:orderId', async (req, res) => {
    try{
        const dataFound = await updateOrderedProducts(req.params.orderId, req.body);
        if(dataFound){
            res.status(200).send({message: 'order updated successfully.', data: dataFound});
        }else{
            res.status(404).send({error: 'no order found.'});
        }
    }
    catch (error) {
        res.status(500).send({error: 'failed to update order.'});
    }
});

const addProducts = async (orderData) => {
    try{
        const productsAdded = new ErrorChecking(orderData);
        const savedOrders = await productsAdded.save();
        return savedOrders;
    }
    catch (error) {
        console.log("error occured while adding ordered products, ", error);
    }
}

//api to add orderd products.
app.post('/errorchecking/add', async (req, res) => {
    try{
        const dataFound = await addProducts(req.body);
        if(dataFound){
            res.status(201).send({message: 'added successfully', data: dataFound});
        }else{
            res.status(404).send({error: 'no error checking found.'});
        }
    }
    catch (error) {
        res.status(500).send({error: 'failed to add error checking.'});
    }
})

//function to get ordered products.
const getProducts = async () => {
    try{
        const productsFound = await ErrorChecking.find();
        return productsFound;
    }
    catch (error) {
        console.log("error occured while getting ordered products, ", error);
    }
}

//api to add orderd products.
app.get('/errorchecking/get', async (req, res) => {
    try{
        const dataFound = await getProducts();
        if(dataFound.length > 0){
            res.status(200).send({message: 'all error checking found.', data: dataFound});
        }else{
            res.status(404).send({error: 'no error checking found.'});
        }
    } 
    catch (error) {
        res.status(500).send({error: 'failed to get error checking.'});
    }
});

const deleteProducts = async (errorId) => {
    try{
        const productsFound = await ErrorChecking.findByIdAndDelete(errorId, {new: true});
        return productsFound;
    }
    catch (error) {
        console.log("error occured while getting ordered products, ", error);
    }
}

//api to add orderd products.
app.delete('/errorchecking/delete/:errorId', async (req, res) => {
    try{
        const dataFound = await deleteProducts(req.params.errorId);
        if(dataFound){
            res.status(200).send({message: 'deleted successfully.', data: dataFound});
        }else{
            res.status(404).send({error: 'no error checking found.'});
        }
    } 
    catch (error) {
        res.status(500).send({error: 'failed to get error checking.'});
    }
})