import React from 'react'
import { MDBContainer } from 'mdbreact';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grow from '@material-ui/core/Grow';
import CardActionArea from '@material-ui/core/CardActionArea';
import cx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import { NO_IMAGE } from '../../helpers/Messages';

const useStyles = makeStyles(() => ({
    root: {
      maxWidth: window.screen.width <= 412 ? (window.screen.width / 2) - 10 : 345,
      margin: 'auto',
      borderRadius: 12,
    },
    media: {
      borderRadius: 6,
    },
}));

const Actividades = (props) => {
    const item = props.item
    const thumbnail = item.thumbnail === "" ? NO_IMAGE : item.thumbnail
    const styles = useStyles();
    return (
            <Card className={cx(styles.root )} style={{marginTop: '2%', minWidth: window.screen.width <= 412 ? (window.screen.width / 2) - 10 : 345}}>
                <Link to={ `/actividad/${item.id}`} style={{textDecoration: 'none', color: 'rgba(0, 0, 0)'}}>
                    <CardActionArea>
                        <div style={{
                            backgroundImage: "url(" + thumbnail + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            width: '100%',
                            height: window.screen.width <= 412 ? 150 : 250
                            }}>
                        </div>
                        <CardContent>
                        {item.titulo.length <= 28 ?
                          <strong>{item.titulo}</strong>
                        : 
                          <p>{item.titulo}</p>
                        }
                          <p>{item.region}</p>
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
                <div className="row">
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