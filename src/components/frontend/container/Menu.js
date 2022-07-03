import React, { Component } from 'react';
import firebase from 'firebase/app'
import { Navbar, Nav, Button, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../css/custom.css'
import Helpers from '../helpers/Helpers';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import SideMenu from './SideMenu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popover from '@material-ui/core/Popover';
import Notificaciones from './Notificaciones'
import { ACTIVIDADES, DESTINOS, ENTRAR, HOSPEDAJES, MIS_GRUPOS, MOCHILEROS } from '../helpers/Messages';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameUser: '',
            url: '',
            anchor: null,
            open: '',
            notificaciones: null,
            dataNotificaciones: [],
            notificacionesGeneral: [],
            notificacionesGeneralTotal: 0,
            buttonShow: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
    async componentDidMount(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              Helpers.setUserName(user.uid, user.displayName)
              Helpers.setUserEmail(user.uid, user.email)
              Helpers.getUser(user.uid, (user) => {
                this.setState({url: user.url})
              })
              Helpers.notifi_getNotificaciones(user.uid, (notificaciones) => {
                this.setState({
                  notificaciones: notificaciones.length
                })
              })
              Helpers.notifi_getNotificacionesGeneral(user.uid, (notificacionesG) => {
                this.setState({
                  notificacionesGeneral: notificacionesG
                })
              })
              Helpers.notifi_getNotificacionesGeneralLength(user.uid, (notificacionesG) => {
                if(notificacionesG.length !== 0){
                  document.title = `Viajero Universal (${notificacionesG.length}) | Un solo hogar`
                }else{
                  document.title = 'Viajero Universal | Un solo Hogar'
                }
                this.setState({
                  notificacionesGeneralTotal: notificacionesG.length,
                })
              })
              
              this.setState({
                nameUser: user.displayName,
                uid: user.uid,
                buttonShow: false
              });
            }else{
              this.setState({
                buttonShow: true
              });
            }
        }.bind(this));
    }
    login = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function(result) {
        }).catch(function(error) {
          console.log(error)
        });
    }

    // loginFB = () => {
    //   var provider = new firebase.auth.FacebookAuthProvider();
    //   firebase.auth().signInWithPopup(provider).then(function(result) {
    //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //     // var token = result.credential.accessToken;
    //     // The signed-in user info.
    //     var user = result.user;
    //     console.log(user)
    //     // ...
    //   }).catch(function(error) {
    //     // Handle Errors here.
    //     // var errorCode = error.code;
    //     // var errorMessage = error.message;
    //     // // The email of the user's account used.
    //     // var email = error.email;
    //     // // The firebase.auth.AuthCredential type that was used.
    //     // var credential = error.credential;
    //     // ...
    //   });
    // }
  clearAllAndRefresh = () => {
    window.location.href = "http://viajerouniversal.com/#/";
  }
  handleClick = (event) => {
    this.setState({
      anchor: event.currentTarget
    });
     Helpers.setAllNotify(this.state.uid)
  };

  handleClose = () => {
    this.setState({anchor: null});
  };
  
  render() {
    let widthScreen = null
    window.screen.width < 1024 ? widthScreen = 12 : widthScreen = null
    const pop = Boolean(this.state.anchor);
    const id = pop ? 'simple-popover' : undefined;
    if(widthScreen === 12){
        return <SideMenu />
    }else{
      return (
        <div style={{width: '100%', paddingBottom: widthScreen === 12 ? 0 : 66, background: 'linear-gradient(90deg, rgba(16,93,149,1) 0%, rgba(26,50,82,1) 27%, rgba(27,47,78,1) 65%, rgba(16,93,149,1) 100%)'}}>
            <Navbar collapseOnSelect expand="lg" fixed="top" style={{background: 'linear-gradient(90deg, rgba(16,93,149,1) 0%, rgba(26,50,82,1) 27%, rgba(27,47,78,1) 65%, rgba(16,93,149,1) 100%)'}}>
                <Navbar.Brand style={{padding: '0rem'}}>
                  <Link to="/">
                    <Image style={{width: 150, height: 50}} src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Ficono.png?alt=media&token=d07959f5-224c-45c1-8189-fe1b6e801a18" />
                  </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/destinos" style={{paddingRight: '0.5rem', paddingLeft: '0.5rem', color: 'white', fontWeight: 'bold'}}>{ DESTINOS }</Link>
                        <Link to="/actividades" style={{paddingRight: '0.5rem', paddingLeft: '0.5rem', color: 'white', fontWeight: 'bold'}}>{ ACTIVIDADES }</Link>
                        <Link to="/hospedajes" style={{paddingRight: '0.5rem', paddingLeft: '0.5rem', color: 'white', fontWeight: 'bold'}}>{ HOSPEDAJES }</Link>
                        <Link to="/publicaciones" style={{paddingRight: '0.5rem', paddingLeft: '0.5rem', color: 'white', fontWeight: 'bold'}}>{ MOCHILEROS }</Link>
                        <Badge badgeContent={this.state.notificaciones} color="error">
                          <Link to="/groups" style={{paddingRight: '0.5rem', paddingLeft: '0.5rem', color: 'white', fontWeight: 'bold'}}>{ MIS_GRUPOS }</Link>
                        </Badge>
                    </Nav>
                    {
                        this.state.nameUser ?
                        <Nav>
                          <Avatar style={{backgroundColor: 'transparent'}} onClick={this.handleClick}>
                            <Badge badgeContent={this.state.notificacionesGeneralTotal} color="error">
                              <NotificationsIcon style={{color: 'white', cursor: 'pointer'}}/>
                            </Badge>
                          </Avatar>
                            <Popover
                              id={id}
                              open={pop}
                              anchorEl={this.state.anchor}
                              onClose={this.handleClose}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                            >
                              <Notificaciones data={this.state.notificacionesGeneral} uid={this.state.uid}/>
                            </Popover>
                            <Link to={`/perfil/`}>
                              <div>
                                <Avatar 
                                  alt={this.state.nameUser || ''} 
                                  src={this.state.url || ''} 
                                />
                              </div>
                            </Link>
                        </Nav>
                        :
                        this.state.buttonShow ?
                          <Nav>
                              <Nav.Link onClick={this.login}><Button className="btn btn-success">{ ENTRAR }</Button></Nav.Link>
                              {/* <Nav.Link onClick={this.loginFB}><Button className="btn btn-success">FB</Button></Nav.Link> */}
                          </Nav>
                        : null
                    }
                </Navbar.Collapse>
             </Navbar>
        </div>
    );
    }
    
  }
}

export default Menu;