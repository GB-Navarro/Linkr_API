import connection from "./../dbStrategy/postgres.js";
//setar o default do likesCount como 0 
//setar o default do timeStamp como NOW()

export async function createPost(postData){
    const { userId, link, text } = postData
    try{
        const promisse = await connection.query('INSERT INTO posts (userId, link, text) VALUES ($1,$2,$3)',[userId, link, text])
    }catch(error){

    }
    
}