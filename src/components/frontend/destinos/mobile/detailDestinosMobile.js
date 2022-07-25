import React, { Component } from 'react';
import Menu from './../container/Menu';
import Helpers from './../helpers/Helpers'
import PropTypes from 'prop-types';
import { MDBContainer, MDBView, MDBRow, MDBCol } from 'mdbreact';
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

import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import firebase from 'firebase/app'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ShowMoreText from 'react-show-more-text';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';

import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import cx from 'clsx';

import ContactForm from './../container/ContactForm'

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
  root2: {
      width: '100%',
      margin: 'auto',
      borderRadius: 12,
      padding: 14,
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
                        title={item.name}
                        subheader={item.fecha_publicacion}
                      />
                      <CardContent>
                        {/* <Typography variant="body2" color="textSecondary" component="p"> */}
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
                        {/* </Typography> */}
                      </CardContent>
                    </Card>
                </div>
            )}
        </div>
  )
}
const Hospedajes = (props) => {
  const hospedajes = props.data
  const styles = useStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });
  return(
    <div>
        {
        hospedajes.map((item, index) => 
            item.estado === "1" ? 
            <div key={index}>
                  <Card className={cx(styles.root2, shadowStyles.root2)} style={{marginTop: '2%'}}>
                      <Link to={ `/hospedaje/${item.id}`} style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)'}}>
                          <MDBRow>
                              <MDBCol lg="4">
                                      <div style={{
                                          backgroundImage: "url(" + item.thumbnail + ")",
                                          backgroundPosition: 'center',
                                          backgroundSize: 'cover',
                                          backgroundRepeat: 'no-repeat',
                                          height: 240,
                                          borderRadius: 12
                                          }}>
                                      </div>
                              </MDBCol>
                              <MDBCol lg="8">
                                  <h6 className="mb-3" style={{marginTop: '1%', color:'#6f6f6f'}}>{item.tipo_hospedaje} en {item.region}</h6>
                                  <h5 className="mb-3"><strong style={{color: '#454545', fontSize: 16}}>{item.name}</strong></h5>
                                  <h5 className="mb-3"><strong style={{color: '#6f6f6f', fontSize: 16}}>${item.precio} CLP por noche</strong></h5>
                                  <p style={{color: '#07737f', borderTop: '1px solid #ccc', paddingTop: 4, marginTop : '5%'}}>
                                      {item.max_huespedes > 1 ? item.max_huespedes + ' huéspedes' : item.max_huespedes + ' huésped'} · {item.habitaciones > 1 ? item.habitaciones + ' habitaciones' : item.habitaciones + ' habitación'} {item.camas > 1 ? item.camas + ' camas': item.camas + ' cama'} · {item.wc > 1 ? item.wc + ' baños': item.wc + ' baño'}
                                  </p>
                              </MDBCol>
                          </MDBRow>
                      </Link>
                  </Card>
              </div> 
            : null
        )}
    </div>
  )
}
const Actividades = (props) => {
  const activities = props.data
  let widthScreen = 0
  window.screen.width < 1024 ? widthScreen = window.screen.width : widthScreen = 345
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
                        {item.thumbnail ? 
                          <div style={{
                              backgroundImage: "url(" + item.thumbnail + ")",
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              width: '100%',
                              height: 250
                              }}>
                          </div>
                        :
                          <div style={{
                              backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image2.png?alt=media&token=04203eaf-1fbd-439b-b2d1-88d227793338)",
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              width: '100%',
                              height: 250
                              }}>
                          </div>
                        }
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
      dataActivities: [],
      isOpen: false,
      photoIndex: 0,
      mensajeAlerta: false,
      mensajeAlertaActivities: false,
      valueComment: 0,
      comment: "",
      dataComments: [],
      idDestino: props.match.params.idDestino,
    };
    this.textInput = React.createRef();
  }
  async componentDidMount(){
    let idDestino = this.props.match.params.idDestino
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
      Helpers.getDestinosDetail(idDestino, (destino) => {
        this.setState({
          dataDestiny: destino,
          galeria: destino.galeria
        })
      })
      
      Helpers.getActivitiesByDestiny(idDestino, (activities) => {
        if(activities.length !== 0){
          this.setState({
            dataActivities: activities
          })
        }else{
          this.setState({
            mensajeAlertaActivities: true
          })
        }
      })
      Helpers.getHospedajeByDestino(idDestino, (hospedajes) => {
        if(hospedajes.length !== 0){
          this.setState({
            dataHospedajes: hospedajes
          })
        }else{
              this.setState({mensajeAlerta: true})
        }
      })
      Helpers.getComments(idDestino, 'destinos', (comments) => {
        this.setState({
          dataComments: comments
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
  executeOnClick(isExpanded) {
    console.log(isExpanded);
}
  createNewCommentItem = (segmento, idDestino) => {
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
      idSegmento: `${idDestino}_${segmento}`,
      idUsuario: this.state.uid,
      valoracion: 0
    }
    if(this.state.comment !== ""){
      Helpers.createNewComment(obj);
      this.setState({comment: ""})
    }
  }
  
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
                <Tab label="DESTINO" {...this.a11yProps(0)} />{/* label="Actividades" */}
                <Tab label="HOSPEDAJES" {...this.a11yProps(1)} />
                <Tab label="ACTIVIDADES" {...this.a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabPanel value={this.state.value} index={0}>
                {/* <DetalleDestino data={this.state.dataDestiny} uid={this.state.uid}/> */}
        
                  <div style={{marginTop: '2%'}}>
                  {widthScreen === 12 ? <h4>{this.state.dataDestiny.name}</h4> : <h1>{this.state.dataDestiny.name}</h1> }                  
                  <h5>{this.state.dataDestiny.region}</h5>
                  {widthScreen === 12 ? 
                    <div onClick={() => this.setState({ isOpen: true })} style={{
                          backgroundImage: "url(" + this.state.dataDestiny.url + ")",
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          width: '100%',
                          height: 250
                          }}>
                    </div> 
                  : 
                    this.state.dataDestiny.url ?
                      // <GaleriaPage url_1={this.state.dataDestiny.url} onClick={() => this.setState({ isOpen: true })}/>
                      <div onClick={() => this.setState({ isOpen: true })} style={{
                            backgroundImage: "url(" + this.state.dataDestiny.url + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            width: '100%',
                            height: 500
                            }}>
                      </div> 
                    : 
                      <div onClick={() => this.setState({ isOpen: true })} style={{
                            backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image-banner.jpg?alt=media&token=bb949844-57bd-4be1-91c7-c712a968b78a)",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            width: '100%',
                            height: 500
                            }}>
                      </div> 
                  
                    
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
                    <Tab label="INFORMACION" {...this.a11yPropsComment(0)} style={{ fontSize: widthScreen === 12 ? 12 : null }} />
                    <Tab label={`COMENTARIOS (${this.state.dataComments.length})`} style={{ fontSize: widthScreen === 12 ? 12 : null }} {...this.a11yPropsComment(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                  index={this.state.valueComment}
                  onChangeIndex={this.handleChangeIndexComment}
                >
                  <TabPanel value={this.state.valueComment} index={0}>
                  
                    {widthScreen === 12 ? 
                      <div>
                        <h5 className="text-center" style={{textDecoration: 'underline'}}>Descripción</h5>
                        <p style={{textAlign: 'justify'}}>{this.state.dataDestiny.descripcion}</p>
                      </div>
                    : 
                    <div style={{borderLeft: '0.2em solid #07737f', paddingLeft: 10}}>
                      <p>{this.state.dataDestiny.descripcion}</p>
                    </div>
                    }
                  <br />
                  {this.state.dataDestiny.recomendaciones !== undefined ?
                    widthScreen === 12 ? 
                    <div>
                      <h5 className="text-center" style={{textDecoration: 'underline'}}>Recomendaciones</h5>
                      <p style={{textAlign: 'justify'}}>{this.state.dataDestiny.recomendaciones}</p>
                    </div>
                    : 
                    <div>
                      <h5>Recomendaciones</h5>
                      <div style={{borderLeft: '0.2em solid #07737f', paddingLeft: 10}}>
                          <p>{this.state.dataDestiny.recomendaciones}</p>
                      </div>
                      <br />
                    </div>
                    : 
                    null
                  }
                  {this.state.dataDestiny.acceso !== undefined ?
                    widthScreen === 12 ? 
                    <div>
                      <h5 className="text-center" style={{textDecoration: 'underline'}}>Acceso</h5>
                      <p style={{textAlign: 'justify'}}>{this.state.dataDestiny.acceso}</p>
                    </div>
                    : 
                    <div>
                      <h5>Acceso</h5>
                      <div style={{borderLeft: '0.2em solid #07737f', paddingLeft: 10}}>
                          <p>{this.state.dataDestiny.acceso}</p>
                      </div>
                    </div>
                    : 
                    null
                  }
                  <div style={{marginTop: '3%'}}>
                  <h5>Publicado por:</h5>
                    {
                    this.state.uid !== '' ? 
                      <div style={{borderLeft: '0.2em solid #07737f', paddingLeft: 10}}>
                        {this.state.dataDestiny.instagram !== "" ? <span>Instagram: <strong><a href={"https://www.instagram.com/" + this.state.dataDestiny.instagram} rel="noopener noreferrer" target="_blank">@{this.state.dataDestiny.instagram}</a></strong><br /></span> : null}
                        Viajeros: <strong><Link to={`/user/${this.state.dataDestiny.idUsuario}`}>Perfil</Link></strong>
                      </div>
                    : 
                    <div className="alert alert-info">
                      <strong>Atención!</strong> Para ver más información debes registrarte, es muy fácil, no debes llenar formuarios, solo dos click hacen falta!.
                    </div>
                    }
                  </div>
                  {this.state.dataDestiny.autor_portada && this.state.dataDestiny.autor_galeria && this.state.dataDestiny.autor ?
                    <div style={{marginTop: '3%'}}>
                      <h5>Créditos de autor</h5>
                      <div style={{borderLeft: '0.2em solid #07737f', paddingLeft: 10}}>
                          Portada: <strong>{this.state.dataDestiny.autor_portada}</strong><br />
                          Galeria: <strong>{this.state.dataDestiny.autor_galeria}</strong><br />
                          Descripciones: <strong>{this.state.dataDestiny.autor}</strong>
                      </div>
                    </div>
                    : null
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
                  <CardColumns style={{marginTop: '4%'}}>
                      <Card>
                        {this.state.dataDestiny.url_1 ?
                          <Card.Img onClick={() => this.setState({ isOpen: true })} variant="top" src={this.state.dataDestiny.url_1} style={{maxHeight:300}} />
                        : 
                          <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image2.png?alt=media&token=04203eaf-1fbd-439b-b2d1-88d227793338" style={{maxHeight:300}} />
                        }
                      </Card>
                      <Card className="text-center">
                        {this.state.dataDestiny.url_2 ?
                          <Card.Img onClick={() => this.setState({ isOpen: true })} variant="top" src={this.state.dataDestiny.url_2} style={{maxHeight:300}} />
                        : 
                          <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image2.png?alt=media&token=04203eaf-1fbd-439b-b2d1-88d227793338" style={{maxHeight:300}} />
                        }
                      </Card>
                      <Card className="text-right">
                        {this.state.dataDestiny.url_3 ?
                          <Card.Img onClick={() => this.setState({ isOpen: true })} variant="top" src={this.state.dataDestiny.url_3} style={{maxHeight:300}} />
                        : 
                          <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image2.png?alt=media&token=04203eaf-1fbd-439b-b2d1-88d227793338" style={{maxHeight:300}} />
                        }
                      </Card>
                  </CardColumns>
                  <ContactForm uid={this.state.uid}  type="destino" id={this.state.idDestino}/>
                  </TabPanel>
                  <TabPanel value={this.state.valueComment} index={1}>
                        {this.state.uid ?
                            <div>
                              <Comments data={this.state.dataComments} executeOnClick={this.executeOnClick}/>
                              <TextField
                                id="outlined-multiline-static"
                                label="Nuevo comentario"
                                multiline
                                rows={4}
                                variant="outlined"
                                style={{width: '100%', marginTop: '1%'}}
                                name="comment"
                                onChange={this.handleChangeNewComment}
                                value={this.state.comment}
                              />
                                <Button
                                  variant="contained"
                                  color="primary"
                                  endIcon={<QuestionAnswerIcon />}
                                  style={{marginTop: '1%'}}
                                  onClick={() => this.createNewCommentItem('destinos', this.props.match.params.idDestino)}
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
              {this.state.mensajeAlerta ? 
                  <div className="alert alert-info">
                    <strong>Ups!</strong> No tenemos nada asociado a este destino, si tienes un <strong>Hospedaje</strong> desde donde se pueda llegar a este lugar, <strong>¡inscribelo desde tu perfil!</strong>, si aún no tienes cuenta 
                    <strong> registrarte es muy fácil</strong>, podrás comenzar a registrar tus servicios, <strong>aparecerán bien ubicados</strong>, justo donde la gente necesita verte.
                  </div>
                :
                  <Hospedajes data={this.state.dataHospedajes} /> 
                }
              </TabPanel>
              <TabPanel value={this.state.value} index={2}>
                {this.state.mensajeAlertaActivities ?
                  <div className="alert alert-info">
                    <strong>Ups!</strong> No tenemos nada asociado a este destino, si conoces de una <strong>Actividad</strong> que se pueda realizar en este destino, <strong>¡inscribelo desde tu perfil!</strong>, si aún no tienes cuenta 
                    <strong> registrarte es muy fácil</strong>, por si fuera poco, <strong>estarás ayudando a muchas/os viajeras/os</strong> a conocer todo lo que puedes hacer aquí, además, <strong>si tienes el tour que realice la actividad</strong>, ¡también puedes registrarlo!, <strong>todos ganan</strong>.
                  </div>
                :
                  <Actividades data={this.state.dataActivities} /> 
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