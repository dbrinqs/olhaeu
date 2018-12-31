import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Table from "components/Table/Table.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Tasks from "components/Tasks/Tasks.jsx";

//icon
import Cancel from "@material-ui/icons/Cancel";
import Delete from "@material-ui/icons/Delete";

//widgets
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import DropdownList from 'react-widgets/lib/DropdownList';
import Combobox from 'react-widgets/lib/Combobox';
import SelectList from 'react-widgets/lib/SelectList';

//post/get
import { BASE_URL } from "variables/globals";
import axios from 'axios';

// agenda and translation
import { ReactAgenda , guid, Modal } from 'react-agenda';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
require('moment/locale/pt.js');
require('moment')().format('YYYY-MM-DD HH:mm:ss');
Moment.locale('pt');
momentLocalizer();




//======================= STYLE ========================
const style = {
  cardCategoryWhite: { color: "rgba(255,255,255,.62)", margin: "0", fontSize: "14px", marginTop: "0", marginBottom: "0" },
  cardTitleWhite: { color: "#FFFFFF", marginTop: "0px", minHeight: "auto", fontWeight: "300", fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", marginBottom: "3px", textDecoration: "none" }
};

//======================= VARIAVEIS ========================
var campos = ['O EU, O OUTRO E O NÓS', 'CORPO, GESTOS E MOVIMENTOS', 'TRAÇOS, SONS, CORES E FORMAS', 'ORALIDADE E ESCRITA', 'ESPAÇOS, TEMPOS, QUANTIDADES, RELAÇÕES E TRANSFORMAÇÕES'];
var colors= {
  'color-1':"rgba(0, 172, 193, 1)" ,
  "color-2":"rgba(239, 181, 107, 1)" ,
  "color-3":"rgba(231, 99, 148, 1)",
  "color-4":"rgba(114, 209, 180, 1)",
  "color-5":"rgba(254, 206, 26, 1)"
}

var now = new Date();
var modalOpen = false;
var mode = 'edit';

 
var items = [
  {
    _id            : guid(),
    name          : 'Modelando com argila',
    desc          : 'Fazer figuras de argilas e contar uma historia com elas',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    indicador     : 'EI01EO06-Construir formas de interação com outras crianças da mesma faixa etária.\nConstruir formas de interação com crianças de outras faixas etárias e adolescentes.\nConstruir formas de interação com adultos.\nAdaptar-se ao convívio social.',
    classes       : 'color-2'
  },
  {
    _id            : guid(),
    name          : 'Pintura com os dedos',
    desc          : 'Usar tinta quache para fazer paisagens',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 13, 0),
    indicador     : 'EI01EO07-Demonstrar sentimentos de afeição pelas pessoas com as quais interage.',
    classes       : 'color-2'
  }, 
];

//var profs = ['Maria Jose', 'Professora Helena', 'Tia Claudia'];
var turmas = [{id:0, nome:'Jardim Encantado'}, {id:1, nome:'Jardim C'}, {id:2, nome:'Maternal 1'}];
var obj = [{id:0, nome:'Carlos'}, {id:1, nome:'Duda'}, {id:2, nome:'Artur'}];
var alunos = ['Philip Chaney', 'Doris Greene', 'Mason Porter'];
var alunosData = [];

var indicadores = [
  {campo:'O EU, O OUTRO E O NÓS', id:'EI01EO06', faixa:0, index:0, 
    desc:'Construir formas de interação com outras crianças da mesma faixa etária.\nConstruir formas de interação com crianças de outras faixas etárias e adolescentes.\nConstruir formas de interação com adultos.\nAdaptar-se ao convívio social.'},

  {campo:'O EU, O OUTRO E O NÓS', id:'EI01EO07', faixa:0, index:1,
    desc:'Demonstrar sentimentos de afeição pelas pessoas com as quais interage.'},

  {campo:'O EU, O OUTRO E O NÓS', id:'EI01EO08', faixa:0, index:2,
    desc:'Desenvolver confiança em si, em situações de interação. Desenvolver confiança em seus pares, em situações de interação. Desenvolver confiança nos Adultos, em situações de interação.'},

  {campo:'TRAÇOS, SONS, CORES E FORMAS', id:'EI01TS01', faixa:0, index:3,
    desc:'Explorar sons produzidos com o próprio corpo. Explorar sons produzidos com objetos do ambiente.'}
]

class PlanoDiario extends React.Component {
  //======================= CONSTRUCTORS ========================
  constructor(props){
    super(props);
    this.state = {
      tc:false, alertColor:"danger", alertMsg:"", alertIcon:undefined,
      items:items, stateDelItems:[], selected:[], cellHeight:30, showModal:false, showAtiv:false,
      locale:"pt", rowsPerHour:1, numberOfDays:1, profValue:"", turmaValue:"", indicValue:"", indicador:{},
      modaltitle:"", modalSubT:"", modalBtn:"", notas:[], 
      startDate: new Date(), startAtiv: new Date(), startTime: new Date(), endTime: new Date(), 
      open:false, openAtiv: false, openTime: false, openIndic: false, openTEnd:false
    }
    this.alertTimeout = null;
  }

  componentDidMount = () => { 
    this.setState({items:items});
    this.clearAlertTimeout(); 
  }

  componentWillReceiveProps = (next , last) => {
    if(next.items){ this.setState({items:next.items}); }
  }

  //======================= FUNCTIONS ======================== 
  
  closeDateTimePicker = () => { this.setState({open:false}); }
  openDateTimePicker = () => {
    if (this.state.open === 'date') { this.setState({open:false}); }
    else { this.setState({open:'date'}); }
  }  
  
  closeAtivTEndPicker = () => { this.setState({openTEnd:false}); }
  openAtivTEndPicker = () => {
    if (this.state.openTEnd === 'date') { this.setState({openTEnd:false}); } 
    else { this.setState({openTEnd:'time'}); }        
  }
  
  closeAtivDatePicker = () => { this.setState({openAtiv:false}); }
  openAtivDatePicker = () => {
    if (this.state.openAtiv === 'date') { this.setState({openAtiv:false}); } 
    else { this.setState({openAtiv:'date'}); } 
  }
  
  closeAtivTimePicker = () => { this.setState({openTime:false}); }
  openAtivTimePicker = () => {
    if (this.state.openTime === 'time') { this.setState({openTime:false}); }
    else { this.setState({openTime:'time'}); } 
  }

  closeIndicador = () => { this.setState({openIndic:false}); }
  toggleOpenIndicador = () => {
    if (this.state.openIndic === false) { this.setState({openIndic:true}); } 
    else { this.setState({openIndic:false}); }
  }

  //=============  

  _openModal = (ativ=false) => { 
    if (modalOpen === true) return;
    if (ativ) this.setState({showAtiv:true}); 
    else this.setState({showModal:true}); 
    modalOpen = true;
  }
  _closeModal = (e) => {
    if(e){
      e.stopPropagation();
      e.preventDefault();
    }
    modalOpen = false;
    this.setState({showModal:false, showAtiv:false});
  }

  zoomIn = () => { 
    var num = this.state.cellHeight + 15;
    this.setState({cellHeight:num});
  }

  zoomOut = () => {
    var num = this.state.cellHeight - 15;
    this.setState({cellHeight:num});
  }

  handleCellSelection = (item, openModal) => {
    if(this.state.selected && this.state.selected[0] === item) {
      var hora = item.split('T')[1]; hora = hora.split(':')[0]; 
      if (hora.charAt(0) === '0') hora = hora.charAt(1);      
      this.setState({ modalSubT: "Crie uma atividade para sua turma", modaltitle: "Criar nova atividade",
                      startAtiv: this.state.startDate, 
                      startTime:new Date(this.state.startDate.setHours(hora, 0, 0)), 
                      endTime:new Date(this.state.startDate.setHours(Number(hora) + 1, 0, 0))});

      return this._openModal();
    }
    this.setState({selected:[item]});
  }

  handleDateRangeChange = (startDate, endDate) => { this.setState({startDate:startDate }); }

  handleOnPrevButtonClick = () => {
    var prevStartDate = new Date(this.state.startDate.setTime(this.state.startDate.getTime() - 1 * 86400000));
    this.setState({startDate:prevStartDate })
  }

  handleOnNextButtonClick = () => {
    var nextStartDate = new Date(this.state.startDate.setTime(this.state.startDate.getTime() + 1 * 86400000));
    this.setState({startDate:nextStartDate })
  }

  handleRangeSelection = (selected) => {
    this.setState({selected:selected , showCtrl:true})
    this._openModal();
  }

  handleItemChange = (items , item) => { this.setState({items:items}); }
  handleItemSize = (items , item) => { this.setState({items:items}); }
  changeView = (days , event ) => { this.setState({numberOfDays:days}); }
  
  addNewEvent = (items , newItems) => {
    this.setState({showModal:false, selected:[], items:items});
    this._closeModal();
  }

  showEvent = (item, openModal) => {
    if (modalOpen || mode === 'remove') return;
    mode = 'show';
    this.setState({ modalSubT: item.desc, modaltitle: item.name, modalBtn: "Avaliar",
                    selected: [item], indicador:item.indicador,
                    startAtiv: item.startDateTime, 
                    startTime: item.startDateTime, 
                    endTime: item.endDateTime});
    this.fillAlunosData();
    return this._openModal(true);
  }
  
  editEvent = (items , item) => { this.setState({showModal:false, selected:[], items:items}); this._closeModal(); }  
  handleItemEdit = (item, openModal) => {    
    if(item && openModal === true && this.state.showAtiv === false) {
      mode = 'edit';
      this.setState({ modalSubT: "Edite esta atividade abaixo", modaltitle: "Editar atividade", modalBtn: "Salvar dados",
                      startAtiv: item.startDateTime, startTime: item.startDateTime, endTime: item.endDateTime, 
                      selected: [item] });
      return this._openModal();
    }
  }

  addNewAtividade = () => {
    mode = 'create';
    this.setState({ modalSubT: "Crie uma atividade para sua turma", modaltitle: "Criar nova atividade", modalBtn: "Criar atividade",
                    startAtiv: this.state.startDate, 
                    startTime:new Date(this.state.startDate.setHours(this.state.startDate.getHours() + 1, 0, 0)), 
                    endTime:new Date(this.state.startDate.setHours(this.state.startDate.getHours() + 1, 0, 0))});
    this._openModal();
  }

  callback = (i, e) => {
    this.setState({[i]: e.id});    
  }

  fillAlunosData = () => {
    alunosData = [];
    let options = [{ id:0, name:'ALCANÇOU'}, { id:1, name:'NÃO ALCANÇOU'}, { id:2, name:'NÃO OBSERVADO' }];
    for (var i = 0; i < alunos.length; i++) {
      var keyNota = String(i);
      this.setState({[keyNota]: 2});
      let widget = (
      <SelectList data={options} textField='name' valueField='id'
        value={this.state[i]} onChange={this.callback.bind(this, i)} />);
      alunosData.push([alunos[i], widget]);
    }
  }

  setIndicadorValue = (value) => { this.setState({indicValue:value.id, indicador:value}); }
  setTurmaValue = (value) => { this.setState({turmaValue:value.id}); }
  setProfValue = (value) => { this.setState({profValue:value.id}); }

  removeEvent = (items , item) => { 
    mode = 'remove';
    console.log('removeEvent ' + mode);
    this.setState({stateDelItems:items});
    this.showNotification('Clique para deletar a atividade.', 'warning', "", Delete);
    //this.setState({ items:items}); 
  }

  confirmDelete = (icon=false) => {
    if (!icon) this.setState({ tc: false })
    else this.setState({tc:false, items:this.stateDelItems});
  }

  clearAlertTimeout = () => {
    if (this.alertTimeout !== null) {
      clearTimeout(this.alertTimeout);
    }
  }

  showNotification = (msg, cor, modeEnd="", icon=undefined) => {
    this.setState({alertMsg:msg, alertColor:cor, tc:true, alertIcon:icon});
    this.clearAlertTimeout();
    this.alertTimeout = setTimeout(
      function() { 
        mode = '';
        this.setState({tc:false});
        if(modeEnd !== "") {
          mode = modeEnd;
        }
      }.bind(this), 4000
    );
  }

  saveAtividade = () => {
    if (this.state.profValue !== "" && this.state.turmaValue !== "" && document.getElementById("nome").value !== "" && document.getElementById("desc").value !== "") {      
      axios.post(BASE_URL + "atividades/create.php?nome=" + document.getElementById("nome").value + "&descricao=" + document.getElementById("desc").value + "&indicador=" + this.state.indicValue + "&professor=" + this.state.profValue + "&turma=" + this.state.turmaValue + "&inicio=" + this.toMySqlFormat(this.state.startTime) + "&fim=" + this.toMySqlFormat(this.state.endTime))
      .then((response) => {
        console.log(response.data);
        if (response.data.message === true) {
          var ativ = { _id:response.data.id, name:document.getElementById("nome").value, desc:document.getElementById("desc").value, startDateTime:this.state.startTime, endDateTime:this.state.endTime, indicador:this.state.indicValue+'-'+this.state.indicador.desc, classes:'color-1' };
          items.push(ativ);
          this._closeModal();
        } else {           
          this.showNotification("ERRO - Cheque os dados e tente novamente.", "danger");    
        }
      }).catch((error) => { this.showNotification("ERRO - Tente novamente.", "danger"); });  
    } else {
      this.showNotification("ATENÇÃO - Preencha todos os campos.", "warning");  
    }
  }

  twoDigits = (d) => {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
  }

  toMySqlFormat = (d) => {
    return d.getUTCFullYear() + "-" + this.twoDigits(1 + d.getUTCMonth()) + "-" + this.twoDigits(d.getUTCDate()) + " " + this.twoDigits(d.getHours()) + ":" + this.twoDigits(d.getMinutes()) + ":00";
  }

  submit = () => {
    if (mode === 'edit') {

    } else if (mode === 'show') {
      for (var i = 0; i < alunos.length; i++) {
        console.log(this.state[i]);
      }
    } else if (mode === 'create') {
      if (this.saveAtividade()) this._closeModal();
      else this.showNotification("ERRO - Por favor tente novamente.", "warning", "create");
    }
  }

  

  
  //======================= RENDER ========================

  render() {
    let ListItem = ({ item }) => (
      <span>
        <strong>{item.id}</strong>
        {" " + item.desc}
      </span>
    );

  return (
    <div>

    <Card>
      <CardHeader color="primary">
        <h4 className={style.cardTitleWhite}>Plano Diário</h4>
        <p className={style.cardCategoryWhite}>
          Programar atividades por dia
        </p>
      </CardHeader>
      
      <CardBody>
        <div className="content-expanded ">
        
        <div>
          <DateTimePicker culture='pt' format='dddd DD MMMM Y' time={false} className="testeWidget"
            open={this.state.open} value={this.state.startDate} onClick={this.openDateTimePicker} onBlur={this.closeDateTimePicker} onChange={startDate => this.setState({ startDate })} onToggle={open => this.setState({ open })}/>          
        </div>

        <div className="control-buttons">
          <button  className="button-control" onClick={this.zoomIn}> <i className="zoom-plus-icon"></i> </button>
          <button  className="button-control" onClick={this.zoomOut}> <i className="zoom-minus-icon"></i> </button>

          <button className="button-control" onClick={this.handleOnPrevButtonClick}><i className="agenda__prev"></i><i className="padTop">ANTES</i></button>
          <button className="button-control" onClick={this.handleOnNextButtonClick}><i className="padTop">DEPOIS</i><i className="agenda__next"></i></button>
          <button className="button-control" onClick={this.addNewAtividade}><i className="schedule-icon"></i><i className="padTop">NOVA ATIVIDADE</i></button>

          {/*<button  className="button-control" onClick={this.changeView.bind(null , 7)}> {moment.duration(7, "days").humanize()}  </button>
          <button  className="button-control" onClick={this.changeView.bind(null , 3)}> {moment.duration(3, "days").humanize()}  </button>
          <button  className="button-control" onClick={this.changeView.bind(null , 1)}> {moment.duration(1, "day").humanize()} </button>*/}
        </div>

        
        <ReactAgenda className="addScroll"
          //minDate={new Date(now.getFullYear(), now.getMonth()-3)}
          //maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
          startDate={this.state.startDate}
          startAtTime={10}
          cellHeight={this.state.cellHeight}
          locale="pt"
          items={this.state.items}
          numberOfDays={this.state.numberOfDays}
          headFormat={"ddd DD MMM"}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={colors}
          //itemComponent={AgendaItem}
          view="calendar"
          autoScale={false}
          fixedHeader={true}
          //onRangeSelection={this.handleRangeSelection.bind(this)}
          onChangeEvent={this.handleItemChange.bind(this)}
          onChangeDuration={this.handleItemSize.bind(this)}
          onItemEdit={this.handleItemEdit.bind(this)}
          onCellSelect={this.handleCellSelection.bind(this)}
          onItemShow={this.showEvent.bind(this)}
          onItemRemove={this.removeEvent.bind(this)}
          onDateRangeChange={this.handleDateRangeChange.bind(this)} />
          {
            this.state.showModal?
            <Modal frameless={true} clickOutside={this._closeModal}>              
              <div className="modal-content">                
                <Card>
                  <CardHeader color="primary">
                    <GridContainer>
                      <GridItem xs={10} sm={10} md={10}>
                        <h4 className={style.cardTitleWhite}>{this.state.modaltitle}</h4>                    
                        <p className={style.cardCategoryWhite}>{this.state.modalSubT}</p>
                      </GridItem>
                      <GridItem xs={2} sm={2} md={2}>
                        <Cancel className="modal-cancel" onClick={this._closeModal} />
                      </GridItem>
                    </GridContainer>
                  </CardHeader>

                  <CardBody className="addScroll">  
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <label>Professor(a)*</label>
                        <DropdownList filter data={obj} valueField='id' value={this.state.profValue} onChange={value => this.setProfValue(value)}
                          textField="nome"/>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <label>Turma*</label>
                        <DropdownList filter data={turmas} valueField='id' value={this.state.turmaValue} onChange={value => this.setTurmaValue(value)} textField="nome"/>
                      </GridItem>                                                                                      
                    </GridContainer>
                    <br/>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <label>Data início*</label>
                        <DateTimePicker culture='pt' format='dddd DD MMMM Y' time={false} open={this.state.openAtiv} value={this.state.startAtiv} onChange={startAtiv => this.setState({ startAtiv })} onClick={this.openAtivDatePicker} onBlur={this.closeAtivDatePicker} onToggle={openAtiv => this.setState({ openAtiv })} /> 
                      </GridItem>                                                                  
                    </GridContainer>
                    <br/>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <label>Hora início*</label>
                        <DateTimePicker culture='pt' format='LT' date={false} open={this.state.openTime} value={this.state.startTime} onChange={startTime => this.setState({ startTime })} onClick={this.openAtivTimePicker} onBlur={this.closeAtivTimePicker} onToggle={openTime => this.setState({ openTime })} /> 
                      </GridItem>     
                      <GridItem xs={12} sm={12} md={6}>
                        <label>Hora término</label>
                        <DateTimePicker culture='pt' format='LT' date={false} open={this.state.openTEnd} value={this.state.endTime} onChange={endTime => this.setState({ endTime })} onClick={this.openAtivTEndPicker} onBlur={this.closeAtivTEndPicker} onToggle={openTEnd => this.setState({ openTEnd })} /> 
                      </GridItem>                                         
                    </GridContainer>
                    <br/>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <label>Indicador*</label>
                        <Combobox data={indicadores} groupBy='campo' textField='id' itemComponent={ListItem} open={this.state.openIndic} onToggle={openIndic => this.setState({ openIndic })} onClick={this.toggleOpenIndicador} onBlur={this.closeIndicador} onChange={value => this.setIndicadorValue(value)} />
                      </GridItem>                                           
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput labelText="Nome*" id="nome" formControlProps={{fullWidth: true}}/>
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput labelText="Descrição da atividade." id="desc" formControlProps={{fullWidth: true}}
                          inputProps={{multiline: true, rows: 5}}/>
                      </GridItem>
                    </GridContainer>

                    <CardFooter>
                      <Button color="primary" onClick={this.submit}>{this.state.modalBtn}</Button>
                      <Button color="danger" onClick={this._closeModal}>Cancelar</Button>
                    </CardFooter>                    
                  </CardBody>
                </Card>           

              </div>
            </Modal>:''
          } 

          {/*========= MODAL AVALIACAO =========*/}  

          {
            this.state.showAtiv?
            <Modal frameless={true} clickOutside={this._closeModal}>              
              <div className="modal-content">                
                <Card>
                  <CardHeader color="primary">
                    <GridContainer>
                      <GridItem xs={10} sm={10} md={10}>
                        <h4 className={style.cardTitleWhite}>{this.state.modaltitle}</h4>                    
                        <p className={style.cardCategoryWhite}>{this.state.modalSubT}</p>
                      </GridItem>
                      <GridItem xs={2} sm={2} md={2}>
                        <Cancel className="modal-cancel" onClick={this._closeModal} />
                      </GridItem>
                    </GridContainer>
                  </CardHeader>

                  <CardBody className="addScroll">  
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <label>Indicador</label>
                        <p className="wrapText greyBg">
                        <strong>{this.state.indicador.split('-')[0]}</strong>
                        {"\n" + this.state.indicador.split('-')[1]}
                        </p>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <label>Data</label>
                        <p className="greyBg">{ this.state.startAtiv.toLocaleString('pt', {weekday: 'long'}) + ', ' + this.state.startAtiv.getDate() + '/' + (this.state.startAtiv.getMonth() + 1) + '/' +  this.state.startAtiv.getFullYear() + ', ' + this.state.startTime.getHours() + ':00-' + this.state.endTime.getHours() + ':00'}</p>
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Table
                          tableHeaderColor="primary"
                          tableHead={["Nome", "Observação"]}
                          tableData={alunosData}
                        />
                      </GridItem>
                    </GridContainer>

                    <CardFooter>
                      <Button color="primary" onClick={this.submit}>{this.state.modalBtn}</Button>
                      <Button color="danger" onClick={this._closeModal}>Cancelar</Button>
                    </CardFooter>                    
                  </CardBody>
                </Card>
              </div>
            </Modal>:''
          } 

          <Snackbar
            place="tc"
            icon={this.state.alertIcon}
            color={this.state.alertColor}
            message={this.state.alertMsg}
            open={this.state.tc}
            closeNotification={(icon) => this.confirmDelete(icon)}            
            close
          />  

        </div>
      </CardBody>
    </Card>

    
    </div>
  );}
}

export default withStyles(style)(PlanoDiario);
