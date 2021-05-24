const express = require('express');
const fs = require('fs')
const process = require('process');
const app = express();
const PORT = process.env.PORT || 5000;

items = [];
let id = 0;
app.use(express.json());

app.post('/items', (req, res) => {
    items.push({
        item: req.body.item,
        price: req.body.price,
        id: ++id
    });
    return res.status(200).json({ message: "Created" });
});

app.get('/items', (req, res) => {

    res.status(200).json(items);
});

app.get('/items/:id', (req, res) => {
    const list = items.find(val => val.id === Number(req.params.id));
    return res.json(list);
});
app.patch('/items/:id', (req, res) => {
    const list = items.find(val => val.id === Number(req.params.id));
    list.item = req.body.item;
    return res.json({ message: "Updated" });
});
app.delete('/items/:id', (req, res) => {
    const listIndex = items.findIndex(val => val.id === Number(req.params.id));
    items.splice(listIndex, 1);
    return res.json({ message: "Deleted" });
});


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})

module.exports = app;