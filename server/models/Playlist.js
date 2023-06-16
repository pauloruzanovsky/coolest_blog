import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
    name: String,
    songs: []

})

const Playlist = mongoose.model('Playlist', playlistSchema, 'playlists');

export default Playlist