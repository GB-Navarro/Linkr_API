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
const postsRepository = {
    searchToken,
    getUserByToken,
    createPost
}

export default postsRepository;