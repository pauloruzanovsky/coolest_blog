import Playlist from '../models/Playlist.js';
import asyncHandler from 'express-async-handler';
import { db } from '../config/database.js';
import { ObjectId } from 'mongodb';
import 'dotenv/config'


const collection = db.collection('playlists');

export const listPlaylists = asyncHandler(async (req, res) => {
  const playlists = await collection.find().sort({ name: 1 }).toArray();
    res.json(playlists);

});

export const getPlaylist = asyncHandler(async (req, res) => {
  const playlist = await collection.find({ _id: new ObjectId(req.params.id) } ).toArray()

  res.send(playlist[0])

});

export const createPlaylist = asyncHandler(async (req, res) => {
  const playlist = new Playlist(
      {
          name: req.body.name.toLowerCase(),
          songs: []
      }
  )
  const checkIfExist = await collection.findOne({name: playlist.name.toLowerCase()})
  if (checkIfExist) {
      res.send('Playlist already exists')
  } else {
      try {             
          const result = await collection.insertOne(playlist)
          console.log('result', result)
          res.send(`Playlist ${result.insertedId} created`)
      } catch (error) {
          console.log(error)
      }
  }

  
})

export const updatePlaylist = asyncHandler(async (req, res) => {
  try {
      const filter = { _id: new ObjectId(req.params.id) }
      const playlistUpdate = {
          $set: {
              name: req.body.name.toLowerCase()
          }
      }
  
      const result = await collection.updateOne(filter, playlistUpdate)
      console.log(result)
      console.log(`Playlist ${req.params.id} updated`)
  } catch (error) {
      console.log(error)
  }
})

export const deletePlaylist = asyncHandler(async (req, res) => {
    try {
        const filter = { _id: new ObjectId(req.params.id) }
        collection.deleteOne(filter)
        console.log(`Playlist ${req.params.id} deleted`)
    } catch (error) {
        console.log(error)
    }
   

})


export default {
  listPlaylists,
  getPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist
};
