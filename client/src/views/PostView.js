import React from "react";
import Header from "../components/Header";
import Post from "../components/Post.js";
import CommentSection from "../components/CommentSection.js";

const PostView = () => {
  return (
    <div>
      <Header location="Home" />
      <Post />
      <CommentSection />
    </div>
  );
};

export default PostView;
