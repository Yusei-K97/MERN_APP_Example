const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    return console.log("Hello");
});

//ITEM functions
//Create Item
app.post('/item/create', (req, res) => {
    console.log(req.body.title);
    return res.status(200).json("goodbye");
});
//Read All Items
//Read Single Item
//update Item
//Delete Item

//USER functions
//Register User
//Login User

app.listen(5000, () => {
    console.log('listening on localhost port 5000');
});