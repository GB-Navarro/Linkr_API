import Joi from "joi";

export const postSchema = Joi.object({
    link: Joi.string().required(),
    text: Joi.string().min(0).required()
})

export const likeSchema = Joi.object({
    postId: Joi.number().required(),
    userId: Joi.number().required()
})