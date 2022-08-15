import connection from "../dbStrategy/postgres.js";

async function getUserDataFromToken(token){
    return connection.query('SELECT sessions."userId", users."pictureUrl" as "userImageUrl" FROM sessions JOIN users ON sessions."userId" = users.id WHERE sessions.token = $1',[token]);
}

const userRepository = {
    getUserDataFromToken
}

export default userRepository;