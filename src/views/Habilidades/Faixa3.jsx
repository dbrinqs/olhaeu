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

class Faixa3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { habilidades:[], message:'', color:'danger', tc:false };
  }

  /* ---- FUNCTION ---- */
  componentWillMount () {
    axios.post(BASE_URL + "indicadores.php?event=readByFaixa&faixa=48-71 meses")
    .then((response) => {
      var data = response.data;
      var hab = [];
      for (var i=0; i<data.length; i++) {
        hab.push([data[i]["ref"], data[i]["campo"], data[i]["descricao"], data[i]["indicadores"]]);
      }
      this.setState({habilidades:hab});
    }).catch((error) => { this.setState({message:"ERRO - Tente novamente.", color:"danger", tc:true}); });  
  }

  /* ---- RENDER ---- */
  render() {
    return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={styles.cardTitleWhite}>Banco da Habilidades</h4>
              <p className={styles.cardCategoryWhite}>
                Faixa etária de 48 - 71 meses
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Referência", "Campo", "Descrição", "Indicadores"]}
                tableData={this.state.habilidades}
              />
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

export default withStyles(styles)(Faixa3);
