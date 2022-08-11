import postsRepository from "../repositories/postsRepository.js"

async function validateToken(token){
    let isTokenValid;
    const isBearerToken = verifyTokenType(token);
    if(isBearerToken){
        const filteredToken = await filterToken(token);
        try{
            const result = await postsRepository.searchToken(filteredToken);
            console.log(result.rows.length);
            if(result.rows.length != 0){
                isTokenValid = true;
                return isTokenValid;
            }else{
                isTokenValid = false;
                return isTokenValid;
            }
        }catch(error){
            console.log(error);
            isTokenValid = false;
            return isTokenValid;
        }
    }else{
        isTokenValid = false;
        return isTokenValid;
    }
}

function verifyTokenType(token){
    const tokenType = token.split(" ")[0].toString();
    if(tokenType === 'Bearer'){
        return true;
    }else{
        return false;
    }
}

function filterToken(token){
    const filteredToken = token.split(" ")[1].toString();
    return filteredToken;
}

async function createPost(link, text, token){
    let isPostCreated;
    try{
        const userId = await getUserIdByToken(token);
        const promisse = await postsRepository.createPost(userId, link, text);
        if(promisse.rowCount === 1){
            isPostCreated = true;
            return isPostCreated;
        }else{
            isPostCreated = false;
            return isPostCreated;
        }
    }catch(error){
        console.log(error);
        isPostCreated = false;
        return isPostCreated;
    }

}

async function getUserIdByToken(token){
    try{
        const result = await postsRepository.getUserByToken(token)
        const userData = result.rows[0];
        const { userId } = userData;
        return userId;
    }catch(error){
        console.log(error);
    }
}

const postFunctions = {
    validateToken,
    filterToken,
    createPost
}

export default postFunctions;