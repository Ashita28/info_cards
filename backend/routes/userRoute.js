const express = require('express');
const User = require('../models/userModel.js');

const router = express.Router();

// Create
router.post("/", async (req, res) => {
    const { name, email, age } = req.body;

    try {
        const userAdded = await User.create({
            name: name,
            email: email,
            age: age
        });

        res.status(201).json(userAdded);
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

// Get all users
router.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Get single user
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findById(id); // Removed object wrapper
        if (!singleUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(singleUser);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Delete specific user
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findByIdAndDelete(id); // Removed object wrapper
        if (!singleUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(singleUser);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Update user
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    try {
        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true // Ensure validation on update
        });
        if (!updateUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(updateUser);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
