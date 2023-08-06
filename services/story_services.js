import { getConnection } from "../config/database.js";
import ErrorHandler from "../middlewares/error_handler.js";

// all stories of a session 
export const getStoriesService = async ({ session_id }) => {
    try {
        const connection = await getConnection();
        const q = "SELECT stories.id, stories.name, stories.description, stories.status, ROUND(AVG(story_points.points),1) AS average_points, stories.reveal FROM stories LEFT JOIN story_points ON stories.id = story_points.story_id WHERE stories.session_id = ? GROUP BY stories.id"
        return new Promise((resolve, reject) => {
            connection.query(q, [session_id], (err, res) => {
                connection.release();
                if (err) reject(err);
                else {
                    const data = Object.values({ ...res });
                    resolve(data);
                }
            });
        });
    } catch (error) {
        throw new ErrorHandler(error.message, 500);
    }
};

// create a story
export const createStoryService = async ({ name, description, session_id }) => {
    try {
        const connection = await getConnection();
        const q = "INSERT INTO `stories`(`name`,`description`,`session_id`) VALUES(?,?,?)";
        return new Promise((resolve, reject) => {
            connection.query(q, [name, description, session_id], (err, res) => {
                connection.release();
                if (err) reject(err);
                else {
                    resolve(res);
                }
            });
        });
    } catch (error) {
        throw new ErrorHandler(error.message, 500);
    }
};

export const revealStoryPointsService = async ({ id }) => {
    // todo: implement story points reveal
};

export const getStoryPointsService = async ({ id }) => {
    try {
        const connection = await getConnection();
        const q = "SELECT users.id, users.name, story_points.points FROM story_points INNER JOIN users ON users.id = story_points.user_id WHERE story_points.story_id = ? ORDER BY users.id";
        return new Promise((resolve, reject) => {
            connection.query(q, [id], (err, result) => {
                connection.release();
                if (err) reject(err);
                else {
                    const data = Object.values({ ...result });
                    resolve(data);
                }
            });
        });
    } catch (error) {
        throw new ErrorHandler(error.message, 500);
    }
};

export const voteStoryService = async ({ story_id, user_id, points }) => {
    try {
        const connection = await getConnection();
        const q = "INSERT INTO `story_points`(`story_id`, `user_id`, `points`) VALUES (?,?,?) ON DUPLICATE KEY UPDATE `points` = ?";
        return new Promise((resolve, reject) => {
            connection.query(q, [story_id, user_id, points, points], (err, result) => {
                connection.release();
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });
        });
    } catch (error) {
        throw new ErrorHandler(error.message, 500);
    }
};

export const resetStoryPointsService = async ({ id }) => {
    try {
        const connection = await getConnection();
        const q = "UPDATE `story_points` INNER JOIN `stories` ON story_points.story_id = stories.id SET story_points.points = 0, stories.reveal = FALSE WHERE story_points.story_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(q, [id], (err, result) => {
                connection.release();
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });
        });
    } catch (error) {
        throw new ErrorHandler(error.message, 500);
    }
};
