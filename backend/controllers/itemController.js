const Product = require("../models/product");
const mongoose = require("mongoose");

// CREATE
exports.createItem = async (req, res) => {
    try {
        const item = new Product(req.body);
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ
exports.getItems = async (req, res) => {
    try {
        const items = await Product.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
exports.updateItem = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    const updatedItem = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
};

// DELETE
exports.deleteItem = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    const deletedItem = await Product.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
        return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
};
