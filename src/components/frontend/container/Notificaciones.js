import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import Helpers from '../helpers/Helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const viewNotify = (uid, idNotify) => {
  Helpers.LookNotify(uid, idNotify)
}

export default function Notificaciones(props) {
  let data = props.data
  const classes = useStyles();
  if(data.length !== 0){
    return (
      <List className={classes.root}>
          {data.map((item, i) => 
              <div key={i} style={{backgroundColor: item.view ? '#FFFFFF' : '#edf2fa'}}>
                  <Link to={item.link} style={{color: 'black'}} onClick={() => viewNotify(props.uid, item.id)}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar alt={item.nameUsuarioMasterGroup} src={item.urlUsuarioMasterGroup} />
                        </ListItemAvatar>
                        <ListItemText
                        primary={<div><strong>{item.nameUsuarioMasterGroup}</strong> <span>{item.msg}</span> <strong>{item.nameGrupo}</strong></div>}
                        secondary={
                            <React.Fragment>
                            {item.createdAt} {item.view ? <strong>Leído</strong> : <strong style={{color: 'blue'}}>Nuevo</strong>}
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                  </Link>
                  {data.length > 1 ? 
                      null
                      : 
                      <Divider variant="inset" component="li" />
                  }
              </div>
          )}
      </List>
    );
  }else{
    return (
      <List className={classes.root}>
          <ListItem alignItems="flex-start">
              <ListItemAvatar>
                  <Avatar alt="Viajero Universal" src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fwelcome.png?alt=media&token=436aa4d7-cd76-4917-ac55-f7594d65b91b" />
              </ListItemAvatar>
              <ListItemText
              primary={<div><strong>Bienvenid@</strong> <span>Esperamos conozcas mucha gente, viajes y disfrutes, con amor, de todo el equipo de Viajeros <span>&#10084;</span>.</span></div>}
              />
          </ListItem>
      </List>
    )
  }
}