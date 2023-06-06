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
hashtagRouter.get('/:id', hashtagControllers.getHashtag)

// Create a hashtag POST
hashtagRouter.post('/create', hashtagControllers.createHashtag)

// Update a hashtag PUT
hashtagRouter.put('/:id', hashtagControllers.updateHashtag )

// Delete a hashtag POST
hashtagRouter.delete('/:id', hashtagControllers.deleteHashtag)


export default hashtagRouter