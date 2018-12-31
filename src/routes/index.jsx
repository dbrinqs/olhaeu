import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import SignIn from "layouts/Login/SignIn.jsx";

const indexRoutes = [{ path: "/", component: Dashboard }];
const signinRoutes = [{ path: "/", component: SignIn }];

var logedin = false;

/*console.log(localStorage.getItem("logedin"));

if (localStorage.getItem("logedin") != null) {
	logedin = JSON.parse(localStorage.getItem("logedin"));
	console.log("logedin " + logedin);
}*/

var rota;

if (!logedin) {
	rota = signinRoutes;
} else {
	rota = indexRoutes;
}


export default rota;

