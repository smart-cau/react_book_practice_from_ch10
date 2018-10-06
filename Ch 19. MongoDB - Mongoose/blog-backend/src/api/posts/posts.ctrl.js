let postId = 1;

const posts = [
  {
    id: 1,
    title: "제목",
    body: "내용"
  }
];

// POST /api/posts
exports.write = ctx => {
  const { title, body } = ctx.request.body;

  postId += 1;

  const post = { id: postId, title, body };

  posts.push(post);

  ctx.body = posts;
};

// GET /api/posts
exports.list = ctx => {
  ctx.body = posts;
};

// GET /api/posts/:id
exports.read = ctx => {
  const { id } = ctx.params;

  const post = posts.find(p => p.id.toString() === id);

  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: "there is no post"
    };
    return;
  }

  ctx.body = post;
};

// DELETE /api/posts/:id
exports.delete = ctx => {
  const { id } = ctx.params;

  const index = posts.findIndex(p => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "there is no post"
    };
    return;
  }

  posts.splice(index, 1);
  ctx.status = 204;
};

// PATCH /api/posts/:id
exports.update = ctx => {
  const { id } = ctx.params;

  const index = posts.findIndex(p => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "there is no post"
    };
    return;
  }

  posts[index] = {
    ...posts[index],
    ...ctx.request.body
  };

  ctx.body = posts[index];
};

// PUT /api/posts/:id
exports.replace = ctx => {
  const { id } = ctx.params;

  const index = posts.findIndex(p => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "there is no posts"
    };
    return;
  }

  posts[index] = {
    id,
    ...ctx.request.body
  };

  ctx.body = posts[index];
};
