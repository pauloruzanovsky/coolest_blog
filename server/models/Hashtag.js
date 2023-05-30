import mongoose from 'mongoose';

const hashtagSchema = new mongoose.Schema({
    name: String,
    posts: []

})

const Hashtag = mongoose.model('Hashtag', hashtagSchema, 'hashtags');

export default Hashtag