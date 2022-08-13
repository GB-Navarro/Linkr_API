import db from "../dbStrategy/postgres.js";


async function getHashtagIdByTag(hashtag) {

    let hashtags = await db.query(
        `SELECT id FROM public.hashtags
        WHERE tag = $1`, [hashtag]);
    if(hashtags.rowCount > 0)
        return hashtags.rows[0].id;
    
    hashtags = await db.query(
        `INSERT INTO public.hashtags (hashtag) 
        VALUES ($1)
        RETURNING id;`, [hashtag]);
    return hashtags.rows[0].id;
}

async function getTop10TrendingHashtags() {
    return db.query(
        `SELECT a.*, COUNT(a) FROM ((
            SELECT public.hashtags.hashtag
            FROM public.hashtags
            JOIN "public.postsHashtags" AS ph 
            ON public.hashtags.id = ph."hashtagId"
        ) UNION ALL (
            SELECT public.hashtags.hashtag
            FROM public.hashtags
            JOIN "public.postsHashtags" AS ph ON public.hashtags.id = ph."hashtagId"
        )) AS a
        GROUP BY a.hashtag
        ORDER BY COUNT (a) DESC
        LIMIT 10;`
    );
}

const hashtagsRepository = {getTop10TrendingHashtags, getHashtagIdByTag};

export default hashtagsRepository;
