import React from "react";

const Post = ({ match }) => {
  return <p>Post #{match.params.id}</p>;
};

export default Post;
