import { createPool } from "mysql";

const pool = createPool({
    host: "localhost",
    user: "admin",
    password: "2055",
    database: "planning_poker",
    connectionLimit: 10
});

export const getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(connection);
            }
        });
    });
};