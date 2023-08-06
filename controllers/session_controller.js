import { getConnection } from "../config/database.js";
import { closeSessionService, createSessionService, getParticipantsService, getSessionService, getSessionsService } from "../services/session_services.js";

export const getSessions = async (req, res, next) => {
    try {
        const sessions = await getSessionsService({ user_id: req.user.id });
        return res.status(200).json({
            success: true,
            data: sessions
        });
    } catch (error) {
        next(error);
    }
};

export const createSession = async (req, res, next) => {
    const { name, description } = req.body;
    try {
        const id = await createSessionService({ name, description, user_id: req.user.id });
        return res.status(201).json({
            success: true,
            message: 'Session created successfully',
            data: { id: id }
        });
    }
    catch (error) {
        next(error);
    }
};

export const closeSession = async (req, res, next) => {
    const { id } = req.params;
    const user_id = req.user.id;
    try {
        await closeSessionService({ id, user_id });
        return res.status(200).json({
            success: true,
            message: 'Session closed successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const getSession = async (req, res, next) => {
    const { id } = req.params;
    const user_id = req.user.id;
    try {
        const session = await getSessionService({ id, user_id });
        res.status(200).json({
            success: true,
            data: session
        });

    } catch (error) {
        next(error);
    }
};

export const getParticipants = async (req, res, next) => {
    const { session_id } = req.body;
    try {
        const participants = await getParticipantsService({ session_id });
        res.status(200).send({
            success: true,
            data: participants
        });
    } catch (error) {
        next(error);
    }
};