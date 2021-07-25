import { Grid } from "@material-ui/core";
import React from "react";
import { COMMENT, POST } from "../../interfaces/postInterface";
import CommentItem from "../CommentItem/CommentItem";
import FormComment from "../FormComment/FormComment";
import useStyles from "./style";
const getKey = () => {
  return `${Math.random()*67766777777}-${Math.random()* 665627788}`
}
interface Props {
  post: POST;
}
function Comments({ post }: Props) {
  const classes = useStyles();
  const renderListComment = () => {
    let xhtml = null;
    if (post?.listComment.length > 0) {
      xhtml = post?.listComment.map((item, index) => {
        return <CommentItem post={post} key={getKey()} item={item} />;
      });
    }
    return xhtml;
  };
  return (
    <Grid className={classes.wrap} item container sm={12} xs={12} md={12}>
      <Grid className={classes.inputCmt} item sm={12} xs={12} md={12}>
        <FormComment post={post} />
      </Grid>
      {post.listComment.length > 0 ? (
        <Grid item sm={12} md={12} xs={12}>
          <div className={classes.wrapCmt}>{renderListComment()}</div>
        </Grid>
      ) : (
        <div className={classes.firstCmt}>
          <h4>Hãy là người bình luận đầu tiên</h4>
        </div>
      )}
    </Grid>
  );
}

export default Comments;
