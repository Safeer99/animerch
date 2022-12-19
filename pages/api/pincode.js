// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    let pincodes = {
        "248001": ["Dehradun", "Uttarakhand"],
    }
    res.status(200).json(pincodes)
}
