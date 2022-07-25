import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
    Switch,
    Route,
    HashRouter
  } from "react-router-dom";
import Publicaciones from './components/frontend/publicaciones/Publicaciones';
import App from './App';
import DetailPublic from './components/frontend/publicaciones/detailPublic';
import Perfil from './components/frontend/user/Perfil';
import EditPublic from './components/frontend/user/publicaciones/editPublic';
import Colaborativo from './components/frontend/colaborativo/Colaborativo';
import PerfilPublico from './components/frontend/publico/PerfilPublico';
import Actividades from './components/frontend/actividades/';
import DetailActivity from './components/frontend/actividades/indexDetail';
import Hospedajes from './components/frontend/hospedajes/Hospedajes.js';
import DetailHospedajes from './components/frontend/hospedajes/DetailHospedajes.js';
import EditarHospedaje from './components/frontend/user/hospedaje/EditHospedaje';
import Terminos from './components/frontend/publico/Terminos';
import Politicas from './components/frontend/publico/Politicas';
import Groups from './components/frontend/groups/Groups';
import Destinos from './components/frontend/destinos/';
import DetailDestinos from './components/frontend/destinos/indexDetail';
import Reglas from './components/frontend/publico/Reglas';

ReactDOM.render(<HashRouter>
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/publicaciones" component={Publicaciones} />
                        <Route path="/actividades" component={Actividades} />
                        <Route path="/destinos" component={Destinos} />
                        <Route path="/actividad/:idActividad" component={DetailActivity} />
                        <Route path="/destino/:idDestino" component={DetailDestinos} />
                        <Route path="/publicacion/:idPublic" component={DetailPublic} />
                        <Route path="/editarPublicacion/:idPublic" component={EditPublic} />
                        <Route path="/editarHospedaje/:idHospedaje" component={EditarHospedaje} />
                        <Route path="/perfil/" component={Perfil} />
                        <Route path="/colaborativo/" component={Colaborativo} />
                        <Route path="/hospedajes" component={Hospedajes} />
                        <Route path="/hospedaje/:idHospedaje" component={DetailHospedajes} />
                        <Route path="/user/:usr_id" component={PerfilPublico} />
                        <Route path="/terminos_y_condiciones/" component={Terminos} />
                        <Route path="/politicas/" component={Politicas} />
                        <Route path="/groups/" component={Groups} />
                        <Route path="/reglas/" component={Reglas} />
                    </Switch>
                </HashRouter> , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
