import express from 'express';
import Hashtag from '../models/Hashtag.js'
import { db } from '../config/database.js';
import { ObjectId } from 'mongodb'
import hashtagControllers from '../controllers/hashtagControllers.js'

const hashtagRouter = express.Router();
const collection = db.collection('hashtags')


// List of hashtags GET
hashtagRouter.get('/', hashtagControllers.listHashtags)

// Details of one hashtag GET
hashtagRouter.get('/hashtag/:id', hashtagControllers.getHashtag)

// Create a hashtag POST
hashtagRouter.post('/create', hashtagControllers.createHashtag)

// Update a hashtag POST
hashtagRouter.post('/hashtag/:id/update', hashtagControllers.updateHashtag )

// Delete a hashtag POST
hashtagRouter.post('/hashtag/:id/delete', (req, res) => {
    try {
        const filter = { _id: new ObjectId(req.params.id) }
        collection.deleteOne(filter)
        res.send(`Hashtag ${req.params.id} deleted`)
    } catch (error) {
        console.log(error)
    }
   

})


export default hashtagRouter