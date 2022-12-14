import connectDb from "../../middleware/mongoose"
import User from "../../models/User"

var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ "email": req.body.email })
        const bytes = CryptoJS.AES.decrypt(user.password, 'secret1234');
        const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        if (user) {
            if (req.body.email === user.email && decryptedPass === req.body.password) {
                var token = jwt.sign({ email: user.email, name: user.name }, 'shhhhh', { expiresIn: "2d" });
                res.status(200).json({ success: true, token, user })
            } else res.status(200).json({ success: false, error: "Invalid email or password" })
        } else {
            res.status(200).json({ success: false, error: "No user found" })
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler);