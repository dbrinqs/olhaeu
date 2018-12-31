// @material-ui/icons
import ExitToApp from "@material-ui/icons/ExitToApp";
import AccountBox from "@material-ui/icons/AccountBox";
import HowToReg from "@material-ui/icons/HowToReg";
// core components/views
import SignUpPage from "views/Login/SignUp.jsx";
import SignInPage from "views/Login/SignIn.jsx";
import SignOutPage from "views/Login/SignOut.jsx";

const loginRoutes = [
  {
    path: "/signin",
    sidebarName: "Sign In",
    navbarName: "Sign In",
    icon: AccountBox,
    component: SignInPage
  },
  {
    path: "/signup",
    sidebarName: "Sign Up",
    navbarName: "Sign Up",
    icon: HowToReg,
    component: SignUpPage
  },
  {
    path: "/signout",
    sidebarName: "Sign Out",
    navbarName: "Sign Out",
    icon: ExitToApp,
    component: SignOutPage
  },  
  { redirect: true, path: "/", to: "/signin", navbarName: "Redirect" }  
];

export default loginRoutes;
