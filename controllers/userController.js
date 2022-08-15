export async function getUserDataFromToken(req,res){
    const token = req.headers.authorization;
    console.log(token);
    res.send("Hello World")
}