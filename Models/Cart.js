const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    products: [{
        productId: {
            type: String
        },
        quanitiy: {
            type: Number,
            default: 1
        },
    }, ],
}, { timestamps: true })
module.exports = mongoose.model("Cart", cartSchema)