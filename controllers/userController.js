import userFunctions from "../functions/userFunctions.js";
import postFunctions from "../functions/postFunctions.js";
export async function getUserDataFromToken(req,res){
    const token = req.headers.authorization;
    const isTokenValid = await postFunctions.validateToken(token);
    if(isTokenValid){
        const filteredToken = postFunctions.filterToken(token);
        const userData = await userFunctions.getUserDataFromToken(filteredToken);
        res.send(userData);
    }else{
        res.sendStatus(401);
    } 
}