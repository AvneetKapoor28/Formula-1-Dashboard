import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

// Register a new user
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        // Check if a user with the provided email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Hash the password and create a new user
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = new userModel({ username, email, password: hashedpassword });
        await user.save();

        // Generate a JWT token and set it in cookies
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Send a welcome email to the user
        const mailoptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Formula-1 Dashboard",
            text: `${username}, Your account has been created successfully.`,
        };
        await transporter.sendMail(mailoptions);

        res.json({ success: true, message: "User Registered successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// Login a user
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        return res.json({ success: false, message: "Both email and password are required" });
    }

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.json({ success: false, message: "Invalid email" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // Check if the password is correct
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }

        // Generate a JWT token and set it in cookies
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, message: "Logged in successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// Logout a user
export const logout = async (req, res) => {
    try {
        // Clear the JWT token from cookies
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });

        return res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};