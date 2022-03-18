import Cosmic from "cosmicjs";
import { bucketSlug, readKey } from "../../../lib/keys";

const api = Cosmic();

const postsBucket = api.bucket({
  slug: bucketSlug,
  read_key: readKey,
});

export default async function handler(req, res) {
  const { id } = req.query;
  const post = await postsBucket.getObject({
    id,
    props: "id,title,content,metadata,thumbnail",
  });
  res.status(200).json(post);
}
