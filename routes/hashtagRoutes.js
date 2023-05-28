import express from 'express';
import Hashtag from '../models/Hashtag.js'
import { db } from '../config/database.js';
import { ObjectId } from 'mongodb'

const hashtagRouter = express.Router();
const collection = db.collection('hashtags')


// Get all hashtags
hashtagRouter.get('/', async (req, res) => {
    const hashtags = await collection.find().toArray();
    hashtags.forEach((hashtag) => {
        res.send(`list of hashtags: ${hashtag.name} `)
    })
    
})

// Get one hashtag
hashtagRouter.get('/hashtag/:id', async (req, res) => {
    const id = new ObjectId(req.params.id)
    const hashtag = await collection.find({ _id: id } ).toArray()
    res.send(hashtag[0].name)    

})

// Create a hashtag GET
hashtagRouter.get('/create', (req, res) => {
    res.send('Create a hashtag GET');
})

// Create a hashtag POST
hashtagRouter.post('/create', async (req, res) => {
    const mockHashtag = new Hashtag(
        {
            name: 'Second hashtag'.toLowerCase(),
            posts: []
        }
    )
    const checkIfExist = await collection.findOne({name: 'Second hashtag'.toLowerCase()})
    if (checkIfExist) {
        res.send('Hashtag already exists')
    } else {
        try {             
            const result = await collection.insertOne(mockHashtag)
            console.log('result', result)
            res.send(`Hashtag ${result.insertedId} created`)
        } catch (error) {
            console.log(error)
        }
    }
    })


// Update a hashtag POST
hashtagRouter.post('/hashtag/:id/update', async (req, res) => {
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

// Delete a hashtag
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