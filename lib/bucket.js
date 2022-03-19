import Cosmic from "cosmicjs";

const api = Cosmic();

export const bucket = api.bucket({
  slug: process.env.POSTS_BUCKET,
  read_key: process.env.READ_KEY,
});
