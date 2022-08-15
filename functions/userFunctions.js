import userRepository from "./../repositories/userRepository.js"

async function getUserDataFromToken(token){
    const userData = await userRepository.getUserDataFromToken(token);
    return userData.rows[0];
}

const userFunctions = {
    getUserDataFromToken
}

export default userFunctions;