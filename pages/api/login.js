import connectDb from "../../middleware/mongoose"
import User from "../../models/User"

var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ "email": req.body.email })
        if (user) {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET_KEY);
            const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
            if (req.body.email === user.email && decryptedPass === req.body.password) {
                var token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET_KEY, { expiresIn: "2d" });
                res.status(200).json({ success: true, token, email: user.email })
            } else res.status(200).json({ success: false, error: "Invalid email or password." })
        } else {
            res.status(200).json({ success: false, error: "Email is not found." })
        }
    } else {
        res.status(400).json({ error: "This method is not allowed." })
    }
}

export default connectDb(handler);