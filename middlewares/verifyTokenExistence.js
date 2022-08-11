export default async function verifyTokenExistence(req, res, next){

    if(req.headers.authorization === undefined){
        return res.sendStatus(500);
    }

    next();
}