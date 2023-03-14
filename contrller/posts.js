import Post from "./models/Post.js";
import User from "./models/User.js";



export const createPost=async(req,resp)=>{
    try {
    

        const {userId,description,picturePath}=req.body;

        const user=await User.findById(userId);

        const newPost= new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes:{},
            comments:[],

        });

        await newPost.save();
        const post=await Post.find();
        resp.status(200).json(post);


        
    } catch (error) {
        resp.status(409).json({error:error.message});
    }
}


//Read

export const getFeedPosts=async(req,resp)=>{
    try {
        const post=await Post.find();
        resp.status(200).json(post);
    } catch (error) {
        resp.status(404).json({error:error.message});
    }
}

export const getUserPosts=async(req,resp)=>{

 try {
    console.log("getuserPost:",req.params)
    const {userId}=req.params;
    const posts=await Post.find({userId});
    resp.status(200).json(posts);
 } catch (error) {
    resp.status(404).json({error:error.message});
 }

}

export const likesPost=async(req,resp)=>{
    try {
        const {id}=req.params;
        const {userId}=req.body;

        const post=await Post.findById(id);
        const isLike=post.likes(userId);

        if(isLike){
            post.likes.delete(userId)
        }
        else{
            post.likes.set(userId,true)
        }
        const updatePost=await Post.findByIdAndUpdate(id,{likes:post.likes,new:true})
        resp.status(200).json(updatePost)
    } catch (error) {
        resp.status(404).json({error:error.message});
    }
}