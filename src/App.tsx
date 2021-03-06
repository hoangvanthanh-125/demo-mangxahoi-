import { createTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./App.css";
import UserLayoutRoute from "./common/layout/UserLayoutRoute";
import ModalCommon from "./common/Modal/Modal";
import Login from "./components/Login/Login";
import { USER_ROUTER } from "./contstans/route";
import firebase from "firebase";
import { userActions } from "./redux/slice/userSlice";
import { useAppDispatch } from "./redux/hook";
import axios from "axios";
import Home from "./components/Home/Home";
import { useEffect } from "react";
import { transpileModule } from "typescript";

const theme = createTheme({
  palette: {},
});
function App() {
  const dispatch = useAppDispatch();
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      localStorage.setItem("token", await user.getIdToken());
      const res = await axios.get(
        `https://601014b66c21e1001704fe27.mockapi.io/api/users/?uid=${user.uid}`
      );
      const data = res.data;
      
     if(data.length > 0) {
      dispatch(userActions.fetchCurrentUser(data[0]));
     }
      localStorage.setItem(
        "user",
        JSON.stringify({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
    } else {
      dispatch(userActions.fetchCurrentUser(null))
    }
  });
  useEffect(() => {
    axios
      .get("https://601014b66c21e1001704fe27.mockapi.io/api/users")
      .then((res) => {
        dispatch(userActions.fetchListUser(res.data));
      });
  }, []);
  const renderUserRouter = () => {
    let xhtml = null;
    if (USER_ROUTER.length > 0) {
      xhtml = USER_ROUTER.map((item, index) => {
        return (
          <UserLayoutRoute
            key={index}
            component={item.component}
            path={item.path}
            exact={item.exact}
          />
        );
      });
    }

    return xhtml;
  };
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <ModalCommon />
          <Switch>
            {/* <Route path="/">
              < Home/>
            </Route> */}
            {renderUserRouter()}
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
