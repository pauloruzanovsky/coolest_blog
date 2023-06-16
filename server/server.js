import express from 'express';
import authRouter  from './routes/authRoutes.js';
import playlistRouter from './routes/playlistRoutes.js';
import googleSetup from './auths/google-setup.js';
import githubSetup from './auths/github-setup.js';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });

const app = express();
app.use(cors( {
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());


googleSetup(app);
githubSetup(app)

app.use('/auth', authRouter);
app.use('/playlists', playlistRouter);

app.get('/getuser', (req, res) => {
    res.send(req.user);
})



const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));