import connection from "./../dbStrategy/postgres.js";

async function searchToken(token){
    return connection.query('SELECT * FROM sessions WHERE token = $1',[token]);
}

async function getUserByToken(token){
    return connection.query('SELECT * FROM sessions WHERE token = $1',[token]);
}

async function createPost(userId, link, text){
    return connection.query('INSERT INTO posts ("userId",link,text) VALUES ($1,$2,$3)',[userId, link, text]);
}

async function checkPostExistence(postId){
    return connection.query('SELECT * FROM posts WHERE id = $1',[postId]);
}

async function checkUserLikeExistence(postId, userId){
    return connection.query('SELECT * FROM likes WHERE "postId" = $1 AND "userId" = $2',[postId, userId]);
}

async function addLike(postId, userId){
    return connection.query('INSERT INTO likes ("postId", "userId") VALUES ($1,$2)',[postId, userId]);
}

async function removeLike(postId, userId){
    return connection.query('DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2',[postId, userId]);
}

const postsRepository = {
    searchToken,
    getUserByToken,
    createPost,
    checkPostExistence,
    checkUserLikeExistence,
    addLike,
    removeLike
}

export default postsRepository;