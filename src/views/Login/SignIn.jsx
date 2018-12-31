import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import { BASE_URL } from "variables/globals";
import axios from 'axios';
//import CardAvatar from "components/Card/CardAvatar.jsx";
//import avatar from "assets/img/faces/marc.jpg";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailerror: false, emailsuccess: false, 
      senhaerror:false, senhasuccess: false,
      tc: false, message: "", color: "danger"
    };
    this.alertTimeout = null;
  } 

  componentWillUnmount() {
    /*if (localStorage.getItem("logedin") != null) {
      if (JSON.parse(localStorage.getItem("logedin"))) {
        this.props['history'].push('/dashboard');
      }
    }*/
    this.clearAlertTimeout();  
  }

  clearAlertTimeout = () => {
    if (this.alertTimeout !== null) {
      clearTimeout(this.alertTimeout);
    }
  }

  showNotification = (msg, cor, stay) => {
    this.setState({message:msg, color:cor, tc:true});
    this.clearAlertTimeout();
    this.alertTimeout = setTimeout(
      function() { 
        this.setState({tc:false});
        if(!stay) {
          localStorage.setItem("logedin", JSON.stringify(true));
          localStorage.setItem("email", document.getElementById("email").value);
          this.props['history'].push('/agenda');
        }
      }.bind(this), stay?3000:1000
    );
  }
  
  criarConta = (e) => {
    this.props['history'].push('/signup');
  }

  checkEmail = () => {
    if (this.validateEmail(document.getElementById("email").value)) {      
      axios.post(BASE_URL + "users.php?event=userExists&email=" + document.getElementById("email").value)
        .then((response) => {
          console.log(response.data.message);
          if (response.data.message === true) {
            this.setState({emailsuccess:true, emailerror:false});         
          } else { 
            this.setState({emailsuccess:false, emailerror:true});  
            this.showNotification("ERRO - Email não cadastrado.", "danger", true);    
          }
        }).catch((error) => { this.showNotification("ERRO - Não conseguiu validar o email.", "danger", true); });  
    } else {
      this.setState({emailsuccess:false, emailerror:true});
      this.showNotification("ERRO - Email inválido.", "danger", true);  
    }
  }  

  signIn = (e) => {   
    axios.post(BASE_URL + "users.php?event=signin&email=" + document.getElementById("email").value + 
    "&senha=" + document.getElementById("senha").value)
    .then((response) => {
      console.log(response.data.message);
      if (response.data.message === true) {
        this.showNotification("BEM VINDO(A) ao Olha Eu", "success", false);          
      } else { 
        this.setState({senhaerror:true, senhasuccess:false});
        this.showNotification("ERRO - Senha incorreta.", "danger", true);    
      }
    }).catch((error) => { this.showNotification("ERRO - Tente novamente.", "danger", true); });   
  }

  validateEmail = (email) => {
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(email) === false) return false; 
    else return true;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Logar</h4>
                <p className={classes.cardCategoryWhite}>Entrar no <b>Olha Eu</b></p>
              </CardHeader>

              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12} onBlur={this.checkEmail}>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      error={this.state.emailerror}
                      success={this.state.emailsuccess}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: false
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Senha"
                      id="senha"
                      error={this.state.senhaerror}
                      success={this.state.senhasuccess}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>                
                </GridContainer>              
              </CardBody>

              <CardFooter>
                <Button color="primary" onClick={this.signIn}>Entrar</Button>
              </CardFooter>

              <CardFooter>
                <p>Não possui uma conta? <a onClick={this.criarConta}><b>Crie agora.</b></a></p>
              </CardFooter> 
            </Card>
          </GridItem>
          {/*<GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
                <h4 className={classes.cardTitle}>Alec Thompson</h4>
                <p className={classes.description}>
                  Don't be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves Kanye
                  I love Rick Owens’ bed design but the back is...
                </p>
                <Button color="primary" round>
                  Follow
                </Button>
              </CardBody>
            </Card>
          </GridItem>*/}
        </GridContainer>
        <Snackbar
          place="tc"
          color={this.state.color}
          message={this.state.message}
          open={this.state.tc}
          closeNotification={() => this.setState({ tc: false })}
          close
        />
      </div>
    );
  }
}

export default withStyles(styles)(SignIn);
