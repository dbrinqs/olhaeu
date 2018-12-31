import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import InputLabel from "@material-ui/core/InputLabel";
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

//import CardAvatar from "components/Card/CardAvatar.jsx";
//import avatar from "assets/img/faces/marc.jpg";

import { BASE_URL } from "variables/globals";
import axios from 'axios';

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

//function SignUp(props, context) {
class SignUp extends React.Component {
  //const { classes } = props;
  state = {
    emailerror: false, emailsuccess: false, 
    senhaerror:false, senhasuccess: false,
    conferror:false, confsuccess: false,
    message: "", tc: false, color: "danger"
  };  

  alertTimeout = null;

  componentWillUnmount() {    
    this.clearAlertTimeout();  
  }

  clearAlertTimeout = () => {
    if (this.alertTimeout !== null) {
      clearTimeout(this.alertTimeout);
    }
  }

  criarConta = (e) => {
    if (this.validateEmail(document.getElementById("email").value)) {      
      this.setState({emailsuccess:true, emailerror:false});

      if (document.getElementById("senha").value !== "") {
        if (document.getElementById("senha").value === document.getElementById("conf").value) {
          this.setState({senhaerror:false, senhasuccess:true, conferror:false, confsuccess:true});
          this.createUser();
        } else {
          this.setState({senhaerror:true, senhasuccess:false, conferror:true, confsuccess:false});
          this.showNotification("ERRO - Senhas diferentes.", "danger", true);    
        }
      } else {
        this.setState({senhaerror:true, senhasuccess:false});
        this.showNotification("ERRO - Crie uma senha.", "danger", true);
      }
    } else {
      this.setState({emailsuccess:false, emailerror:true});      
      this.showNotification("ERRO - Email inválido.", "danger", true);   
    }    
  }

  createUser = () => {
    axios.post(BASE_URL + "users.php?event=create?email=" + document.getElementById("email").value + 
    "&senha=" + document.getElementById("senha").value + "&nome=&role=admin&escola=Olha Eu&admin=1")
    .then((response) => {
      console.log(response.data.message);
      if (response.data.message === true) {
        this.showNotification("BEM VINDO(A) ao Olha Eu", "success", false);          
      } else { 
        this.showNotification("ERRO - Email já cadastrado. Faça Login.", "danger", true);    
      }
    }).catch((error) => { this.showNotification("ERRO - Tente novamente.", "danger", true); }); 
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
          this.props['history'].push('/dashboard');
        }
      }.bind(this), stay?3000:1000
    );
  }

  entrar = (e) => {    
    this.props['history'].push('/signin');
  }

  checkSenha = () => {
    if (document.getElementById("senha").value !== "") {
      this.setState({senhaerror:false, senhasuccess:true});      
    } else {
      this.setState({senhaerror:true, senhasuccess:false});
      this.showNotification("ERRO - Crie uma senha.", "danger", true); 
    }
  }

  checkConf = () => {
    if (document.getElementById("senha").value !== "" && document.getElementById("senha").value === document.getElementById("conf").value) {
      this.setState({conferror:false, confsuccess:true});       
    } else {
      this.setState({conferror:true, confsuccess:false});
      this.showNotification("ERRO - Senhas diferentes.", "danger", true);
    }
  }

  checkEmail = () => {
    if (this.validateEmail(document.getElementById("email").value)) {      
      this.setState({emailsuccess:true, emailerror:false});      
    } else {
      this.setState({emailsuccess:false, emailerror:true});
      this.showNotification("ERRO - Email inválido.", "danger", true); 
    }
  }

  validateEmail = (email) => {
    //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
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
              <h4 className={classes.cardTitleWhite}>Crie uma conta</h4>
              <p className={classes.cardCategoryWhite}>E comece a usar o <b>Olha Eu</b> agora</p>
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
                      fullWidth: true,                      
                    }}
                    inputProps={{
                      disabled: false
                    }}
                    
                  />
                </GridItem>                
                
                {/*<GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Email"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>*/}
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6} onBlur={this.checkSenha}>
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
                <GridItem xs={12} sm={12} md={6} onBlur={this.checkConf}>
                  <CustomInput
                    labelText="Confirme a senha"
                    id="conf"
                    error={this.state.conferror}
                    success={this.state.confsuccess}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              {/*<GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>*/}
              {/*<GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>*/}
            </CardBody>
            <CardFooter>
                <Button color="primary" onClick={this.criarConta}>Criar Conta</Button>                
            </CardFooter>
            <CardFooter>
              <p>Já possui uma conta? <a onClick={this.entrar}><b>Se logue aqui.</b></a></p>
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
              <Button color="primary" round onClick={followFunction}>
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
  );}
}

/*SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};*/

//export default withStyles(dashboardStyle)(Dashboard);


export default withStyles(styles)(SignUp);