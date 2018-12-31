import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Select from 'react-select';


import { BASE_URL } from "variables/globals";
import axios from 'axios';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const faixas = [
  { id:0, label: '0-18 meses' },
  { id:1, label: '19-47 meses' },
  { id:2, label: '48-71 meses' }  
].map(faixas => ({
  value: faixas.id,
  label: faixas.label,
}));


class PlanoSemanal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      habilidades: [], 
      s1:null, s2:null, s3:null, s4:null, s5:null, s6:null, s7:null, s8:null, s9:null, s10:null, s11:null, s12:null,
      message:'', color:'danger', tc:false 
    };
  }

  /* ---- FUNCTION ---- */
  componentDidMount() {}

  componentWillUnmount() {}

  handleChange = value => {
    axios.post(BASE_URL + "indicadores.php?event=readByFaixa&faixa=" + value['label'])
    .then((response) => {
      var data = response.data;
      var hab = [];
      for (var i=0; i<data.length; i++) {
        hab.push({id:i, label:data[i]["campo"] + " - " + data[i]["descricao"]});
      }
      this.setState({habilidades:hab.map(hab => ({value: hab.id,label: hab.label,}))});
    }).catch((error) => { this.setState({message:"ERRO - Tente novamente.", color:"danger", tc:true}); });  
  };

  handleChangeMulti = name => value => {
    this.setState({
      [name]: value,
    });
  };

  /* ---- RENDER ---- */
  render() {
    return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={styles.cardTitleWhite}>Planejamento semanal</h4>
              <p className={styles.cardCategoryWhite}>
                Selecione as habilidades a serem avaliadas por semana
              </p>
            </CardHeader>
            <CardBody>

            <GridContainer>
              <GridItem xs={12} sm={12} md={6} style={{marginTop:15}}>
                <label style={{fontSize:12}} data-shrink="true">Faixa etária</label>
                <Select
                  options={faixas}
                  value={this.state.faixa}
                  onChange={this.handleChange}
                  placeholder=""
                  isClearable
                />
              </GridItem>                              
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} style={{marginTop:15}}>
                <label style={{fontSize:16}} data-shrink="true">Primeiro trimestre</label>
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} style={{marginTop:15}}>
                <label style={{fontSize:12}} data-shrink="true">semana 1</label>
                <Select
                  textFieldProps={{
                    label: 'Label',
                    InputLabelProps: {
                      shrink: true,
                    },
                  }}
                  options={this.state.habilidades}
                  value={this.state.s1}
                  onChange={this.handleChangeMulti('s1')}
                  placeholder=""
                  isMulti
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} style={{marginTop:15}}>
                <label style={{fontSize:12}} data-shrink="true">semana 2</label>
                <Select
                  textFieldProps={{
                    label: 'Label',
                    InputLabelProps: {
                      shrink: true,
                    },
                  }}
                  options={this.state.habilidades}
                  value={this.state.s2}
                  onChange={this.handleChangeMulti('s2')}
                  placeholder=""
                  isMulti
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} style={{marginTop:15}}>
                <label style={{fontSize:12}} data-shrink="true">semana 3</label>
                <Select textFieldProps={{label: 'Label',InputLabelProps: {shrink: true,},}}
                  options={this.state.habilidades}
                  value={this.state.s3}
                  onChange={this.handleChangeMulti('s3')}
                  placeholder=""
                  isMulti
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} style={{marginTop:15}}>
                <label style={{fontSize:12}} data-shrink="true">semana 4</label>
                <Select textFieldProps={{label: 'Label',InputLabelProps: {shrink: true,},}}
                  options={this.state.habilidades}
                  value={this.state.s4}
                  onChange={this.handleChangeMulti('s4')}
                  placeholder=""
                  isMulti
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} style={{marginTop:15}}>
                <label style={{fontSize:12}} data-shrink="true">semana 5</label>
                <Select textFieldProps={{label: 'Label',InputLabelProps: {shrink: true,},}}
                  options={this.state.habilidades}
                  value={this.state.s5}
                  onChange={this.handleChangeMulti('s5')}
                  placeholder=""
                  isMulti
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} style={{marginTop:15}}>
                <label style={{fontSize:12}} data-shrink="true">semana 6</label>
                <Select textFieldProps={{label: 'Label',InputLabelProps: {shrink: true,},}}
                  options={this.state.habilidades}
                  value={this.state.s6}
                  onChange={this.handleChangeMulti('s6')}
                  placeholder=""
                  isMulti
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} style={{marginTop:15}}>
                <label style={{fontSize:12}} data-shrink="true">semana 7</label>
                <Select textFieldProps={{label: 'Label',InputLabelProps: {shrink: true,},}}
                  options={this.state.habilidades}
                  value={this.state.s7}
                  onChange={this.handleChangeMulti('s7')}
                  placeholder=""
                  isMulti
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} style={{marginTop:15}}>
                <label style={{fontSize:12}} data-shrink="true">semana 8</label>
                <Select textFieldProps={{label: 'Label',InputLabelProps: {shrink: true,},}}
                  options={this.state.habilidades}
                  value={this.state.s8}
                  onChange={this.handleChangeMulti('s8')}
                  placeholder=""
                  isMulti
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} style={{marginTop:15}}>
                <label style={{fontSize:12}} data-shrink="true">semana 9</label>
                <Select textFieldProps={{label: 'Label',InputLabelProps: {shrink: true,},}}
                  options={this.state.habilidades}
                  value={this.state.s9}
                  onChange={this.handleChangeMulti('s9')}
                  placeholder=""
                  isMulti
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} style={{marginTop:15}}>
                <label style={{fontSize:12}} data-shrink="true">semana 10</label>
                <Select textFieldProps={{label: 'Label',InputLabelProps: {shrink: true,},}}
                  options={this.state.habilidades}
                  value={this.state.s10}
                  onChange={this.handleChangeMulti('s10')}
                  placeholder=""
                  isMulti
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} style={{marginTop:15}}>
                <label style={{fontSize:12}} data-shrink="true">semana 11</label>
                <Select textFieldProps={{label: 'Label',InputLabelProps: {shrink: true,},}}
                  options={this.state.habilidades}
                  value={this.state.s11}
                  onChange={this.handleChangeMulti('s11')}
                  placeholder=""
                  isMulti
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} style={{marginTop:15}}>
                <label style={{fontSize:12}} data-shrink="true">semana 12</label>
                <Select textFieldProps={{label: 'Label',InputLabelProps: {shrink: true,},}}
                  options={this.state.habilidades}
                  value={this.state.s12}
                  onChange={this.handleChangeMulti('s12')}
                  placeholder=""
                  isMulti
                />
              </GridItem>
            </GridContainer>

            </CardBody>
          </Card>
        </GridItem>      
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
  )};
}

export default withStyles(styles)(PlanoSemanal);
