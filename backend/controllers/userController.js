const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.status(200).json({ token });
};
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1️⃣ Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        // 2️⃣ Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 3️⃣ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4️⃣ Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 5️⃣ Send response
        res.status(201).json({
            message: "User registered successfully",
            userId: user._id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
