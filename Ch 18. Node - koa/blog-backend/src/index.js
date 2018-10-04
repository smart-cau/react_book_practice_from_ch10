const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const api = require("./api");

const app = new Koa();
const router = new Router();

app.use(bodyParser());

// router 모듈화 부분(api) 사용.
router.use("/api", api.routes());

// app 인스턴스에 router 적용.
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log("listening to port 4000.");
});
