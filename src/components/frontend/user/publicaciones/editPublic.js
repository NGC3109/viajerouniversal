import React, { Component } from 'react';
import Menu from '../../container/Menu';
import Helpers from '../../helpers/Helpers'
// import GaleriaPage from './../Galeria';
import { MDBContainer, MDBCol, MDBRow } from 'mdbreact';
import firebase from 'firebase/app'
import {Form, Col, ProgressBar, Image,Button, Spinner} from 'react-bootstrap'
import {ToastsContainer, ToastsStore } from 'react-toasts';
import Footer from '../../container/Footer'

class editPublic extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [], 
        uid: '',
        ActivityIndicator_Loading: false, 
        ActivityIndicatorProgress: false,
        valueSpinner: 0, 
        titulo: '',
        f_salida: '',
        lugar_inicio: '',
        destino_final : '',
        hora_salida : '',
        tiempo_viaje : '',
        cupos_pasajeros: '',
        descripcion: '',
        mascotas: '',
        requisitos: '',
        instagram: '',
        whatsapp : '',
        politicas: '',
        timeViaje: '',
        idPublic: props.match.params.idPublic,
        estado_viaje: '',
        readOnlyStatus: false,
        meridiano: '',
        gastos_generales: '',
        hijos: '',
        desde_edad: '',
        hasta_edad: ''
    };
    this.textInput = React.createRef();
  }
  async componentDidMount(){
    this.textInput.current.focus();
    if(this.state.idPublic){
        try{
            this.setState({ ActivityIndicator_Loading : true }, () => {
               firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                      this.setState({
                        nameUser: user.displayName,
                        uid: user.uid
                      });
                      Helpers.getPublicacionesDetail(this.state.idPublic, (publicacion) => {
                        if(this.state.uid === publicacion.idUsuario){
                            if(publicacion.estado_viaje === "0"){
                                this.setState({
                                    readOnlyStatus: true
                                })
                            }
                            this.setState({
                                titulo: publicacion.titulo,
                                f_salida: publicacion.f_salida,
                                lugar_inicio: publicacion.lugar_inicio,
                                destino_final: publicacion.destino_final,
                                hora_salida: publicacion.hora_salida,
                                tiempo_viaje: publicacion.tiempo_viaje,
                                cupos_pasajeros: publicacion.cupos_pasajeros,
                                descripcion: publicacion.descripcion,
                                mascotas: publicacion.mascotas,
                                requisitos: publicacion.requisitos,
                                url_portada: publicacion.url_portada,
                                autor: publicacion.autor,
                                gastos: publicacion.gastos,
                                whatsapp: publicacion.whatsapp,
                                instagram: publicacion.instagram,
                                politicas: publicacion.politicas,
                                timeViaje: publicacion.timeViaje,
                                ActivityIndicator_Loading : false,
                                estado_viaje: publicacion.estado_viaje,
                                meridiano: publicacion.meridiano,
                                gastos_generales: publicacion.gastos_generales,
                                hijos: publicacion.hijos,
                                desde_edad: publicacion.desde_edad,
                                hasta_edad: publicacion.hasta_edad
                            })
                        }else{
                            window.location = "http://viajerouniversal.com/#/"
                        }
                    })
                    }else{
                        window.location = "http://viajerouniversal.com/#/"
                    }
                  }.bind(this));
            });
          }catch(error){
              console.log(error)
          }
    }else{
        window.location.reload()
    }
    
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
  handleChangeStatusGeneral = () => {
    if(window.confirm("¿Segura/o que tu grupo esta completo?")){
        if(this.state.idPublic){
            Helpers.pub_setStatusFinally(this.state.idPublic, "0");
            ToastsStore.success("Felicidades! Su equipo se encuentra lleno, les deseamos un feliz viaje!.");
            window.location = "http://viajerouniversal.com/#/perfil/"
        }
    } 
  }
  handleSubmit = event =>{
      event.preventDefault();
      const file = event.target.portada.files[0]
      if(this.state.uid){
        try{
            // Helpers.createNewPublic(obj, this.state.idPublic)
            this.setState({ ActivityIndicator_Loading : true }, () => {
                Helpers.pub_setTimeViaje(this.state.idPublic, this.state.timeViaje)
                Helpers.pub_setInstagram(this.state.idPublic, this.state.instagram)
                Helpers.pub_setWhatsapp(this.state.idPublic, this.state.whatsapp)
                Helpers.pub_setGastos(this.state.idPublic, this.state.gastos)
                Helpers.pub_setAutor(this.state.idPublic, this.state.autor)
                Helpers.pub_setRequisitos(this.state.idPublic, this.state.requisitos)
                Helpers.pub_setMascotas(this.state.idPublic, this.state.mascotas)
                Helpers.pub_setDescripcion(this.state.idPublic, this.state.descripcion)
                Helpers.pub_setCuposPasajeros(this.state.idPublic, this.state.cupos_pasajeros)
                Helpers.pub_setTiempoViaje(this.state.idPublic, this.state.tiempo_viaje)
                Helpers.pub_setHoraSalida(this.state.idPublic, this.state.hora_salida)
                Helpers.pub_setDestinoFinal(this.state.idPublic, this.state.destino_final)
                Helpers.pub_setLugarInicio(this.state.idPublic, this.state.lugar_inicio)
                Helpers.pub_setFsalida(this.state.idPublic, this.state.f_salida)
                Helpers.pub_setTitulo(this.state.idPublic, this.state.titulo)
                Helpers.pub_setMeridiano(this.state.idPublic, this.state.meridiano)
                Helpers.pub_setGgenerales(this.state.idPublic, this.state.gastos_generales)
                Helpers.pub_setHijos(this.state.idPublic, this.state.hijos)                
                Helpers.pub_setDesde(this.state.idPublic, this.state.desde_edad)
                Helpers.pub_setHasta(this.state.idPublic, this.state.hasta_edad)
                this.setState({
                    ActivityIndicator_Loading: false
                })
            });
                if(file != null){
                    if(file.size < 3431990){
                        Helpers.uploadImage(file, this.state.idPublic, (snap) => {
                            this.setState({ActivityIndicatorProgress: true})
                            if(snap === 100){
                                this.setState({
                                    ActivityIndicatorProgress: false,
                                    divAlertMB: false
                                })
                                // window.location.reload();
                                window.location = "http://viajerouniversal.com/#/perfil/"
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
                }else{
                    window.location = "http://viajerouniversal.com/#/perfil/"
                }
                
            
        }catch(error){
            console.log(error)
        }
      }
  }

  render() {
    let widthScreen = null
    window.screen.width < 1024 ? widthScreen = 12 : widthScreen = null
    return (
    <div style={{backgroundColor: '#f1f4f7'}}>
        <input type="text" ref={this.textInput} style={{position: 'absolute', top: 0, zIndex: -9999}} readOnly/>
        <Menu />
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
                    {widthScreen === 12 ?
                        <MDBCol md="6">
                            <Col xs={12} md={8}>
                                <p className="h4 text-center mb-4"></p>
                                <br />
                                {this.state.url_portada ? 
                                <Image src={this.state.url_portada} thumbnail />
                                : 
                                <Image src="https://firebasestorage.googleapis.com/v0/b/insta-clone-3689c.appspot.com/o/user%2Fno-imagen.png?alt=media&token=e4508d84-028a-4fbf-8c68-211a24cc2a13" thumbnail />}
                                
                            </Col>
                        </MDBCol>
                    : null
                    }
                    
                    <MDBCol md="6">
                        <Form onSubmit={this.handleSubmit}>
                                <Form.Row>
                                    <ToastsContainer store={ToastsStore}/>
                                    <Form.Group as={Col}>
                                    <Form.Label style={{fontWeight: 'bold'}}>Titulo</Form.Label>
                                        <Form.Control type="text" readOnly={this.state.readOnlyStatus} name="titulo" onChange={this.handleChange} value={this.state.titulo || ''} required/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                    <Form.Label style={{fontWeight: 'bold'}}>Fecha Salida</Form.Label>
                                        <Form.Control type="date" name="f_salida" 
                                            onChange={this.handleChange}
                                            readOnly={this.state.readOnlyStatus}
                                            value={this.state.f_salida || ''}
                                            required/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                    <Form.Label style={{fontWeight: 'bold'}}>Lugar de inicio</Form.Label>
                                    <Form.Control as="select" name="lugar_inicio" disabled={this.state.readOnlyStatus} onChange={this.handleChange} value={this.state.lugar_inicio || ''} required>
                                            <option value="0"> -- Seleccionar Región -- </option>
                                            <option value="Tarapacá">I de Tarapacá (Capital: Iquique)</option>
                                            <option value="Antofagasta">II de Antofagasta (Capital: Antofagasta)</option>
                                            <option value="Atacama">III de Atacama (Capital: Copiapó)</option>
                                            <option value="Coquimbo">IV de Coquimbo (Capital: Coquimbo)</option>
                                            <option value="Valparaíso">V de Valparaíso (Capital: Valparaíso)</option>
                                            <option value="O'Higgins">VI del Libertador General Bernardo O'Higgins (Capital: Rancagua)</option>
                                            <option value="Maule">VII del Maule (Capital: Talca)</option>
                                            <option value="Concepción">VIII de Concepción (Capital: Concepción)</option>
                                            <option value="Araucanía">IX de la Araucanía (Capital: Temuco)</option>
                                            <option value="Los Lagos">X de Los Lagos (Capital: Puerto Montt)</option>
                                            <option value="Aysén">XI de Aysén del General Carlos Ibañez del Campo (Capital: Coyhiaique)</option>
                                            <option value="Magallanes">XII de Magallanes y de la Antártica Chilena (Capital: Punta Arenas)</option>
                                            <option value="Metropolitana">RM Metropolitana de Santiago (Capital: Santiago)</option>
                                            <option value="Los Ríos">XIV de Los Ríos (Capital: Valdivia)</option>
                                            <option value="Arica">XV de Arica y Parinacota (Capital: Arica)</option>
                                            <option value="Ñuble">XVI del Ñuble (Capital: Chillán)</option>
                                    </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                    <Form.Label style={{fontWeight: 'bold'}}>Destino final</Form.Label>
                                    <Form.Control as="select" name="destino_final" disabled={this.state.readOnlyStatus} onChange={this.handleChange} value={this.state.destino_final || ''} required>
                                            <option value="0"> -- Seleccionar Región -- </option>
                                            <option value="Tarapacá">I de Tarapacá (Capital: Iquique)</option>
                                            <option value="Antofagasta">II de Antofagasta (Capital: Antofagasta)</option>
                                            <option value="Atacama">III de Atacama (Capital: Copiapó)</option>
                                            <option value="Coquimbo">IV de Coquimbo (Capital: Coquimbo)</option>
                                            <option value="Valparaíso">V de Valparaíso (Capital: Valparaíso)</option>
                                            <option value="O'Higgins">VI del Libertador General Bernardo O'Higgins (Capital: Rancagua)</option>
                                            <option value="Maule">VII del Maule (Capital: Talca)</option>
                                            <option value="Concepción">VIII de Concepción (Capital: Concepción)</option>
                                            <option value="Araucanía">IX de la Araucanía (Capital: Temuco)</option>
                                            <option value="Los Lagos">X de Los Lagos (Capital: Puerto Montt)</option>
                                            <option value="Aysén">XI de Aysén del General Carlos Ibañez del Campo (Capital: Coyhiaique)</option>
                                            <option value="Magallanes">XII de Magallanes y de la Antártica Chilena (Capital: Punta Arenas)</option>
                                            <option value="Metropolitana">RM Metropolitana de Santiago (Capital: Santiago)</option>
                                            <option value="Los Ríos">XIV de Los Ríos (Capital: Valdivia)</option>
                                            <option value="Arica">XV de Arica y Parinacota (Capital: Arica)</option>
                                            <option value="Ñuble">XVI del Ñuble (Capital: Chillán)</option>
                                    </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{fontWeight: 'bold'}}>Hora Salida</Form.Label>
                                        <Form.Control type="time" readOnly={this.state.readOnlyStatus} name="hora_salida" onChange={this.handleChange} value={this.state.hora_salida || ''} required/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{color: 'white'}}>.</Form.Label>
                                        <Form.Control as="select" disabled={this.state.readOnlyStatus} name="meridiano" onChange={this.handleChange} value={this.state.meridiano || ''}  required>
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{fontWeight: 'bold'}}>Portada</Form.Label>
                                        <Form.Control type="file" name="portada" disabled={this.state.readOnlyStatus} className="form-control" onChange={this.handleChange}/>
                                        {this.state.ActivityIndicatorProgress ? 
                                        <ProgressBar variant="success" now={this.state.valueSpinner} label={`${this.state.valueSpinner}%`}/>
                                        : null
                                        }
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{fontWeight: 'bold'}}>Tiempo de viaje</Form.Label>
                                        <Form.Control type="number" readOnly={this.state.readOnlyStatus} onKeyPress={this.validate} name="tiempo_viaje" onChange={this.handleChange} value={this.state.tiempo_viaje || ''} required/>
                                    </Form.Group>
                                    <Form.Group as={Col}>      
                                        <Form.Label style={{color:'white'}}>.</Form.Label>
                                        <Form.Control as="select" readOnly={this.state.readOnlyStatus} name="timeViaje" onChange={this.handleChange} value={this.state.timeViaje || ''} required>
                                            <option value="Horas">Horas</option>
                                            <option value="Dias">Días</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{fontWeight: 'bold'}}>Cupos pasajeros</Form.Label>
                                        <Form.Control type="number" readOnly={this.state.readOnlyStatus} onKeyPress={this.validate} name="cupos_pasajeros" onChange={this.handleChange} value={this.state.cupos_pasajeros || ''} required/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{fontWeight: 'bold'}}>Gasto de combustible</Form.Label>
                                        <Form.Control as="select" name="gastos" disabled={this.state.readOnlyStatus} onChange={this.handleChange} value={this.state.gastos || ''} required>
                                            <option value="Compartido">Compartido</option>
                                            <option value="Cualquier aporte es bienvenido">Cualquier aporte es bienvenido</option>
                                            <option value="Ninguno, autostop">Ninguno, autostop</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{fontWeight: 'bold'}}>Gastos Generales</Form.Label>
                                        <Form.Control as="select" name="gastos_generales" disabled={this.state.readOnlyStatus} onChange={this.handleChange} value={this.state.gastos_generales || ''} required >
                                            <option value="Compartido">Compartido</option>
                                            <option value="Individual">Individual</option>
                                            <option value="Cualquier aporte es bienvenido">Cualquier aporte es bienvenido</option>
                                            <option value="Ninguno, autostop">Ninguno, autostop</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{display: 'block', textAlign: 'center'}}>COMO QUIERES QUE TE CONTACTEN?</Form.Label>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{fontWeight: 'bold'}}>Instagram</Form.Label>
                                        <Form.Control type="text" readOnly={this.state.readOnlyStatus} name="instagram" onChange={this.handleChange} value={this.state.instagram || ''} required/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{fontWeight: 'bold'}}>WhatsApp</Form.Label>
                                        <Form.Control type="text" readOnly={this.state.readOnlyStatus} name="whatsapp" onChange={this.handleChange} value={this.state.whatsapp || ''} required/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group>
                                    <Form.Label style={{fontWeight: 'bold'}}>Descripcion</Form.Label>
                                    <Form.Control as="textarea" rows="3" readOnly={this.state.readOnlyStatus} name="descripcion" onChange={this.handleChange} value={this.state.descripcion || ''} required/>
                                </Form.Group>
                                
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{fontWeight: 'bold'}}>Mascotas</Form.Label>
                                        <Form.Control as="select" name="mascotas" disabled={this.state.readOnlyStatus} onChange={this.handleChange} value={this.state.mascotas || ''} required>
                                            <option value="Sí">Sí</option>
                                            <option value="No">No</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="rango">
                                        <Form.Label style={{fontWeight: 'bold'}}>Desde</Form.Label>
                                        <Form.Control as="select" name="desde_edad" disabled={this.state.readOnlyStatus} onChange={this.handleChange} value={this.state.desde_edad || ''} required>
                                            <option value="0"> -- Años -- </option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                            <option value="32">32</option>
                                            <option value="33">33</option>
                                            <option value="34">34</option>
                                            <option value="35">35</option>
                                            <option value="36">36</option>
                                            <option value="37">37</option>
                                            <option value="38">38</option>
                                            <option value="39">39</option>
                                            <option value="40">40</option>
                                            <option value="41">41</option>
                                            <option value="42">42</option>
                                            <option value="43">43</option>
                                            <option value="44">44</option>
                                            <option value="45">45</option>
                                            <option value="46">46</option>
                                            <option value="47">47</option>
                                            <option value="48">48</option>
                                            <option value="49">49</option>
                                            <option value="50">50</option>
                                            <option value="50+">50+</option>
                                        </Form.Control>
                                </Form.Group>
                                        <Form.Group as={Col} controlId="rango2">                                            
                                        <Form.Label style={{fontWeight: 'bold'}}>Hasta</Form.Label>
                                        <Form.Control as="select" name="hasta_edad"  disabled={this.state.readOnlyStatus} onChange={this.handleChange} value={this.state.hasta_edad || ''} required>
                                            <option value="0"> -- Años -- </option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                            <option value="32">32</option>
                                            <option value="33">33</option>
                                            <option value="34">34</option>
                                            <option value="35">35</option>
                                            <option value="36">36</option>
                                            <option value="37">37</option>
                                            <option value="38">38</option>
                                            <option value="39">39</option>
                                            <option value="40">40</option>
                                            <option value="41">41</option>
                                            <option value="42">42</option>
                                            <option value="43">43</option>
                                            <option value="44">44</option>
                                            <option value="45">45</option>
                                            <option value="46">46</option>
                                            <option value="47">47</option>
                                            <option value="48">48</option>
                                            <option value="49">49</option>
                                            <option value="50">50</option>
                                            <option value="50+">50+</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>       
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{fontWeight: 'bold'}}>Requisitos</Form.Label>
                                        <Form.Control as="select" name="requisitos" disabled={this.state.readOnlyStatus} onChange={this.handleChange} value={this.state.requisitos || ''} required>
                                            <option value="Solo mujeres">Solo mujeres</option>
                                            <option value="Solo hombres">Solo hombres</option>
                                            <option value="Mujeres y Hombres">Mujeres y Hombres</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{fontWeight: 'bold'}}>¿Viajas con hijas/os?</Form.Label>
                                        <Form.Control as="select" name="hijos" disabled={this.state.readOnlyStatus} onChange={this.handleChange} value={this.state.hijos || ''} required>
                                            <option value="Sí">Sí</option>
                                            <option value="No">No</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                {this.state.divAlertMB ? 
                                    <div className="alert alert-danger">
                                    <strong>Atención!</strong> Las imagenes no pueden superar los 3MB.
                                    </div> 
                                    : 
                                    null
                                }
                                <div className="text-left mt-4">
                                    
                                    {this.state.estado_viaje === "0" ? 
                                        <div className="alert alert-info">
                                            <strong>FELICIDADES!</strong> TU GRUPO ESTA COMPLETO.
                                        </div>
                                    :
                                        <div>
                                            <Button variant="info" type="submit">ACTUALIZAR</Button><br />
                                            <Button variant="warning" style={{marginTop: '3%', color: 'white'}} onClick={this.handleChangeStatusGeneral}>PINCHA AQUÍ CUANDO TU GRUPO ESTE COMPLETO</Button>
                                        </div>
                                    }
                                    </div>
                            </Form>
                        </MDBCol>
                        {widthScreen !== 12 ?
                            <MDBCol md="6">
                                <Col xs={12} md={8}>
                                    <p className="h4 text-center mb-4"></p>
                                    <br />
                                    {this.state.url_portada ? 
                                    <Image src={this.state.url_portada} thumbnail />
                                    : 
                                    <Image src="https://firebasestorage.googleapis.com/v0/b/insta-clone-3689c.appspot.com/o/user%2Fno-imagen.png?alt=media&token=e4508d84-028a-4fbf-8c68-211a24cc2a13" thumbnail />}
                                    
                                </Col>
                            </MDBCol>
                        : null
                        }
                        
                </MDBRow>
            </MDBContainer>
            <Footer />
        </div>
        }
    </div>
    );
  }
}
export default editPublic;