import postFunctions from "../functions/postFunctions.js";

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
    res.send("Hello World!");
}