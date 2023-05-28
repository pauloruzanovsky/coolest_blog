import mongoose from 'mongoose';

const hashtagSchema = new mongoose.Schema({
    name: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]

})

const Hashtag = mongoose.model('Hashtag', hashtagSchema);

export default Hashtag