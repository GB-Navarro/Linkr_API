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

export async function likesManager(req,res){
    const { postId, userId } = req.body;
    const token = req.headers.authorization;
    const isTokenValid = await postFunctions.validateToken(token);
    if(isTokenValid){
        const filteredToken = postFunctions.filterToken(token);
        const userIsTokenOwner = await postFunctions.checkTokenOwnership(filteredToken, userId);
        if(userIsTokenOwner){
            const postExists = await postFunctions.checkPostExistence(postId);
            if(postExists){
                const postAlreadyLikedByUser = await postFunctions.checkUserLikeExistence(postId, userId);
                if(!(postAlreadyLikedByUser)){
                    const likeWasAdded = await postFunctions.addLike(postId, userId);
                    if(likeWasAdded){
                        res.sendStatus(201);
                    }else{
                        res.sendStatus(500);
                    }
                }else{
                    const likeWasRemoved = await postFunctions.removeLike(postId, userId);
                    if(likeWasRemoved){
                        res.sendStatus(200);
                    }else{
                        res.sendStatus(500);
                    }
                }
            }else{
                res.sendStatus(404);
            }
        }else{
            res.sendStatus(401);
        }
    }else{
        res.sendStatus(401);
    }
    //TESTAR OS CASOS UNDEFINED
    //verifica a existencia do postId, userId (schema) no body e os valida - Ok
    //verifica a existencia do token - Ok
    //valida o token - Ok
    //verifica se o token pertence ao userId em questão - Ok
    //verifica se o post em questão existe - Ok
    //verificar se essa curtida já não existe - Ok
    //caso a curtida já exista, retornar devo remove-lá - Ok
    //caso a curtida não exista, adiciona-lá - Ok
    //deve enviar o body pro banco de dados - Ok
    //mudar o nome de add like pra alguma coisa que adiciona ou remove o like
}