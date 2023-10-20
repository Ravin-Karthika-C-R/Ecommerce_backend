const { admins, products, users, carts, wishlists } = require("../models/collection")


const adminLogin = (req, res) => {
    const { uname, psw } = req.body

    admins.findOne({ uname, psw }).then(admin => {
        if (admin) {
            res.status(200).json({
                message: "login success",
                status: true,
                statusCode: 200
            })
        }
        else {
            res.status(400).json({
                message: "incorrect user password or acc no",
                status: false,
                statusCode: 400
            })
        }
    })
}

const addProduct = (req, res) => {
    const { pname, description, price, image, rating, count } = req.body
    const newProduct = new products({
        pname, description, price, image, rating, count
    })
    newProduct.save()
    res.status(200).json({
        message: "new product added",
        status: true,
        statusCode: 200
    })
}

const getProducts = (req, res) => {
    products.find().then((data) => {
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200
            })
        }
    })
}

const editProduct = (req, res) => {
    const { id } = req.params
    const { pname, description, price, image, rating, count } = req.body
    products.findOne({ _id: id }).then(pdata => {
        if (pdata) {
            pdata.pname = pname
            pdata.description = description
            pdata.price = price
            pdata.image = image
            pdata.rating = rating
            pdata.count = count

            pdata.save()
            res.status(200).json({
                message: "product updated",
                status: true,
                statusCode: 200
            })

        }
    })
}

const deleteProduct = (req, res) => {
    const { id } = req.params
    products.deleteOne({ _id: id }).then(data => {
        res.status(200).json({
            message: "product deleted",
            status: true,
            statusCode: 200
        })
    })
}

//single product

const singleViewProduct = (req, res) => {
    const { id } = req.params
    products.findOne({ _id: id }).then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200
            })
        }
        else {
            res.status(404).json({
                message: "No data",
                status: false,
                statusCode: 404
            })
        }
    })
}

//userregister

const userSignup = (req, res) => {
    const { email, psw } = req.body
    users.findOne({ email }).then(user => {
        if (user) {
            res.status(404).json({
                message: "already registered",
                status: false,
                statusCode: 404
            })
        }
        else {
            newUser = new users({
                email, psw
            })
            newUser.save()
            res.status(200).json({
                message: "registered",
                status: true,
                statusCode: 200
            })
        }
    })
}

const userLogin = (req, res) => {
    const { email, psw } = req.body

    users.findOne({ email, psw }).then(user => {
        if (user) {
            res.status(200).json({
                message: "login success",
                status: true,
                statusCode: 200,
                _id: user._id
            })
        }
        else {
            res.status(404).json({
                message: "incorrect user name or password",
                status: false,
                statusCode: 404
            })
        }
    })
}

const addToCart = (req, res) => {
    const { userId, pId } = req.body
    carts.findOne({ userId, pId }).then(data => {
        if (data) {
            data.quantity += 1
            data.totalPrice = data.quantity * data.price
            data.save()

            res.status(200).json({
                message: "product added to cart",
                status: true,
                statusCode: 200
            })
        }
        else {
            products.findOne({ _id: pId }).then(product => {
                if (product) {
                    newCart = new carts({
                        userId,
                        pId,
                        pname: product.pname,
                        description: product.description,
                        price: product.price,
                        image: product.image,
                        rating: product.rating,
                        quantity: 1,
                        totalPrice: product.price
                    })
                    newCart.save()
                    res.status(200).json({
                        message: "product added to cart",
                        status: true,
                        statusCode: 200
                    })
                }
            })
        }
    })

}
//cart count
const cartCount = (req, res) => {
    const { userId } = req.params
    carts.find({ userId }).then(products => {
        if (products) {
            res.status(200).json({
                message: products.length,
                status: true,
                statusCode: 200
            })
        }
    })
}

//cartItems 
const cartItems = (req, res) => {
    const { userId } = req.params
    carts.find({ userId }).then(products => {
        if (products) {
            res.status(200).json({
                message: products,
                status: true,
                statusCode: 200
            })
        }
    })
}

//totalprice get from cartitems

const totalPrice = (req, res) => {
    const { userId } = req.params
    carts.find({ userId }).then(products => {
        if (products) {
            // console.log(products);
            if (products.length > 0) {
                total = products.map(i => i.totalPrice).reduce((i1, i2) => i1 + i2)
                // console.log(total);
                // console.log(products);
                res.status(200).json({
                    message: total,
                    status: true,
                    statusCode: 200
                })
            }
        }
    })
}

//quantity increment

const QuantityIncrement = (req, res) => {
    const { _id } = req.params
    carts.findOne({ _id }).then(data => {
        if (data) {

            data.quantity += 1
            data.totalPrice = data.price * data.quantity
            data.save()

            res.status(200).json({
                message: data.quantity,
                status: true,
                statusCode: 200,
                price: data.totalPrice
            })
        }
    })
}

//quantity decrement

const QuantityDecrement = (req, res) => {
    const { _id } = req.params
    carts.findOne({ _id }).then(data => {
        if (data) {

            if(data.quantity>1){
                data.quantity -= 1
                data.totalPrice = data.price * data.quantity
                data.save()

                res.status(200).json({
                    message: data.quantity,
                    status: true,
                    statusCode: 200,
                    price: data.totalPrice
                })
            }

            else{ 
                res.status(404).json({
                    message: "You can remove this from cart",
                    status: false,
                    statusCode: 404
                })
            } 
        }
    })
}

//removecart

const removeCart = (req, res) => {
    const { _id } = req.params
    carts.deleteOne({ _id }).then(data => {
            res.status(200).json({
                message: "Product deleted from the cart",
                status: true,
                statusCode: 200,
            })    
    })
}

//wishlist
const addWishlist = (req, res) => {
    const { userId, pId } = req.body
    wishlists.findOne({ userId, pId }).then(data => {
        if (data) {
            res.status(400).json({
                message: "product already in wishlist",
                status: false,
                statusCode: 400
            })
        }
        else {
            products.findOne({ _id: pId }).then(product => {
                if (product) {
                    newWishlist = new wishlists({
                        userId,
                        pId,
                        pname: product.pname,
                        description: product.description,
                        price: product.price,
                        image: product.image,
                        rating: product.rating
                    })
                    newWishlist.save()
                    res.status(200).json({
                        message: "product added to wishlist",
                        status: true,
                        statusCode: 200
                    })
                }
            })
        }
    })
}

//view wishlist
const wishlistItems = (req, res) => {
    const { userId } = req.params
    wishlists.find({ userId }).then(products => {
        if (products) {
            res.status(200).json({
                message: products,
                status: true,
                statusCode: 200
            })
        }
    })
}

//remove wishlist

const removeWishlist = (req, res) => {
    const { _id } = req.params
    wishlists.deleteOne({ _id }).then(data => {
            res.status(200).json({
                message: "Product deleted from the wishlist",
                status: true,
                statusCode: 200,
            })    
    })
}

//get users
const getUsers = (req, res) => {
    users.find().then((data) => {
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200
            })
        }
    })
}

//delete users and items from the cart and wishlist
const deleteUser = (req, res) => {
    const { _id } = req.params
    users.deleteOne({ _id }).then(data => {
        carts.deleteMany({userId:_id}).then(data=>{
            wishlists.deleteMany({userId:_id}).then(data=>{
                res.status(200).json({
                    message: "user deleted",
                    status: true,
                    statusCode: 200
                })
            })
        })
    })
}


module.exports = {
    adminLogin, addProduct, getProducts, editProduct, deleteProduct,
    singleViewProduct, userSignup, userLogin, addToCart, cartCount, cartItems, totalPrice,QuantityIncrement,QuantityDecrement,
    removeCart ,addWishlist ,wishlistItems , removeWishlist, getUsers, deleteUser, deleteUser
}