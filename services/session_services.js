import { v4 as uuidv4 } from 'uuid';
import { getConnection } from "../config/database.js";
import ErrorHandler from "../middlewares/error_handler.js";

// create new session service
export const createSessionService = async ({ name, description, user_id }) => {
    try {
        const connection = await getConnection();
        await new Promise((resolve, reject) => {
            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    reject(new ErrorHandler("Internal Server Error", 500));
                }
                resolve();
            });
        });

        // perform transaction queries
        const id = uuidv4();
        const sessionQuery = "INSERT INTO `sessions`(`id`,`name`,`description`) VALUES(?,?,?)";
        const participantsQuery = "INSERT INTO `participants`(`user_id`,`role`,`session_id`) VALUES(?,?,?)";
        const session = [id, name, description];
        const participants = [user_id, 'Moderator', id];

        await new Promise((resolve, reject) => {
            connection.query(sessionQuery, session, (err, data) => {
                if (err) {
                    connection.rollback(() => {
                        connection.release();
                    });
                    reject(err);
                }

                connection.query(participantsQuery, participants, (err, data) => {
                    if (err) {
                        connection.rollback(() => {
                            connection.release();
                        });
                        reject(err);
                    }

                    connection.commit((err) => {
                        if (err) {
                            connection.rollback(() => {
                                connection.release();
                            });
                            reject(err);
                        }
                        connection.release();
                        resolve(id);
                    });
                });
            });
        });
        return id;
    } catch (e) {
        throw new ErrorHandler("Internal Server Error", 500);
    }
};

// get all sessions of a moderator
export const getSessionsService = async ({ user_id }) => {
    try {
        const connection = await getConnection();
        const q = "SELECT sessions.id AS id, sessions.name AS name, sessions.description AS description,sessions.created_at, sessions.status FROM sessions INNER JOIN participants ON participants.session_id = sessions.id WHERE participants.user_id = ? AND participants.role = 'Moderator' ORDER BY created_at DESC";
        return new Promise((resolve, reject) => {
            connection.query(q, [user_id], (err, data) => {
                connection.release();
                if (err) reject(err);
                else {
                    const sessions = { ...data };
                    const array = Object.values(sessions);
                    resolve(array);
                }
            });
        });
    } catch (error) {
        throw new ErrorHandler("Internal Server Error", 500);
    }
};

/*close session*/
export const closeSessionService = async ({ id, user_id }) => {
    try {
        const connection = await getConnection();
        const q = "UPDATE `sessions` JOIN `participants`  SET sessions.status = 'Closed' WHERE sessions.id = ? AND participants.user_id = ? AND participants.role = 'Moderator'";
        return new Promise((resolve, reject) => {
            connection.query(q, [id, user_id], (err, res) => {
                connection.release();
                if (err) reject(err);
                else {
                    resolve(res);
                }
            })
        });
    } catch (error) {
        throw new ErrorHandler(error.message, 500);
    }
};

/*get session*/
export const getSessionService = async ({ id, user_id }) => {
    try {
        const connection = await getConnection();
        const q = "SELECT sessions.id, sessions.name, sessions.description ,sessions.status, participants.role FROM `sessions` JOIN `participants` ON sessions.id = participants.session_id WHERE sessions.id = ? AND participants.user_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(q, [id, user_id], (err, res) => {
                connection.release();
                if (err) reject(err);
                else {
                    const data = { ...res[0] };
                    resolve(data);
                }
            });
        });
    } catch (error) {
        throw new ErrorHandler(error.message, 500);
    }
};

/* join session */
export const joinSessionService = async ({ user_id, session_id }) => {
    try {
        const connection = await getConnection();
        const q = "INSERT IGNORE INTO participants (user_id, session_id) VALUES (?, ?)";
        return new Promise((resolve, reject) => {
            connection.query(q, [user_id, session_id], (err, res) => {
                connection.release();
                if (err) reject(err);
                else {
                    resolve(res);
                }
            })
        });
    } catch (error) {
        throw new ErrorHandler(error.message, 500);
    }
};

/* get participants */
export const getParticipantsService = async ({ session_id }) => {
    try {
        const connection = await getConnection();
        const q = "SELECT users.id as id, users.name as name, participants.role as role, sessions.name as session_name FROM participants INNER JOIN users ON participants.user_id = users.id INNER JOIN sessions ON participants.session_id = sessions.id WHERE participants.session_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(q, [session_id], (err, data) => {
                connection.release();
                if (err) reject(err);
                else {
                    const sessions = { ...data };
                    const array = Object.values(sessions);
                    resolve(array);
                }
            });
        });
    } catch (error) {
        throw new ErrorHandler("Internal Server Error", 500);
    }
}