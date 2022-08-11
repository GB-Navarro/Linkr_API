async function filterToken(token){
    const tokenType = token.split(" ")[0].toString();
    const filteredToken = token.split(" ")[1].toString();
    return filteredToken;
}

const usersController = {
    filterToken
}

export default usersController;