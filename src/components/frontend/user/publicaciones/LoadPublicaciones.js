import React from 'react'
// import CardColumns from 'react-bootstrap/CardColumns'
// import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    // maxWidth: 304,
    width: '100%',
    // margin: 'auto',
    borderRadius: 0,
    position: 'relative'
  },
  content: {
    padding: 24,
  },
  cta: {
    display: 'block',
    textAlign: 'center',
    color: '#fff',
    letterSpacing: '3px',
    fontWeight: 200,
    fontSize: 12,
  },
  title: {
    color: '#fff',
    letterSpacing: '2px',
  },
}));
const LoadPublicaciones = (props) => {
  let arrMatch = props.data
  const styles = useStyles();
  const mediaStyles = useCoverCardMediaStyles();
  const shadowStyles = useLightTopShadowStyles();
//   const classes = useStyles();
  return(
        // <CardColumns>
        //     {
        //     arrMatch.map((item, i) => 
        //     item.estado === "1" ? 
        //             <div key={i}>
        //                 <Link to={ `/editarPublicacion/${item.id}`} style={{textDecoration: 'none'}}>
        //                     <Card className="text-center" style={{border: item.estado_viaje === "0" ? '2px solid #fceda1' : '1px solid #aaed8e' }}>
        //                         <div style={{
        //                             backgroundImage: "url(" + item.url_portada + ")",
        //                             backgroundPosition: 'center',
        //                             backgroundSize: 'cover',
        //                             backgroundRepeat: 'no-repeat',
        //                             width: '100%',
        //                             height: 200
        //                             }}>
        //                         </div>
        //                     </Card>
        //                 </Link>
        //             </div>
        //     : null
        //     )}
        // </CardColumns><
        <div>
            <Grid container item>
            {
                arrMatch.map((item, i) =>
                item.estado === "1" ? 
                <Grid key={i} item xs={12} sm={4} style={{padding: 2}}>
                    <Link to={ `/editarPublicacion/${item.id}`} style={{textDecoration: 'none'}}>
                        <Card className={cx(styles.root, shadowStyles.root)}>
                                <CardMedia classes={mediaStyles} image={item.url_portada}/>
                                <CardActionArea>
                                    <CardContent className={styles.content}>
                                        <Box
                                            display={'flex'}
                                            flexDirection={'column'}
                                            alignItems={'center'}
                                            justifyContent={'center'}
                                            minHeight={200}
                                            color={'common.white'}
                                            textAlign={'center'}
                                        >
                                        {/* <h1 className={styles.title}></h1> */}
                                        <p style={{fontWeight: 'bold'}}>{item.titulo}</p>
                                        </Box>
                                        {/* <Typography className={styles.cta} variant={'overline'}>
                                        Explore
                                        </Typography> */}
                                    </CardContent>
                                </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
                : null
                )
            }
            </Grid>
        </div>

        
  )
}
export default LoadPublicaciones;