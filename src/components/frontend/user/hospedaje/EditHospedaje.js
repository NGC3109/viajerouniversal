
import React, { Component } from 'react';
import Menu from '../../container/Menu';
import Helpers from '../../helpers/Helpers'
import { MDBContainer, MDBCol, MDBRow } from 'mdbreact';
import firebase from 'firebase/app'
import {Form, Col, ProgressBar, Image,Button, Spinner} from 'react-bootstrap'
import {ToastsContainer, ToastsStore } from 'react-toasts';
import Footer from '../../container/Footer'
import Select from 'react-select';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

class EditHospedaje extends Component {
    _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
        data: [], 
        uid: '',
        ActivityIndicator_Loading: false, 
        ActivityIndicatorProgress: false,
        ActivityIndicatorProgress_gal1: false,
        ActivityIndicatorProgress_gal2: false,
        ActivityIndicatorProgress_gal3: false,
        valueSpinner_gal1: 0,
        valueSpinner_gal2: 0,
        valueSpinner_gal3: 0,
        valueSpinner: 0, 
        name: '',
        url: '',
        region: '',
        idRegion: '',
        descripcion: '',
        url_1: '',
        url_2: '',
        url_3: '',
        instagram: '',
        idUsuario: '',
        servicios: [],
        destinos: [],
        actividades: [],
        comuna: '',
        tipo_hospedaje: '',
        precio: '',
        habitaciones: '',
        max_huespedes: '',
        camas: '',
        wc: '',
        reglas: [],
        whatsapp: '',
        galeria: '',
        idHospedaje: props.match.params.idHospedaje,
        comunas: [],
        optionsTitlesActividadesName: [],
        optionsServicesTitle: [],
        optionsReglasTitle: [],
        inputValue: '',
        optionsDestinos: [],
        direccion: ''
    };
    this.textInput = React.createRef();
  }
  async componentDidMount(){
    this.textInput.current.focus();
    this._isMounted = true;
    if(this.state.idHospedaje){
        try{
                this.setState({ ActivityIndicator_Loading : true }, () => {
                    
            if (this._isMounted) {
                    firebase.auth().onAuthStateChanged(function(user) {
                         if (user) {
                           this.setState({
                             nameUser: user.displayName,
                             uid: user.uid
                           });
                           Helpers.getHospedajeDetail(this.state.idHospedaje, (hospedaje) => {
                               if(this.state.uid === hospedaje.idUsuario){
                                 this.setState({
                                     name: hospedaje.name,
                                     url: hospedaje.url,
                                     region: hospedaje.region,
                                     idRegion: hospedaje.idRegion,
                                     descripcion: hospedaje.descripcion,
                                     url_1: hospedaje.url_1,
                                     url_2: hospedaje.url_2,
                                     url_3: hospedaje.url_3,
                                     instagram: hospedaje.instagram,
                                     idUsuario: hospedaje.idUsuario,
                                     servicios: hospedaje.servicios,
                                     destinos: hospedaje.destinos,
                                     actividades: hospedaje.actividades,
                                     comuna: hospedaje.comuna,
                                     tipo_hospedaje: hospedaje.tipo_hospedaje,
                                     precio: hospedaje.precio,
                                     habitaciones: hospedaje.habitaciones,
                                     max_huespedes: hospedaje.max_huespedes,
                                     camas: hospedaje.camas,
                                     wc: hospedaje.wc,
                                     reglas: hospedaje.reglas,
                                     whatsapp: hospedaje.whatsapp,
                                     galeria: hospedaje.galeria,
                                     ActivityIndicator_Loading : false,
                                     direccion: hospedaje.direccion,
                                 })
                             }else{
                                 window.location = "http://viajerouniversal.com/#/"
                             }
                         })
                         Helpers.getComunas((comunas) => {
                             this.setState({
                               comunas
                             });
                         })
                         Helpers.getReglas((rulz) => {
                             this.setState({
                                 optionsReglasTitle: rulz
                             });
                         })
                         Helpers.getServices((services) => {
                           this.setState({
                             optionsServicesTitle: services
                           });
                         })
                         Helpers.getDestinosTitle((destiny) => {
                             this.setState({
                               optionsDestinos: destiny
                             });
                         })
                         Helpers.getActivityTitle((activities) => {
                             this.setState({
                               optionsTitlesActividadesName: activities
                             });
                           })
                         }else{
                             window.location = "http://viajerouniversal.com/#/"
                         }
                       }.bind(this));
                       
                }
            });
          }catch(error){
              console.log(error)
          }
    }else{
        window.location = "http://viajerouniversal.com/#/perfil"
    }
    
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }
  validate = (evt) => {
    var theEvent = evt || window.event;
    var key
    // Handle paste
    if (theEvent.type === 'paste') {
        key = evt.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }
  handleSubmit = event =>{
        event.preventDefault();
        const file = event.target.portada.files[0]
        const url_1 = event.target.url_1.files[0]
        const url_2 = event.target.url_2.files[0]
        const url_3 = event.target.url_3.files[0]
        var region = ""
        if(this.state.idRegion === "1"){
            region = "Tarapacá";
        }else if(this.state.idRegion === "2"){
            region = "Antofagasta";
        }else if(this.state.idRegion === "3"){
            region = "Atacama";
        }else if(this.state.idRegion === "4"){
            region = "Coquimbo";
        }else if(this.state.idRegion === "5"){
            region = "Valparaíso";
        }else if(this.state.idRegion === "6"){
            region = "O'Higgins";
        }else if(this.state.idRegion === "7"){
            region = "Maule";
        }else if(this.state.idRegion === "8"){
            region = "Biobío";
        }else if(this.state.idRegion === "9"){
            region = "Araucanía";
        }else if(this.state.idRegion === "10"){
            region = "Los Lagos";
        }else if(this.state.idRegion === "11"){
            region = "Aysén";
        }else if(this.state.idRegion === "12"){
            region = "Magallanes";
        }else if(this.state.idRegion === "13"){
            region = "Metropolitana";
        }else if(this.state.idRegion === "14"){
            region = "Los Ríos";
        }else if(this.state.idRegion === "15"){
            region = "Arica";
        }else if(this.state.idRegion === "16"){
            region = "Ñuble";
        }
      if(this.state.uid){
        try{
            this.setState({ ActivityIndicator_Loading : true }, () => {
                if(this.state.name) Helpers.hosp_setname(this.state.idHospedaje, this.state.name)
                if(this.state.region) Helpers.hosp_setregion(this.state.idHospedaje, region, this.state.idRegion)
                if(this.state.descripcion) Helpers.hosp_setdescripcion(this.state.idHospedaje, this.state.descripcion)
                if(this.state.instagram) Helpers.hosp_setinstagram(this.state.idHospedaje, this.state.instagram)
                if(this.state.servicios) Helpers.hosp_setservicios(this.state.idHospedaje, this.state.servicios)
                if(this.state.destinos) Helpers.hosp_setdestinos(this.state.idHospedaje, this.state.destinos)
                if(this.state.actividades) Helpers.hosp_setactividades(this.state.idHospedaje, this.state.actividades)
                if(this.state.comuna) Helpers.hosp_setcomuna(this.state.idHospedaje, this.state.comuna)
                if(this.state.tipo_hospedaje) Helpers.hosp_settipo_hospedaje(this.state.idHospedaje, this.state.tipo_hospedaje)
                if(this.state.precio) Helpers.hosp_setprecio(this.state.idHospedaje, this.state.precio)
                if(this.state.habitaciones) Helpers.hosp_sethabitaciones(this.state.idHospedaje, this.state.habitaciones)
                if(this.state.max_huespedes) Helpers.hosp_setmax_huespedes(this.state.idHospedaje, this.state.max_huespedes)
                if(this.state.camas) Helpers.hosp_setcamas(this.state.idHospedaje, this.state.camas)
                if(this.state.wc) Helpers.hosp_setwc(this.state.idHospedaje, this.state.wc)
                if(this.state.reglas) Helpers.hosp_setreglas(this.state.idHospedaje, this.state.reglas)
                if(this.state.whatsapp) Helpers.hosp_setwhatsapp(this.state.idHospedaje, this.state.whatsapp)
                if(this.state.direccion) Helpers.hosp_setdireccion(this.state.idHospedaje, this.state.direccion)                
                this.setState({
                    ActivityIndicator_Loading: false
                })
            });
                if(file != null){
                    if(file.size < 3431990){
                        Helpers.uploadImageHospedaje(file, this.state.idHospedaje, (snap) => {
                            this.setState({ActivityIndicatorProgress: true})
                            if(snap === 100){
                                this.setState({
                                    ActivityIndicatorProgress: false,
                                    divAlertMB: false
                                })
                            }else{
                                this.setState({
                                    valueSpinner: snap
                                })
                            }
                        })
                    }else{
                        this.setState({
                            divAlertMB: true
                        })
                    }
                }
                if(url_1 != null){
                    Helpers.uploadImageHospedajeGal(url_1, this.state.idHospedaje, 'url_1', (snap) => {
                        this.setState({ActivityIndicatorProgress_gal1: true})
                        if(snap === 100){
                            this.setState({
                                ActivityIndicatorProgress_gal1: false,
                                divAlertMB_gal1: false
                            })
                        }else{
                            this.setState({
                                valueSpinner_gal1: snap
                            })
                        }
                    })
                }
                if(url_2 != null){
                    Helpers.uploadImageHospedajeGal(url_2, this.state.idHospedaje, 'url_2', (snap) => {
                        this.setState({ActivityIndicatorProgress_gal2: true})
                        if(snap === 100){
                            this.setState({
                                ActivityIndicatorProgress_gal2: false,
                                divAlertMB_gal2: false
                            })
                        }else{
                            this.setState({
                                valueSpinner_gal2: snap
                            }) 
                        }
                    })
                }
                if(url_3 != null){
                    Helpers.uploadImageHospedajeGal(url_3, this.state.idHospedaje, 'url_3', (snap) => {
                        this.setState({ActivityIndicatorProgress_gal3: true})
                        if(snap === 100){
                            this.setState({
                                ActivityIndicatorProgress_gal3: false,
                                divAlertMB_gal3: false
                            })
                        }else{
                            this.setState({
                                valueSpinner_gal3: snap
                            })
                        }
                    })
                }
                if(this.state.valueSpinner_gal3 === 100 && this.state.valueSpinner_gal2 === 100 && this.state.valueSpinner_gal1 === 100){
                    ToastsStore.success("Datos actualizados");
                    // setTimeout(function(){
                    //     window.location = "http://viajerouniversal.com/#/perfil/"
                    //  }, 2000);
                }
                
        }catch(error){
            console.log(error)
        }
      }
  }
  render() {
    
    return (
    <div style={{backgroundColor:'#f1f4f7'}}>
    <input type="text" ref={this.textInput} style={{position: 'absolute', top: 0, zIndex: -9999}} readOnly/>
        <Menu />
        <ToastsContainer store={ToastsStore}/>
        {this.state.ActivityIndicator_Loading ? 
            <MDBContainer>
                <MDBRow style={{marginTop: '30%'}}>
                    <MDBCol md="5"></MDBCol>
                    <MDBCol md="2">
                        <Spinner animation="border" size="lg" className="text-center" /> <span className="text-center" >Cargando...</span>
                    </MDBCol>
                    <MDBCol md="5"></MDBCol>
                </MDBRow>
            </MDBContainer>
        : 
            <div>
            <MDBContainer>
                <MDBRow style={{marginTop: 30}}>
                    <MDBCol md="6">
                        <Form onSubmit={this.handleSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="name" 
                                        placeholder="Nombre" 
                                        onChange={this.handleChange} 
                                        value={this.state.name || ''} 
                                        required/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Portada</Form.Label>
                                        <Form.Control type="file" name="portada" className="form-control" />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Precio noche</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="precio" 
                                        placeholder="Precio" 
                                        onKeyPress={this.validate}
                                        onChange={this.handleChange} 
                                        value={this.state.precio || ''} 
                                        required/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                    <Form.Label>Servicios</Form.Label>
                                    <div style={{backgroundColor: 'white'}}>
                                            <Select 
                                                isMulti
                                                options={this.state.optionsServicesTitle} 
                                                placeholder="Buscar..." 
                                                onChange={opt => this.setState({servicios: opt})} 
                                                closeOnSelect={false}
                                                value={this.state.servicios}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Tipo Hospedaje</Form.Label>
                                        <Form.Control as="select" name="tipo_hospedaje" onChange={this.handleChange} value={this.state.tipo_hospedaje || ''} required>
                                            <option value="Hospedaje Entero">Hospedaje Entero</option>
                                            <option value="Camping">Camping</option>
                                            <option value="Habitación Privada">Habitación Privada</option>
                                            <option value="Refugio">Refugio</option>
                                            <option value="Habitación Hotel">Habitación Hotel</option>
                                            <option value="Cabaña">Cabaña</option>
                                            <option value="Habitación Compartida">Habitación Compartida</option>
                                            <option value="Hostal">Hostal</option>
                                        </Form.Control>
                                    </Form.Group>
                                    
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                    <Form.Label>Reglas</Form.Label>
                                    <div style={{backgroundColor: 'white'}}>
                                            <Select 
                                                isMulti
                                                options={this.state.optionsReglasTitle} 
                                                placeholder="Buscar..." 
                                                onChange={opt => this.setState({reglas: opt})} 
                                                closeOnSelect={false}
                                                value={this.state.reglas}
                                            />
                                        </div> 
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                    <Form.Label>Max. Huespedes</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    name="max_huespedes" 
                                    placeholder="Huespedes máximos"
                                    onChange={this.handleChange} 
                                    value={this.state.max_huespedes || ''}
                                    onKeyPress={this.validate}
                                    required />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                    <Form.Label>¿Que <span style={{backgroundColor: '#07737f', color: 'white', padding: 4, borderRadius: 5}}>DESTINOS</span> puedes hacer desde tu hospedaje?</Form.Label>
                                    <div style={{backgroundColor: 'white'}}>
                                        <Select 
                                            isMulti
                                            options={this.state.optionsDestinos} 
                                            placeholder="Buscar..." 
                                            onChange={opt => this.setState({destinos: opt})} 
                                            closeOnSelect={false}
                                            value={this.state.destinos}
                                        />
                                        </div>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                    <Form.Label>¿Que <span style={{backgroundColor: '#07737f', color: 'white', padding: 4, borderRadius: 5}}>ACTIVIDADES</span> puedes hacer desde tu hospedaje?</Form.Label>
                                    <div style={{backgroundColor: 'white'}}>
                                            <Select 
                                                isMulti
                                                options={this.state.optionsTitlesActividadesName} 
                                                placeholder="Buscar..." 
                                                onChange={opt => this.setState({actividades: opt})} 
                                                closeOnSelect={false}
                                                value={this.state.actividades}
                                            />
                                        </div>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Región</Form.Label>
                                        <Form.Control as="select" name="idRegion" onChange={this.handleChange} value={this.state.idRegion || ''} required>
                                        <option value="0"> -- Seleccionar -- </option>
                                        <option value="1">I de Tarapacá (Capital: Iquique)</option>
                                        <option value="2">II de Antofagasta (Capital: Antofagasta)</option>
                                        <option value="3">III de Atacama (Capital: Copiapó)</option>
                                        <option value="4">IV de Coquimbo (Capital: Coquimbo)</option>
                                        <option value="5">V de Valparaíso (Capital: Valparaíso)</option>
                                        <option value="6">VI del Libertador General Bernardo O'Higgins (Capital: Rancagua)</option>
                                        <option value="7">VII del Maule (Capital: Talca)</option>
                                        <option value="8">VIII de Biobío (Capital: Concepción)</option>
                                        <option value="9">IX de la Araucanía (Capital: Temuco)</option>
                                        <option value="10">X de Los Lagos (Capital: Puerto Montt)</option>
                                        <option value="11">XI de Aysén del General Carlos Ibañez del Campo (Capital: Coyhaique)</option>
                                        <option value="12">XII de Magallanes y de la Antártica Chilena (Capital: Punta Arenas)</option>
                                        <option value="13">RM Metropolitana de Santiago (Capital: Santiago)</option>
                                        <option value="14">XIV de Los Ríos (Capital: Valdivia)</option>
                                        <option value="15">XV de Arica y Parinacota (Capital: Arica)</option>
                                        <option value="16">XVI del Ñuble (Capital: Chillán)</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                    <Form.Label>Comuna</Form.Label>
                                    <Select 
                                        options={this.state.comunas} 
                                        placeholder="Buscar..." 
                                        onChange={opt => this.setState({comuna: opt.value})} 
                                        value={this.state.comunas.filter(option => option.label === this.state.comuna)}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Dirección</Form.Label>
                                        <Form.Control type="text" name="direccion" placeholder="Dirección" value={this.state.direccion || ''} onChange={this.handleChange}/>
                                    </Form.Group>
                                </Form.Row>
                                
                                <Form.Row>
                                    <Form.Group as={Col}>
                                    <Form.Label>Habitaciones</Form.Label>
                                        <Form.Control as="select" name="habitaciones" onChange={this.handleChange} value={this.state.habitaciones || ''} required>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                    <Form.Label>Camas</Form.Label>
                                        <Form.Control as="select" name="camas" onChange={this.handleChange} value={this.state.camas || ''} required>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                    <Form.Label>Baños</Form.Label>
                                        <Form.Control as="select" name="wc" onChange={this.handleChange} value={this.state.wc || ''} required>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control 
                                    as="textarea" 
                                    rows="3"
                                    name="descripcion" 
                                    onChange={this.handleChange} 
                                    value={this.state.descripcion || ''} 
                                    required/>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                    <Form.Label style={{display: 'block', textAlign: 'center'}}>COMO QUIERES QUE TE CONTACTEN?</Form.Label>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Instagram</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="instagram" 
                                        placeholder="Sin @"
                                        onChange={this.handleChange} 
                                        value={this.state.instagram || ''} 
                                        required/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>WhatsApp</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="whatsapp" 
                                        placeholder="9 digitos"
                                        maxLength="9" 
                                        onKeyPress={this.validate} 
                                        onChange={this.handleChange} 
                                        value={this.state.whatsapp || ''} 
                                        required/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Galeria 1</Form.Label>
                                    <Form.Control type="file" name="url_1" className="form-control" />
                                    {this.state.ActivityIndicatorProgress_gal1 ? 
                                        <ProgressBar variant="success" now={this.state.valueSpinner_gal1} label={`${this.state.valueSpinner_gal1}%`}/>
                                        : null
                                    }
                                    </Form.Group>
                                    
                                    <Form.Group as={Col}>
                                    <Form.Label>Galeria 2</Form.Label>
                                    <Form.Control type="file" name="url_2" className="form-control" />
                                    {this.state.ActivityIndicatorProgress_gal2 ? 
                                        <ProgressBar variant="success" now={this.state.valueSpinner_gal2} label={`${this.state.valueSpinner_gal2}%`}/>
                                        : null
                                    }
                                    </Form.Group>
                                    
                                    <Form.Group as={Col}>
                                    <Form.Label>Galeria 3</Form.Label>
                                    <Form.Control type="file" name="url_3" className="form-control" />
                                    {this.state.ActivityIndicatorProgress_gal3 ? 
                                        <ProgressBar variant="success" now={this.state.valueSpinner_gal3} label={`${this.state.valueSpinner_gal3}%`}/>
                                        : null
                                    }
                                    </Form.Group>
                                    
                                </Form.Row>
                                <div className="text-left mt-4">
                                <div>
                                    <Button variant="info" type="submit">ACTUALIZAR</Button>
                                </div>
                                    </div>
                                    { this.state.divAlertMB_gal3 || this.state.divAlertMB_gal2 || this.state.divAlertMB_gal1 || this.state.divAlertMB ? 
                                        <Form.Group id="formGridCheckbox">
                                            <div className="alert alert-danger">
                                                <strong>Atención!</strong> Las siguientes imagenes superan los 3MB:<br />
                                                <ul>
                                                    {this.state.divAlertMB ? <li>Portada</li> : null}
                                                    {this.state.divAlertMB_gal1 ? <li>Galeria 1</li> : null}
                                                    {this.state.divAlertMB_gal2 ? <li>Galeria 2</li> : null}
                                                    {this.state.divAlertMB_gal3 ? <li>Galeria 3</li> : null}
                                                </ul>
                                            </div> 
                                        </Form.Group>
                                        : 
                                        null
                                    }
                         </Form>
                    </MDBCol>
                    <MDBCol md="6">
                            <Col xs={12} md={8}>
                                <p className="h4 text-center mb-4"></p>
                                <br />
                                {this.state.url ? 
                                    <Image src={this.state.url} thumbnail />
                                : 
                                    <Image src="https://firebasestorage.googleapis.com/v0/b/insta-clone-3689c.appspot.com/o/user%2Fno-imagen.png?alt=media&token=e4508d84-028a-4fbf-8c68-211a24cc2a13" thumbnail />}
                                
                            </Col>
                            <Col xs={12} md={8}>
                                <CardColumns style={{float: 'left'}}>
                                    <Card>
                                        <Card.Img variant="top" src={this.state.url_1} style={{maxHeight:200}}/>
                                    </Card>
                                    <Card className="text-center">
                                        <Card.Img variant="top" src={this.state.url_2} style={{maxHeight:200}}/>
                                    </Card>
                                    <Card className="text-right">
                                        <Card.Img variant="top" src={this.state.url_3} style={{maxHeight:200}} />
                                    </Card>
                                </CardColumns>
                            </Col>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <Footer />
        </div>
        }
    </div>
    );
  }
}
export default EditHospedaje;