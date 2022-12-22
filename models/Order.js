const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { type: String, default: '' },
    products: { type: Object, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
    transactionid: { type: String, default: '' },
    amount: { type: Number, required: true },
    status: { type: String, default: 'initiated', required: true },
    deliveryStatus: { type: String, default: 'Not Shipped', required: true },
}, { timestamps: true })

mongoose.models = {}
export default mongoose.model("Order", OrderSchema);