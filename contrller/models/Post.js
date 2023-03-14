import mongoose from "mongoose";
mongoose.set('strictQuery', false);


const PostScheme=new mongoose.Schema({

    userId:{
        type:String,
        required:true
    },
   firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    location:String,
    description:String,
    picturePath:String,
    userPicturePath:String,
    likes:{
        type:Map,
        of:Boolean,
    },
    comments:{
        type:Array,
        required:true
    },


},    {timestamps:true}
)


const Post=mongoose.model("Post",PostScheme);

export default Post;