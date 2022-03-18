import { postsBucket } from "../../../lib/postsBucket";

export default async function handler(req, res) {
  const { id } = req.query;
  const post = await postsBucket.getObject({
    id,
    props: "id,title,content,metadata,thumbnail",
  });
  res.status(200).json(post);
}
