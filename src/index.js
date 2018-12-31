import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
//import { Router, Route, Switch, browserHistory } from "react-router";

import "assets/css/material-dashboard-react.css?v=1.4.1";

//import indexRoutes from "routes/index.jsx";
import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import SignIn from "layouts/Login/SignIn.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
	<Router history={hist}>
	  	<Switch>
	  		<Router history={hist} path="/dashboard">
		      	<Route path="/" component={Dashboard} />	      	
		    </Router>
		    <Router history={hist} path="/user">
		      	<Route path="/user" component={Dashboard} />	    	     	
		    </Router>
		    <Router history={hist} path="/agenda">
		      	<Route path="/agenda" component={Dashboard} />	    	     	
		    </Router>
		    <Router history={hist} path="/admin">
		      	<Route path="/admin" component={Dashboard} />	    	     	
		    </Router>
		    <Router history={hist} path="/banco">
		      	<Route path="/banco" component={Dashboard} />	    	     	
		    </Router>
		    <Router history={hist} path="/plano">
		      	<Route path="/plano" component={Dashboard} />	    	     	
		    </Router>
		    <Router history={hist} path="/">
		      	<Route path="/" component={SignIn} />	    	     	
		    </Router>
	    </Switch>
  	</Router>,  	
  	document.getElementById("root")
);

/*ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </Router>,
  document.getElementById("root")
);*/
