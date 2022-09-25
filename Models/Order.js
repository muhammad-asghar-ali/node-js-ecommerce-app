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
    amount: { type: Number, requried: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" }
}, { timestamps: true })
module.exports = mongoose.model("Cart", cartSchema)