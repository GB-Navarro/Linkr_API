import { likeSchema } from "./../schemas/schemas.js"

export default async function validateLikeFormat(req, res, next){
    const validation = likeSchema.validate(req.body);

    if(validation.error != undefined){
        return res.sendStatus(422);
    }

    next();
}