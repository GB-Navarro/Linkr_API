import client from '../dbStrategy/postgres.js'

export const getUser = async (req, res) => {
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "").trim()

    try {
        const result = await client.query(
            `SELECT public.users.id, public.users."username", public.users."pictureUrl"
             FROM public.users
             JOIN public.sessions ON public.sessions.token = $1
             WHERE public.users.id = public.sessions."userId";`, [token])
        const user = result.rows[0]
        return res.status(200).send(user)
    } catch(error) { 
        return res.status(500).send(error) 
    }
}
