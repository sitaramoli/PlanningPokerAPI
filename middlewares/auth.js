import jwt from "jsonwebtoken";
import { findUserByEmail } from "../services/user_services.js";
import ErrorHandler from "./error_handler.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new ErrorHandler("Invalid token", 401);
        }
        const token = authorizationHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        // verify the user
        const user = await findUserByEmail({ email: decodedToken.email });
        if (!user) {
            throw new ErrorHandler("Invalid token", 401);
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
}