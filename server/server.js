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

// view engine setup
// app.set('views', path.join(path.dirname(new URL(import.meta.url).pathname), 'views'));
// app.set('view engine', 'ejs');

// app.use('/auth', authRouter);
// app.use('/hashtags', hashtagRouter);

// app.get('/', (req, res) => res.send('Server running'));
app.get('/hashtags', (req, res) => {
    const hashtags = [{ name: 'hashtag1' }, { name: 'hashtag2' }];
    res.json(hashtags);
    // res.send('hi')
  });

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));