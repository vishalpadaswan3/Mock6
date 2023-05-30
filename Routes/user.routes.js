const express = require('express');
const { userModel } = require('../Model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

userRouter.post("/api/register", async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let user = await userModel.find({ email });
        if (user.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        let pass = await bcrypt.hash(password, 10);
        password = pass;
        let s = await new userModel({ name, email, password });
        await s.save();
        res.status(201).json({ message: "User registered" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.post("/api/login", async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await userModel.find({ email });
        if (user.length == 0) {
            return res.status(400).json({ message: "User not found" });
        }
        let result = await bcrypt.compare(password, user[0].password);
        if (!result) {
            return res.status(400).json({ message: "Invalid password" });
        }

        let token = jwt.sign({ user_id: user[0]._id }, process.env.token_key);

        res.status(201).json({ message: "Login successful" , token});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})



module.exports = { userRouter }