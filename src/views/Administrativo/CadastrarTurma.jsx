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
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import Select from 'react-select';

const professores = [
  { id:0, label: 'Alice dos Santos' },
  { id:1, label: 'Aloisio Fonseca' },
  { id:2, label: 'Bartolomeu Dias' },
  { id:3, label: 'Carlos Soares' },
  { id:4, label: 'Cintia dos Reis' },
  { id:5, label: 'Dorival Moraes' },
  { id:6, label: 'Euclides Cunha' },
  { id:7, label: 'Fernanda Matoso' },
  { id:8, label: 'Gabriela Canela' },
  { id:9, label: 'Heitor Pinto' },
  { id:10, label: 'Ilana Laura' }
].map(professores => ({
  value: professores.id,
  label: professores.label,
}));

const faixas = [
  { id:0, label: '0-18 meses' },
  { id:1, label: '19-47 meses' },
  { id:2, label: '48-71 meses' }  
].map(faixas => ({
  value: faixas.id,
  label: faixas.label,
}));

const alunos = [
  { id:0, label: 'Arnaldo Jose' },
  { id:1, label: 'Bernardo Fonseca' },
  { id:2, label: 'Carina Siqueira' },
  { id:3, label: 'David Levi' },
  { id:4, label: 'Flavio Rocha' },
  { id:5, label: 'Gustavo Machado' },
  { id:6, label: 'Marina Lima' },
  { id:7, label: 'Tatiana Viana' }
].map(alunos => ({
  value: alunos.id,
  label: alunos.label,
}));

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

class CadastrarTurma extends React.Component {
  constructor(props) {
    super(props);
    this.state = { faixa: null, prof: null, multi: null, tc:false };
  }

  /* -- -- FUNCTIONS -- -- */
  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
  };

  /* -- -- RENDER -- -- */
  render() {    
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={styles.cardTitleWhite}>Cadastrar Turma</h4>
              <p className={styles.cardCategoryWhite}>Preencha os campos abaixo</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="Nome da turma"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}                    
                  />
                </GridItem> 

                <GridItem xs={12} sm={12} md={4} style={{marginTop:15}}>
                  <label style={{fontSize:12}} data-shrink="true">Faixa etária</label>
                  <Select
                    options={faixas}
                    value={this.state.faixa}
                    onChange={this.handleChange('faixa')}
                    placeholder=""
                    isClearable
                  />
                </GridItem>                              
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} style={{marginTop:15}}>
                  <label style={{fontSize:12}} data-shrink="true">Professor(a)</label>
                  <Select
                    options={professores}
                    value={this.state.prof}
                    onChange={this.handleChange('prof')}
                    placeholder=""
                    isClearable
                  />
                </GridItem>                    
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} style={{marginTop:15}}>
                  <label style={{fontSize:12}} data-shrink="true">Alunos</label>
                  <Select
                    textFieldProps={{
                      label: 'Label',
                      InputLabelProps: {
                        shrink: true,
                      },
                    }}
                    options={alunos}
                    value={this.state.multi}
                    onChange={this.handleChange('multi')}
                    placeholder=""
                    isMulti
                  />
                </GridItem>  
              </GridContainer>              
            </CardBody>
            <CardFooter>
              <Button color="primary">Criar turma</Button>
            </CardFooter>
          </Card>
        </GridItem>        
      </GridContainer>
    </div>
  )};
}

export default withStyles(styles)(CadastrarTurma);
