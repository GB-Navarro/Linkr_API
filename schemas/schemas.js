import Joi from "joi";

export const postSchema = Joi.object({
    link: Joi.string().required(),
    text: Joi.string().min(0).required()
})