import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../apis/axiosClient";
import { useAppSelector } from "../../redux/hook";
import Comments from "../Comments/Comments";
import PostItem from "../PostItem/PostItem";
import useStyles from './style'
function CommentPage() {
  const classes = useStyles();
  const { listPost } = useAppSelector((state) => state.posts);
  const [currrentPost, setCurrenPost] = useState(null);
  const { id } = useParams<{ id?: string }>();
  useEffect(() => {
    console.log('render');
    
    axiosClient.get(`/posts/${id}`).then((res) => {
      setCurrenPost(res.data);
    });
  }, [id, listPost]);
  
  return currrentPost ? (
    <Grid className = {classes.wrap} item container spacing={1}>
      <Grid item sm={7} xs={12} md={7}>
        <PostItem post={currrentPost!} />
      </Grid>
      <Grid item sm={5} md={5} xs={12}>
        <Comments post = {currrentPost!} />
      </Grid>
    </Grid>
  ) : (
    <div></div>
  );
}

export default CommentPage;
