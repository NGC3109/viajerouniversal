import React, { Component } from 'react';
import Menu from '../container/Menu';
import Footer from '../container/Footer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import Badge from '@material-ui/core/Badge';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Helpers from '../helpers/Helpers';
import firebase from 'firebase/app'
// import MIGroup from './MIGroup';

import {Button, Modal } from 'react-bootstrap'
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import GroupIcon from '@material-ui/icons/Group';

import Alert from 'react-bootstrap/Alert'
import { MDBContainer, MDBView } from 'mdbreact';
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
export default class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        nameUser: '',
        idUser: '',
        arrayPublicacion: [],
        arraySolicitudes: [],
        arrayIntegrantes: [],
        idPublicSelected: null,
        valueComment: 0,
        arrayInscripciones: [],
        tipo: 0,
        showMessagePub: false,
        showMessageIns: false,
        urlUser: ''
    };
  }
  async componentDidMount(){
    try{
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          this.setState({
            nameUser: user.displayName,
            idUser: user.uid
          });
          Helpers.getUrlUser(user.uid, (url) => {
            this.setState({
                urlUser: url
            }) 
          });
          Helpers.getUserRequestByGroup(user.uid, (publicacion) => {
            if(publicacion.length !== 0){
                this.setState({
                    arrayPublicacion: publicacion
                }) 
              }else{
                this.setState({
                    showMessagePub: true
                })
              }
          });
          Helpers.getUserResetByGroup(user.uid);
          Helpers.getInscripcionesGroup(user.uid, (inscripciones) => {
                if(inscripciones.length !== 0){
                    this.setState({
                        arrayInscripciones: inscripciones
                    })
                }else{
                    this.setState({
                        showMessageIns: true
                    })
                }
          })
        }
      }.bind(this));
    }catch(error){
        console.log(error)
    }
  }

  renderItems = (idPublic, tipo) => {
    this.setState({
        open: !this.state.open,
        tipo
    })
    Helpers.getSolicitudesRequestByGroup(idPublic, (solicitudes) => {
        this.setState({
            arraySolicitudes: solicitudes,
            idPublicSelected: idPublic
        })
    })
    Helpers.getIntegrantesRequestByGroup(idPublic, (solicitudes) => {
        this.setState({
            arrayIntegrantes: solicitudes,
            idPublicSelected: idPublic
        })
    })
  }
  handleShowClose = () => {
    this.setState({
        open: !this.state.open,
        arrayIntegrantes: [],
        arraySolicitudes: []
    })
  }
  handleAcepted = (idUsuarioAceptado, idPublicacion, acepted, idGrupo, objSolicitud) => {
    var today = new Date();
    var day = new Date(today).getDate()
    var month = new Date(today).getMonth()
    var year = new Date(today).getFullYear()
    var hour = new Date(today).getHours()
    var min = new Date(today).getMinutes()
    const fecha_publicacion = `${(day < 10 ? '0'+day : day)}-${(month < 10 ? '0'+(month + 1) : (month + 1))}-${year} ${(hour < 10 ? '0'+hour : hour)}:${(min < 10 ? '0'+min : min)}`  
    let objAcepted = {
        idUsuarioMasterGroup: this.state.idUser,
        urlUsuarioMasterGroup: this.state.urlUser,
        nameGrupo: objSolicitud.tituloGrupo,
        nameUsuarioMasterGroup:this.state.nameUser,
        msg:`te ha aceptado en el grupo`,
        createdAt: fecha_publicacion,
        view: false,
        order: Math.floor(Date.now() / 1000),
        link: `/publicacion/${idPublicacion}`,
    }  
    Helpers.solicitudes_setAcepted(idUsuarioAceptado, idPublicacion, idGrupo, acepted, objSolicitud, objAcepted);
    this.setState({
        open: !this.state.open,
        arrayIntegrantes: [],
        arraySolicitudes: []
    })
  }
  handleDeleted = (idPublicacion, idGrupo) => {
      Helpers.solicitudes_setDeleteed(idPublicacion, idGrupo);
      this.setState({
        open: !this.state.open,
        arrayIntegrantes: [],
        arraySolicitudes: []
    })
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
  render() {
    return (
        <div style={{backgroundColor: '#f1f4f7'}}>
        <Menu />
        <MDBContainer>
        <MDBView>
            <AppBar position="static" color="inherit">
                <Tabs
                    value={this.state.valueComment}
                    onChange={this.handleChangeComment}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="CREADOS" {...this.a11yPropsComment(0)} />{/* label="Actividades" */}
                    <Tab label={"INSCRITOS"} {...this.a11yPropsComment(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={this.state.valueComment}
                onChangeIndex={this.handleChangeIndexComment}
            >
                <TabPanel value={this.state.valueComment} style={{paddingBottom: '20%'}} index={0}>
                    <Grid container spacing={3}>
                            {
                            this.state.arrayPublicacion.length !== 0 ?
                            this.state.arrayPublicacion.map((item, i) => 
                                item.estado_viaje === "1" ?
                                    item.estado === "1" ?
                                    <Grid item xs={12} sm={6} key={i}>
                                        <div onClick={() => this.renderItems(item.id, 1)}>
                                            <Paper>
                                                <div style={{flexGrow: 1}}>
                                                    <Paper style={{padding: 16, margin: 'auto', maxWidth: '100%'}}>
                                                        <Grid container spacing={2}>
                                                        <Grid item>
                                                            <ButtonBase style={{width: '100%'}}>
                                                                <img 
                                                                    onClick={() => this.renderItems(item.id, 1)} 
                                                                    style={{ margin: 'auto', display: 'block', maxWidth: '100%'}} alt="complex" 
                                                                    src={item.url_portada} 
                                                                />
                                                            </ButtonBase>
                                                        </Grid>
                                                        <Grid item xs={12} sm container>
                                                            <Grid item xs container direction="column" spacing={2}>
                                                                <Grid item xs>
                                                                    <Typography gutterBottom variant="subtitle1">
                                                                    {item.titulo}
                                                                    </Typography>
                                                                    <Typography variant="body2" gutterBottom>
                                                                    Participantes: {item.integrantes !== null ? Object.keys(item.integrantes).length : 0}
                                                                    </Typography>
                                                                    <AvatarGroup max={4}>
                                                                        {
                                                                            item.integrantes !== null ?
                                                                            Object.values(item.integrantes).map((elem, ix) => 
                                                                                    elem.acepted !== "2" ?
                                                                                    <Avatar src={elem.user_url} alt={elem.nombreUser}  key={ix} />
                                                                                    : null
                                                                                )
                                                                            : null
                                                                        }
                                                                    </AvatarGroup>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Badge badgeContent={
                                                                    item.solicitudes !== null ? Object.keys(item.solicitudes).length : null
                                                                } 
                                                                color="error">
                                                                    <GroupIcon />
                                                                </Badge>
                                                            </Grid>
                                                        </Grid>
                                                        </Grid>
                                                    </Paper>
                                                </div>
                                            </Paper>
                                        </div>
                                    </Grid>
                                    : null
                                : null
                            )
                            :
                            <Alert variant='info'>
                                <Alert.Heading><strong>Ups, no has registrado ningún viaje</strong></Alert.Heading>
                                <p>
                                    Aquí aparecerán tus viajes creados, las solicitudes de personas que quieran formar parte de tu grupo, podrás aceptarlas
                                    o rechazarlas según el criterio que definas.
                                </p> 
                                <hr />
                                <p className="mb-0">
                                    Para crear tu grupo pincha <Link to="/perfil">AQUÍ!</Link>
                                </p>
                            </Alert>
                            }
                    </Grid>
                </TabPanel>
                <TabPanel value={this.state.valueComment} style={{paddingBottom: '20%'}} index={1}>
                        <Grid container spacing={3}>
                            {this.state.arrayInscripciones.map((item, i) => 
                                    item.estado === "1" ?
                                    <Grid item xs={12} sm={6} key={i}>
                                        <Card style={{width: '100%',minHeight: 300}}>
                                            <CardActionArea>
                                                    <Link to={ `/publicacion/${item.id}`} style={{textDecoration: 'none'}}>
                                                        <div style={{
                                                            backgroundImage: "url(" + item.url_portada + ")",
                                                            backgroundPosition: 'top',
                                                            backgroundSize: 'cover',
                                                            backgroundRepeat: 'no-repeat',
                                                            width: '100%',
                                                            height: 300,
                                                            }}>
                                                        </div>
                                                    </Link>
                                                    <CardContent>
                                                        <Link to={ `/publicacion/${item.id}`} style={{textDecoration: 'none'}}>
                                                            <Typography gutterBottom variant="h4" component="h1" style={{fontFamily: 'Roboto', fontWeight: '500'}}>
                                                                <span style={{color: '#454545'}}>{item.titulo}</span>
                                                            </Typography>
                                                            <Typography>
                                                                <ExploreOutlinedIcon style={{color: '#1e93f5'}}/> <span style={{color: '#6f6f6f'}}>Desde: </span><span style={{color: '#07737f', fontWeight: 'bold'}}>{item.lugar_inicio === "Metropolitana" ? "Santiago" : item.lugar_inicio}</span> - <span style={{color: '#6f6f6f'}}>Hasta: </span><span style={{ color: '#07737f', fontWeight: 'bold'}}>{item.destino_final}</span>
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <InfoOutlinedIcon style={{color: '#1e93f5'}} /> {item.descripcion.length > 199 ?
                                                                    item.descripcion.substr(0,200) + '...'
                                                                    :
                                                                    item.descripcion
                                                                }
                                                            </Typography>
                                                        </Link>
                                                    </CardContent>
                                                    <CardContent onClick={() => this.renderItems(item.id, 2)}>
                                                        <AvatarGroup max={4}>
                                                            {
                                                                item.integrantes !== null ?
                                                                Object.values(item.integrantes).map((elem, ix) => 
                                                                        elem.acepted !== "2" ?
                                                                        <Avatar src={elem.user_url} alt={elem.nombreUser}  key={ix} />
                                                                        : null
                                                                    )
                                                                : null
                                                            }
                                                        </AvatarGroup>
                                                    </CardContent>
                                                
                                            </CardActionArea>
                                            <CardActions disableSpacing style={{backgroundColor: '#07737f'}}>
                                                <IconButton>
                                                    <Avatar src={item.url_user} style={{marginRight: 5}}></Avatar>
                                                    <Typography>
                                                        <Link to={ `/user/${item.idUsuario}`} style={{textDecoration: 'none', color: 'white'}}>{item.name_user}</Link>
                                                    </Typography>
                                                </IconButton>
                                                {item.estado_viaje === "0" ?
                                                    <IconButton
                                                        style={{transform: 'rotate(0deg)', marginLeft: 'auto'}}
                                                    >
                                                        <Badge color="error" overlap="circle" badgeContent="Viajando" style={{marginRight: 15}}></Badge>
                                                    </IconButton>
                                                    : null
                                                }
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    : null
                            )                            
                        }
                        {
                            this.state.showMessageIns ?
                                <Alert variant='info'>
                                    <Alert.Heading><strong>Ups, no tienes ningún grupo aún</strong></Alert.Heading>
                                    <p>
                                        En este segmento verás los grupos de viaje donde te aceptaron, además de todos los miembros
                                        del grupo y sus perfiles. Atrévete, busca un grupo a tu medida y comienza a viajar, no hay
                                        nada que llene el alma más que viajar!
                                    </p> 
                                    <hr />
                                    <p className="mb-0">
                                        Para comenzar a buscar grupos pincha <Link to="/publicaciones">AQUÍ!</Link>
                                    </p>
                                </Alert>
                            :
                            this.state.arrayInscripciones.length === 0 ?
                                <Alert variant='info'>
                                    <Alert.Heading><strong>Ups, no tienes ningún grupo aún</strong></Alert.Heading>
                                    <p>
                                        En este segmento verás los grupos de viaje donde te aceptaron, además de todos los miembros
                                        del grupo y sus perfiles. Atreveté, busca un grupo a tu medida y comienza a viajar, no hay
                                        nada que llene el alma más que viajar!
                                    </p> 
                                    <hr />
                                    <p className="mb-0">
                                        Para comenzar a buscar grupos pincha <Link to="/publicaciones">AQUÍ!</Link>
                                    </p>
                                </Alert>
                            :
                                null
                        }
                    </Grid>
                </TabPanel>
            </SwipeableViews>
        </MDBView>
        </MDBContainer>
            <div>
                <Modal show={this.state.open} onHide={this.handleShowClose} style={{zIndex: 9999}}>
                    <Modal.Header>
                        <Modal.Title>Integrantes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <List>
                            {this.state.arraySolicitudes.map((item, i) => 
                            <ListItem key={i}>
                                <ListItemAvatar>
                                    <Avatar src={item.user_url} alt={item.nombreUser} />
                                </ListItemAvatar>
                                <ListItemText
                                    secondary={
                                        <React.Fragment>
                                            <Link to={ `/user/${item.idUsuario}`} style={{color: 'black'}}>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                    style={{display: 'inline'}}
                                                >
                                                {item.nombreUser}
                                                </Typography>
                                            </Link>
                                                {" — " + item.comentario}
                                        </React.Fragment>
                                    }
                                />
                                    {
                                        this.state.tipo === 1 ?
                                            item.acepted === "0" ?
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="add">
                                                        <CheckIcon style={{color: ''}} onClick={() => this.handleAcepted(item.idUsuario, this.state.idPublicSelected, "1", item.id, item.obj)} />
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="delete">
                                                        <DeleteIcon onClick={() => this.handleDeleted(this.state.idPublicSelected, item.id)}/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            :
                                            null
                                        : null
                                    }
                            </ListItem>
                            )}
                            {this.state.arrayIntegrantes.map((itemX, i) => 
                            <ListItem className="alert-success" key={i}>
                                <ListItemAvatar>
                                    <Avatar src={itemX.user_url} alt={itemX.nombreUser} />
                                </ListItemAvatar>
                                <ListItemText
                                    secondary={
                                        <React.Fragment>
                                            <Link to={ `/user/${itemX.idUsuario}`} style={{color: 'black'}}>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                    style={{display: 'inline'}}
                                                >
                                                    {itemX.nombreUser}
                                                </Typography>
                                            </Link>
                                        {" — " + itemX.comentario}
                                        </React.Fragment>
                                    }
                                />
                                {this.state.tipo === 1 ?
                                    <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon onClick={() => this.handleDeleted(this.state.idPublicSelected, itemX.id)}/>
                                            </IconButton>
                                    </ListItemSecondaryAction>
                                    : null    
                                }
                            </ListItem>
                            )}
                        </List>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleShowClose}>
                        Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        <Footer />
      </div>
    );
  }
}
