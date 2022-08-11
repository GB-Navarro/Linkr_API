import { createPost } from "../repositories/postsRepository.js";

export async function publishPost(req,res){
    const postData = req.body
    try{
        createPost(postData);
    }catch (error){

    }

    res.send("Hello World!");
}