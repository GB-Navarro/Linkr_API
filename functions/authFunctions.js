function validateTokenFormat(token){
    let isTokenValid;
    if(token != undefined){
        const tokenType = checkTokenType(token);
        if(tokenType === 'Bearer'){
            isTokenValid = true;
            const filteredToken = filterToken(token);
            return filteredToken;
        }else{
            isTokenValid = false;
            return isTokenValid;
        }
    }else{
        isTokenValid = false;
        return isTokenValid;
    }
   
}

function checkTokenType(token){
    const tokenType = token.split(" ")[0].toString();
    if(tokenType === 'Bearer'){
        return 'Bearer';
    }else{
        return 'Other';
    }
}

function filterToken(token){
    const filteredToken = token.split(" ")[1].toString();
    return filteredToken;
}



const authFunctions = {
    validateTokenFormat
}

export default authFunctions;