const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const requireLogin = require('../middlewares/requireLogin');

//creating a post
router.post('/createpost',requireLogin,(req,res)=>{
    const {title , body , pic } = req.body;
    if(!title || !body ||!pic){
        return res.status(422).json({error: "please enter all the fields"});
    }
    
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        photo : pic,
        postedBy : req.user
    })
    post.save().then(result=>{
        res.json({post:result});
    })
    .catch(err=>{
        console.log(err);
    })
})

//getting all posts
router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate('postedBy',"_id name") //getting only id and name
    .then(posts=>{
        res.json({posts});
    })
    .catch(err=>{
        console.log(err);
    })
})

//logged in users posts
router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(myPost=>{
        res.json({myPost})
    })
    .catch(err=>{
        console.log(err);
    })
})

//like of a post
router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err});
        }
        else{
            res.json(result);;
        }
    })
})

//unlike a post
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err});
        }
        else{
            res.json(result);;
        }
    })
})

//comment on a post
router.put('/comment',requireLogin,(req,res)=>{

    const comment = {
        text :req.body.text,
        postedBy : req.user._id
    }

    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err});
        }
        else{
            res.json(result);;
        }
    })
})


module.exports = router;