import connection from "../dbStrategy/postgres.js";

async function signUp(email, encryptedPassword, username, pictureUrl) {
    return connection.query(`INSERT INTO users (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4)`, [email, encryptedPassword, username, pictureUrl]);
}

export const authRepository = {
	signUp
}