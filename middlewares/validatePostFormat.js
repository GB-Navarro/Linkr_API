import { postSchema } from "../schemas/schemas.js"

export default async function validatePostFormat(req, res, next){
    const validation = postSchema.validate(req.body);

    if(validation.error != undefined){
        return res.sendStatus(422);
    }

    next();
}