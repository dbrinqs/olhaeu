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
// import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Checkbox from "@material-ui/core/Checkbox";
// import Check from "@material-ui/icons/Check";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';


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
  },
  group: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    }
};

class CadastrarProf extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: [], posicao: '', isAdmin:false };
  }
  
  /* --- FUNCTIONS --- */
  handleToggle = value => () => {
    const { checked } = this.state;
    this.setState({ checked: [value] });
  }

  handleChange = event => {
    this.setState({ posicao: event.target.value });
  }

  checkAdmin = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  cadastrarProf = () => {
    console.log('email ' + document.getElementById("email").value);
    console.log('name ' + document.getElementById("name").value);
    console.log('senha ' + document.getElementById("senha").value);
    console.log('admin ' + this.state.isAdmin);    
  }

  /* --- RENDER --- */
  render() {
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={styles.cardTitleWhite}>Cadastrar Professor(a)</h4>
              <p className={styles.cardCategoryWhite}>Preencha os campos abaixo</p>
            </CardHeader>
            <CardBody>
              <GridContainer>                
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Email"
                    id="email"
                    formControlProps={{fullWidth: true}}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Nome completo"
                    id="name"
                    formControlProps={{fullWidth: true}}
                  />
                </GridItem>  
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Senha"
                    id="senha"
                    formControlProps={{fullWidth: true}}
                  />
                </GridItem>              
              </GridContainer>

              <GridContainer> 
                <GridItem xs={12} sm={12} md={12}>
                  <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.isAdmin}
                        onChange={this.checkAdmin("isAdmin")}
                        value="isAdmin"
                      />
                    }
                    label="Administrador(a)"
                  />
                  </FormGroup>                  
                </GridItem>
              </GridContainer>

              {/*<GridContainer>   
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Posição"
                    id="company-disabled"
                    formControlProps={{fullWidth: true}}
                    inputProps={{disabled: true}}
                  />
                  <RadioGroup className={classes.group}
                    aria-label="Posição"
                    name="posicao"
                    className={classes.group}
                    value={this.state.posicao}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel value="admin" control={<Radio />} label="Administrador(a)" />
                    <FormControlLabel value="prof" control={<Radio />} label="Professor(a)" />
                    <FormControlLabel value="pai" control={<Radio />} label="Parente" />                      
                  </RadioGroup>
                </GridItem>                            
                
              </GridContainer> */}             
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={this.cadastrarProf}>Cadastrar</Button>
            </CardFooter>
          </Card>
        </GridItem>        
      </GridContainer>
    </div>
  )};
}

export default withStyles(styles)(CadastrarProf);
