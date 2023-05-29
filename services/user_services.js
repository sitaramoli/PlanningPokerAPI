import { getConnection } from "../config/database.js";
import ErrorHandler from "../middlewares/error_handler.js";

// get user by email service
export const findUserByEmail = async ({ email }) => {
    try {
        const connection = await getConnection();
        const q = "SELECT * FROM users WHERE email = ?";
        return new Promise((resolve, reject) => {
            connection.query(q, [email], (err, data) => {
                connection.release();
                if (err)
                    reject(err);
                else {
                    const user = data.length ? { ...data[0] } : null;
                    resolve(user);
                }
            });
        });
    } catch (error) {
        throw new ErrorHandler("Internal server error", 500);
    }
};

// get user by id service
export const findUserById = async ({ id }) => {
    try {
        const connection = await getConnection();
        const q = "SELECT id,name,email FROM users WHERE id = ?";
        return new Promise((resolve, reject) => {
            connection.query(q, [id], (err, data) => {
                connection.release();
                if (err)
                    reject(err);
                else {
                    const user = data.length ? { ...data[0] } : null;
                    resolve(user);
                }
            });
        });
    } catch (error) {
        throw new ErrorHandler("Internal server error", 500);
    }
};

// register service
export const createUser = async ({ name, email, password }) => {
    try {
        const connection = await getConnection();
        const q = "INSERT INTO users(name, email, password) VALUES(?,?,?)";
        return new Promise((resolve, reject) => {
            connection.query(q, [name, email, password], (err, data) => {
                connection.release();
                if (err) { reject(err); }
                else {
                    resolve(data);
                }
            });
        });
    } catch (error) {
        throw new ErrorHandler("Internal server error", 500);
    }
};