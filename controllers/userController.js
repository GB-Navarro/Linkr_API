import userFunctions from "../functions/userFunctions.js";
import postFunctions from "../functions/postFunctions.js";
export async function getUserDataFromToken(req,res){
    const unfilteredToken = req.headers.authorization;
    const isTokenValid = await postFunctions.validateToken(unfilteredToken);
    if(isTokenValid){
        const filteredToken = postFunctions.filterToken(unfilteredToken);
        const userData = await userFunctions.getUserDataFromToken(filteredToken);
        res.send(userData);
    }else{
        res.sendStatus(401);
    } 
}