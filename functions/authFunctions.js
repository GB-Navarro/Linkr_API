async function filterToken(token,res){
    if(token != undefined){
        const tokenType = token.split(" ")[0].toString();
        const filteredToken = token.split(" ")[1].toString();
        return filteredToken;
    }else{
        res.sendStatus(422);
    }
    
}

const authFunctions = {
    filterToken
}

export default authFunctions;