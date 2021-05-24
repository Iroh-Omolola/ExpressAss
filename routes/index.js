const express = require('express');
const router = express.Router();
const app = require('../main');

const lists = [];
let id = 0;
app.use(express.json())
    //to post items
router.route('/items')
    .post((req, res) => {
        lists.push({
            itemList: req.body.itemList,
            price: req.body.price,
            id: ++id
        });
        return res.status(200).json({ message: "Created" });
    })
    //to get all items
    .get((req, res) => {
        res.status(200).json(lists);
    });
router.route('/items/:id')
    //to get an item 
    .get((req, res) => {
        const list = lists.find(val => val.id === Number(req.params.id));
        return res.json(list);
    })
    //to edit an item 
    .patch((req, res) => {
        const list = lists.find(val => val.id === Number(req.params.id));
        list.itemList = req.body.itemList;
        return res.json({ message: "Updated" })
    })
    //to delete an item 
    .delete((req, res) => {
        const listIndex = lists.findIndex(val => val.id === Number(req.params.id));
        items.splice(listIndex, 1);
        return res.json({ message: "Deleted" });
    })