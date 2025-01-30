import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res) => {
    try {  // This will help you confirm if the route is hit
        const { name, email, password } = req.body;

        // ✅ Check for empty fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            });
        }

        // ✅ Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                msg: "Email already exists"
            });
        }

        // ✅ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create and store user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            //console.log("User created successfully"),
             message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        });
    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to register user"
        });
    }
};

export const login = async (req, res) => {
    console.log('Login API hit');  // This will help you confirm if the route is hit
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        return generateToken(res, user, `Welcome back ${user.name}`);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to login"
        });
    }
};

