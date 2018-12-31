// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import BubbleChart from "@material-ui/icons/BubbleChart";
import DateRange from "@material-ui/icons/DateRange";
import Apps from "@material-ui/icons/Apps";

//pages
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Agenda from "views/Agenda/Agenda.jsx";
import Icons from "views/Icons/Icons.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";

//admin
import CadastrarAluno from "views/Administrativo/CadastrarAluno.jsx";
import CadastrarTurma from "views/Administrativo/CadastrarTurma.jsx";
import CadastrarProf from "views/Administrativo/CadastrarProf.jsx";

//habilidades
import Faixa1 from "views/Habilidades/Faixa1.jsx";
import Faixa2 from "views/Habilidades/Faixa2.jsx";
import Faixa3 from "views/Habilidades/Faixa3.jsx";
import NovaHabilidade from "views/Habilidades/NovaHabilidade.jsx";

//planos
import PlanoDiario from "views/Planejamento/PlanoDiario.jsx";
import PlanoAnual from "views/Planejamento/PlanoAnual.jsx";
import PlanoPeriodico from "views/Planejamento/PlanoPeriodico.jsx";
import PlanoSemanal from "views/Planejamento/PlanoSemanal.jsx";

//global vars
import { isAdmin } from "variables/globals";

var dashboardRoutes = [
  {
    path: "/agenda", name: "Agenda", icon: 'dashboard', component: Agenda
  }, {
    path: "/banco", name: "Banco das Habilidades", icon: "content_paste", state: "openBanco",
    collapse: true, views: [
      { path: "/banco/faixa1", name: "zero - 1 ano e 1/2", mini: "•", component: Faixa1 },
      { path: "/banco/faixa2", name: "1 ano e 1/2 - 4 anos", mini: "•", component: Faixa2 },   
      { path: "/banco/faixa3", name: "4 anos - 6 anos", mini: "•", component: Faixa3 }      
    ]  
  }, {
    path: "/plano", name: "Planejamento", icon: DateRange, state: "openPlano",
    collapse: true, views: [
      { path: "/plano/anual", name: "Plano Anual", mini: "•", component: PlanoAnual },
      { path: "/plano/periodico", name: "Plano Periódico", mini: "•", component: PlanoPeriodico },   
      { path: "/plano/semanal", name: "Plano Semanal", mini: "•", component: PlanoSemanal },      
      { path: "/plano/aula", name: "Plano de Aula", mini: "•", component: PlanoDiario }      
    ]  
  }, 

  // {
  //   path: "/user", name: "User Profile", icon: Person, component: UserProfile
  // },  

  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

if (isAdmin) {
  dashboardRoutes.splice(1, 0, 
    { 
      path: "/admin", name: "Administrativo", state: "openAdmin", icon: Apps, 
      collapse: true, views: [
        { path: "/admin/profs", name: "Cadastrar Professor(a)", mini: "•", component: CadastrarProf },
        { path: "/admin/turma", name: "Cadastrar Turma", mini: "•", component: CadastrarTurma },
        { path: "/admin/aluno", name: "Cadastrar Aluno(a)", mini: "•", component: CadastrarAluno }
      ]
    }, 
  );

  dashboardRoutes[2]['views'].push(
    { path: "/banco/admin", name: "Cadastrar Nova", mini: "+", component: NovaHabilidade }
  );
}

export default dashboardRoutes;