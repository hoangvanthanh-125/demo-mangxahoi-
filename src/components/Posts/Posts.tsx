import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import Loading from '../../common/loading/loading';
import { fetchAllPostActions } from '../../redux/actions/postAction';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import FormPost from '../FormPost/FormPost';
import PostItem from '../PostItem/PostItem';

function Posts() {
  // const { loading } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  useEffect(() => {
   dispatch(fetchAllPostActions())
  },[])
  const { listPost } = useAppSelector(state => state.posts)
  const renderListPosts = () => {
    let xhtml = null;
    if(listPost.length > 0){
      xhtml = listPost.map(post => (
        <PostItem key={post.id} post={post} />
      ))
    }
    return xhtml;
  }
  return (
 <Grid item container>
 <FormPost />
  {renderListPosts()}
</Grid>  );
}

export default Posts;