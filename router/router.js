const express = require('express')
const { adminLogin, addProduct, getProducts, editProduct, deleteProduct, singleViewProduct, 
    userSignup, userLogin, addToCart, cartCount, cartItems, totalPrice, QuantityIncrement,
     QuantityDecrement,removeCart, addWishlist, wishlistItems, removeWishlist, getUsers, deleteUser } = require('../controllers/logic')


const router = new express.Router()

router.post('/admin/login', adminLogin)
router.post('/admin/add-product', addProduct)
router.get('/products-access', getProducts)
router.put('/product-update/:id', editProduct)
router.delete('/product-delete/:id', deleteProduct)
router.get('/single-product/:id', singleViewProduct)
router.post('/user-signup', userSignup)
router.post('/user-login', userLogin)
router.post('/addtocart',addToCart)
router.get('/cart-count/:userId',cartCount)
router.get('/cart-items/:userId',cartItems)
router.get('/price-total/:userId',totalPrice)
router.get('/quantity-update-inc/:_id',QuantityIncrement)
router.get('/quantity-update-dec/:_id',QuantityDecrement)
router.delete('/remove-cart/:_id',removeCart)
router.post('/addtowishlist',addWishlist)
router.get('/wishlist-items/:userId',wishlistItems)
router.delete('/remove-wishlist/:_id',removeWishlist)
router.get('/users-access',getUsers)
router.delete('/user-delete/:_id',deleteUser)


module.exports = router
