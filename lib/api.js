export const url = {
  baseURL: "http://localhost:3000/api",
  get posts() {
    return this.baseURL + "/posts";
  },
};
