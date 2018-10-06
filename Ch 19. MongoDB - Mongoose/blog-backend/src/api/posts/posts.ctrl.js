const Post = require("../../models/post");
const { ObjectId } = require("mongoose").Types;
const Joi = require("joi");

exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params;

  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return null;
  }

  return next();
};

// POST /api/posts
exports.write = async ctx => {
  // Joi로 body 검증.
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;

  const post = new Post({
    title,
    body,
    tags
  });

  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

// GET /api/posts
exports.list = async ctx => {
  // ctx.query.page가 있으면 이 값을 int로 바꾸고, 없으면 1일 int로 바꿈.
  // 두번째 인자인 10은 10진수를 의미.
  const page = parseInt(ctx.query.page || 1, 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();

    const postCount = await Post.countDocuments().exec();
    ctx.set("Last-Page", Math.ceil(postCount / 10));

    const limitBodyLength = post => ({
      ...post,
      body: post.body.length < 100 ? post.body : `${post.body.slice(0, 100)}...`
    });
    ctx.body = posts.map(limitBodyLength);
  } catch (e) {
    ctx.throw(e, 500);
  }
};

// GET /api/posts/:id
exports.read = async ctx => {
  const { id } = ctx.params;

  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

// DELETE /api/posts/:id
exports.delete = async ctx => {
  const { id } = ctx.params;

  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // HTTP 상태 코드 참고.
  } catch (e) {
    ctx.throw(e, 500);
  }
};

// PATCH /api/posts/:id
exports.update = async ctx => {
  const { id } = ctx.params;

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true
    }).exec();

    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
