import Hashtag from '../models/Hashtag.js';
import asyncHandler from 'express-async-handler';
import { db } from '../config/database.js';
import { ObjectId } from 'mongodb';

const collection = db.collection('hashtags');

export const listHashtags = asyncHandler(async (req, res) => {
  const hashtags = await collection.find().sort({ name: 1 }).toArray();
    res.json(hashtags);

});

export const getHashtag = asyncHandler(async (req, res) => {
  const hashtag = await collection.find({ _id: new ObjectId(req.params.id) } ).toArray()
  res.send(hashtag[0])    

});

export const createHashtag = asyncHandler(async (req, res) => {
  const hashtag = new Hashtag(
      {
          name: req.body.name.toLowerCase(),
          posts: []
      }
  )
  const checkIfExist = await collection.findOne({name: hashtag.name.toLowerCase()})
  if (checkIfExist) {
      res.send('Hashtag already exists')
  } else {
      try {             
          const result = await collection.insertOne(hashtag)
          console.log('result', result)
          res.send(`Hashtag ${result.insertedId} created`)
      } catch (error) {
          console.log(error)
      }
  }
})

export const updateHashtag = asyncHandler(async (req, res) => {
  try {
      const filter = { _id: new ObjectId(req.params.id) }
      const mockUpdate = {
          $set: {
              name: 'Another hashtag'.toLowerCase()
          }
      }
  
      const result = await collection.updateOne(filter, mockUpdate)
      console.log(result)
      res.send(`Hashtag ${req.params.id} updated`)
  } catch (error) {
      console.log(error)
  }
})



export default {
  listHashtags,
  getHashtag,
  createHashtag,
  updateHashtag
};
