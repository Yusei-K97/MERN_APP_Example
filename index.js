const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.status(200).json("Hello");
});

app.listen(5000, () => {
    console.log('listening on localhost port 5000');
});