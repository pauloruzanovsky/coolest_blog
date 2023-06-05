import express from 'express';
import authRouter  from './routes/authRoutes.js';
import hashtagRouter from './routes/hashtagRoutes.js';
import googleSetup from './auths/google-setup.js';
import githubSetup from './auths/github-setup.js';
import cors from 'cors'
import dotenv from 'dotenv';
import path from 'path'
dotenv.config({ path: './config/config.env' });

const app = express();

googleSetup(app);
githubSetup(app)

app.use(cors())
app.use(express.json());

// app.use('/auth', authRouter);
app.use('/hashtags', hashtagRouter);

// app.get('/', (req, res) => res.send('Server running'));



const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));