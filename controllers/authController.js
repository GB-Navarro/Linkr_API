import bcrypt from "bcrypt";

import { authRepository }  from "../repositories/authRepository.js";

export async function signUp(req, res) {
    const { email, password, username, pictureUrl } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    try {
        await authRepository.signUp(email, encryptedPassword, username, pictureUrl);
        res.status(201).send("User registered successfully.");
    }
    catch (error) {
        res.status(500).send(error);
    }
}
