import { createStoryService, getStoriesService, getStoryPointsService, resetStoryPointsService, revealStoryPointsService, voteStoryService } from "../services/story_services.js";

export const getStories = async (req, res, next) => {
    const { session_id } = req.body;
    try {
        const stories = await getStoriesService({ session_id });
        res.status(200).json(
            {
                success: true,
                data: stories
            }
        );
    } catch (error) {
        next(error);
    }
};

export const createStory = async (req, res, next) => {
    const { name, description, session_id } = req.body;
    try {
        await createStoryService({ name, description, session_id });
        res.status(201).json({
            success: true,
            message: 'Story created successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const revealStoryPoints = async (req, res, next) => {
    const { id } = req.params;
    try {
        await revealStoryPointsService({ id });
        res.status(200).json({
            success: true,
            message: 'Story points revealed successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const voteStory = async (req, res, next) => {
    const { user_id, points } = req.body;
    const { story_id } = req.params;
    try {
        await voteStoryService({ story_id, user_id, points });
        res.status(200).json({
            success: true,
            message: 'voted successfully'
        })
    } catch (error) {
        next(error);
    }
};

export const resetStoryPoints = async (req, res, next) => {
    const { id } = req.params;
    try {
        await resetStoryPointsService({ id });
        res.status(200).json({
            success: true,
            message: 'Story Points Reset Successfully'
        })
    } catch (error) {
        next(error);
    }
};

export const getStoryPoints = async (req, res, next) => {
    const { id } = req.body;
    try {
        const points = await getStoryPointsService({ id });
        res.status(200).json({
            success: true,
            data: points
        });

    } catch (error) {
        next(error);
    }
};