import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';
import { deleteMedia, uploadMedia } from '../utils/cloudinary.js';

export const register = async (req, res) => {
    try {
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
            message: "User created successfully",
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

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Log out successfully.",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to logout"
        });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "Profile not found",
                success: false
            });
        }
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to load user"
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body; // Fixed typo
        const profilePhoto = req.file;

        const user = await User.findByIdAndUpdate(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found", // Capitalized 'User'
                success: false,
            })
        }
        // Extract public id of the old image from the URL if it exists
        if (user.photoUrl) {
            const publicId = user.photoUrl.split("/").pop().split(".")[0]; // Extract public ID
            deleteMedia(publicId);  // Corrected function call
        }
        // Update new photo
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = { name, photoUrl }; // Corrected variable name
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");
        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "Profile updated successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile"  // Corrected typo
        });
    }
};
