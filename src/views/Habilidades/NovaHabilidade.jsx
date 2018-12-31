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

const campos = [
  { id:0, label: 'O EU, O OUTRO E O NÓS' },
  { id:1, label: 'CORPO, GESTOS E MOVIMENTOS' },
  { id:2, label: 'TRAÇOS, SONS, CORES E FORMAS' },
  { id:3, label: 'ORALIDADE E ESCRITA' },  
].map(campos => ({
  value: campos.id,
  label: campos.label,
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

class NovaHabilidade extends React.Component {
  constructor(props) {
    super(props);
    this.state = { faixa: null, campo: null, tc:false };
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
              <h4 className={styles.cardTitleWhite}>Cadastrar nova habilidade</h4>
              <p className={styles.cardCategoryWhite}>Preencha os campos abaixo</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="Referência"
                    id="ref"
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
                  <label style={{fontSize:12}} data-shrink="true">Campo</label>
                  <Select
                    options={campos}
                    value={this.state.campo}
                    onChange={this.handleChange('campo')}
                    placeholder=""
                    isClearable
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} style={{marginTop:-15}}>
                  <CustomInput
                    labelText="Descrição"
                    id="desc"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>  
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} style={{marginTop:-15}}>
                  <CustomInput
                    labelText="Indicadores"
                    id="indic"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>                           
            </CardBody>
            <CardFooter>
              <Button color="primary">Criar nova habilidade</Button>
            </CardFooter>
          </Card>
        </GridItem>        
      </GridContainer>
    </div>
  )};
}

export default withStyles(styles)(NovaHabilidade);
