import postsRepository from "../repositories/postsRepository.js";

export async function publishPost(req,res){
    const postData = req.body
    try{
        postsRepository.createPost(postData);
    }catch (error){
        console.log(error);
    }

    res.send("Hello World!");
}