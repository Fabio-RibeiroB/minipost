const express = require('express')
const router = express.Router()

// import Post model
const Post = require('../models/Post')// double dots to go one level up

// POST (Create data)
router.post('/', async(req, res)=>{
    //console.log(req.body)

    // create json object for datbase using Post model according to what the user gave in the body
    // body is the data in json format inputted. Make sure the new Post has the same fields as body input (req.body.field)
    const postData = new Post({
        user:req.body.user,
        title:req.body.title,
        text:req.body.text,
        hashtag:req.body.hashtag,
        location:req.body.location,
        url:req.body.url
    })

    // try to insert data...
    try{
        const postToSave = await postData.save() // save
        res.send(postToSave) // send back to user
    }catch(err){
        res.send({message:err})
    }
})

// GET (Read all)
router.get('/', async(req, res)=>{
    try{
        const getPosts = await Post.find() // Post is the name of the model, and we want to find the posts
        res.send(getPosts) // send back to user
    }catch(err){
        
    }
})

// GET (Read by iD - one specific post)
router.get('/:postId', async(req, res)=>{
    try{
        const getPostById = await Post.findById(req.params.postId) // Post is the name of the model, and we want to find the posts
        res.send(getPostById) // send back to user
    }catch(err){

    }
})

// PATCH (Update)
router.patch('/:postId', async(req, res) =>{
    try{
        // try update by Id using updateOne method
        const updatePostById = await Post.updateOne(// updateOne from mongoose
            {_id:req.params.postId}, // fist match id in database with id of user
            {$set:{ // set everything to the new data
                user:req.body.user,
                title:req.body.title,
                text:req.body.text,
                hashtag:req.body.hashtag,
                location:req.body.location,
                url:req.body.url
                }
            })
        res.send(updatePostById) 
    }catch(err){
        res.send({message:err})
    }
})

// DELETE
router.delete('/:postId', async(req,res)=>{
    try{
        const deletePostById = await Post.deleteOne({_id:req.params.postId})
        res.send(deletePostById)
    }catch(err){
        res.send({message:err})
    }
})

// Export router
module.exports = router