// /api/posts
const Router = require("koa-router");
const postsCtrl = require("./posts.ctrl");

const posts = new Router();

posts.get("/", postsCtrl.list);
posts.post("/", postsCtrl.write);
posts.get("/:id", postsCtrl.read);
posts.delete("/:id", postsCtrl.delete);
posts.patch("/:id", postsCtrl.update);
posts.put("/:id", postsCtrl.replace);

module.exports = posts;
