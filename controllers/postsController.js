import postFunctions from "../functions/postFunctions.js";
import postsRepository from "../repositories/postsRepository.js";

export async function publishPost(req, res) {
    const { link, text } = req.body
    const token = req.headers.authorization;
    const isTokenValid = await postFunctions.validateToken(token);
    if (isTokenValid) {
        const filteredToken = postFunctions.filterToken(token);
        const isPostCreated = postFunctions.createPost(link, text, filteredToken);
        if (isPostCreated) {
            res.sendStatus(201);
        } else {
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(401)
    }
}

export async function addLike(req, res) {
    const { postId, userId } = req.body;
    const token = req.headers.authorization;
    const isLikeValid = await postFunctions.validateLike(token, postId, userId);
    if (isLikeValid) {
        const postAlreadyLikedByUser = await postFunctions.checkUserLikeExistence(postId, userId);
        if (!(postAlreadyLikedByUser)) {
            const likeWasAdded = await postFunctions.addLike(postId, userId);
            if (likeWasAdded) {
                res.sendStatus(201);
            } else {
                res.sendStatus(500);
            }
        } else {
            console.log("a");
            res.sendStatus(400);
        }
    } else {
        console.log("b");
        res.sendStatus(400);
    }
}

export async function removeLike(req, res) {
    const { postId, userId } = req.body;
    const token = req.headers.authorization;
    const isLikeValid = await postFunctions.validateLike(token, postId, userId);
    if (isLikeValid) {
        const postAlreadyLikedByUser = await postFunctions.checkUserLikeExistence(postId, userId);
        if (postAlreadyLikedByUser) {
            const likeWasRemoved = await postFunctions.removeLike(postId, userId);
            if (likeWasRemoved) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(400);
    }
}

export async function editPost(req, res) {
    const id = req.params.id;
    const { text } = req.body;
    const user = res.locals.validToken;

    try {
        const { rows: verifyExistingPost } = await postsRepository.verifyExistingPost(id);
        if (verifyExistingPost.length === 0) {
            res.status(404).send("Post not found.");
            return;
        }

        if (user.userId !== verifyExistingPost[0].userId) {
            res.status(401).send("This user is not the author of this post.");
            return;
        }

        await postsRepository.updatePost(text, id)
        res.status(201).send("Post edited successfully.")
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export async function getPostsByUserId(req, res) {
    const { userId } = req.params;

    try {
        const { rows: verifyExistingUser } = await postsRepository.verifyExistingUser(userId);
        if(verifyExistingUser.length === 0) {
            res.status(404).send("User not found.");
            return;
        }

        const { rows: getUserPosts }  = await postsRepository.getPostsByUserId(userId);

        const formatedResponse = {
            username: verifyExistingUser[0].username,
            userPicture: verifyExistingUser[0].pictureUrl,
            posts: getUserPosts
        }

        res.status(200).send(formatedResponse);
    }
    catch (error) {
        res.status(500).send(error);
    }
}