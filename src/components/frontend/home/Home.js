import React, { Component } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import Helpers from '../helpers/Helpers';
import DestinosItems from './DestinosItems';
import AllServicesItems from './AllServicesItems';
import GruposItems from './GruposItems';
import { green } from '@material-ui/core/colors';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import firebase from 'firebase/app'
import { Link } from "react-router-dom";

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        topDestinos: [],
        topGrupos: [],
        topAllServices: [],
        uid: null,
        open: false
    };
  }
  async componentDidMount(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          this.setState({
            uid: user.uid
          });
        }
    }.bind(this));
    Helpers.getTopDestiny((destinos) => {
        this.setState({
            topDestinos: destinos
        })
    })
    Helpers.getTopGroup((grupos) => {
        this.setState({
            topGrupos: grupos
        })
    })
    Helpers.getTopAllServices((allServices) => {
        this.setState({
            topAllServices: allServices
        })
    })
  }
  handleShow = () => {
      this.setState({
          open: !this.state.open
      })
  }
  login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {
    }).catch(function(error) {
    console.log(error)
    });
   }
  render() {
    let widthScreen = null
    window.screen.width < 1024 ? widthScreen = 12 : widthScreen = null
    return (
      <MDBContainer>
        <div style={{width: '100%', marginTop: '2%', marginBottom: '2%'}}>
            {widthScreen === 12 ?
                <p className="text-center" style={{color: 'rgba(16,93,149,1)'}}>TOP DESTINOS</p>
            :
                <h4 style={{color: 'rgba(16,93,149,1)'}}>TOP DESTINOS</h4>
            }
        </div>
        { this.state.topDestinos.length !== 0 ?
            <Carousel
                centered
                infinite
                autoPlay={2000}
                animationSpeed={1000}
                stopAutoPlayOnHover
                slidesPerPage={4}
                breakpoints={{
                    640: {
                    slidesPerPage: 2,
                    arrows: false
                    },
                    900: {
                    slidesPerPage: 3,
                    arrows: false
                    }
                }}
                >
                    {this.state.topDestinos.map((item, index) => 
                        <DestinosItems key={index} data={item}/>
                    )}
            </Carousel>
        :
            <Grid container wrap="nowrap">
                <Skeleton style={{
                    backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2FCARGANDO.png?alt=media&token=ec2327d5-4ecd-4e0e-8d53-5690b000b400)",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.8
                }} variant="rect" width={270} height={200} />
                <Box pt={0.5}>
                    <Skeleton />
                    <Skeleton width="60%" />
                </Box>
                <Skeleton style={{
                    backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2FCARGANDO.png?alt=media&token=ec2327d5-4ecd-4e0e-8d53-5690b000b400)",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.8
                }} variant="rect" width={270} height={200} />
                <Box pt={0.5}>
                    <Skeleton />
                    <Skeleton width="60%" />
                </Box>
                <Skeleton style={{
                    backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2FCARGANDO.png?alt=media&token=ec2327d5-4ecd-4e0e-8d53-5690b000b400)",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.8
                }} variant="rect" width={270} height={200} />
                <Box pt={0.5}>
                    <Skeleton />
                    <Skeleton width="60%" />
                </Box>
            </Grid>
        }
        
            <div style={{
                width: '100%', 
                marginTop: '2%', 
                marginBottom: '2%', 
                backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/destinos%2Fdestinos_164_0_port.png?alt=media&token=6939cd0d-2a76-482e-8a80-2f8e6517521b)",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                borderRadius: widthScreen === 12 ? 0 : 50
            }}> 
                <div style={{
                    width: '100%', 
                    backgroundColor: 'rgba(7,115,127, 0.5)',
                    borderRadius: widthScreen === 12 ? 0 : 50
                }}>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="12" style={{paddingTop: '3%'}}>
                                <h3 style={{color: 'white', fontWeight: 'bold'}}>Únete</h3>
                            </MDBCol>
                            <MDBCol md="6" style={{paddingBottom: '1%'}}>
                                <p style={{color: 'white', fontWeight: 'bold'}}>Aquí podrás encontrar los mejores destinos turísticos, además de gente compatible para que conozcan Chile</p>
                            </MDBCol>
                            <MDBCol md="6" style={{paddingBottom: '1%'}}>
                                <ul style={{color: 'white', fontWeight: 'bold'}}>
                                    <li>Encontrarás gente para viajar</li>
                                    <li>Podrás crear grupos y decidir quién viaja contigo</li>
                                    <li>Registra los destinos y actividades que has vivido</li>
                                    <li>Inscribe tu hospedaje GRATIS</li>
                                    <li>Comenta tus experiencias en los destinos y actividades, ayudaras a miles</li>
                                    <li>Valora los hospedajes, es la única forma de posicionarlos</li>
                                </ul>
                            </MDBCol>
                            <MDBCol md="12" style={{paddingBottom: '3%'}}>
                            { 
                                !this.state.uid ? 
                                    <MDBBtn style={{backgroundColor: green[500], color: 'white'}} onClick={this.login}>Registrate</MDBBtn> 
                                : 
                                    <Link to="/perfil"><MDBBtn style={{backgroundColor: green[500], color: 'white', borderRadius: 50}}>Comienza</MDBBtn></Link>
                            }
                                
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>

            </div>
        
        <div style={{width: '100%', marginTop: '2%', marginBottom: '2%'}}>
            {widthScreen === 12 ?
                <p className="text-center" style={{color: 'rgba(16,93,149,1)'}}>ÚLTIMOS GRUPOS</p>
            :
                <h4 style={{color: 'rgba(16,93,149,1)'}}>ÚLTIMOS GRUPOS</h4>
            }
        </div>
        {this.state.topGrupos.length !== 0 ?
        <Carousel
            centered
            infinite
            stopAutoPlayOnHover            
            autoPlay={2000}
            animationSpeed={1000}
            slidesPerPage={4}
            breakpoints={{
                640: {
                    slidesPerPage: 3,
                    arrows: false
                },
                900: {
                    slidesPerPage: 3,
                    arrows: false
                }
            }}
            >
            
            {
                this.state.topGrupos.map((item, index) => 
                    <GruposItems key={index} data={item}/> 
                )
            }
        </Carousel>
        :
        <Grid container wrap="nowrap">
            <Skeleton style={{
                backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2FCARGANDO.png?alt=media&token=ec2327d5-4ecd-4e0e-8d53-5690b000b400)",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }} variant="rect" width={270} height={200} />
            <Box pt={0.5}>
                <Skeleton />
                <Skeleton width="60%" />
            </Box>
            <Skeleton style={{
                backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2FCARGANDO.png?alt=media&token=ec2327d5-4ecd-4e0e-8d53-5690b000b400)",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }} variant="rect" width={270} height={200} />
            <Box pt={0.5}>
                <Skeleton />
                <Skeleton width="60%" />
            </Box>
            <Skeleton style={{
                backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2FCARGANDO.png?alt=media&token=ec2327d5-4ecd-4e0e-8d53-5690b000b400)",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }} variant="rect" width={270} height={200} />
            <Box pt={0.5}>
                <Skeleton />
                <Skeleton width="60%" />
            </Box>
        </Grid>
        }
        <div style={{width: '100%', marginTop: '2%', marginBottom: '2%'}}>
            {widthScreen === 12 ?
                <p className="text-center" style={{color: 'rgba(16,93,149,1)'}}>COMPARTE TUS VIAJES, ACTIVIDADES Y HOSPEDAJES</p>
            :
                <h4 style={{color: 'rgba(16,93,149,1)'}}>COMPARTE TUS VIAJES, ACTIVIDADES Y HOSPEDAJES</h4>
            }
            
        </div>
        <Carousel
            slidesPerPage={3}
            >
                {
                    this.state.topAllServices.map((item, index) => 
                        <AllServicesItems key={index} data={item} user={this.state.uid} handleShow={this.handleShow} /> 
                    )
                }
        </Carousel>
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={() => this.handleShow}>
        <Alert onClose={this.handleShow} severity="error">
            Debes registrarte!
        </Alert>
        </Snackbar>
      </MDBContainer>
    );
  }
}
