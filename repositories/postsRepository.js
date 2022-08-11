import connection from "./../dbStrategy/postgres.js";

async function searchToken(token){
    return connection.query('SELECT * FROM sessions WHERE token = $1',[token]);
}

const postsRepository = {
    searchToken
}

export default postsRepository;