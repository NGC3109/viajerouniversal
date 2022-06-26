import React from 'react'
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        //   maxWidth: 2000,
        width: '100%',
        minHeight: 300,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    }
  }));
const ItemsPublicaciones = (props) => {
    let arrMatch = props.data
    const classes = useStyles();
    return (
        <>
            {arrMatch.map((item, index) => 
                item.estado === "1" ?
                    <Grid item xs={12} sm={6} key={index}>
                        <Card className={classes.root}>
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
                                    <CardContent>
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
                                    </CardContent>
                                </Link>
                            </CardActionArea>
                            <CardActions disableSpacing style={{backgroundColor: '#07737f'}}>
                                <IconButton>
                                    <Avatar src={item.url_user} style={{marginRight: 5}}></Avatar>
                                    <Typography>
                                        <Link to={ `/user/${item.idUsuario}`} style={{textDecoration: 'none', color: 'white'}}>{item.autor}</Link>
                                    </Typography>
                                </IconButton>
                                {item.estado_viaje === "0" ?
                                    <IconButton
                                        className={clsx(classes.expand)}
                                    >
                                        <Badge color="error" overlap="circle" badgeContent="FULL" style={{marginRight: 5}}></Badge>
                                    </IconButton>
                                    : null
                                }
                            </CardActions>
                        </Card>
                    </Grid>
                : null
            )}
        </>
    );
}
// const ItemsPublicaciones = (props) => {
//   let arrMatch = props.data
//   return(
// <>
//     <MDBContainer>
//         <MDBCardBody>
//             <h2 className="h1-responsive font-weight-bold text-center my-3">
//             Publicaciones de Viajes
//             </h2>
//             <p className="text-center w-responsive mx-auto mb-5">
//             En esta seccion podrás unirte a otros viajeros que desean y comparten el mismo sueño que tu, atrevete y empieza a viajar!
//             </p>
//             {
//                     arrMatch.map((item, index) => 
//                     item.estado === "1" ?
//                     <div key={index}>
//                         <div style={{backgroundColor: item.estado_viaje === "1" ? 'white' : '#fcf8e3', padding: 15, margin: 15, border: '0.5px solid #e5e3e3'}}>
//                         <Link to={ `/publicacion/${item.id}`} style={{textDecoration: 'none'}}>
//                             <MDBRow>
//                                 <MDBCol lg="5" style={{borderRight: '1px solid #e5e3e3'}}>
//                                     <MDBView className="rounded z-depth-4 mb-lg-0 mb-6" hover waves>
//                                     {/* <img className="img-fluid" src={item.url_portada} alt="" style={{maxWidth: 300, maxHeight: 300}} /> */}
//                                     <div style={{
//                                         backgroundImage: "url(" + item.url_portada + ")",
//                                         backgroundPosition: 'center',
//                                         backgroundSize: 'cover',
//                                         backgroundRepeat: 'no-repeat',
//                                         width: '100%',
//                                         height: 300,
//                                         }}>
//                                     </div>
//                                     </MDBView>
//                                 </MDBCol>
//                                 <MDBCol lg="4">
//                                     <h6 className="font-weight-bold mb-3">
//                                         Tiempo viaje: {item.tiempo_viaje} {item.timeViaje}
//                                     </h6>
//                                     <h3 className="font-weight-bold mb-3 p-0">
//                                     <strong style={{color: '#454545'}}>{item.titulo}</strong>
//                                     </h3>
//                                     <p style={{color: '#6f6f6f'}}>
//                                         {item.descripcion.length > 199 ?
//                                             item.descripcion.substr(0,200) + '...[]'
//                                             :
//                                             item.descripcion
//                                         }
//                                     </p>
//                                     <p style={{color: '#07737f'}}>
//                                         Autor <strong>{item.autor}</strong>
//                                     </p>
//                                     <p style={{color: '#07737f'}}>
//                                         Fecha de publicacion: <strong>{item.fecha_publicacion}</strong>
//                                     </p>
//                                 </MDBCol>

//                                 {item.estado_viaje === "0" ? 
//                                     <h6 className="font-weight-bold text-right mb-3">
//                                         ESTE GRUPO ESTA FULL.
//                                     </h6> 
//                                 : null
//                                 }
                                
//                             </MDBRow>
//                         </Link>
//                         </div>
//                     </div>
//                 : null
//                 )}
//       </MDBCardBody>
//     </MDBContainer>
//             </>
//   )
// }
export default ItemsPublicaciones;