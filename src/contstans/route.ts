import ChatPage from "../components/ChatPage/ChatPage";
import CommentPage from "../components/CommentPage/CommentPage";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Personal from "../components/PersonalPage/Personal";

export const USER_ROUTER = [
  {
    path: "/",
    name: "Home",
    exact: true,
    component: Home,
  },
  {
    path: "/comment/:id",
    name: "comment/",
    exact: true,
    component: CommentPage,
  },
  {
    path: "/user/:id",
    name: "personal/",
    exact: true,
    component: Personal,
  },
  {
    path: "/chat",
    name: "",
    exact: false,
    component: ChatPage,
  },
  {
    path: "/login",
    name: "",
    exact: false,
    component: Login,
  },
];
