import React from 'react'
import { Link } from "react-router-dom";
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    width: 270,
    margin: 'auto',
    borderRadius: 0,
    position: 'relative',
    flexDirection: 'row'
  },
  rootMovil: {
    width: 170,
    margin: 'auto',
    borderRadius: 0,
    position: 'relative',
    flexDirection: 'row'
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
const DestinosItems = (props) => {
  let item = props.data
  const styles = useStyles();
  const mediaStyles = useCoverCardMediaStyles();
  const shadowStyles = useLightTopShadowStyles();
  let widthScreen = null
  window.screen.width < 1024 ? widthScreen = 12 : widthScreen = null
  return(
        <div>
                <Grid>
                    <Link to={ `/destino/${item.id}`} style={{textDecoration: 'none'}}>
                        <Card className={cx(widthScreen === 12 ? styles.rootMovil : styles.root, shadowStyles.root)}>
                                <CardMedia classes={mediaStyles} image={item.thumbnail}/>
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
                                        <p style={{fontWeight: 'bold', textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'}}>{item.name}</p>
                                        </Box>
                                        {/* <Typography className={styles.cta} variant={'overline'}>
                                        Explore
                                        </Typography> */}
                                    </CardContent>
                                </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
        </div>

        
  )
}
export default DestinosItems;