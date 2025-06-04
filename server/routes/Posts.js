const express = require('express');
const router = express.Router();
const { Posts, Likes } =require('../models'); // Assuming you have a model defined in models/index.js
const { validateToken } = require('../middlewares/AuthMiddleware'); 

router.get('/', async (req, res) => {
    const listofPosts = await Posts.findAll({include: [Likes]});
    // const likedPosts = await Likes.findAll({
    //     where: { UserId: req.user.id },
    //     attributes: ['PostId']
    // }); 
    // res.json({listofPosts: listofPosts, likedPosts: likedPosts});
    
    res.json({listofPosts: listofPosts});
}); 

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
})

router.get('/byUserId/:id', async (req, res) => {
    const id = req.params.id;
    const posts = await Posts.findAll({
        where: { UserId: id },
        include: [Likes] // Include likes if needed
    });
    res.json(posts);
});


router.post('/',validateToken, async(req, res) => {
    try{
        const post = req.body;
        post.username = req.user.username;
        post.UserId = req.user.id;
        await Posts.create(post);
        res.json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

router.put('/title', validateToken, async (req, res) => {
    const {newTitle, id} = req.body;
    await Posts.update({title: newTitle}, {
        where: {
            id: id,
        }
    });
    res.json(newTitle)
})

router.put('/postText', validateToken, async (req, res) => {
    const {newText, id} = req.body;
    await Posts.update({postText: newText}, {
        where: {
            id: id,
        }
    });
    res.json(newText)
})

router.delete('/:postId', validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
        where: {
            id: postId,
            username: req.user.username // Ensure the user can only delete their own posts
        }
    });
})
module.exports = router;