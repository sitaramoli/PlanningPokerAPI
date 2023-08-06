import express from "express";
import { closeSession, createSession, getParticipants, getSession, getSessions } from "../controllers/session_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route('/')
    .get(isAuthenticated, getSessions)
    .post(isAuthenticated, createSession);

router.route('/:id')
    .get(isAuthenticated, getSession)
    .patch(isAuthenticated, closeSession);

router.route('/:id/participants')
    .get(isAuthenticated, getParticipants);

export default router;