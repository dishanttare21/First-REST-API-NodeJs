const { response } = require('express');
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//GETS ALL POSTS
router.get('/',async (req,res) => {
    // res.send('We are posts');
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message : err});
    }
})

// router.get('/specific',(req,res) => {
//     res.send('Specific Post');
// })

//SUBMITS A POST
router.post('/',async (req,res) => {
    // console.log(req.body);
    const post = new Post({
        title : req.body.title,
        description :req.body.description
    })

    try{
        const savedPosts = await post.save()
        res.json(savedPosts);
    }catch(err){
        res.json({message: err});
    }

});

//GETS SPECIFIC POST
router.get('/:postId',async (req,res) => {
    // res.send('We are specific posts');
    try{
        console.log(req.params.postId)
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message : err});
    }
});

//DELETE A POST
router.delete('/:postId',async (req,res) => {
try{
    const removedPost = await Post.remove({_id : req.params.postId});
    res.json(removedPost);
}catch(err){
    res.json({messgae : err});
}
});

//UPDATE A POST
router.patch('/:postId',async (req,res) => {
    try{
        const updatedPost = await Post.updateOne(
            { _id : req.params.postId }, 
            { $set : {title : req.body.title } }
        );
        res.json(updatedPost);
    }catch(err){
        res.json({messgae : err});
    }
});

module.exports = router;