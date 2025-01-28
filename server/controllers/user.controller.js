import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
export const register = async (req, res) => {
    try{
        const{namr,email,password} = req.body;
        if (!name || !email || !password){
            return res.status(400).json({
                success:false,
                msg: "All fields are required"});
            
        }
        const user = await User.findne({email});
        if (user){
            return res.status(400).json({
            success:false,
            msg: "Email already exists"});
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                name,
                email,
                password,
     })
    }catch(error){
        console.log(error);
    }
}