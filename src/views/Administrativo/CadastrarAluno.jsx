import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import TextField from '@material-ui/core/TextField';


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

class CadastrarAluno extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /* -- -- FUNCTIONS -- -- */

  /* -- -- RENDER -- -- */
  render() {    
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={styles.cardTitleWhite}>Cadastrar Aluno(a)</h4>
              <p className={styles.cardCategoryWhite}>Preencha os campos abaixo</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Nome completo"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}                    
                  />
                </GridItem>                
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} style={{marginTop:20}}>
                  <TextField
                  id="date"
                  label="Data de nascimento"
                  type="date"
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </GridItem>                
              </GridContainer>
              {/*<GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email do(a) responsável"
                    id="email1"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email do(a) responsável"
                    id="email2"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>                
              </GridContainer>  */}            
            </CardBody>
            <CardFooter>
              <Button color="primary">Adicionar aluno(a)</Button>
            </CardFooter>
          </Card>
        </GridItem>        
      </GridContainer>
    </div>
  )};
}

export default withStyles(styles)(CadastrarAluno);
