import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route('/')
    .post(isAuthenticated);

router.route('/:id')
    .get(isAuthenticated)
    .put(isAuthenticated);

export default router;