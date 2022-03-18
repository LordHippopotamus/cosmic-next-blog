import Cosmic from "cosmicjs";
import { bucketSlug, readKey } from "../../../lib/keys";

const api = Cosmic();

const postsBucket = api.bucket({
  slug: bucketSlug,
  read_key: readKey,
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
