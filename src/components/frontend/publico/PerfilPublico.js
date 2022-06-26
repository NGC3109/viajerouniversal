import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
// // import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
// import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
// import AirplanemodeActiveOutlinedIcon from '@material-ui/icons/AirplanemodeActiveOutlined';
// import FilterHdrOutlinedIcon from '@material-ui/icons/FilterHdrOutlined';
import { MDBContainer, MDBView, MDBCol, MDBRow } from 'mdbreact';
import Menu from '../container/Menu';
import Footer from '../container/Footer';
import firebase from 'firebase/app'
import Helpers from '../helpers/Helpers';
import {CardColumns, Card } from 'react-bootstrap/'
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';

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

const RenderItemDestinos = (props) => {
  return(<CardColumns>
            {
              props.rows.length !== 0 ?
                props.rows.map((item, i) => 
                    item.estado === "1" ? 
                            <div key={i}>
                                <Link to={ `/destino/${item.id}`} style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)'}}>
                                  <Card className="text-center">
                                      <div style={{
                                          backgroundImage: "url(" + item.thumbnail + ")",
                                          backgroundPosition: 'center',
                                          backgroundSize: 'cover',
                                          backgroundRepeat: 'no-repeat',
                                          width: '100%',
                                          height: 300,
                                      }}>
                                      </div>
                                  </Card>
                                </Link>
                            </div>
                    : null
                )
            : null}
        </CardColumns>)
}

const RenderItemPublicaciones = (props) => {
  return(
          <CardColumns>
              {
                props.rows.length !== 0 ?
                  props.rows.map((item, i) => 
                    item.estado === "1" ? 
                            <div key={i}>
                              <Link to={ `/publicacion/${item.id}`} style={{textDecoration: 'none'}}>
                                  <Card className="text-center">
                                      <div style={{
                                          backgroundImage: "url(" + item.url_portada + ")",
                                          backgroundPosition: 'center',
                                          backgroundSize: 'cover',
                                          backgroundRepeat: 'no-repeat',
                                          width: '100%',
                                          height: 300,
                                          }}>
                                      </div>
                                  </Card>
                                </Link>
                            </div>
                    : null
                  )
                : null
               }
          </CardColumns>
)
}
const Actividades = (props) => {
  const activities = props.data
  return(
    <CardColumns>
            {
              activities.length !== 0 ?
                activities.map((item, i) => 
                  item.estado === "1" ? 
                    <div key={i}>
                        <Link to={ `/actividad/${item.id}`} style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)'}}>
                          <Card className="text-center">
                              <div style={{
                                  backgroundImage: "url(" + item.thumbnail + ")",
                                  backgroundPosition: 'center',
                                  backgroundSize: 'cover',
                                  backgroundRepeat: 'no-repeat',
                                  width: '100%',
                                  height: 300,
                                  }}>
                              </div>
                          </Card>
                        </Link>
                    </div>
                  : null
                )
              :null
          }
    </CardColumns>
  )
}
const RenderItemHospedajes = (props) => {
  return(<CardColumns>
            {
              props.data.length !== 0 ?
                props.data.map((item, i) => 
                  item.estado === "1" ? 
                          <div key={i}>
                              <Link to={ `/hospedaje/${item.id}`} style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)'}}>
                                <Card className="text-center">
                                    <div style={{
                                        backgroundImage: "url(" + item.thumbnail + ")",
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        width: '100%',
                                        height: 300,
                                        }}>
                                    </div>
                                </Card>
                              </Link>
                          </div>
                  : null
                )
              : null
            }
        </CardColumns>)
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


class PerfilPublico extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0, nombre: '', 
      idUsuario: props.match.params.usr_id, 
      url_portada_publicaciones: [], 
      url_portada_destinos: [], 
      url: '', 
      descripcion: '', 
      chipData: [],
      items: 20,
      loading: false,
      dataActivities: [],
      dataHospedaje: []
    }
    this.textInput = React.createRef();
  }
  async componentDidMount(){
    this.textInput.current.focus();
    try{
      this.setState({ ActivityIndicator_Loading : true }, () => {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            this.setState({
              nameUser: user.displayName,
              uid: user.uid
            });
            Helpers.getUser(this.state.idUsuario, (user_uid) => {
              if(user_uid !== 0){
                this.setState({
                  nombre: user_uid.name,
                  url: user_uid.url,
                  descripcion: user_uid.descripcion,
                  chipData: user_uid.intereses || null
                })
              }
            })
            Helpers.getPublicacionesUser(this.state.idUsuario, (publicaciones) => {
              this.setState({
                url_portada_publicaciones: publicaciones
              })
            });
            Helpers.getDestinosUser(this.state.idUsuario, (destinos) => {
                this.setState({
                  url_portada_destinos: destinos
                })
            });
            Helpers.getActivitiesByUser(this.state.idUsuario, (activities) => {
              this.setState({
                dataActivities: activities
              })
            })
            Helpers.getHospedajeByUser(this.state.idUsuario, (hospedajes) => {
              this.setState({
                dataHospedaje: hospedajes
              })
            })
          } else {
            // No user is signed in.
            window.location.href = "http://viajerouniversal.com/"
          }
        }.bind(this));
      });
    }catch(error){
        console.log(error)
    }
  }
  loadMore = () => {
      this.setState({ loading: true });
      setTimeout(() => {
          this.setState({ items: this.state.items + 20, loading: false });
      }, 2000);
  }
  a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
  };

  handleChangeIndex = (index) => {
    this.setState({
      value: index
    })
  };
 
  render(){
    let widthScreen = null
    window.screen.width < 1024 ? widthScreen = 12 : widthScreen = null
      return (
        <div style={{backgroundColor: '#f1f4f7'}}>
          <input type="text" ref={this.textInput} style={{position: 'absolute', top: 0, zIndex: -9999}} readOnly/>
          <Menu />
          <MDBContainer>
            <MDBRow style={{marginBottom: '3%', marginTop: '3%'}}>
              <MDBCol md="2">
                    {this.state.url ? 
                    // <Image src={this.state.url} thumbnail style={{borderRadius: 100, width: '100%', height: 150}} />
                    
                    <div style={{backgroundColor: 'white', borderRadius: 100, width: 150, height: 150}}>
                      <div style={{
                          backgroundImage: "url(" + this.state.url + ")",
                          backgroundPosition: 'center',
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          width: '100%',
                          height: 150,
                          borderRadius: 100
                          }}>
                      </div>
                    </div>
                    : 
                    <div style={{backgroundColor: 'white', borderRadius: 100, width: 150, height: 150}}>
                      <div style={{
                          backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image-mini.jpg?alt=media&token=458979a1-ba06-4af0-b6cd-72ecda59e366)",
                          backgroundPosition: 'center',
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          width: '100%',
                          height: 150,
                          borderRadius: 100
                          }}>
                      </div>
                    </div>
                    }    
              </MDBCol>
              <MDBCol md="10">  
                <MDBCol md="4">
                  <p className="h4 text-left mb-4" style={{marginTop: 20}}>{this.state.nombre}</p>
                </MDBCol>
                <MDBCol md="8">
                  <p className="h4 text-left mb-4" style={{marginTop: 20, fontSize: 14}}>{this.state.descripcion}</p>
                    <div style={{boxShadow: '0px !important', display: 'flex',flexWrap: 'wrap',listStyle: 'none',margin: 0, width: '100%'}}>
                      {
                        this.state.chipData !== null ?
                          this.state.chipData.map((data, i) => 
                              <div key={i}>
                                <Chip
                                  label={data.label}
                                  style={{margin: 4}}
                                />
                              </div>
                          )
                        : null
                      }
                    </div>
                </MDBCol>
                
              </MDBCol>
            </MDBRow> 
            <MDBView>
              <div style={{width: '100%', paddingBottom: '15%'}}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab {...this.a11yProps(0)} style={{ fontSize: widthScreen === 12 ? 10 : null, fontWeight: widthScreen === 12 ? 'bold' : null}} label={`Grupos de ${this.state.nombre.split(' ')[0]}`} />
                    {/*  style={{width: widthScreen === 12 ? 10 : null}} */}
                    <Tab {...this.a11yProps(1)} style={{ fontSize: widthScreen === 12 ? 10 : null, fontWeight: widthScreen === 12 ? 'bold' : null}} label="Destinos" />
                    {/*  icon={<AirplanemodeActiveOutlinedIcon />} */}
                    {/* <Tab icon={<StorefrontOutlinedIcon />} {...this.a11yProps(2)} /> */}
                    <Tab {...this.a11yProps(2)} style={{ fontSize: widthScreen === 12 ? 10 : null, fontWeight: widthScreen === 12 ? 'bold' : null}} label="Hospedajes" />
                    {/*  icon={<HomeWorkOutlinedIcon />} */}
                    <Tab {...this.a11yProps(3)} style={{ fontSize: widthScreen === 12 ? 10 : null, fontWeight: widthScreen === 12 ? 'bold' : null}} label="Actividades" />
                    {/*  icon={<FilterHdrOutlinedIcon />} */}
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={this.state.value}
                  onChangeIndex={this.handleChangeIndex}
                  
                >
                  <TabPanel value={this.state.value} index={0}>
                    {this.state.url_portada_publicaciones.length > 0 ? 
                        <RenderItemPublicaciones rows={this.state.url_portada_publicaciones} />
                      : 
                        <div className="alert alert-info">
                          <strong>Ups!</strong> aún no tiene nada en Publicaciones.
                        </div>
                    }
                  </TabPanel>
                  <TabPanel value={this.state.value} index={1}>
                    {this.state.url_portada_destinos.length > 0 ? 
                        <RenderItemDestinos rows={this.state.url_portada_destinos} />
                      : 
                        <div className="alert alert-info">
                          <strong>Ups!</strong> aún no tiene nada en Destinos.
                        </div>
                    }
                  </TabPanel>
                  {/* <TabPanel value={this.state.value} style={{paddingBottom: '20%'}} index={2}>
                    <span>Próximamente!</span>
                  </TabPanel> */}
                  <TabPanel value={this.state.value} style={{paddingBottom: '20%'}} index={2}>
                    {this.state.dataHospedaje.length > 0 ?  
                        <RenderItemHospedajes data={this.state.dataHospedaje}/>
                      : 
                        <div className="alert alert-info">
                          <strong>Ups!</strong> aún no tiene nada en Hospedajes.
                        </div>
                    }
                  </TabPanel>
                  <TabPanel value={this.state.value} style={{paddingBottom: '20%'}} index={3}>
                    {this.state.dataActivities.length > 0 ? 
                        <Actividades data={this.state.dataActivities} />
                      : 
                        <div className="alert alert-info">
                          <strong>Ups!</strong> aún no tiene nada en Actividades.
                        </div>
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

export default PerfilPublico
