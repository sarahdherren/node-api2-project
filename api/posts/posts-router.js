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
        const { title, contents } = req.body
        if(!title || !contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
        const createPost = await Posts.insert({ title, contents })
        const newPost = await Posts.findById(createPost.id)
        res.status(201).json(newPost)
        }
    } catch(error) {
        res.status(500).json({
            message: "There was an error while saving the post to the database"
        })
    }
})
router.put('/:id', (req, res) => {
    const { title, contents } = req.body;
    if ( !title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Posts.findById(req.params.id)
            .then(post => {
                if (!post) {
                    res.status(404).json({
                        message: "The post with the specified ID does not exist"
                    })
                } else {
                    return Posts.update(req.params.id, req.body)
                }
            })
            .then(data => {
                if (data) {
                    return Posts.findById(req.params.id)
                }
            })
            .then(post => {
                     res.status(200).json(post)
                 })                
    .catch(() => {
        res.status(500).json({
            message: "The post information could not be modified"
        })
    })
}})
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const post = await Posts.findById(id)
        if(!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            await Posts.remove(id)
            res.status(200).json(post)
        }
    } catch(error) {
        res.status(500).json({
            message: "The post could not be removed"
        })
    }
})
router.get('/:id/comments', async (req, res) => {
    try {
        const { id } = req.params
        const post = await Posts.findById(id)
        if(!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            const comments = await Posts.findPostComments(id)
            res.status(200).json(comments)
        }

    } catch(error) {
        res.status(500).json({
            message: "The comments information could not be retrieved"
        })
    }
})


module.exports = router;
