import { ftruncate } from "fs";
import connection from "./../dbStrategy/postgres.js";

async function searchToken(token) {
    return connection.query('SELECT * FROM sessions WHERE token = $1', [token]);
}

async function getUserByToken(token) {
    return connection.query('SELECT * FROM sessions WHERE token = $1', [token]);
}

async function createPost(userId, link, text) {
    return connection.query('INSERT INTO posts ("userId",link,text) VALUES ($1,$2,$3)', [userId, link, text]);
}

async function checkPostExistence(postId) {
    return connection.query('SELECT * FROM posts WHERE id = $1', [postId]);
}

async function checkUserLikeExistence(postId, userId) {
    return connection.query('SELECT * FROM likes WHERE "postId" = $1 AND "userId" = $2', [postId, userId]);
}

async function addLike(postId, userId) {
    return connection.query('INSERT INTO likes ("postId", "userId") VALUES ($1,$2)', [postId, userId]);
}

async function removeLike(postId, userId) {
    return connection.query('DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2', [postId, userId]);
}

async function verifyExistingPost(id) {
    return connection.query(`SELECT * FROM posts WHERE id = $1`, [id]);
}

async function updatePost(text, id) {
    return connection.query(`UPDATE posts SET text =$1 WHERE id = $2`, [text, id]);
}

async function verifyExistingUser(userId) {
    return connection.query(`SELECT * FROM users WHERE id = $1`, [userId]);
}

async function getPostsByUserId(userId) {
    return connection.query(`SELECT * FROM posts WHERE "userId" = $1`, [userId]);
}

async function getPosts(){
    return connection.query('SELECT posts.id as "postId", "userId", users.username, text as "userText", link as url, "likesCount" FROM posts JOIN users ON posts."userId" = users.id ORDER BY posts."createdAt" DESC LIMIT 20;');
}   

async function deletePost(id){
    return connection.query('DELETE FROM posts WHERE id = $1',[id]);
}

const postsRepository = {
    searchToken,
    getUserByToken,
    createPost,
    checkPostExistence,
    checkUserLikeExistence,
    addLike,
    removeLike,
    getPosts,
    deletePost,
    verifyExistingPost,
    updatePost,
    verifyExistingUser,
    getPostsByUserId
}

export default postsRepository;