
import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Hospedajes = (props) => {
    const Dhospedajes = props.data
    return(
      <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
              {
              Dhospedajes.map((item, i) => 
              item.estado === "1" ? 
                  <div key={i}>
                      <Card style={{maxWidth: 345, margin: '2%', minWidth: 345}}>
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
                          {item.name.length <= 28 ?
                            <Typography gutterBottom variant="h5" component="h2">
                              {item.name}
                            </Typography> 
                          : item.name.length >= 37 ?
                            <Typography gutterBottom variant="h6" component="h5">
                              {item.name.substr(0,36)} ...
                            </Typography>
                            :
                            <Typography gutterBottom variant="h6" component="h4">
                              {item.name}
                            </Typography>
                          }
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
                      </Card>
                  </div>
              : null
              )}
      </Grid>
    )
}

export default Hospedajes;