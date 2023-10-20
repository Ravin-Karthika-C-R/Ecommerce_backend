const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({

    uname: String,
    psw: String

})
//model
const admins = new mongoose.model("admins", adminSchema)


const productSchema = new mongoose.Schema({
    pname: String,
    description: String,
    price: Number,
    image: String,
    rating: Number,
    count: Number

})
//model
const products = new mongoose.model("products", productSchema)


const userSchema = new mongoose.Schema({

    email: String,
    psw: String

})

const users = new mongoose.model("users", userSchema)

//cart
const cartSchema = new mongoose.Schema({
    userId:String,
    pId:String,
    pname: String,
    description: String,
    price: Number,
    image: String,
    rating: Number,
    quantity:Number,
    totalPrice:Number

})
const carts = new mongoose.model("carts", cartSchema)

//wishlist
const wishlistSchema = new mongoose.Schema({
    userId:String,
    pId:String,
    pname: String,
    description: String,
    price: Number,
    image: String,
    rating: Number

})
const wishlists = new mongoose.model("wishlists", wishlistSchema)


module.exports = { admins, products, users, carts , wishlists}