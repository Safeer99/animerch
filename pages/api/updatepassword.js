import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from 'jsonwebtoken'
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
    if (req.method == 'POST') {

        let token = req.body.token;
        let user = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY)
        let myuser = await User.findOne({ email: user.email });
        const bytes = CryptoJS.AES.decrypt(myuser.password, process.env.AES_SECRET_KEY);
        const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        if (req.body.currentPassword === decryptedPass) {
            await User.findOneAndUpdate({ email: user.email }, {
                password: CryptoJS.AES.encrypt(req.body.newPassword, process.env.AES_SECRET_KEY).toString()
            })
            res.status(200).json({ success: true })
        } else {
            res.status(200).json({ success: false, error: "wrong password" })
        }
    } else {
        res.status(400).json({ success: false, error: "error" });
    }
}

export default connectDb(handler);



