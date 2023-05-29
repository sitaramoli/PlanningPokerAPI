import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/error_handler.js";
import { createUser, findUserByEmail, findUserById } from "../services/user_services.js";
import { sendAuthResponse } from "../utils/auth.js";

// user profile controller
export const getUserInfo = async (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        }
    });

};

// user controller
export const getUserById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await findUserById({ id });
        if (!user) {
            throw new ErrorHandler("User not found", 404);
        }
        res.status(200).json({ success: true, data: { ...user } });
    } catch (error) {
        next(error);
    }
}

// register controller
export const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        next(new ErrorHandler("All fields are required", 400));
    }
    try {
        const user = await findUserByEmail({ email });
        if (user) {
            throw new ErrorHandler("User already exists", 409);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser({ name, email, password: hashedPassword });
        return res.json({ success: true, message: "Account created successfully" });
    } catch (error) {
        next(error);
    }
};

// login controller
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next(new ErrorHandler("All fields are required", 400));
    }
    try {
        let user = await findUserByEmail({ email });
        if (!user) {
            throw new ErrorHandler("Invalid email or password", 404);
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.json({ message: "error" });
        sendAuthResponse({ res, user, statusCode: 200 });
    } catch (error) {
        next(error);
    }
}