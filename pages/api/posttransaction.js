import Order from '../../models/Order';
import Product from '../../models/Product';
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
    let order;
    if (req.body.status === 'TXN_SUCCESS') {
        order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { paymentInfo: JSON.stringify(req.body), status: 'Paid', transactionid: req.body.TXNID });
        let products = order.products;
        for (let slug in products) {
            await Product.findOneAndUpdate({ slug: slug }, { $inc: { availableQty: -products[slug].qty } })
        }

    } else if (req.body.status === 'PENDING') {
        order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { paymentInfo: JSON.stringify(req.body), status: 'Pending', transactionid: req.body.TXNID });
    }
    res.redirect('/order?clearcart=1&id=' + order._id, 200)
}

export default connectDb(handler);
