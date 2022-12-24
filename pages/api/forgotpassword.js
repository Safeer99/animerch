

export default function handler(req, res) {
    let token = 'dafeabfghretawegfagadf'
    let email = `We have sent you this email in response to your request to reset your password on shopnow.com.

    To reset your password, please follow the link below:
    
    <a href="https://shopnow.com/forgot">Click here to reset your password</a>
    
    We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your My Account Page and clicking on the "Change Password" link.`
    res.status(200).json({ name: 'John Doe' })
}