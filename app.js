import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { errorHandler } from "./middlewares/error_handler.js";
import sessionsRouter from './routes/sessions.js';
import storiesRouter from './routes/stories.js';
import usersRouter from './routes/users.js';

const app = express();
config();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// routes
app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/stories', storiesRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`);
});

app.use(errorHandler);