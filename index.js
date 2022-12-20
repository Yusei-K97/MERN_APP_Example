//expressを呼び出して定数化.
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//呼び出して定数化.
const connectDB = require("./utils/database");
const { ItemModel, UserModel } = require("./utils/schemaModels");
const jwt = require("jsonwebtoken");
const auth = require("./utils/auth");
//.envから暗証番号呼び出し.
require("dotenv").config();

/*ITEMの作成、編集、削除.
Item　作成.*/
app.post("/item/create", auth, async(req, res) => {
    try{
        await connectDB();
        const singleItem = await ItemModel.findById(req.params.id);

        if (singleItem.email === req.body.email) {
            await ItemModel.create(req.body);
            return res.status(200).json({message: "アイテム作成成功"});
        } else {
        throw new Error();
        };
    } catch(e) {
        return res.status(400).json({message: "アイテム作成失敗"});
    };
});
//All Items　読み取り.
app.get("/", async(req, res) => {
    try {
    await connectDB();
    const allItems = await ItemModel.find();
    return res.status(200).json({message: "アイテム読み取り成功（All）", allItems: allItems});
    } catch (e) {
        return res.status(400).json({message: "アイテム読み取り失敗（All）"});
    }
});
//Single Item　読み取り.
app.get("/item/:id", async(req, res) => {
    try {
        await connectDB();
        const singleItem = await ItemModel.findById(req.params.id);
        return res.status(200).json({message: "アイテム読み取り成功（Single）", singleItem: singleItem});
    } catch (e) {
        return res.status(400).json({message: "アイテム読み取り失敗（Single）"})
    };
});
//Item　編集.
app.put("/item/update/:id", auth, async(req, res) => {
    try {
        await connectDB();
        const singleItem = await ItemModel.findById(req.params.id);

        if (singleItem.email === req.body.email) {
            await ItemModel.updateOne({_id: req.params.id}, req.body);
            return res.status(200).json({message: "アイテム編集成功"});
        } else {
            throw new Error();
        };
    } catch (e) {
        return res.status(400).json({message: "アイテム編集失敗"});
    };
});
//Item　削除.
app.delete("/item/delete/:id", auth, async(req, res) => {
    try {
        await connectDB();
        await ItemModel.deleteOne({_id: req.params.id});

        if (singleItem.email === req.body.email) {
            return res.status(200).json({message: "アイテム削除成功"});
        } else {
            throw new Error();
        };
    } catch (e) {
        return res.status(400).json({message: "アイテム削除失敗"});
    };
});

//ユーザー登録、ログイン機能.
//User 登録.
app.post("/user/create", async(req, res) => {
    try {
    await connectDB();
    await UserModel.create(req.body);
    return res.status(200).json({message: "ユーザー登録成功"});
    } catch (e) {
        return res.status(400).json({message: "ユーザー登録失敗"});
    };
});

//jwt(トークン方式でのログイン維持).
const secret_key = process.env.SyK;

//User　ログイン.
app.post("/user/login", async(req, res) => {
    try {
        await connectDB();
        const savedUserData = await UserModel.findOne({email: req.body.email});
        //1.ユーザー登録されているかの判定.
        if (savedUserData) {
            //2.ユーザー登録されている場合、パスワードがあっているかの判定.
            if (req.body.password === savedUserData.password) {
                // true(1かつ2).
                //jwtのペイロード(トークンに含ませるデータ)設定.
                const payload = {email: req.body.email,};
                //トークン発行.
                const token = jwt.sign(payload, secret_key, {expiresIn: "47h"});
                return res.status(200).json({message: "ログイン成功", token: token});
            } else {
                // true(1)かつfalse(2).
                return res.status(400).json({message: "ログイン失敗：パスワードが間違っています"});
            };
        } else {
                //false(1).
            return res.status(400).json({message: "ログイン失敗：ユーザー登録が必要です"});
            };
    } catch (e) {
        return res.status(400).json({message: "ログイン失敗"});
    };
});

//出力.
app.listen(5000, () => {
    console.log("listening on localhost port 5000");
});