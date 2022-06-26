
import React, { Component } from 'react';
import Menu from './../container/Menu';
import Helpers from './../helpers/Helpers'
import PropTypes from 'prop-types';
import { MDBContainer, MDBView } from 'mdbreact';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Footer from './../container/Footer'
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import firebase from 'firebase/app'
import SingleBedIcon from '@material-ui/icons/SingleBed';
import WcIcon from '@material-ui/icons/Wc';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import HomeIcon from '@material-ui/icons/Home';
// import ReactImageZoom from 'react-image-zoom';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

// import OpacityIcon from '@material-ui/icons/Opacity';
// import WifiIcon from '@material-ui/icons/Wifi';
// import KitchenIcon from '@material-ui/icons/Kitchen';
// import LiveTvIcon from '@material-ui/icons/LiveTv'; //tv
// import SecurityIcon from '@material-ui/icons/Security'; // extintor
// import LocalParkingIcon from '@material-ui/icons/LocalParking'; // estacionamiento
// import FireplaceIcon from '@material-ui/icons/Fireplace'; // calefaccion
// import AddAlertIcon from '@material-ui/icons/AddAlert'; // alarma contra incendio
// import ToysIcon from '@material-ui/icons/Toys'; // secadora
// import LocalDiningIcon from '@material-ui/icons/LocalDining'; // utencilios
// import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService'; // lavadora
// import BathtubIcon from '@material-ui/icons/Bathtub'; // baño completo

import Rating from '@material-ui/lab/Rating';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ShowMoreText from 'react-show-more-text';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%'
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const Comments = (props) => {
  const classes = useStyles();
  const comment = props.data
  return(
    <div className={classes.root}>
            {
            comment.map((item, i) => 
                <div key={i}>
                    <Card className={classes.root}>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="recipe" src={item.thumbnail} className={classes.avatar} />
                        }
                        title={[item.name, <Rating name="read-only" size="small" value={item.valoracion} readOnly />]}
                        subheader={item.fecha_publicacion}
                      />
                      <CardContent>
                        
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.comentario.length >= 200 ? 
                            <ShowMoreText
                                lines={2}
                                more={<ExpandMoreIcon />}
                                less={<ExpandLessIcon />}
                                anchorClass=''
                                onClick={props.executeOnClick}
                                expanded={false}
                            >
                              {item.comentario.split('\n').map((itemX, keyX) => {
                                return <span key={keyX}>{itemX}<br/></span>
                              })}
                            </ShowMoreText>
                            :
                            item.comentario.split('\n').map((itemX, keyX) => {
                              return <span key={keyX}>{itemX}<br/></span>
                            })
                            }
                        </Typography>
                      </CardContent>
                    </Card>
                </div>
            )}
        </div>
  )
}
const Destinos = (props) => {
  const destinos = props.data
  let widthScreen = 0
  window.screen.width < 1024 ? widthScreen = window.screen.width : widthScreen = 345
  if(props.data !== undefined){
  return(
    <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
      >
            {
            destinos.map((item, i) => 
            item.estado === "1" ? 
                <div key={i}>
                  <Link to={ `/destino/${item.id}`} style={{textDecoration: 'none', color: 'rgba(0, 0, 0)'}}>
                    <Card style={{maxWidth: widthScreen, margin: '2%'}}>
                      <CardActionArea>
                        <div style={{
                            backgroundImage: "url(" + item.thumbnail + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            height: 250
                          }}>
                        </div>
                        <CardContent>
                        {item.name.length <= 28 ?
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.name}
                          </Typography> 
                        : item.name.length >= 37 ?
                          <Typography gutterBottom variant="h6" component="h5">
                            {item.name.substr(0,36)} ...
                          </Typography>
                          :
                          <Typography gutterBottom variant="h6" component="h4">
                            {item.name}
                          </Typography>
                        }
                        {item.descripcion.length <= 238 ? 
                          <Typography variant="body2" color="textSecondary" component="p">
                            {item.descripcion}
                          </Typography>
                        :
                          <Typography variant="body2" color="textSecondary" component="p">
                            {item.descripcion.substr(0,238)} ...[]
                          </Typography> 
                        }
                          
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    </Link>
                </div>
            : null
            )}
    </Grid>
  )
  }else{
    return null;
  }
}
const Actividades = (props) => {
  let activities = null
  activities = props.data
  let widthScreen = 0
  window.screen.width < 1024 ? widthScreen = window.screen.width : widthScreen = 345
  if(props.data !== undefined){
    return(
      <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
              {
              activities.map((item, i) => 
              item.estado === "1" ? 
                  <div key={i}>
                    <Link to={ `/actividad/${item.id}`} style={{textDecoration: 'none', color: 'rgba(0, 0, 0)'}}>
                      <Card style={{maxWidth: widthScreen, margin: '2%'}}>
                        <CardActionArea>
                          <div style={{
                              backgroundImage: "url(" + item.thumbnail + ")",
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              width: '100%',
                              height: 250
                              }}>
                          </div>
                          <CardContent>
                          {item.name.length <= 28 ?
                            <Typography gutterBottom variant="h5" component="h2">
                              {item.name}
                            </Typography> 
                          : item.name.length >= 37 ?
                            <Typography gutterBottom variant="h6" component="h5">
                              {item.name.substr(0,36)} ...
                            </Typography>
                            :
                            <Typography gutterBottom variant="h6" component="h4">
                              {item.name}
                            </Typography>
                          }
                          {item.descripcion.length <= 238 ? 
                            <Typography variant="body2" color="textSecondary" component="p">
                              {item.descripcion}
                            </Typography>
                          :
                            <Typography variant="body2" color="textSecondary" component="p">
                              {item.descripcion.substr(0,238)} ...[]
                            </Typography> 
                          }
                            
                          </CardContent>
                        </CardActionArea>
                      </Card>
                      </Link>
                  </div>
              : null
              )}
      </Grid>
    )
  }else{
    return null;
  }
  
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
class detailDestinos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDestiny: [],
      instagram: '',
      value: 0,
      nameUser: '',
      uid: '',
      dataHospedaje: [],
      servicios: [],
      reglas: [],
      isOpen: false,
      photoIndex: 0,
      mensajeAlerta: false,
      mensajeAlertaActivities: false,
      dataComments: [],
      valueComment: 0,
      comment: "",
      rating: 1
    };
    this.textInput = React.createRef();
  }
  
  async componentDidMount(){
    let idHospedaje = this.props.match.params.idHospedaje
    this.textInput.current.focus();
    try{
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          this.setState({
            nameUser: user.displayName,
            uid: user.uid
          });
        }
      }.bind(this));
      Helpers.getHospedajeDetail(idHospedaje, (hospedajes) => {
        this.setState({
          dataHospedaje: hospedajes,
          servicios: hospedajes.servicios,
          reglas: hospedajes.reglas,
          galeria: hospedajes.galeria
        })
        if(!hospedajes.actividades){
          this.setState({ mensajeAlertaActivities: true })
        }
        if(!hospedajes.destinos){
          this.setState({ mensajeAlerta: true })
        }
        Helpers.getDestinosByHospedaje((hospedajes.destinos || null), (destinos) => {
          if(destinos.length !== 0){
            this.setState({ dataDestiny: destinos })
          }else{
            this.setState({ mensajeAlerta: true })
          }
          
        })
        Helpers.getActivitiesByHospedaje((hospedajes.actividades || null), (actividades) => {
          if(actividades.length !== 0){
            this.setState({ dataActivity: actividades })
          }else{
            this.setState({ mensajeAlertaActivities: true })
          }
        })
        Helpers.getComments(idHospedaje, 'hospedajes', (comments) => {
          this.setState({
            dataComments: comments
          })
        })
      })
    }catch(error){
        console.log(error)
    }
  }
  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
  };
  a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  handleChangeIndex = (index) => {
    this.setState({
      value: index
    })
  };
  executeOnClick(isExpanded) {
    console.log(isExpanded);
  }
  createNewCommentItem = (segmento, idHospedaje) => {
    // console.log(idActividad + '_' + segmento)
    var today = new Date();
    var day = new Date(today).getDate()
    var month = new Date(today).getMonth()
    var year = new Date(today).getFullYear()
    var hour = new Date(today).getHours()
    var min = new Date(today).getMinutes()
    const fecha_publicacion = `${(day < 10 ? '0'+day : day)}-${(month < 10 ? '0'+(month + 1) : (month + 1))}-${year} ${(hour < 10 ? '0'+hour : hour)}:${(min < 10 ? '0'+min : min)}`  
    let obj = {
      comentario: this.state.comment,
      fecha_publicacion: fecha_publicacion,
      idSegmento: `${idHospedaje}_${segmento}`,
      idUsuario: this.state.uid,
      valoracion: this.state.rating
    }
    if(this.state.comment !== ""){
      Helpers.createNewComment(obj);
      this.setState({comment: ""})
      this.setState({rating: 0})
    }
  }
  handleChangeComment = (event, newValue) => {
      this.setState({
        valueComment: newValue
      })
    };
  a11yPropsComment = (index) => {
      return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
      };
  }
  handleChangeIndexComment = (index) => {
      this.setState({
          valueComment: index
      })
  };
  
  handleChangeNewComment = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }
  render() {
    let widthScreen = null
    window.screen.width < 1024 ? widthScreen = 12 : widthScreen = null
    return (
      <div style={{backgroundColor: '#f1f4f7'}}>
      <input type="text" ref={this.textInput} style={{position: 'absolute', top: 0, zIndex: -9999}} readOnly/>
      <Menu />
      <MDBContainer>
        <MDBView>
          <div style={{width: '100%'}}>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="HOSPEDAJE" {...this.a11yProps(0)} />
                <Tab label="DESTINOS" {...this.a11yProps(1)} />
                <Tab label="ACTIVIDADES" {...this.a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabPanel value={this.state.value} index={0}>
                {/* <DetalleHospedaje data={this.state.dataHospedaje} uid={this.state.uid} servicios={this.state.servicios} reglas={this.state.reglas} galeria={this.state.galeria} photoIndex={this.state.photoIndex} isOpen={this.state.isOpen}/> */}
                <div>
                    {widthScreen === 12 ? <h4>{this.state.dataHospedaje.name}</h4> : <h1>{this.state.dataHospedaje.name}</h1> }
                    {widthScreen === 12 ? 
                    <h6>Región {this.state.dataHospedaje.region}, {this.state.dataHospedaje.comuna}</h6> 
                    : 
                    <h6><LocationOnIcon /> Región {this.state.dataHospedaje.region}, Comuna de {this.state.dataHospedaje.comuna}</h6>
                    }
                    {widthScreen === 12 ? 
                      <div onClick={() => this.setState({ isOpen: true })} style={{
                            backgroundImage: "url(" + this.state.dataHospedaje.url + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            width: '100%',
                            height: 250
                            }}>
                      </div> 
                    : 
                      <div style={{backgroundColor: 'black', height: 600,maxWidth: '100%'}}>
                        <div onClick={() => this.setState({ isOpen: true })} style={{
                            backgroundImage: "url(" + this.state.dataHospedaje.url + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            maxWidth: '100%',
                            height: 600,
                            }}>
                        </div>
                      </div>
                      // <GaleriaPage url_1={this.state.dataHospedaje.url} onClick={() => this.setState({ isOpen: true })}/>
                    }
                    <AppBar position="static" color="inherit">
                        <Tabs
                        value={this.state.valueComment}
                        onChange={this.handleChangeComment}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        >
                          <Tab label="INFORMACION" style={{ fontSize: widthScreen === 12 ? 12 : null }} {...this.a11yPropsComment(0)} />{/* label="Actividades" */}
                          <Tab label={`COMENTARIOS (${this.state.dataComments.length})`} style={{ fontSize: widthScreen === 12 ? 12 : null }} {...this.a11yPropsComment(1)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                      index={this.state.valueComment}
                      onChangeIndex={this.handleChangeIndexComment}
                      style={{backgroundColor: 'white'}}
                    >
                      <TabPanel value={this.state.valueComment} index={0}>
                      <h5 style={{color: '$6f6f6f'}}>Precio: $<strong>{this.state.dataHospedaje.precio}</strong> por noche</h5>
                      {widthScreen === 12 ? 
                          <p style={{textAlign: 'justify'}}>{this.state.dataHospedaje.descripcion}</p>
                        :
                        <div style={{borderLeft: '0.2em solid #07737f', paddingLeft: 10, marginTop: '4%'}}>
                          <p>{this.state.dataHospedaje.descripcion}</p>
                        </div>
                      }
                      <div style={{marginTop: '4%', width: '100%'}}>
                          
                          {widthScreen === 12 ? 
                              <div>
                                <h5 style={{color: '$6f6f6f', marginTop: '2%'}} className="text-center"><strong>Distribución</strong></h5>
                                <li style={{listStyleType: 'none'}}><HomeIcon />  Tipo: <strong>{this.state.dataHospedaje.tipo_hospedaje}</strong></li>
                                <li style={{listStyleType: 'none'}}><MeetingRoomIcon /> Habitacion(s): <strong>{this.state.dataHospedaje.habitaciones}</strong></li>
                                <li style={{listStyleType: 'none'}}><SingleBedIcon /> Cama(s): <strong>{this.state.dataHospedaje.camas}</strong></li>
                                <li style={{listStyleType: 'none'}}><WcIcon /> Baño(s): <strong>{this.state.dataHospedaje.wc}</strong></li>
                                <li style={{listStyleType: 'none'}}><EmojiPeopleIcon /> Máx. Huéspedes: <strong>{this.state.dataHospedaje.max_huespedes}</strong></li>
                              </div>
                              :
                              <div className="col-sm-4" style={{float: 'left'}}>
                                <h5 style={{color: '$6f6f6f'}}><strong>Distribución</strong></h5>
                                <ul>
                                    <li><HomeIcon />  Tipo: <strong>{this.state.dataHospedaje.tipo_hospedaje}</strong></li>
                                    <li><MeetingRoomIcon /> Habitacion(s): <strong>{this.state.dataHospedaje.habitaciones}</strong></li>
                                    <li><SingleBedIcon /> Cama(s): <strong>{this.state.dataHospedaje.camas}</strong></li>
                                    <li><WcIcon /> Baño(s): <strong>{this.state.dataHospedaje.wc}</strong></li>
                                    <li><EmojiPeopleIcon /> Máx. Huéspedes: <strong>{this.state.dataHospedaje.max_huespedes}</strong></li>
                                </ul>
                              </div>
                            }
                          {widthScreen === 12 ? 
                            <div>
                                <h5 style={{color: '$6f6f6f', marginTop: '2%'}} className="text-center"><strong>Reglas</strong></h5>
                                  {
                                      this.state.reglas.map((item, index) => 
                                        <li key={index}>{item.label}</li>
                                      )
                                  }
                            </div>
                          :
                            <div className="col-sm-4" style={{float: 'left'}}>
                                <h5 style={{color: '$6f6f6f'}}><strong>Reglas</strong></h5>
                                <ul>
                                  {
                                      this.state.reglas.map((item, index) => 
                                        <li key={index}>{item.label}</li>
                                      )
                                  }
                                </ul>
                            </div>
                          }
                          {widthScreen === 12 ?
                            <div>
                              <h5 style={{color: '$6f6f6f', marginTop: '2%'}} className="text-center"><strong>Servicios</strong></h5>
                                  {this.state.servicios.map((item, index) => 
                                      <li key={index}>{item.label}</li>
                                  )}
                            </div>
                          :
                            <div className="col-sm-4" style={{float: 'left'}}>
                                <h5 style={{color: '$6f6f6f'}}><strong>Servicios</strong></h5>
                                <ul>
                                    {this.state.servicios.map((item, index) => 
                                    <li key={index}>{item.label}</li>
                                    // item.label === "Wifi" ? 
                                    // <li key={index}><WifiIcon /> {item.label}</li>
                                    // :
                                    // item.label === "Agua Caliente" ?
                                    // <li key={index}><OpacityIcon /> {item.label}</li>
                                    // :
                                    // item.label === "Refrigerador" ?
                                    // <li key={index}><KitchenIcon /> {item.label}</li>
                                    // :
                                    // item.label === "TV Cable" ?
                                    // <li key={index}><LiveTvIcon /> {item.label}</li>
                                    // :
                                    // item.label === "Extintor de incendios" ?
                                    // <li key={index}><SecurityIcon /> {item.label}</li>
                                    // :
                                    // item.label === "Entrada independiente" ?
                                    // <li key={index}><MeetingRoomIcon /> {item.label}</li>
                                    // :
                                    // item.label === "Estacionamiento gratuito en las instalaciones" ?
                                    // <li key={index}><LocalParkingIcon /> {item.label}</li>
                                    // :
                                    // item.label === "Calefacción" ?
                                    // <li key={index}><FireplaceIcon /> {item.label}</li>
                                    // :
                                    // item.label === "Alarma de monóxo de carbono" ?
                                    // <li key={index}><AddAlertIcon /> {item.label}</li>
                                    // :
                                    // item.label === "Secadora de pelo" ?
                                    // <li key={index}><ToysIcon /> {item.label}</li>
                                    // :
                                    // item.label === "Utensilios básicos para cocinar" ?
                                    // <li key={index}><LocalDiningIcon /> {item.label}</li>
                                    // :
                                    // item.label === "Lavadora" ?
                                    // <li key={index}><LocalLaundryServiceIcon /> {item.label}</li>
                                    // :
                                    // item.label === "Baño completo" ?
                                    // <li key={index}><BathtubIcon /> {item.label}</li>
                                    // :
                                    // null
                                    )}
                                </ul>
                            </div>
                          }
                          
                      </div>
                        {
                        this.state.uid !== '' ? 
                          widthScreen === 12 ?
                              <div style={{marginTop: '4%'}}>
                                  <h5 style={{color: '$6f6f6f'}} className="text-center"><strong>Contacto</strong></h5>
                                  {this.state.dataHospedaje.instagram !== "" ? <li>Instagram: <strong><a href={"https://www.instagram.com/" + this.state.dataHospedaje.instagram} rel="noopener noreferrer" target="_blank">@{this.state.dataHospedaje.instagram}</a></strong></li> : null}
                                  <li>Viajeros: <strong><Link to={`/user/${this.state.dataHospedaje.idUsuario}`}>Perfil</Link></strong></li>
                                  {this.state.dataHospedaje.whatsapp !== "" ?  <li>WhatsApp: <strong><a href={"https://wa.me/56" + this.state.dataHospedaje.whatsapp} rel="noopener noreferrer" target="_blank">Enviar mensaje!</a></strong></li> : null }
                                  {this.state.dataHospedaje.direccion !== "" ? <li>Dirección: <strong>{this.state.dataHospedaje.direccion}</strong></li> : null }
                              </div>
                          :
                              <div className="col-sm-12" style={{marginTop: '4%', float: 'left'}}>
                                  <h5><strong>Contacto</strong></h5>
                                  <ul>
                                      {this.state.dataHospedaje.instagram !== "" ? <li>Instagram: <strong><a href={"https://www.instagram.com/" + this.state.dataHospedaje.instagram} rel="noopener noreferrer" target="_blank">@{this.state.dataHospedaje.instagram}</a></strong></li> : null}
                                      <li>Viajeros: <strong><Link to={`/user/${this.state.dataHospedaje.idUsuario}`}>Perfil</Link></strong></li>
                                      {this.state.dataHospedaje.whatsapp !== "" ?  <li>WhatsApp: <strong><a href={"https://wa.me/56" + this.state.dataHospedaje.whatsapp} rel="noopener noreferrer" target="_blank">Enviar mensaje!</a></strong></li> : null }
                                      {this.state.dataHospedaje.direccion !== "" ? <li>Dirección: <strong>{this.state.dataHospedaje.direccion}</strong></li> : null }
                                  </ul>
                              </div>
                        : 
                        <div className="col-sm-12" style={{marginTop: '4%', float: 'left'}}>
                              <h5>Contacto</h5>
                              <div className="alert alert-info">
                                <strong>Atención!</strong> Para ver mas información debes registrarte, es muy fácil, no debes llenar formuarios, solo dos click hacen falta!.
                              </div>
                        </div>
                        }
                        {this.state.isOpen && (
                            <Lightbox
                              mainSrc={this.state.galeria[this.state.photoIndex]}
                              nextSrc={this.state.galeria[(this.state.photoIndex + 1) % this.state.galeria.length]}
                              prevSrc={this.state.galeria[(this.state.photoIndex + this.state.galeria.length - 1) % this.state.galeria.length]}
                              onCloseRequest={() => this.setState({ isOpen: false })}
                              onMovePrevRequest={() =>
                                this.setState({
                                  photoIndex: (this.state.photoIndex + this.state.galeria.length - 1) % this.state.galeria.length,
                                })
                              }
                              onMoveNextRequest={() =>
                                this.setState({
                                  photoIndex: (this.state.photoIndex + 1) % this.state.galeria.length,
                                })
                              }
                            />
                          )}
                      <CardColumns style={{marginTop: '4%', float: 'left', paddingBottom: '3%'}}>
                            {this.state.dataHospedaje.url_1 ?
                              // <Card.Img onClick={() => this.setState({ isOpen: true })} variant="top" src={this.state.dataHospedaje.url_1} style={{maxHeight:300}} />
                              <div onClick={() => this.setState({ isOpen: true })} style={{
                                  backgroundImage: "url(" + this.state.dataHospedaje.url_1 + ")",
                                  backgroundPosition: 'center',
                                  backgroundSize: 'contain',
                                  backgroundRepeat: 'no-repeat',
                                  width: 300,
                                  height: 300,
                                  cursor: 'pointer'
                                  }}>
                              </div>
                            : 
                              <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image2.png?alt=media&token=04203eaf-1fbd-439b-b2d1-88d227793338" style={{maxHeight:200}} />
                            }
                          <div className="text-center">
                            {this.state.dataHospedaje.url_2 ?
                              // <Card.Img onClick={() => this.setState({ isOpen: true })} variant="top" src={this.state.dataHospedaje.url_2} style={{maxHeight:300}} />
                              <div onClick={() => this.setState({ isOpen: true })} style={{
                                  backgroundImage: "url(" + this.state.dataHospedaje.url_2 + ")",
                                  backgroundPosition: 'center',
                                  backgroundSize: 'contain',
                                  backgroundRepeat: 'no-repeat',
                                  width: 300,
                                  height: 300,
                                  cursor: 'pointer'
                                  }}>
                              </div>
                            : 
                              <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image2.png?alt=media&token=04203eaf-1fbd-439b-b2d1-88d227793338" style={{maxHeight:200}} />
                            }
                          </div>
                          <div className="text-right">
                            {this.state.dataHospedaje.url_3 ?
                              <div onClick={() => this.setState({ isOpen: true })} style={{
                                  backgroundImage: "url(" + this.state.dataHospedaje.url_3 + ")",
                                  backgroundPosition: 'center',
                                  backgroundSize: 'contain',
                                  backgroundRepeat: 'no-repeat',
                                  width: 300,
                                  height: 300,
                                  cursor: 'pointer'
                                  }}>
                              </div>
                              // <Card.Img onClick={() => this.setState({ isOpen: true })} variant="top" src={this.state.dataHospedaje.url_3} style={{maxHeight:300}} />
                            : 
                              <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image2.png?alt=media&token=04203eaf-1fbd-439b-b2d1-88d227793338" style={{maxHeight:200}} />
                            }
                          </div>
                      </CardColumns>
                      </TabPanel>
                      <TabPanel value={this.state.valueComment} index={1}>
                          {this.state.uid ?
                                      <div>
                                        <Comments data={this.state.dataComments} executeOnClick={this.executeOnClick}/>
                                        <Rating
                                          style={{marginTop: '2%'}}
                                          name="simple-controlled"
                                          value={this.state.rating}
                                          onChange={(event, newValue) => {
                                            this.setState({rating: newValue});
                                          }}
                                        />
                                        <TextField
                                          id="outlined-multiline-static"
                                          label="Nuevo comentario"
                                          multiline
                                          rows={4}
                                          variant="outlined"
                                          style={{width: '100%'}}
                                          name="comment"
                                          onChange={this.handleChangeNewComment}
                                          value={this.state.comment}
                                        />
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            endIcon={<QuestionAnswerIcon />}
                                            style={{marginTop: '1%'}}
                                            onClick={() => this.createNewCommentItem('hospedajes', this.props.match.params.idHospedaje)}
                                          >
                                            Comentar
                                          </Button>
                                        </div>
                                        :
                                        <div className="alert alert-info">
                                          <strong>Para ver los comentarios debes iniciar sesión, es muy simple, solo dos clicks hacen falta!</strong>
                                        </div>
                                        }
                        </TabPanel>
                    </SwipeableViews>
                </div>
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
              {this.state.mensajeAlertaActivities ?
                <div className="alert alert-info">
                  <strong>Ups!</strong> No tenemos nada asociado a este hospedaje, si conoces de un <strong>Destino</strong> que se pueda realizar en este Hospedaje, <strong>¡inscribelo desde tu perfil!</strong>, si aún no tienes cuenta 
                  <strong> registrarte es muy fácil</strong>, por si fuera poco, <strong>estarás ayudando a muchas/os viajeras/os</strong> a conocer todo lo que pueden hacer desde este hospedaje.
                </div>
              :
                <Destinos data={this.state.dataDestiny}  />
              }
                
              </TabPanel>
              <TabPanel value={this.state.value} index={2}>
                {this.state.mensajeAlertaActivities ?
                  <div className="alert alert-info">
                    <strong>Ups!</strong> No tenemos nada asociado a este destino, si conoces de una <strong>Actividad</strong> que se pueda realizar en este destino, <strong>¡inscribelo desde tu perfil!</strong>, si aún no tienes cuenta 
                    <strong> registrarte es muy fácil</strong>, por si fuera poco, <strong>estarás ayudando a muchas/os viajeras/os</strong> a conocer todo lo que puedes hacer aquí, además, <strong>si tienes el tour que realice la actividad</strong>, ¡también puedes registrarlo!, <strong>todos ganan</strong>.
                  </div>
                :
                  <Actividades data={this.state.dataActivity} /> 
                }
              </TabPanel>
            </SwipeableViews>
          </div>
        </MDBView>
      </MDBContainer>
      <Footer />
    </div>
    );
  }
}
export default detailDestinos;