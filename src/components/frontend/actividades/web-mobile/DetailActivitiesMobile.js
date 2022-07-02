import React, { Component } from 'react';
import Menu from '../../container/Menu';
import Helpers from '../../helpers/Helpers'
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Footer from '../../container/Footer'
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import firebase from 'firebase/app'
// import Rating from '@material-ui/lab/Rating';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ContactForm from '../../container/ContactForm';
import './../styles-custom.css';
import Hospedajes from '../elements/Hospedajes'
import Comments from '../elements/Comments'
import TabPanel from '../elements/TabPanel'

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
class DetailActividades extends Component {
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
      valueComment: 0,
      dataComments: [],
      flag: false,
      comment: '',
      valoracion: 0,
      idActividad: props.props.match.params.idActividad,
    };
    this.textInput = React.createRef();
  }
  
  async componentDidMount(){
    let idActividad = this.props.props.match.params.idActividad
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
      Helpers.getActivityDetail(idActividad, (activities) => {
        this.setState({
          dataActivities: activities,
          galeria: activities.galeria
        })
      })
      Helpers.getComments(idActividad, 'actividades', (comments) => {
        this.setState({
          dataComments: comments
        })
      })
      
      Helpers.getHospedajeByActivity(idActividad, (hospedajes) => {
        if(hospedajes.length !== 0){
          this.setState({
            dataHospedajes: hospedajes
          })
        }else{
          this.setState({
            mensajeAlerta: true
          })
        }
        
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
  // START COMMENT
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
  // END COMMENT
  executeOnClick(isExpanded) {
      console.log(isExpanded);
  }
  createNewCommentItem = (segmento, idActividad) => {
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
      idSegmento: `${idActividad}_${segmento}`,
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
    return (
      <div style={{backgroundColor: '#f1f4f7'}}>
      <input type="text" ref={this.textInput} style={{position: 'absolute', top: 0, zIndex: -9999}} readOnly/>
      <Menu />
      <div style={{width: '100%', paddingBottom: '5%'}}>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="ACTIVIDAD" {...this.a11yProps(0)} />{/* label="Actividades" */}
                <Tab label="HOSPEDAJES" {...this.a11yProps(1)} />
                <Tab label="AGENCIAS" {...this.a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabPanel value={this.state.value} index={0}>
                <div style={{marginTop: '1%'}}>
                  <h5>{this.state.dataActivities.name}</h5>
                  <h5>{this.state.dataActivities.region}</h5>
                  <div onClick={() => this.setState({ isOpen: true })} style={{
                        backgroundImage: "url(" + this.state.dataActivities.url + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: '100%',
                        height: 250
                      }}>
                  </div>
                <AppBar position="static" color="inherit">
                    <Tabs
                    value={this.state.valueComment}
                    onChange={this.handleChangeComment}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    >
                    <Tab label="INFORMACIÓN" style={{ fontSize: 12 }} {...this.a11yPropsComment(0)} />{/* label="Actividades" */}
                    <Tab label={`COMENTARIOS (${this.state.dataComments.length})`} style={{ fontSize: 12 }} {...this.a11yPropsComment(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    index={this.state.valueComment}
                    onChangeIndex={this.handleChangeIndexComment}
                  >
                    <TabPanel value={this.state.valueComment} index={0}>
                      <div>
                          <h5 className="text-center" style={{textDecoration: 'underline'}}>Descripción</h5>
                          <p style={{textAlign: 'justify'}}>{this.state.dataActivities.descripcion}</p>
                      </div>       
                      <div>              
                        <br />
                        <h5 className="text-center" style={{textDecoration: 'underline'}}>Recomendaciones</h5>
                        <div style={{borderLeft: '0.2em solid #07737f', paddingLeft: 10}}>
                            <p>{this.state.dataActivities.recomendaciones}</p>
                        </div>
                        <br />
                      </div>
                      {this.state.dataActivities.dificultad !== undefined ?
                            <div>
                              <br />
                              <div style={{borderLeft: '0.2em solid #07737f', paddingLeft: 10}}>
                                  <p>Dificultad: {this.state.dataActivities.dificultad}</p>
                              </div>
                            </div>
                      : 
                      null
                      }
                      <h5 style={{marginTop: '3%'}}>Créditos</h5>
                      <div>
                        <li>Autor: <strong>{this.state.dataActivities.autor}</strong></li>
                      </div>
                      <h5 style={{marginTop: '3%'}}>Publicado por</h5>
                      {
                      this.state.uid !== '' ? 
                        <div>
                          {this.state.dataActivities.instagram !== "" ? <li>Instagram: <strong><a href={"https://www.instagram.com/" + this.state.dataActivities.instagram} rel="noopener noreferrer" target="_blank">@{this.state.dataActivities.instagram}</a></strong></li> : null}
                          <li>Viajeros: <strong><Link to={`/user/${this.state.dataActivities.idUsuario}`}>Perfil</Link></strong></li>
                        </div>
                      : 
                      <div className="alert alert-info">
                        <strong>Atención!</strong> Para ver más información debes registrarte, es muy fácil, no debes llenar formuarios, solo dos click hacen falta!.
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
                      <CardColumns style={{marginTop: '4%'}}>
                          <Card>
                            {this.state.dataActivities.url_1 ?
                              <Card.Img onClick={() => this.setState({ isOpen: true })} variant="top" src={this.state.dataActivities.url_1} style={{maxHeight:300}} />
                            : 
                              <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image2.png?alt=media&token=04203eaf-1fbd-439b-b2d1-88d227793338" style={{maxHeight:300}} />
                            }
                          </Card>
                          <Card className="text-center"> 
                            {this.state.dataActivities.url_2 ?
                              <Card.Img onClick={() => this.setState({ isOpen: true })} variant="top" src={this.state.dataActivities.url_2} style={{maxHeight:300}} />
                            : 
                              <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image2.png?alt=media&token=04203eaf-1fbd-439b-b2d1-88d227793338" style={{maxHeight:300}} />
                            }
                          </Card>
                          <Card className="text-right">
                            {this.state.dataActivities.url_3 ?
                              <Card.Img onClick={() => this.setState({ isOpen: true })} variant="top" src={this.state.dataActivities.url_3} style={{maxHeight:300}} />
                            : 
                              <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image2.png?alt=media&token=04203eaf-1fbd-439b-b2d1-88d227793338" style={{maxHeight:300}} />
                            }
                          </Card>
                      </CardColumns>
                      <ContactForm uid={this.state.uid} type="actividad" id={this.state.idActividad} />
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
                                  onClick={() => this.createNewCommentItem('actividades', this.props.props.match.params.idActividad)}
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
                    <strong>Ups!</strong> No tenemos nada asociado a esta actividad, si tienes un <strong>Hospedaje</strong> desde donde se pueda llegar a realizar esta actividad, <strong>¡inscribelo desde tu perfil!</strong>, si aún no tienes cuenta 
                    <strong> registrarte es muy fácil</strong>, podrás comenzar a registrar tus servicios, <strong>aparecerán bien ubicados</strong>, justo donde la gente necesita verte.
                  </div>
                :
                  <Hospedajes data={this.state.dataHospedajes} /> 
                }
                
              </TabPanel>
              <TabPanel value={this.state.value} index={2}>
                {/* <Actividades data={this.state.dataActivities} /> */}
                <div className="alert alert-info">Proximamente</div>
              </TabPanel>
            </SwipeableViews>
      </div>
      <Footer />
    </div>
    );
  }
}
export default DetailActividades;