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

module.exports = router;
