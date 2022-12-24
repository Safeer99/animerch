// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let allProducts = await Product.find()
        let products = {};
        let selectedProducts = req.body.wishlist;
        for (let item of allProducts) {
            if (selectedProducts.includes(item.title) && !Object.keys(products).includes(item.title)) {
                products[item.title] = JSON.parse(JSON.stringify(item));
                products[item.title].size = [item.size];
            } else if (Object.keys(products).includes(item.title)) {
                products[item.title].size.push(item.size);
            }
        }
        res.status(200).json({ products })
    } else res.status(400).json({ error: "error" })
}


// const handler = async (req, res) => {
//     let products = await Product.find()
//     let tshirts = {}
//     for (let item of products) {
//         if (item.title in tshirts) {
//             if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
//                 tshirts[item.title].color.push(item.color);
//             }
//             if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
//                 tshirts[item.title].size.push(item.size);
//             }
//         } else {
//             tshirts[item.title] = JSON.parse(JSON.stringify(item))
//             if (item.availableQty > 0) {
//                 tshirts[item.title].color = [item.color];
//                 tshirts[item.title].size = [item.size];
//             }
//         }
//     }
//     res.status(200).json({ tshirts })
// }

export default connectDb(handler);



