import React from 'react';
import 'antd/dist/antd.css';
import { Drawer, Space, Divider } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Image } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import AirplanemodeActiveOutlinedIcon from '@material-ui/icons/AirplanemodeActiveOutlined';
import FilterHdrOutlinedIcon from '@material-ui/icons/FilterHdrOutlined';
import GroupIcon from '@material-ui/icons/Group';
import { Link } from "react-router-dom";
import firebase from 'firebase/app'
import Helpers from '../helpers/Helpers';
import Badge from '@material-ui/core/Badge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popover from '@material-ui/core/Popover';
import Notificaciones from './Notificaciones'

export default class SideMenu extends React.Component {
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
        visible: false, 
        placement: 'left',
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
            this.setState({
              notificacionesGeneralTotal: notificacionesG.length,
            })
          })
          this.setState({
            nameUser: user.displayName,
            uid: user.uid
          });
        }
    }.bind(this));
}
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  signOut = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      window.location.reload();
    }).catch(function(error) {
      // An error happened.
    });    
  }
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {
    }).catch(function(error) {
      console.log(error)
    });
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
    const pop = Boolean(this.state.anchor);
    const id = pop ? 'simple-popover' : undefined;
    const { placement, visible } = this.state;
    return (
      <>
        <Space style={{width: '100%', background: 'linear-gradient(90deg, rgba(16,93,149,1) 0%, rgba(26,50,82,1) 27%, rgba(27,47,78,1) 65%, rgba(16,93,149,1) 100%)', overflow: 'hidden'}}>
            <Grid
                direction="row"
                justify="space-between"
                alignItems="center"
                container
                style={{paddingLeft: '5%',display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridGap: 24,}}
            >
                <Grid item xs={4} spacing={3}>
                    <MenuOutlined onClick={this.showDrawer} style={{color: 'white', fontSize: 20, fontWeight: 'bold'}} />
                </Grid>
                <Grid item xs={4} spacing={3}>
                    <Link to={`/`}><Image style={{width: 150, height: 50}} src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Ficono.png?alt=media&token=d07959f5-224c-45c1-8189-fe1b6e801a18" /></Link>
                </Grid>
                <Grid item xs={4} spacing={3}>
                      <Badge badgeContent={this.state.notificacionesGeneralTotal} color="error" onClick={this.handleClick}>
                        <NotificationsIcon style={{color: 'white', cursor: 'pointer'}}/>
                      </Badge>
                </Grid>
            </Grid>
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
        </Space>
        <Drawer
          title={[<Link to={`/perfil/`}><Avatar alt={this.state.nameUser || 'I'} src={this.state.url || ''}  /></Link>,<Link to={`/perfil/`}><span style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>{this.state.nameUser || 'Invitad@'}</span></Link>]}
          placement={placement}
          closable={false}
          onClose={this.onClose}
          visible={visible}
          key={placement}
          headerStyle={{backgroundColor: '#1e93f5'}}
          bodyStyle={{backgroundColor: '#2b98f2'}}
          zIndex={9999}
        >
            <p>
                <Link to="/" style={{textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: 16}}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                    >
                        <Grid item xs={10}>Inicio</Grid>
                        <Grid item xs={2}><HomeIcon /></Grid>
                    </Grid>
                </Link>
            </p>
            <p>
                <Link to="/destinos" style={{textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: 16}}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                    >
                        <Grid item xs={10}>Destinos</Grid>
                        <Grid item xs={2}><AirplanemodeActiveOutlinedIcon /></Grid>
                    </Grid>
                </Link>
            </p>
            <p>
                <Link to="/actividades" style={{textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: 16}}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                    >
                        <Grid item xs={10}>Actividades</Grid>
                        <Grid item xs={2}><FilterHdrOutlinedIcon /></Grid>
                    </Grid>
                </Link>
            </p>
            <p>
                <Link to="/hospedajes" style={{textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: 16}}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                    >
                        <Grid item xs={10}>Hospedajes</Grid>
                        <Grid item xs={2}><HomeWorkOutlinedIcon /></Grid>
                    </Grid>
                </Link>
            </p>
            <p>
                <Link to="/publicaciones" style={{textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: 16}}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                    >
                        <Grid item xs={10}>Mochileros</Grid>
                        <Grid item xs={2}><AnnouncementOutlinedIcon /></Grid>
                    </Grid>
                </Link>
            </p>
            {this.state.nameUser ? 
            <p>
                <Link to="/groups" style={{textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: 16}}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                    >
                        <Grid item xs={10}>Mis Grupos</Grid>
                        <Grid item xs={2}><Badge badgeContent={this.state.notificaciones} color="error"><GroupIcon /></Badge></Grid>
                    </Grid>
                </Link>
            </p>
            :null}
            
          <Divider />
          {this.state.nameUser ? 
                <p style={{textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: 16}}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                    >
                        <Grid item xs={10} style={{cursor: 'pointer'}} onClick={this.signOut}>Salir</Grid>
                        <Grid item xs={2} style={{cursor: 'pointer'}} onClick={this.signOut}><ExitToAppIcon /></Grid>
                    </Grid>
                </p>
            :
                <p style={{textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: 16}}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                    >
                        <Grid item xs={10} style={{cursor: 'pointer'}} onClick={this.login}>Entrar</Grid>
                        <Grid item xs={2} style={{cursor: 'pointer'}} onClick={this.login}><AccountBoxIcon /></Grid>
                    </Grid>
                </p>
            }
        </Drawer>
      </>
    );
  }
}