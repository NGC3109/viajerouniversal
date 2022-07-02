import React from 'react'
import { MDBContainer } from 'mdbreact';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grow from '@material-ui/core/Grow';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import cx from 'clsx';

import { makeStyles } from '@material-ui/styles';

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

const Actividades = (props) => {
    const item = props.item
    const styles = useStyles();
    return (
            <Card className={cx(styles.root )} style={{marginTop: '2%', minWidth: 345}}>
                <Link to={ `/actividad/${item.id}`} style={{textDecoration: 'none', color: 'rgba(0, 0, 0)'}}>
                    <CardActionArea>
                        <div style={{
                            backgroundImage: "url(" + item.thumbnail + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            width: '100%',
                            height: 250
                            }}>
                        </div>
                        <CardContent>
                        {item.titulo.length <= 28 ?
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.titulo}
                          </Typography> 
                        : 
                          <Typography gutterBottom variant="h6" component="h4">
                            {item.titulo}
                          </Typography>
                        }
                        <Typography gutterBottom variant="h6" component="h4">
                            {item.region}
                          </Typography>
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
                </Link>
            </Card>
    );
  };
const ItemsActividades = (props) => {
  const [checked] = React.useState(true);
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
                            { <Actividades item={item}/> }
                        </Grow>
                        : null
                    )}
                </div>
          </MDBContainer>
  )
}
export default ItemsActividades;