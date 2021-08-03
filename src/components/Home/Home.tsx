import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Loading from "../../common/loading/loading";
import { fetchAllPostActions } from "../../redux/actions/postAction";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Posts from "../Posts/Posts";
import useStyles from "./style";
import firebase from "firebase";
import axios from "axios";
import { USER } from "../../interfaces/userInterface";
import ActiveUser from "../ActiveUser/ActiveUser";
import { userActions } from "../../redux/slice/userSlice";
function Home() {
  const { loading } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllPostActions());
    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        const { user } = result;
        if (result.additionalUserInfo?.isNewUser) {
          dispatch(userActions.fetchCurrentUser({
            displayName: user?.displayName,
            uid: user?.uid,
            photoURL: user?.photoURL,
            email: user?.email,
            urlBia:'',
          }));
          axios.post("https://601014b66c21e1001704fe27.mockapi.io/api/users", {
            displayName: user?.displayName,
            uid: user?.uid,
            photoURL: user?.photoURL,
            email: user?.email,
            urlBia:'',
          } as USER);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  const classes = useStyles();
  return loading ? (
    <Loading />
  ) : (
    <Grid container className={classes.home} >
      <Grid item sm={12} md={7} xs={12}>
        <Posts />
      </Grid>
      <Grid className={classes.wraplistUser} item sm={12} md={5} xs={12}>
        <div className={classes.listUser}>
          <ActiveUser />
        </div>
      </Grid>
    </Grid>
  );
}

export default Home;
