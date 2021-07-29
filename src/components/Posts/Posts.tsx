import { Grid } from "@material-ui/core";
import React from "react";
import { POST } from "../../interfaces/postInterface";
import { useAppSelector } from "../../redux/hook";
import FormPost from "../FormPost/FormPost";
import PostItem from "../PostItem/PostItem";

function Posts() {
  const { listPost } = useAppSelector((state) => state.posts);
    const renderListPosts = (listpost:POST[]) => {
    let xhtml = null;
    if (listPost.length > 0) {
      xhtml = listPost.map((post) => <PostItem key={post.id} post={post} />);
    }
    return xhtml;
  };
  return (
    <Grid item container>
      <FormPost />
      {renderListPosts(listPost)}
    </Grid>
  );
}

export default Posts;
