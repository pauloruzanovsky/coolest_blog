import Hashtag from '../models/Hashtag.js';
import asyncHandler from 'express-async-handler';
import { db } from '../config/database.js';

const collection = db.collection('hashtags');

export const listHashtags = asyncHandler(async (req, res) => {
  const hashtags = await collection.find().sort({ name: 1 });
    res.json({"message":'hi'});

});

export default {
  listHashtags,
};
