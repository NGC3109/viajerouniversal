import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { Label } from 'reactstrap';
import { Form, Col, ProgressBar } from 'react-bootstrap'
import Helpers from '../helpers/Helpers';
import ReactGA from '../helpers/Analytics';

export default function ContactForm(props) {
  const [showCreditAutor, SetshowCreditAutor] = useState(false);
  const [open, setOpen] = useState(false);
  const [need, setNeed] = useState('');

  
  const [ActivityIndicator_Loading_gal1, setActivityIndicator_Loading_gal1] = useState(false);
  const [ActivityIndicator_Loading_gal2, setActivityIndicator_Loading_gal2] = useState(false);
  const [ActivityIndicator_Loading_gal3, setActivityIndicator_Loading_gal3] = useState(false);

  const [divAlertMB_gal1, setdivAlertMB_gal1] = useState(false);
  const [divAlertMB_gal2, setdivAlertMB_gal2] = useState(false);
  const [divAlertMB_gal3, setdivAlertMB_gal3] = useState(false);

  const [valueSpinner_gal1, setvalueSpinner_gal1] = useState(0);
  const [valueSpinner_gal2, setvalueSpinner_gal2] = useState(0);
  const [valueSpinner_gal3, setvalueSpinner_gal3] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleChange = (event) => {
    setNeed(event.target.value)
    if(event.target.value === 10){
      SetshowCreditAutor(true)
    }else if(event.target.value === 20){
      if(showCreditAutor){
          SetshowCreditAutor(false)
      }
    }else if(event.target.value === 30){
      if(showCreditAutor){
          SetshowCreditAutor(false)
      }
    }
  };
  const handleSubmit = (uid, need ) => event => {
    event.preventDefault();
    if(uid){
        const politicas = event.target.politicas.value;
        const asunto = event.target.asunto.value;
        const email = event.target.email.value;
        const comentarios = event.target.comentarios.value;
        var today = new Date(); 
        var Fneed = ''
        const fecha_publicacion = `${new Date(today).getDate()}-${new Date(today).getMonth()}-${new Date(today).getFullYear()} ${new Date(today).getHours()}:${new Date(today).getMinutes()}`
        const obj = {
            asunto,
            email,
            comentarios,
            uid,
            politicas,
            fecha_publicacion,
            segmento: props.type,
            idItemSegmento: props.id
        }
        try{
            if(need === 10){
                const url_1 = ( event.target.url_1 ? event.target.url_1.files[0] : null )
                const url_2 = ( event.target.url_1 ? event.target.url_2.files[0] : null )
                const url_3 = ( event.target.url_1 ? event.target.url_3.files[0] : null )
                Fneed = "donaciones"
                if(url_1 !== undefined && url_2 !== undefined && url_3 !== undefined){
                    if(url_1.size < 3431990 && url_2.size < 3431990 && url_3.size < 3431990){
                        Helpers.createNewContact(obj, Fneed, function(idContact){
                            if(url_1 != null){ 
                                if(url_1.size < 3431990){
                                    Helpers.uploadImageContact(url_1, idContact, Fneed, 'url_1', (snap1) => {
                                        setActivityIndicator_Loading_gal1(true)
                                        if(snap1 === 100){
                                            setActivityIndicator_Loading_gal1(false)
                                            setdivAlertMB_gal1(false)
                                        }else{
                                            setvalueSpinner_gal1(snap1)
                                        }
                                    })
                                }else{
                                    setdivAlertMB_gal1(true)
                                }
                            }
                            if(url_2 != null){ 
                                if(url_2.size < 3431990){
                                    Helpers.uploadImageContact(url_2, idContact, Fneed, 'url_2', (snap2) => {
                                        setActivityIndicator_Loading_gal2(true)
                                        if(snap2 === 100){
                                            setActivityIndicator_Loading_gal2( false)
                                            setdivAlertMB_gal2(false)
                                        }else{
                                            setvalueSpinner_gal2(snap2)
                                        }
                                    })
                                }else{
                                    setdivAlertMB_gal2(true)
                                }
                            }
                            if(url_3 != null){ 
                                if(url_3.size < 3431990){
                                    Helpers.uploadImageContact(url_3, idContact, Fneed, 'url_3', (snap3) => {
                                        setActivityIndicator_Loading_gal3(true)
                                        if(snap3 === 100){
                                            setActivityIndicator_Loading_gal3(false)
                                        }else{
                                            setvalueSpinner_gal3(snap3)
                                        }
                                    })
                                }else{
                                    setdivAlertMB_gal3(true)
                                }
                            }
                            ReactGA.event({
                                category: 'New Contact',
                                action: 'New',
                                label: idContact
                            });
                        })
                        setTimeout(function(){
                            setOpen(false);
                        },2000);
                    }else{
                        if(url_1.size > 3431990){
                            setdivAlertMB_gal1(true)
                        }
                        if(url_2.size > 3431990){
                            setdivAlertMB_gal2(true)
                        }
                        if(url_3.size > 3431990){
                            setdivAlertMB_gal3(true)
                        }
                    }
                }else{
                    if(url_1.size < 3431990 || url_2.size < 3431990 || url_3.size < 3431990){
                        Helpers.createNewContact(obj, Fneed, function(idContact){
                            if(url_1 != null){ 
                                if(url_1.size < 3431990){
                                    Helpers.uploadImageContact(url_1, idContact, Fneed, 'url_1', (snap1) => {
                                        setActivityIndicator_Loading_gal1(true)
                                        if(snap1 === 100){
                                            setActivityIndicator_Loading_gal1(false)
                                            setdivAlertMB_gal1(false)
                                        }else{
                                            setvalueSpinner_gal1(snap1)
                                        }
                                    })
                                }else{
                                    setdivAlertMB_gal1(true)
                                }
                            }
                            if(url_2 != null){ 
                                if(url_2.size < 3431990){
                                    Helpers.uploadImageContact(url_2, idContact, Fneed, 'url_2', (snap2) => {
                                        setActivityIndicator_Loading_gal2(true)
                                        if(snap2 === 100){
                                            setActivityIndicator_Loading_gal2( false)
                                            setdivAlertMB_gal2(false)
                                        }else{
                                            setvalueSpinner_gal2(snap2)
                                        }
                                    })
                                }else{
                                    setdivAlertMB_gal2(true)
                                }
                            }
                            if(url_3 != null){
                                if(url_3.size < 3431990){
                                    Helpers.uploadImageContact(url_3, idContact, Fneed, 'url_3', (snap3) => {
                                        setActivityIndicator_Loading_gal3(true)
                                        if(snap3 === 100){
                                            setActivityIndicator_Loading_gal3(false)
                                        }else{
                                            setvalueSpinner_gal3(snap3)
                                        }
                                    })
                                }else{
                                    setdivAlertMB_gal3(true)
                                }
                            }
                            ReactGA.event({
                                category: 'New Contact',
                                action: 'New',
                                label: idContact
                            });
                        })
                        setTimeout(function(){
                            setOpen(false);
                        },2000);
                    }
                }
            }else if(need === 20){
                Fneed = "denuncias"
                Helpers.createNewContact(obj, Fneed);
                setTimeout(function(){
                    setOpen(false);
                },2000);
            }else if(need === 30){
                Fneed = "errores"
                Helpers.createNewContact(obj, Fneed);
                setTimeout(function(){
                    setOpen(false);
                },2000);
            }
        }catch(error){
            console.log(error)
        }
    }else{
        console.log('debes logearte')
    }
}
  return (
    <div>
        <div className="alert alert-info">
            <strong>Atención!</strong> Si hay algo mal escrito, la información no es correcta o crees tener imágenes geniales para donar y recibir los respectivos créditos, favor no dudes en contactarte
            con nosotros <strong onClick={handleClickOpen} style={{cursor: 'pointer'}}><u>PINCHANDO AQUÍ</u></strong> para corregir o actualizar imágenes, estarás ayudando a toda la comunidad.
        </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Contacto</DialogTitle>
          <Form onSubmit={handleSubmit(props.uid, need, handleClose)}>
                <DialogContent>
                <DialogContentText style={{color: 'black'}}>
                    Aquí podrás aportar, denunciar he informar sobre errores, todo esto con el único fin de apoyar a la comunidad.
                </DialogContentText>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <TextField
                                    margin="dense"
                                    name="asunto"
                                    label="Asunto"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    margin="dense"
                                    label="¿Qué necesitas?"
                                    variant="outlined"
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value={10}>Donación con créditos al autor</MenuItem>
                                    <MenuItem value={20}>Denunciar esta publicación por derechos de autor</MenuItem>
                                    <MenuItem value={30}>Errores tipograficos y/o funcionales</MenuItem>
                                </TextField>
                                <TextField
                                    margin="dense"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            {showCreditAutor ? 
                                <Form.Group as={Col}>
                                    <Label>Máximo 3 donaciones (Limite 3MB por foto)</Label>
                                    <Form.Control type="file" name="url_1" className="form-control outlined"/>
                                    {ActivityIndicator_Loading_gal1 ? 
                                        <ProgressBar variant="success" now={valueSpinner_gal1} label={`${valueSpinner_gal1}%`}/>
                                        : null
                                    }
                                    <Form.Control type="file" name="url_2" className="form-control outlined" style={{marginTop: '2%', marginBottom: '2%'}} />
                                    {ActivityIndicator_Loading_gal2 ? 
                                        <ProgressBar variant="success" now={valueSpinner_gal2} label={`${valueSpinner_gal2}%`}/>
                                        : null
                                    }
                                    <Form.Control type="file" name="url_3" className="form-control outlined"/>
                                    {ActivityIndicator_Loading_gal3 ? 
                                        <ProgressBar variant="success" now={valueSpinner_gal3} label={`${valueSpinner_gal3}%`}/>
                                        : null
                                    }
                                </Form.Group>
                            : null
                            }
                            
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Comentarios"
                                    multiline
                                    name="comentarios"
                                    rows={4}
                                    variant="outlined"
                                    fullWidth
                                    style={{marginTop: '2%'}}
                                />
                                <Form.Check type="checkbox" name="politicas" label="Acepto los terminos y condicios de uso" style={{color: 'black', marginTop: '3%'}} required/>
                            </Form.Group>
                        </Form.Row>
                        { divAlertMB_gal3 || divAlertMB_gal2 || divAlertMB_gal1 ? 
                        <Form.Group id="formGridCheckbox">
                            <div className="alert alert-danger">
                                <strong>Atención!</strong> Las siguientes imagenes superan los 3MB:<br />
                                <ul>
                                    {divAlertMB_gal1 ? <li>Galeria 1</li> : null}
                                    {divAlertMB_gal2 ? <li>Galeria 2</li> : null}
                                    {divAlertMB_gal3 ? <li>Galeria 3</li> : null}
                                </ul>
                            </div> 
                        </Form.Group>
                        : 
                        null
                    }
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cerrar
                </Button>
                <Button type="submit" color="primary">
                    Enviar
                </Button>
            </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
}