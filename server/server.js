import express from 'express';
import authRouter  from './routes/authRoutes.js';
import playlistRouter from './routes/playlistRoutes.js';
import googleSetup from './auths/google-setup.js';
import githubSetup from './auths/github-setup.js';
import cors from 'cors'
import dotenv from 'dotenv';
import spotifyApi from './auths/spotifyAuth.js';
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

spotifyApi.clientCredentialsGrant()
.then((data) => {
    spotifyApi.setAccessToken(data.body['access_token']);
    const songName = 'Despacito'
    spotifyApi.searchTracks(songName, {limit: 1}).then((data) => {
    const song = data.body.tracks.items[0];
    console.log('Song:', song.name)
    console.log('Artist:', song.artists[0].name);
    console.log('Album:', song.album.name);
}).catch((err) => {
    console.log(err);
})
})



  
const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));