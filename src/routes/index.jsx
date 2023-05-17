import Index from "../pages";
import About from "../pages/about";
import Contact from "../pages/contact";
import ContextPage from "../pages/context";
import ItemsPage from "../pages/items";
import Page404 from "../pages/Page404";
import UsersPage from "../pages/Users/index";
import CreateOrEditUser from "../pages/Users/createOrEdit";
import ViewUser from "../pages/Users/view";
// import Users from "../pages/Users";


export const routes = [
  {
    path: "/",
    element: <Index />,
    name: "Home",
  },
  {
    path: "/about",
    element: <About />,
    name: "About",
  },
  {
    path: "/contact",
    element: <Contact />,
    name: "Contact",
  },
  {
    path: "/404",
    element: <Page404 />,
  },
  {
    name: "Context",
    path: "/context",
    element: <ContextPage/>
  },
  {
    name: "Items",
    path: "/items",
    element: <ItemsPage/>
  },
  {
    name:"Users",
    path:"/users",
    element:<UsersPage/>
  },
  {
    path:"/users/create",
    element:<CreateOrEditUser />
  },
  {
    path:"/users/:id",
    element:<ViewUser/>
  },
  {
    path:"/users/:id/edit",
    element:<CreateOrEditUser />
  }
];
