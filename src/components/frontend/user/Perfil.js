import React, { Component } from 'react';
import Menu from './../container/Menu';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Helpers from './../helpers/Helpers';
import MIDestinos from './destinos/MIDestinos';
import MIPublic from './publicaciones/MIPublic';
import PublicacionesContainer from './publicaciones/PublicacionesContainer';
import DestinosUser from './destinos/DestinosUser';
import { Form, Button, ProgressBar, Spinner, Tab, Row, Col, Nav, Image } from 'react-bootstrap'
import firebase from 'firebase/app'
import {ToastsContainer, ToastsStore } from 'react-toasts';
import Footer from './../container/Footer'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import MIHospedaje from './hospedaje/MIHospedaje';
import HospedajeUser from './hospedaje/HospedajeUser';
import MIActividades from './actividades/MIActividades';
import ActividadesUser from './actividades/ActividadesUser';
import Select from 'react-select';

const SimpleDialog = (props) => {  
  const { onClose, selectedValue, open, signOut } = props;

  const handleClose = () => {
    onClose(selectedValue);
  }
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Configuraciones</DialogTitle>
        <List>
          <ListItem autoFocus button onClick={signOut}>
            <ListItemAvatar>
              <Avatar>
                <ExitToAppIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Salir" />
          </ListItem>
        </List>
      </Dialog>
    );
}
class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '', comuna: '', region: '', genero: '', intereses: '', descripcion: '', 
      nacimiento: '', url: '',validateUser: '', nameUser: '', uid: '', ActivityIndicator_Loading: false,
      ActivityIndicator: false, activityInput: false, open: false, optionsTitlesActividades: [], optionsTitlesHospedaje: [],
      totalActivitiesWaiting: 0, optionsTitlesActividadesName: [], selectedArray: [], dataComunas: [], optionsTitlesDestinos: [],
      options: [], optionTypeActivities: [], optionsServicesTitle: [], optionsReglasTitle: []
    };
  }
  async componentDidMount(){
    try{
      this.setState({ ActivityIndicator_Loading : true }, () => {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            this.setState({
              nameUser: user.displayName,
              uid: user.uid
            });
            Helpers.getUser(user.uid, (user) => {
              this.setState({
                nombre: user.name,
                validateUser: user.name,
                comuna: user.comuna,
                region: user.region,
                genero: user.genero,
                selectedArray: user.intereses,
                descripcion: user.descripcion,
                nacimiento: user.nacimiento,
                url: user.url,
                ActivityIndicator_Loading: false
              })
            })
            Helpers.getServices((services) => {
              this.setState({
                optionsServicesTitle: services
              });
            })
            Helpers.getAllIntereses((intereses) => {
              this.setState({
                options: intereses
              });
            })
            Helpers.getReglas((rulz) => {
              this.setState({
                optionsReglasTitle: rulz
              });
            })
            Helpers.getTypeActivities((activitiesType) => {
              this.setState({
                optionTypeActivities: activitiesType
              });
            })
            Helpers.getDestinosTitle((destiny) => {
                this.setState({
                  optionsTitlesHospedaje: destiny
                });
            })
            Helpers.getActivityTitle((activities) => {
              this.setState({
                optionsTitlesActividadesName: activities
              });
            })
            Helpers.getComunas((comunas) => {
              this.setState({
                dataComunas: comunas
              });
            })
            
          } else {
            // No user is signed in.
            window.location.href = "http://viajerouniversal.com/#/";
          }
        }.bind(this));
      });
    }catch(error){
        console.log(error)
    }
  }
  
  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }
handleSubmit = event => {
    event.preventDefault();
    const file = event.target.portada.files[0]
    if(this.state.uid){
      try{
          if(this.state.nombre) {Helpers.setUserName(this.state.uid, this.state.nombre)} 
          if(this.state.comuna) {Helpers.setUserComuna(this.state.uid, this.state.comuna)}
          if(this.state.region) {Helpers.setUserRegion(this.state.uid, this.state.region)} 
          if(this.state.genero) {Helpers.setUserGenero(this.state.uid, this.state.genero)} 
          if(this.state.descripcion) {Helpers.setUserDescripcion(this.state.uid, this.state.descripcion)} 
          if(this.state.nacimiento) {Helpers.setUserFNacimiento(this.state.uid, this.state.nacimiento)} 
          if(file != null){
            if(file.size < 3431990){
              Helpers.uploadImageUser(file, this.state.uid, (snap) => {
                this.setState({ActivityIndicator: true}, () => {
                    if(snap === 100){
                      this.setState({ ActivityIndicator : false, divAlertMB: false });
                    }else{
                      this.setState({
                        valueSpinner: snap
                      })
                    }
                })
              });
            }else{
              console.log('La imagen no puede ser mayor a 3MB')
              this.setState({
                divAlertMB: true
              })
            }
          }
          ToastsStore.success("Se han guardado los cambios.");
      }catch(error){
          console.log(error)
      }
  }
}

  onSelect = (item) => {
    if(item.length <= 13){
      Helpers.setUserIntereses(this.state.uid, item)
    }else{
      ToastsStore.success("Solo puedes agregar 13 intereses.");
    }
  }
  handleClickOpen = () => {
    this.setState({
      open: true
    })
  }
  handleClose = (value) => {
    this.setState({
      open: false,
      selectedValue: value
    })
  }
  signOut = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });    
  }
  render() {
    let widthScreen = null
    window.screen.width < 1024 ? widthScreen = 12 : widthScreen = null
    return (
      <div style={{backgroundColor:'#f1f4f7'}}>
          <Menu />
          {this.state.ActivityIndicator_Loading ? 
            <MDBContainer>
                <MDBRow style={{marginTop: '30%', paddingBottom: '50%'}}>
                    <MDBCol md="5"></MDBCol>
                    <MDBCol md="2">
                        <Spinner animation="border" size="lg" className="text-center" /> <span className="text-center" >Cargando...</span>
                    </MDBCol>
                    <MDBCol md="5"></MDBCol>
                </MDBRow>
            </MDBContainer>
          : 
            <div style={{flex: 1}}>
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="4">
                    <Form onSubmit={this.handleSubmit}>
                      <p className="h4 text-center mb-4" style={{marginTop: 20}}>Datos Personales {widthScreen !== 12 ? <SettingsIcon style={{fontSize: '2rem', cursor: 'pointer'}} onClick={this.handleClickOpen} /> : null}
                        <SimpleDialog selectedValue={this.state.selectedValue} open={this.state.open} onClose={this.handleClose} signOut={this.signOut} /></p>
                      {this.activityInput ?
                            <MDBContainer>
                                <MDBRow style={{marginTop: '30%', paddingBottom: '50%'}}>
                                    <MDBCol md="5"></MDBCol>
                                    <MDBCol md="2">
                                        <Spinner animation="border" size="lg" className="text-center" /> <span className="text-center" >Cargando...</span>
                                    </MDBCol>
                                    <MDBCol md="5"></MDBCol>
                                </MDBRow>
                            </MDBContainer>
                      :
                          <div>
                            {widthScreen === 12 ? 
                                <MDBCol xs="12" style={{marginBottom: '3%'}}>
                                    {this.state.ActivityIndicator ? 
                                      <ProgressBar variant="success" now={this.state.valueSpinner} label={`${this.state.valueSpinner}%`}/>
                                    : 
                                    this.state.url ? 
                                      <div style={{
                                          backgroundImage: "url(" + this.state.url + ")",
                                          backgroundPosition: 'center',
                                          backgroundSize: 'contain',
                                          backgroundRepeat: 'no-repeat',
                                          maxWidth: 150,
                                          height: 150,
                                          borderRadius: 100
                                          }}>
                                      </div>
                                    : 
                                      <Image src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image2.png?alt=media&token=04203eaf-1fbd-439b-b2d1-88d227793338" thumbnail />
                                    }
                                </MDBCol> 
                              :
                                null
                              }                     
                              <ToastsContainer store={ToastsStore}/>
                              <label className="grey-text">NOMBRE</label>
                              <input type="text" name="nombre" readOnly className="form-control" value={this.state.nombre || ''} />
                              <label className="grey-text">COMUNA</label>
                              <Select 
                                options={this.state.dataComunas} 
                                // value={this.state.comuna} 
                                value={this.state.dataComunas.filter(option => option.label === this.state.comuna)}
                                placeholder="Buscar..." 
                                onChange={opt => this.setState({comuna: opt.value})} 
                              />
                              {/* <input type="text" name="comuna" onChange={this.handleChange} className="form-control" value={this.state.comuna || ''} /> */}

                              <label className="grey-text">REGIÓN</label>
                              <select name="region" onChange={this.handleChange} className="form-control" value={this.state.region || ''} >
                                      <option value="0"> -- Seleccionar Región -- </option>
                                      <option value="Tarapacá">I de Tarapacá (Capital: Iquique)</option>
                                      <option value="Antofagasta">II de Antofagasta (Capital: Antofagasta)</option>
                                      <option value="Atacama">III de Atacama (Capital: Copiapó)</option>
                                      <option value="Coquimbo">IV de Coquimbo (Capital: Coquimbo)</option>
                                      <option value="Valparaíso">V de Valparaíso (Capital: Valparaíso)</option>
                                      <option value="O'Higgins">VI del Libertador General Bernardo O'Higgins (Capital: Rancagua)</option>
                                      <option value="Maule">VII del Maule (Capital: Talca)</option>
                                      <option value="Biobío">VIII de Biobío (Capital: Concepción)</option>
                                      <option value="Araucanía">IX de la Araucanía (Capital: Temuco)</option>
                                      <option value="Los Lagos">X de Los Lagos (Capital: Puerto Montt)</option>
                                      <option value="Aysén">XI de Aysén del General Carlos Ibañez del Campo (Capital: Coyhaique)</option>
                                      <option value="Magallanes">XII de Magallanes y de la Antártica Chilena (Capital: Punta Arenas)</option>
                                      <option value="Metropolitana">RM Metropolitana de Santiago (Capital: Santiago)</option>
                                      <option value="Los Ríos">XIV de Los Ríos (Capital: Valdivia)</option>
                                      <option value="Arica">XV de Arica y Parinacota (Capital: Arica)</option>
                                      <option value="Ñuble">XVI del Ñuble (Capital: Chillán)</option>
                                </select>

                              <label className="grey-text">FECHA NACIMIENTO</label>
                              <input type="date" name="nacimiento" onChange={this.handleChange} className="form-control" value={this.state.nacimiento || ''} />

                              <label className="grey-text" >GÉNERO</label>
                              <select name="genero" onChange={this.handleChange} className="form-control" value={this.state.genero || ''} >
                                      <option value="0"> -- Seleccionar Genero -- </option>
                                      <option value="Mujer">Mujer</option>
                                      <option value="Hombre">Hombre</option>
                                </select>

                              <label className="grey-text">INTERESES</label>
                                <Select 
                                    isMulti
                                    options={this.state.options} 
                                    placeholder="Buscar..." 
                                    onChange={opt => this.onSelect(opt)} 
                                    closeOnSelect={false}
                                    value={this.state.selectedArray}
                                />

                              <label className="grey-text">DESCRIPCIÓN PERSONAL</label>
                              <textarea type="text" name="descripcion" onChange={this.handleChange} className="form-control" rows="3"  value={this.state.descripcion || ''}/>
                          </div>
                      }
                      
                      
                      <label className="grey-text">FOTO PERFIL</label>
                      <input type="file" name="portada" className="form-control" />
                      {this.state.divAlertMB ? 
                        <div className="alert alert-danger">
                          <strong>Atención!</strong> Las imagenes no pueden superar los 3MB.
                        </div> 
                        : 
                        null
                      }

                      <div className="text-left mt-4">
                        <Button variant="success" type="submit" style={{backgroundColor: '#fb6012',borderColor: '#fb6012'}}>GUARDAR</Button>
                      </div>
                    </Form>
                    
                  </MDBCol>
                  {widthScreen !== 12 ? 
                    <MDBCol md="8">
                      <Col xs={12} md={8}>
                          <p className="h4 text-center mb-4"></p>
                          <br />
                          {this.state.ActivityIndicator ? 
                          // <Spinner animation="border" /> 
                          <ProgressBar variant="success" now={this.state.valueSpinner} label={`${this.state.valueSpinner}%`}/>
                          : 
                          this.state.url ? 
                          <Image src={this.state.url} thumbnail />
                          : 
                          <Image src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image2.png?alt=media&token=04203eaf-1fbd-439b-b2d1-88d227793338" thumbnail />
                          }
                          
                      </Col>
                    </MDBCol> 
                  :
                    null
                  }
                                   
                </MDBRow> 
              </MDBContainer>
              <MDBContainer style={{marginTop: 50}}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <Row>
                    <Col sm={3}>
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="first">Mochileros</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">Destinos</Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item>
                          <Nav.Link eventKey="colaborativo">Colaborativo</Nav.Link>
                        </Nav.Item> */}
                        <Nav.Item>
                          <Nav.Link eventKey="store">Tienda</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="rent">Hospedajes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="activities">Actividades</Nav.Link>
                        </Nav.Item>
                        
                      </Nav>
                    </Col>
                    <Col sm={9}>
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <MIPublic uid={this.state.uid} dataPersonal={this.state.validateUser || 'NN'} />
                          <PublicacionesContainer />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <MIDestinos uid={this.state.uid}  dataPersonal={this.state.validateUser || 'NN'}/>
                          <DestinosUser />
                        </Tab.Pane>
                        <Tab.Pane eventKey="store">
                          <div className="alert alert-info">
                            <strong>Próximamente! podrás vender tus productos para viajeros!</strong>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="rent">
                            <MIHospedaje uid={this.state.uid} comunas={this.state.dataComunas} dataPersonal={this.state.validateUser || 'NN'} optionReglas={this.state.optionsReglasTitle} optionActividades={this.state.optionsTitlesActividadesName} optionsServices={this.state.optionsServicesTitle} optionsDestinos={this.state.optionsTitlesHospedaje}/>
                            <HospedajeUser />
                        </Tab.Pane>
                        <Tab.Pane eventKey="activities">
                            <MIActividades uid={this.state.uid} optionServices={this.state.optionTypeActivities} dataPersonal={this.state.validateUser || 'NN'} optionsDestinos={this.state.optionsTitlesHospedaje}/>
                            <ActividadesUser />
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </MDBContainer>
              <Footer />
            </div>
          }
          
        </div>
    );
  }
}

export default Perfil


