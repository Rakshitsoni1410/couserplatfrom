import jwt from 'jsonwebtoken';

export const generateToken = (res, user, message) => {
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1d', // Token expires in 1 day
    });

    console.log("Token Generated:", token); // Add this to check if the token is generated

    return res.status(200)
        .cookie('token', token, {
            httpOnly: true, 
            sameSite: 'strict', 
            maxAge: 24 * 60 * 60 * 1000,  // Token expires in 1 day
        })
        .json({
            success: true,
            message,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
};
