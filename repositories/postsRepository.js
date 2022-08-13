import db from "../dbStrategy/postgres.js";

async function getPostsByHashtag(hashtag) {
    return db.query(
        `SELECT public.posts.id, public.posts.link, public.posts.text, public.users."username", public.users."pictureUrl", public.posts."userId",  COUNT(public.likes."postId") as likes
        FROM posts
        JOIN "postsHashtags" AS ph ON public.posts.id = ph."postId"
        JOIN public.hashtags ON ph."hashtagId" = public.hashtags.id
        JOIN public.users ON public.posts."userId" = public.users.id
        LEFT JOIN public.likes ON public.posts.id = public.likes."postId"
        WHERE hashtags.hashtag = $1
        GROUP BY public.posts.id, public.posts.text, public.posts.link, public.users."username", public.users."pictureUrl", public.posts."userId"`, [hashtag]
    );
}

const postsRepository = {getPostsByHashtag};

export default postsRepository;
