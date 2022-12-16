import Order from '../../models/Order';
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {

    if (req.body.status === 'TXN_SUCCESS') {
        await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { paymentInfo: JSON.stringify(req.body), status: 'Paid' });
    } else if (req.body.status === 'PENDING') {
        await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { paymentInfo: JSON.stringify(req.body), status: 'Pending' });
    }
    // res.status(200).json({ body: req.body })
    res.redirect('/order', 200)
}

export default connectDb(handler);
