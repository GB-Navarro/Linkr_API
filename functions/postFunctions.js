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

const postFunctions = {
    validateToken
}

export default postFunctions;