import postsRepository from "../repositories/postsRepository.js"
import urlMetadata from "url-metadata";

async function validateToken(token){
    let isTokenValid;
    const isBearerToken = verifyTokenType(token);
    if(isBearerToken){
        const filteredToken = await filterToken(token);
        try{
            const result = await postsRepository.searchToken(filteredToken);
            if(result.rows.length != 0){
                isTokenValid = true;
                return isTokenValid;
            }else{
                isTokenValid = false;
                return isTokenValid;
            }
        }catch(error){
            console.log(error);
            isTokenValid = false;
            return isTokenValid;
        }
    }else{
        isTokenValid = false;
        return isTokenValid;
    }
}

function verifyTokenType(token){
    const tokenType = token.split(" ")[0].toString();
    if(tokenType === 'Bearer'){
        return true;
    }else{
        return false;
    }
}

function filterToken(token){
    const filteredToken = token.split(" ")[1].toString();
    return filteredToken;
}

async function createPost(link, text, token){
    let isPostCreated;
    try{
        const userId = await getUserIdByToken(token);
        const promisse = await postsRepository.createPost(userId, link, text);
        if(promisse.rowCount === 1){
            isPostCreated = true;
            return isPostCreated;
        }else{
            isPostCreated = false;
            return isPostCreated;
        }
    }catch(error){
        console.log(error);
        isPostCreated = false;
        return isPostCreated;
    }

}

async function getUserIdByToken(token){
    try{
        const result = await postsRepository.getUserByToken(token)
        const userData = result.rows[0];
        const { userId } = userData;
        return userId;
    }catch(error){
        console.log(error);
    }
}

async function checkTokenOwnership(token, userId){
    let userIsTokenOwner;
    try{
        const result = await postsRepository.searchToken(token);
        if(result.rows.length != 0){
            const { userId:tokenOwnerId } = result.rows[0];
            if(userId === tokenOwnerId){
                userIsTokenOwner = true;
                return userIsTokenOwner;
            }else{
                userIsTokenOwner = false;
                return userIsTokenOwner;
            }
        }else{
            userIsTokenOwner = false;
            return userIsTokenOwner;
        }
    }catch(error){
        console.log(error);
        userIsTokenOwner = false;
        return userIsTokenOwner;
    }
}

async function checkPostExistence(postId){
    let postExists;
    try{
        const result = await postsRepository.checkPostExistence(postId);
        if(result.rows.length != 0){
            postExists = true;
            return postExists;
        }else{
            postExists = false;
            return postExists;
        }
    }catch(error){
        console.log(error);
        postExists = false;
        return postExists;
    }
}

async function checkUserLikeExistence(postId, userId){
    let postAlreadyLikedByUser;
    try{
        const result = await postsRepository.checkUserLikeExistence(postId, userId);
        if(result.rows.length != 0){
            postAlreadyLikedByUser = true;
            return postAlreadyLikedByUser;
        }else{
            postAlreadyLikedByUser = false;
            return postAlreadyLikedByUser;
        }
    }catch(error){
        console.log(error);
        postAlreadyLikedByUser = false;
        return postAlreadyLikedByUser;
    }
}

async function addLike(postId, userId){
    let likeWasAdded;
    try{
        const result = await postsRepository.addLike(postId, userId);
        if(result.rowCount === 1){
            likeWasAdded = true;
            return likeWasAdded;
        }else{
            likeWasAdded = false;
            return likeWasAdded;
        }
    }catch(error){
        console.log(error);
        likeWasAdded = false;
        return likeWasAdded;
    }
}

async function removeLike(postId, userId){
    let likeWasRemoved;
    try{
        const result = await postsRepository.removeLike(postId, userId);
        if(result.rowCount === 1){
            likeWasRemoved = true;
            return likeWasRemoved;
        }else{
            likeWasRemoved = false;
            return likeWasRemoved;
        }
    }catch(error){
        console.log(error);
        likeWasRemoved = false;
        return likeWasRemoved;
    }  
}

async function validateLike(token, postId, userId){
    let isValid;
    const isTokenValid = await postFunctions.validateToken(token);
    if(isTokenValid){
        const filteredToken = postFunctions.filterToken(token);
        const userIsTokenOwner = await postFunctions.checkTokenOwnership(filteredToken, userId);
        if(userIsTokenOwner){
            const postExists = await postFunctions.checkPostExistence(postId);
            if(postExists){
                isValid = true;
                return isValid;
            }else{
                isValid = false;
                return isValid;
            }
        }else{
            isValid = false;
            return isValid;
        }
    }else{
        isValid = false;
        return isValid;
    }
}

export async function formatPosts(unformattedPosts){
    const formatedPosts = [];
    for(const unformattedPost of unformattedPosts){
        const { postId, userId, username, userText, url , likesCount } = unformattedPost;
        const { urlTitle, urlDescription, urlImage } = await postFunctions.getUrlMetadata(url);
        const formatedPost = {
            postId: postId,
            userId: userId,
            username: username,
            userText: userText,
            url: url,
            urlTitle: urlTitle,
            urlDescription: urlDescription,
            urlImage: urlImage,
            likesCount: likesCount
        }
        formatedPosts.push(formatedPost);
    }
    return formatedPosts;
}

export async function getUrlMetadata(url){
    try{
        const response = await urlMetadata(url);
        const {title:urlTitle, description:urlDescription, image:urlImage} = response;
        const metadata = {
            urlTitle: urlTitle,
            urlDescription: urlDescription,
            urlImage: urlImage
        }
        return metadata;
    }catch(error){
        console.log(error);
    }
}

export async function deletePost(id){
    let isPostDeleted;
    try{
        const response = await postsRepository.deletePost(id);
        if(response.rowCount === 1){
            isPostDeleted = true;
            return isPostDeleted;
        }else{
            isPostDeleted = false;
            return isPostDeleted;
        }
    }catch(error){
        console.log(error);
        isPostDeleted = false;
        return isPostDeleted;
    }
}

const postFunctions = {
    validateToken,
    filterToken,
    createPost,
    checkTokenOwnership,
    checkPostExistence,
    checkUserLikeExistence,
    addLike,
    removeLike,
    validateLike,
    formatPosts,
    getUrlMetadata,
    deletePost
}

export default postFunctions;