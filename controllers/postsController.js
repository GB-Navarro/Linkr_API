import postsRepository from "../repositories/postsRepository.js";
import authFunctions from "../functions/authFunctions.js";

export async function publishPost(req,res){
    const postData = req.body
    const token = req.headers.authorization;
    const filteredToken = authFunctions.filterToken(token, res);
    console.log(filteredToken);
    try{
        postsRepository.createPost(postData);
    }catch (error){
        console.log(error);
    }

    res.send("Hello World!");
}