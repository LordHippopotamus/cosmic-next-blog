import Cosmic from "cosmicjs";

const api = Cosmic();

const postsBucket = api.bucket({
  slug: process.env.POSTS_BUCKET,
  read_key: process.env.READ_KEY,
});

export default async function handler(req, res) {
  const data = await postsBucket.getObjects({
    query: {
      type: "posts",
    },
    props: "id,title,thumbnail",
  });
  const posts = await data.objects;
  res.status(200).json(posts);
}
