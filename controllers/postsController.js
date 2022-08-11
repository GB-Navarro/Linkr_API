import postsRepository from "../repositories/postsRepository.js";
import authFunctions from "../functions/authFunctions.js";

export async function publishPost(req,res){
    const postData = req.body
    const token = req.headers.authorization;
    console.log("token", token);
    const isTokenFormatValid = authFunctions.validateTokenFormat(token);
    console.log("isTokenFormatValid ", isTokenFormatValid)
    /*if(token != undefined){
        const filteredToken = authFunctions.filterToken(token);
        console.log("filteredToken ",filteredToken);
        try{
            const result = await postsRepository.searchToken(filteredToken);
            console.log("result ", result);
        }catch (error){
            console.log("error ",error);
        }
    }else{
        res.sendStatus(422);
    }*/
}