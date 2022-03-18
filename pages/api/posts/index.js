import { postsBucket } from "../../../lib/postsBucket";

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
