import CommentPage from "../components/CommentPage/CommentPage";
import Home from "../components/Home/Home";

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
];
