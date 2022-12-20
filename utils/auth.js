const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret_key = process.env.SyK;

const auth = async(req, res, next) => {
    if (req.method === "GET") {
        return next();
    };
    //ローカルストレージからトークンを取り出し、HTTP headersに格納.
    const token = await req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(400).json({message: "トークンがありません"});
    } else {
        try {
            //トークン、シークレットキーが一致しているか判定.定数に格納.
            const decoded = jwt.verify(token, secret_key);
            req.body.email = decoded.email;
            return next();
        } catch (e) {
            return res.status(400).json({message: "トークン不一致。ログインが必要です。"});
        };
    };
};

module.exports = auth;