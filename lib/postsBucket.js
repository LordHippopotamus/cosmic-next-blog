import Cosmic from "cosmicjs";

const api = Cosmic();

export const postsBucket = api.bucket({
  slug: process.env.POSTS_BUCKET,
  read_key: process.env.READ_KEY,
});
