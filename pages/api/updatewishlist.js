import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from 'jsonwebtoken'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        if (req.body.token !== null) {
            let token = req.body.token;
            let userToken = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY)
            let user = await User.findOne({ email: userToken.email })
            if (user.wishlist.includes(req.body.title)) {
                await user.updateOne({
                    $pull: { wishlist: req.body.title }
                })
                res.status(200).json({ success: true, added: false });
            } else {
                await user.updateOne({
                    $push: { wishlist: req.body.title }
                })
                res.status(200).json({ success: true, added: true });
            }
        }
        else res.status(200).json({ success: false });
    } else {
        res.status(400).json({ success: false, error: "error" });
    }
}

export default connectDb(handler);



