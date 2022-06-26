import React, {useState} from 'react'
import { MDBContainer } from 'mdbreact';
import { Link } from "react-router-dom";
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
// import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import Grow from '@material-ui/core/Grow';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import Helpers from '../helpers/Helpers';
import firebase from 'firebase/app'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles(() => ({
    root: {
      maxWidth: 343,
      margin: 'auto',
      borderRadius: 12,
      padding: 12,
    },
    media: {
      borderRadius: 6,
    },
}));


const likes = (idDestino, userStatus, setUserStatus, handleClickOpen) => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            Helpers.getStateLikeUser(user.uid, idDestino, (statusLike) => {
                setUserStatus(statusLike)
            })
            if(userStatus !== null){
                Helpers.deleteLikesDestiny(user.uid, idDestino, false)
            }else{
                Helpers.createLikesDestiny(user.uid, idDestino, true)
            }
        } else {
            handleClickOpen()
        }
    });
}

const Destino = (props) => {
    const item = props.item
    const styles = useStyles();
    const textCardContentStyles = useBlogTextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const [userStatus, setUserStatus] = useState(null);
    return (
            <Card className={cx(styles.root, shadowStyles.root)} style={{marginTop: '2%', minWidth: 345}}>
                    <Link to={ `/destino/${item.id}`} style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)'}}>
                        {item.thumbnail ? 
                                <div style={{
                                    backgroundImage: "url(" + item.thumbnail + ")",
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    maxWidth: 343,
                                    height: 240,
                                    }}>
                                </div>
                            : 
                                <div style={{
                                    backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image2.png?alt=media&token=04203eaf-1fbd-439b-b2d1-88d227793338)",
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    maxWidth: 343,
                                    height: 240,
                                    }}>
                                </div>
                        }
                        </Link>
                        <CardContent className={styles.content}>
                            <Link to={ `/destino/${item.id}`} style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)'}}>
                                <TextInfoContent
                                    className={textCardContentStyles}
                                    overline={item.region}
                                    heading={item.name}
                                    body={
                                    item.descripcion.substr(0,80) + '...'
                                    }
                                />
                            </Link>
                            <hr></hr>
                                {
                                item.youStatus === 1 ? 
                                    <div><FavoriteOutlinedIcon style={{color: 'red', cursor: 'pointer'}} onClick={() => likes(item.id, userStatus, setUserStatus, props.handleClickOpen)} /> {item.likes !== null ? ( Object.keys(item.likes).length === 1 ? 'Tú' : 'Tú y ' + (Object.keys(item.likes).length - 1) + ' más') : 0} </div>
                                : 
                                    <div><FavoriteOutlinedIcon style={{color: 'red', cursor: 'pointer'}} onClick={() => likes(item.id, userStatus, setUserStatus, props.handleClickOpen)} /> {item.likes !== null ? Object.keys(item.likes).length : 0} </div>
                                }
                        </CardContent>
                
            </Card>
    );
  };
const ItemsDestinos = (props) => {
  const [checked] = React.useState(true);  
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  let arrMatch = props.data
  return(
            <MDBContainer>
                <div className="row" style={{marginTop: 15}}>
                    {
                    arrMatch.map((item, index) => 
                        item.estado === "1" ?  
                        <Grow
                            key={index}
                            in={checked}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: ((index * 1000) < 4000 ? (index * 1000) : 4000) } : {})}
                        >
                            { <Destino item={item} handleClose={handleClose} handleClickOpen={handleClickOpen}/> }
                        </Grow>
                        : null
                    )}
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Usuario no registrado"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Para poder dar <strong>likes, comentar y muchisimas otras funciones</strong>, por favor <strong>inicie sesión</strong>.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cerrar
                    </Button>
                    </DialogActions>
                </Dialog>
          </MDBContainer>
  )
}
export default ItemsDestinos;