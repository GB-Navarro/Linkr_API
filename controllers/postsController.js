import postsRepository from "../repositories/postsRepository.js";
import postFunctions from "../functions/postFunctions.js";

export async function publishPost(req,res){
    const post = req.body
    const token = req.headers.authorization;
    const isTokenValid = await postFunctions.validateToken(token);
}