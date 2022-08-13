import postFunctions from "../functions/postFunctions.js";
import urlMetadata from "url-metadata";
import postsRepository from "../repositories/postsRepository.js";

export async function publishPost(req,res){
    const { link, text } = req.body
    const token = req.headers.authorization;
    const isTokenValid = await postFunctions.validateToken(token);
    if(isTokenValid){
        const filteredToken = postFunctions.filterToken(token);
        const isPostCreated = postFunctions.createPost(link, text, filteredToken);
        if(isPostCreated){
            res.sendStatus(201);
        }else{
            res.sendStatus(500);
        }
    }else{
        res.sendStatus(401)
    }
}

export async function addLike(req,res){
    const { postId, userId } = req.body;
    const token = req.headers.authorization;
    const isLikeValid = await postFunctions.validateLike(token, postId, userId);
    if(isLikeValid){
        const postAlreadyLikedByUser = await postFunctions.checkUserLikeExistence(postId, userId);
        if(!(postAlreadyLikedByUser)){
            const likeWasAdded = await postFunctions.addLike(postId, userId);
            if(likeWasAdded){
                res.sendStatus(201);
            }else{
                res.sendStatus(500);
            }
        }else{
            console.log("a");
            res.sendStatus(400);
        }
    }else{
        console.log("b");
        res.sendStatus(400);
    }
}

export async function removeLike(req,res){
    const { postId, userId } = req.body;
    const token = req.headers.authorization;
    const isLikeValid = await postFunctions.validateLike(token, postId, userId);
    if(isLikeValid){
        const postAlreadyLikedByUser = await postFunctions.checkUserLikeExistence(postId, userId);
        if(postAlreadyLikedByUser){
            const likeWasRemoved = await postFunctions.removeLike(postId, userId);
            if(likeWasRemoved){
                res.sendStatus(200);
            }else{
                res.sendStatus(500);
            }
        }else{
            res.sendStatus(400);
        }
    }else{
        res.sendStatus(400);
    }
}

export async function getPosts(req,res){
    const response = await postsRepository.getPosts();
    const unformattedPosts = response.rows;
    const formatedPosts = await postFunctions.formatPosts(unformattedPosts);
    res.send(formatedPosts);
}