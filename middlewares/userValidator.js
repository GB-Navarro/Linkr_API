import client from '../dbStrategy/postgres.js'

export async function userPageValidation(req, res, next){
    try{
        const userData = (await client.query(`SELECT public.users.id, public.users."username", public.users."pictureUrl"
                                                FROM public.users
                                                WHERE public.users.id = $1`, [parseInt(req.params.id)])).rows

        if (userData.length === 0)
            return res.status(404).send('User not found');
        
        const additionalReturn = { user: userData[0] }
        console.log(additionalReturn)
        res.locals = {
            timelineList,
            additionalReturn
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Erro ao acessar o banco de dados.'})
    }
    next()
}


export async function hashtagPageValidation(req, res, next){
    try{
        let hashtag = "#" + req.params.hashtag;
        const postsData = await client.query(`SELECT public.posts.*
                                                FROM public.posts
                                                JOIN "public.postsHashtags" AS ph ON public.posts.id = ph."postId"
                                                JOIN public.hashtags ON ph."hashtagId" = public.hashtags.id
                                                WHERE public.hashtags.hashtag = $1
                                                GROUP BY public.posts.id`, [hashtag])
        const posts = postsData.rows

        const timelineList = [...posts]
        res.locals = {
            timelineList
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Erro ao acessar o banco de dados.'})
    }
    next()
}
