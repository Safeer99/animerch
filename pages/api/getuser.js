import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from 'jsonwebtoken'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        if (req.body.token !== null) {
            let token = req.body.token;
            let user = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY)
            let userData = await User.findOne({ email: user.email })
            const { wishlist, cart, name, email, address, pincode, phone } = userData;
            res.status(200).json({ success: true, data: { wishlist, cart, name, email, address, pincode, phone } })
        }
        else res.status(200).json({ success: false });
    } else {
        res.status(400).json({ success: false, error: "error" });
    }
}

export default connectDb(handler);



