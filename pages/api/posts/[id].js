import Cosmic from "cosmicjs";

const api = Cosmic();

const postsBucket = api.bucket({
  slug: process.env.POSTS_BUCKET,
  read_key: process.env.READ_KEY,
});

export default async function handler(req, res) {
  const { id } = req.query;
  const post = await postsBucket.getObject({
    id,
    props: "id,title,content,metadata,thumbnail",
  });
  res.status(200).json(post);
}
