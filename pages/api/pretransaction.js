import Product from '../../models/Product';
import Order from '../../models/Order';
import connectDb from '../../middleware/mongoose'

// const https = require('https');
// const PaytmChecksum = require('paytmChecksum');

const handler = async (req, res) => {
    if (req.method === 'POST') {

        //check if the cart is tampered or the item is out of stock 
        let product, sumTotal = 0;
        let cart = req.body.cart;
        for (let item in cart) {
            sumTotal += cart[item].price * cart[item].qty;
            product = await Product.findOne({ slug: item })
            if (product.availableQty < cart[item].qty) {
                res.status(200).json({ success: false, error: "Some items in your cart went out of stocks please try again!", cartClear: false })
                return;
            }
            if (product.price !== cart[item].price) {
                res.status(200).json({ success: false, error: "The prices of some products has been changed please try again.", cartClear: true })
                return;
            }
        }
        if (sumTotal !== req.body.subTotal) {
            res.status(200).json({ success: false, error: "The prices of some products has been changed please try again.", cartClear: true })
            return;
        }

        //Initiate an order corresponding to this order Id
        let order = new Order({
            email: req.body.email,
            orderId: req.body.orderId,
            address: req.body.address,
            amount: req.body.subTotal,
            products: req.body.cart
        })
        await order.save();

        // var paytmParams = {};

        // paytmParams.body = {
        //     "requestType": "Payment",
        //     "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
        //     "websiteName": "YOUR_WEBSITE_NAME",
        //     "orderId": req.body.orderId,
        //     "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
        //     "txnAmount": {
        //         "value": req.body.subTotal,
        //         "currency": "INR",
        //     },
        //     "userInfo": {
        //         "custId": req.body.email,
        //     },
        // };

        /*
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
        */
        // const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY)

        // paytmParams.head = {
        //     "signature": checksum
        // };

        // var post_data = JSON.stringify(paytmParams);

        // const requestAsync = () => {
        //     return new Promise((resolve, reject) => {


        //         var options = {

        //             /* for Staging */
        // hostname: 'securegw-stage.paytm.in',

        //             /* for Production */
        //             hostname: 'securegw.paytm.in',

        //             port: 443,
        //             path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.orderId}`,
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Content-Length': post_data.length
        //             }
        //         };

        //         var response = "";
        //         var post_req = https.request(options, function (post_res) {
        //             post_res.on('data', function (chunk) {
        //                 response += chunk;
        //             });

        //             post_res.on('end', function () {
        //                 console.log('Response: ', response);
        //                 resolve(JSON.parse(response).body)
        //             });
        //         });
        //         post_req.write(post_data);
        //         post_req.end();
        //     })
        // }

        // let myr = await requestAsync()
        res.status(200).json({ success: true, message: "Your order has been successfully placed", txnToken: "3453redfs", cartClear: false })
    }
}

export default connectDb(handler);