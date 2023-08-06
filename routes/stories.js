import express from 'express';
import { createStory, getStories, getStoryPoints, resetStoryPoints, revealStoryPoints, voteStory } from '../controllers/story_controller.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.route('/')
    .get(isAuthenticated, getStories)
    .post(isAuthenticated, createStory);

router.route('/:id')
    .get(isAuthenticated, getStoryPoints)
    .post(isAuthenticated, voteStory)
    .put(isAuthenticated, resetStoryPoints)
    .patch(isAuthenticated, revealStoryPoints);

export default router;