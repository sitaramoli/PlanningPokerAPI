import jwt from 'jsonwebtoken';

export const sendAuthResponse = ({ res, user, statusCode }) => {
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY);
    res.status(statusCode).json({
        success: true, message: `Welcome back, ${user.name}`, data: {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    });
}