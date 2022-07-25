
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShowMoreText from 'react-show-more-text';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '100%'
    },
    avatar: {
      backgroundColor: red[500],
    },
}));

const Comments = (props) => {
    const classes = useStyles();
    const comment = props.data
    return(
      <div className={classes.root}>
              {
              comment.map((item, i) => 
                  <div key={i}>
                      <Card className={classes.root}>
                        <CardHeader
                          avatar={
                            <Avatar aria-label="recipe" src={item.thumbnail} className={classes.avatar} />
                          }
                          title={item.name}
                          subheader={item.fecha_publicacion}
                        />
                        <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                              {item.comentario.length >= 200 ? 
                              <ShowMoreText
                                  lines={2}
                                  more={<ExpandMoreIcon />}
                                  less={<ExpandLessIcon />}
                                  anchorClass=''
                                  onClick={props.executeOnClick}
                                  expanded={false}
                              >
                                {item.comentario.split('\n').map((itemX, keyX) => {
                                  return <span key={keyX}>{itemX}<br/></span>
                                })}
                              </ShowMoreText>
                              :
                                item.comentario.split('\n').map((itemX, keyX) => {
                                  return <span key={keyX}>{itemX}<br/></span>
                                })
                              }
                          </Typography>
                        </CardContent>
                      </Card>
                  </div>
              )}
          </div>
    )
}

export default Comments;