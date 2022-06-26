import React, { Component } from 'react';
import Menu from './../container/Menu';
import Helpers from './../helpers/Helpers'
import { MDBRow, MDBCol, MDBContainer } from 'mdbreact';
import firebase from 'firebase/app'
import Footer from './../container/Footer'
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import Alert from 'react-bootstrap/Alert'

class detailPublic extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dataPublicaciones: [], 
      idUser: '',
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
      facebook: '',
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
      idUsuario: '',
      open: false,
      nombreUser: '',
      user_url: '',
      acepted: null,
      statusGroup: false,
      integrantes: [],
      Statusintegrantes: false,
      aceptedSolicitud: null,
      rango_edad: '',
      desde_edad: '',
      hasta_edad: ''
    };
    this.textInput = React.createRef();
  }
  async componentDidMount(){
    let idPublic = this.props.match.params.idPublic
    this.textInput.current.focus();
    try{
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          this.setState({
            nameUser: user.displayName,
            idUser: user.uid
          });
        }
        Helpers.getUser(this.state.idUser, (usr) => {
            this.setState({
              nombreUser: usr.name,
              user_url: usr.url
            })
        })
        Helpers.getStatusUserPublicDetail(this.state.idUser, idPublic, (acepted) => {
            this.setState({
              acepted
            })
        })
        Helpers.getStatusSolicitudUserPublicDetail(this.state.idUser, idPublic, (aceptedS) => {
            this.setState({
              aceptedSolicitud: aceptedS
            })
        })
      }.bind(this));
      
      Helpers.getPublicacionesDetail(idPublic, (publicacion) => {
        if(publicacion.estado_viaje !== "0"){
          this.setState({
            statusGroup: true
          })
        }
        if(publicacion.integrantes !== null){
          this.setState({
            Statusintegrantes: true
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
          facebook: publicacion.facebook,
          instagram: publicacion.instagram,
          politicas: publicacion.politicas,
          timeViaje: publicacion.timeViaje,
          ActivityIndicator_Loading : false,
          estado_viaje: publicacion.estado_viaje,
          meridiano: publicacion.meridiano,
          gastos_generales: publicacion.gastos_generales,
          hijos: publicacion.hijos,
          idUsuario: publicacion.idUsuario,
          integrantes: publicacion.integrantes,
          desde_edad: publicacion.desde_edad,
          hasta_edad: publicacion.hasta_edad
        })
      })
         
    }catch(error){
        console.log(error)
    }
  }
  handleClick = () => {
    this.setState({
      open: !this.state.open
    })
  }
  handleSubmitJoin = () => {
    var today = new Date();
    var day = new Date(today).getDate()
    var month = new Date(today).getMonth()
    var year = new Date(today).getFullYear()
    var hour = new Date(today).getHours()
    var min = new Date(today).getMinutes()
    const fecha_publicacion = `${(day < 10 ? '0'+day : day)}-${(month < 10 ? '0'+(month + 1) : (month + 1))}-${year} ${(hour < 10 ? '0'+hour : hour)}:${(min < 10 ? '0'+min : min)}`  
    let obj = {
      idUsuario: this.state.idUser,
      comentario: this.state.commentJoin,
      flag: true,
      fecha_publicacion,
      tituloGrupo: this.state.titulo,
      idPublic: this.state.idPublic,
      nombreUser: this.state.nombreUser,
      user_url: this.state.user_url || '',
      acepted: "0"
    }
    let objAcepted = {
      idUsuarioMasterGroup: this.state.idUser,
      urlUsuarioMasterGroup: this.state.user_url,
      nameGrupo: this.state.titulo,
      nameUsuarioMasterGroup:this.state.nombreUser,
      msg:`te ha enviado una solicitud para unirse al grupo`,
      createdAt: fecha_publicacion,
      view: false,
      order: Math.floor(Date.now() / 1000),
      link: '/groups',
    }
    Helpers.setJoinGroup(this.state.idUsuario, this.state.idUser, this.state.idPublic, obj, objAcepted, (state) => {
      if(state === 1){
        this.setState({
          open: !this.state.open,
          commentJoin: ''
        })
      }
    })
  }
  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }
  
  login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {
    }).catch(function(error) {
      console.log(error)
    });
}
  render() {
    let widthScreen = 0
    window.screen.width < 1024 ? widthScreen = 12 : widthScreen = 345
    return (
    <div style={{backgroundColor: '#f1f4f7'}}>
    <input type="text" ref={this.textInput} style={{position: 'absolute', top: 0, zIndex: -9999}} readOnly/>
        <Menu />
        <div style={{marginTop: '2%'}}>
          <MDBContainer style={{backgroundColor: 'white'}}>
            <MDBRow>
                <MDBCol md="12">
                  {widthScreen === 12 ? 
                      <div style={{
                          backgroundImage: "url(" + this.state.url_portada + ")",
                          backgroundPosition: 'center',
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          maxWidth: '100%',
                          height: 300, 
                          marginBottom: '3%'
                          }}>
                      </div>
                  : 
                  <div style={{backgroundColor: 'black', height: 600,maxWidth: '100%', marginBottom: '3%'}}>
                    <div style={{
                        backgroundImage: "url(" + this.state.url_portada + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        maxWidth: '100%',
                        height: 600,
                        }}>
                    </div>
                  </div>
                  }
                  
                </MDBCol>
                {/* <GaleriaPage url_1={this.state.url_portada } /> */}
                <MDBCol md="12">
                  {
                      this.state.acepted === "1" ? 
                      <div>
                        <h4>{this.state.titulo}</h4>
                        <Alert variant='success'>
                            Felicidades! ya eres parte de este grupo.
                        </Alert>
                      </div>
                    : 
                      this.state.aceptedSolicitud === "0" ?
                        <div>
                          <h4>{this.state.titulo}</h4>
                          <MDBCol md="4">
                            <Alert variant='warning'>
                                Tu solicitud fue enviada con exito, ahora debes esperar por su aprobación.
                            </Alert>
                          </MDBCol>
                          
                        </div>
                      :
                          this.state.estado_viaje === "0" ?
                            <div>
                              <h4>{this.state.titulo}</h4>
                              <Alert variant='danger'>
                                  Este grupo está completo, sigue buscando, habran más grupos que podrían llamar tu atención.
                              </Alert>
                            </div>
                          :
                          
                            <div>
                                  <h4>{this.state.titulo} {this.state.statusGroup ? this.state.idUser ? this.state.idUsuario === this.state.idUser ? null : <Button variant="outlined" style={{backgroundColor: '#fb6012', color: 'white'}} onClick={this.handleClick}>Unirme</Button> : <Button variant="outlined" style={{backgroundColor: '#fb6012', color: 'white'}} onClick={this.login}>Para unirte debes registrarte</Button> : null }</h4>
                            </div>
                    }
                </MDBCol>
                <MDBCol md="12">
                  <div style={{borderLeft: '0.2em solid #07737f', paddingLeft: 10}}>
                    <p>{this.state.descripcion}</p>
                  </div>
                </MDBCol>
                {this.state.Statusintegrantes ? 
                  <MDBCol md="4">
                    <Alert variant='info'>
                        Este grupo ya cuenta con {Object.values(this.state.integrantes).length} integrante(s).
                    </Alert>
                  </MDBCol>
                :
                  null
                }
                
                
                <MDBCol md="12">
                  <h5>Sobre el viaje:</h5>
                    <MDBCol md="6">
                      <ul>
                        <li>Desde: <strong>{this.state.lugar_inicio === "Metropolitana" ? "Santiago" : this.state.lugar_inicio}</strong></li>
                        <li>Hasta: <strong>{this.state.destino_final}</strong></li>
                        <li>Duración del viaje: <strong>{this.state.tiempo_viaje} {this.state.timeViaje}</strong></li>
                        <li>Máx. Participantes: <strong>{this.state.cupos_pasajeros} {this.state.cupos_pasajeros > 1 ? 'personas': 'persona'}</strong></li>
                        <li>Fecha Salida: <strong>{this.state.f_salida.split("-")[2]} {this.state.f_salida.split("-")[1] === "01" ? 'Enero' : this.state.f_salida.split("-")[1] === "02" ? 'Febrero' : this.state.f_salida.split("-")[1] === "03" ? 'Marzo' : this.state.f_salida.split("-")[1] === "04" ? 'Abril': this.state.f_salida.split("-")[1] === "05" ? 'Mayo': this.state.f_salida.split("-")[1] === "06" ? 'Junio': this.state.f_salida.split("-")[1] === "07" ? 'Julio': this.state.f_salida.split("-")[1] === "08" ? 'Agosto': this.state.f_salida.split("-")[1] === "09" ? 'Septiembre': this.state.f_salida.split("-")[1] === "10" ? 'Octubre': this.state.f_salida.split("-")[1] === "11" ? 'Noviembre': this.state.f_salida.split("-")[1] === "12" ? 'Diciembre' : ''} de {this.state.f_salida.split("-")[0]}</strong></li>
                        <li>Hora Aprox De Salida: <strong>{this.state.hora_salida}</strong></li>
                        <li>Gasto Combustible: <strong>{this.state.gastos}</strong></li>
                        <li>Gastos Generales: <strong>{this.state.gastos_generales}</strong></li>
                      </ul>
                    </MDBCol>
                </MDBCol>
                <MDBCol md="12">
                  <h5>Requisitos</h5>
                  <ul>
                    <li>Mascotas: <strong>{this.state.mascotas}</strong></li>
                    <li>Quiénes pueden ir: <strong>{this.state.requisitos}</strong></li>
                    <li>¿Viajamos con hijas/os?: <strong>{this.state.hijos}</strong></li>
                    <li>Desde: <strong>{this.state.desde_edad} Años</strong> Hasta: <strong>{this.state.hasta_edad} Años</strong></li>
                  </ul>
                </MDBCol>
                <MDBCol md="12">
                  <h5>Contacto</h5>
                  {this.state.idUser ? 
                    <ul>
                      {this.state.idUser === this.state.idUsuario ?
                        <li>Viajeros: <strong><Link to={`/perfil`}>#Perfil</Link></strong></li>
                      :
                        <li>Viajeros: <strong><Link to={`/user/${this.state.idUsuario}`}>#Perfil</Link></strong></li>
                      }
                      {
                        this.state.instagram !== "" ? 
                        <li>Instagram: <strong><a href={"https://www.instagram.com/" + this.state.instagram} rel="noopener noreferrer" target="_blank">@{this.state.instagram}</a></strong></li>
                        : null
                      }
                      {
                        this.state.whatsapp !== "" ? 
                        <li>WhatsApp: <strong><a href={"https://wa.me/56" + this.state.whatsapp} rel="noopener noreferrer" target="_blank">Enviar mensaje!</a></strong></li>
                        : null
                      }
                  </ul>
                  : 
                    <div className="alert alert-info">
                      <strong>Atención!</strong> Para poder solicitar más información debes registrarte, es muy fácil, no debes llenar formuarios, solo dos click hacen falta!.
                    </div>
                  }
                  
                </MDBCol>
            </MDBRow>
          </MDBContainer>
          <div>
              <Dialog
                open={this.state.open}
                onClose={this.handleClick}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">{"Bienvenida/o donde la aventura comienza."}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Cuentame un poco el motivo del porque quieres unirte al grupo y viajar juntos.
                  </DialogContentText>
                    <TextField
                      id="outlined-multiline-static"
                      label="Comentarios"
                      name="commentJoin"
                      multiline
                      rows={4}
                      variant="outlined"
                      style={{width: '100%'}}
                      value={this.state.commentJoin}
                      onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={this.handleClick} color="primary">
                    Cancelar
                  </Button>
                  <Button onClick={this.handleSubmitJoin} color="primary" autoFocus>
                    Unirme!
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
        </div>
        <Footer />
    </div>
    );
  }
}
export default detailPublic;