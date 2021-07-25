import { createTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import {
  BrowserRouter as Router, Route,
  Switch
} from "react-router-dom";
import "./App.css";
import UserLayoutRoute from "./common/layout/UserLayoutRoute";
import ModalCommon from "./common/Modal/Modal";
import Login from "./components/Login/Login";
import { USER_ROUTER } from "./contstans/route";

const theme = createTheme({
  palette: {},
});
function App() {
  const renderUserRouter = () => {
    let xhtml = null;
    if (USER_ROUTER.length > 0) {
      xhtml = USER_ROUTER.map((item, index) => {
        return <UserLayoutRoute key={index} component={item.component} path={item.path} exact={item.exact} />;
      });
    }
    console.log(xhtml);
    
    return xhtml;
  };
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <ModalCommon />
          <Switch>
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
