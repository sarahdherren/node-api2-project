const express = require('express');
const Posts = require('./posts-model');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({
            message: "The posts information could not be retrieved"
        })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const post = await Posts.findById(id)
        if(!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(post)
        }
    } catch(error) {
        res.status(500).json({
            message: "The post information could not be retrieved"
        })
    }
})
router.post('/', async (req, res) => {
    try {
        const post = req.body
        if(!post.title || !post.contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
        const newPost = await Posts.insert(post)
        res.status(201).json(newPost)
        }
    } catch(error) {
        res.status(500).json({
            message: "There was an error while saving the post to the database"
        })
    }
})
// router.verb('/', async (req, res) => {
//     try {

//     } catch(error) {

//     }
// })
// router.verb('/', async (req, res) => {
//     try {

//     } catch(error) {

//     }
// })
// router.verb('/', async (req, res) => {
//     try {

//     } catch(error) {

//     }
// })


module.exports = router;
