import client from '../dbStrategy/postgres.js'


export const newGetTimelineList = async (req, res) => {
    const { timelineList } = res.locals
    const {timestamp} = req.query;
    try{
        const list = []
        
        for(let post of timelineList){
            let postInfo = {}
            if(post.postsId){   
                const postData = await client.query(`SELECT public.posts.*, public.users."username", public.users."pictureUrl",
                                                    FROM public.posts
                                                    JOIN public.users ON public.posts."userId" = public.users.id
                                                    WHERE public.posts.id=$1
                                                    GROUP BY public.posts.id, public.users."username", public.users."pictureUrl"`, [post.postsId])

            }else{
                const postUserData = await client.query(`SELECT * FROM public.users WHERE id = $1;`, [post.userId])
                const postUser = postUserData.rows[0]
                postInfo = {
                    ...post,
                    userName: postUser.username,
                    profilePicture:postUser.pictureUrl,
                }
            }
            list.push(postInfo)
        }
        
    }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Erro ao tentar se conectar com o banco de dados no controller.'})
    }
}