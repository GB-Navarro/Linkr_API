import connection from "./../dbStrategy/postgres.js";

//token = 5e23c49f-fd86-4921-a338-dc90a235b05b

async function createPost(postData){
    const { userId, link, text } = postData
    try{
        const promisse = await connection.query('INSERT INTO posts (userId, link, text) VALUES ($1,$2,$3)',[userId, link, text]);
        console.log(promisse);
    }catch(error){
        console.log(error);
    }
    
}

async function validateToken(token){
    try{
        const promisse = await connection.query('SELECT FROM sessions WHERE token = $1', [token]);
        console.log(token);
    }catch(error){
        console.log(error);
    }
}

const postsRepository = {
    createPost,
    validateToken
}

export default postsRepository;