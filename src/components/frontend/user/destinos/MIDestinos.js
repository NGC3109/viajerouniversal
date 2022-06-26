import React, { useState } from 'react';
import {Button, Modal, Form, Col, ProgressBar} from 'react-bootstrap'
import Tooltip from '@material-ui/core/Tooltip';
import Helpers from './../../helpers/Helpers';
import ReactGA from "./../../helpers/Analytics";

const handleSubmit = (uid, handleClose, 
    ActivityIndicator_Loading_Destinos, 
    setActivityIndicator_Loading_Destinos,
    divAlertMB_Destinos,
    setdivAlertMB_Destinos,
    valueSpinner_destinos,
    setvalueSpinner_destinos,
    ActivityIndicator_Loading_gal1, 
    setActivityIndicator_Loading_gal1,
    divAlertMB_gal1,
    setdivAlertMB_gal1,
    valueSpinner_gal1,
    setvalueSpinner_gal1,
    ActivityIndicator_Loading_gal2, 
    setActivityIndicator_Loading_gal2,
    divAlertMB_gal2,
    setdivAlertMB_gal2,
    valueSpinner_gal2,
    setvalueSpinner_gal2,
    ActivityIndicator_Loading_gal3, 
    setActivityIndicator_Loading_gal3,
    divAlertMB_gal3,
    setdivAlertMB_gal3,
    valueSpinner_gal3,
    setvalueSpinner_gal3) => event => {
    event.preventDefault();
    const autor = event.target.autor.value;
    const nombre = event.target.nombre.value;
    var region = event.target.region.value;
    const descripcion = event.target.descripcion.value;
    const acceso = event.target.acceso.value;
    const recomendaciones = event.target.recomendaciones.value;
    const instagram = event.target.instagram.value;
    const politicas = event.target.politicas.value;
    
    const regionDivide = region.split("|");
    region = regionDivide[1]
    const idRegion = regionDivide[0]
    var today = new Date(); 
    const fecha_publicacion = `${new Date(today).getDate()}-${new Date(today).getMonth()}-${new Date(today).getFullYear()} ${new Date(today).getHours()}:${new Date(today).getMinutes()}`
    const file = event.target.portada.files[0]
    const url_1 = event.target.url_1.files[0]
    const url_2 = event.target.url_2.files[0]
    const url_3 = event.target.url_3.files[0]
    const obj = {
        acceso,
        autor,
        descripcion,
        galeria: {
            url_1:'',
            url_2:'',
            url_3:''
        },
        idRegion,
        idUsuario: uid,
        recomendaciones,
        nombre,
        region,
        url: '',
        instagram: instagram.replace('@', ''),
        politicas,
        estado: "0",
        fecha_publicacion,
        thumbnail: ''
    }
    try{
        var statusGeneral = 0
        Helpers.createNewDestiny(obj, function(idDestino){
            if(file != null){
                if(file.size < 3431990){
                    Helpers.uploadImageDestinos(file, idDestino, (snapD) => {
                        setActivityIndicator_Loading_Destinos(ActivityIndicator_Loading_Destinos = true)
                        if(snapD === 100){
                            setActivityIndicator_Loading_Destinos(ActivityIndicator_Loading_Destinos = false)
                            setdivAlertMB_Destinos(divAlertMB_Destinos = false)
                            statusGeneral = statusGeneral + 1
                        }else{
                            setvalueSpinner_destinos(valueSpinner_destinos = snapD)
                        }
                    })
                }else{
                    console.log('La imagen no puede ser mayor a 3MB')
                    setdivAlertMB_Destinos(divAlertMB_Destinos = true)
                }
            }
            if(url_1 != null){ 
                if(url_1.size < 3431990){
                    Helpers.uploadImageDestinosGal(url_1, idDestino, 'url_1', (snap1) => {
                        setActivityIndicator_Loading_gal1(ActivityIndicator_Loading_gal1 = true)
                        if(snap1 === 100){
                            setActivityIndicator_Loading_gal1(ActivityIndicator_Loading_gal1 = false)
                            setdivAlertMB_gal1(divAlertMB_gal1 = false)
                            statusGeneral = statusGeneral + 1
                        }else{
                            setvalueSpinner_gal1(valueSpinner_gal1 = snap1)
                        }
                    })
                }else{
                    console.log('La imagen no puede ser mayor a 3MB')
                    setdivAlertMB_gal1(divAlertMB_gal1 = true)
                }
            }
            if(url_2 != null){ 
                if(url_2.size < 3431990){
                    Helpers.uploadImageDestinosGal(url_2, idDestino, 'url_2', (snap2) => {
                        setActivityIndicator_Loading_gal2(ActivityIndicator_Loading_gal2 = true)
                        if(snap2 === 100){
                            setActivityIndicator_Loading_gal2(ActivityIndicator_Loading_gal2 = false)
                            setdivAlertMB_gal2(divAlertMB_gal2 = false)
                            statusGeneral = statusGeneral + 1
                        }else{
                            setvalueSpinner_gal2(valueSpinner_gal2 = snap2)
                        }
                    })
                }else{
                    console.log('La imagen no puede ser mayor a 3MB')
                    setdivAlertMB_gal2(divAlertMB_gal2 = true)
                }
            }
            if(url_3 != null){ 
                if(url_3.size < 3431990){
                    Helpers.uploadImageDestinosGal(url_3, idDestino, 'url_3', (snap3) => {
                        setActivityIndicator_Loading_gal3(ActivityIndicator_Loading_gal3 = true)
                        if(snap3 === 100){
                            setActivityIndicator_Loading_gal3(ActivityIndicator_Loading_gal3 = false)
                            setdivAlertMB_gal3(divAlertMB_gal3 = false)
                            statusGeneral = statusGeneral + 1
                        }else{
                            setvalueSpinner_gal3(valueSpinner_gal3 = snap3)
                        }
                    })
                }else{
                    console.log('La imagen no puede ser mayor a 3MB')
                    setdivAlertMB_gal3(divAlertMB_gal3 = true)
                }
            }
            ReactGA.event({
                category: 'Create Destiny',
                action: 'New',
                label: idDestino
              });
        })
        setTimeout(function(){handleClose()},2000);
    }catch(error){
        console.log(error)
        // handleClose()
    }
}



function MIDestinos(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [ActivityIndicator_Loading_Destinos, setActivityIndicator_Loading_Destinos] = useState(false);
    const [ActivityIndicator_Loading_gal1, setActivityIndicator_Loading_gal1] = useState(false);
    const [ActivityIndicator_Loading_gal2, setActivityIndicator_Loading_gal2] = useState(false);
    const [ActivityIndicator_Loading_gal3, setActivityIndicator_Loading_gal3] = useState(false);

    const [divAlertMB_Destinos, setdivAlertMB_Destinos] = useState(false);
    const [divAlertMB_gal1, setdivAlertMB_gal1] = useState(false);
    const [divAlertMB_gal2, setdivAlertMB_gal2] = useState(false);
    const [divAlertMB_gal3, setdivAlertMB_gal3] = useState(false);

    const [valueSpinner_destinos, setvalueSpinner_destinos] = useState(0);
    const [valueSpinner_gal1, setvalueSpinner_gal1] = useState(0);
    const [valueSpinner_gal2, setvalueSpinner_gal2] = useState(0);
    const [valueSpinner_gal3, setvalueSpinner_gal3] = useState(0);
    return (
      <>
        {props.dataPersonal !== 'NN' ? 
        <Button variant="success" onClick={handleShow} style={{marginBottom: 5, backgroundColor: '#fb6012',borderColor: '#fb6012'}}>Nuevo Destino</Button>
        : 
        <div className="alert alert-info">
          <strong>Atención!</strong> Para comenzar a publicar favor ingrese sus datos.
        </div>
        }
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton style={{  
                            backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/sliders%2Fhm.png?alt=media&token=5842e26a-15f1-4d33-88f6-401b42c5cdea)",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
            <Modal.Title>INGRESO DESTINO</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(
              props.uid, 
              handleClose, 
              ActivityIndicator_Loading_Destinos, 
              setActivityIndicator_Loading_Destinos,
              divAlertMB_Destinos,
              setdivAlertMB_Destinos,
              valueSpinner_destinos,
              setvalueSpinner_destinos,
              ActivityIndicator_Loading_gal1, 
              setActivityIndicator_Loading_gal1,
              divAlertMB_gal1,
              setdivAlertMB_gal1,
              valueSpinner_gal1,
              setvalueSpinner_gal1,
              ActivityIndicator_Loading_gal2, 
              setActivityIndicator_Loading_gal2,
              divAlertMB_gal2,
              setdivAlertMB_gal2,
              valueSpinner_gal2,
              setvalueSpinner_gal2,
              ActivityIndicator_Loading_gal3, 
              setActivityIndicator_Loading_gal3,
              divAlertMB_gal3,
              setdivAlertMB_gal3,
              valueSpinner_gal3,
              setvalueSpinner_gal3)} style={{  
                            backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/sliders%2Fmoaialta.jpg?alt=media&token=afe16a19-e174-497f-83ac-024ca24ca920)",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
            <Modal.Body>
                <Form.Row>
                    <Form.Group as={Col} controlId="nom">
                    <Form.Label style={{fontWeight: 'bold'}}>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" placeholder="Nombre" required/>
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Tooltip title="Si no fuiste el creador original del post favor dale los creditos al que corresponda!">    
                        <Form.Label style={{fontWeight: 'bold'}}>Autor</Form.Label>   
                    </Tooltip> 
                    <Form.Control type="text" name="autor" placeholder="Autor" required/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Tooltip title="Puedes poner tu instagram para que las personas sepan quien eres!">    
                        <Form.Label style={{fontWeight: 'bold'}}>Instagram</Form.Label>   
                        </Tooltip> 
                        <Form.Control type="text" name="instagram" placeholder="Sin @" />
                    </Form.Group>
                </Form.Row>

                
                <Form.Row>
                    <Form.Group as={Col} controlId="reg">
                        <Form.Label style={{fontWeight: 'bold'}}>Región</Form.Label>
                        <Form.Control as="select" name="region" required>
                            <option value="0|0"> -- Seleccionar Región -- </option>
                            <option value="1|Tarapacá">I de Tarapacá (Capital: Iquique)</option>
                            <option value="2|Antofagasta">II de Antofagasta (Capital: Antofagasta)</option>
                            <option value="3|Atacama">III de Atacama (Capital: Copiapó)</option>
                            <option value="4|Coquimbo">IV de Coquimbo (Capital: Coquimbo)</option>
                            <option value="5|Valparaíso">V de Valparaíso (Capital: Valparaíso)</option>
                            <option value="6|O'Higgins">VI del Libertador General Bernardo O'Higgins (Capital: Rancagua)</option>
                            <option value="7|Maule">VII del Maule (Capital: Talca)</option>
                            <option value="8|Biobío">VIII de Biobío (Capital: Concepción)</option>
                            <option value="9|Araucanía">IX de la Araucanía (Capital: Temuco)</option>
                            <option value="10|Los Lagos">X de Los Lagos (Capital: Puerto Montt)</option>
                            <option value="11|Aysén">XI de Aysén del General Carlos Ibañez del Campo (Capital: Coyhaique)</option>
                            <option value="12|Magallanes">XII de Magallanes y de la Antártica Chilena (Capital: Punta Arenas)</option>
                            <option value="13|Metropolitana">RM Metropolitana de Santiago (Capital: Santiago)</option>
                            <option value="14|Los Ríos">XIV de Los Ríos (Capital: Valdivia)</option>
                            <option value="15|Arica">XV de Arica y Parinacota (Capital: Arica)</option>
                            <option value="16|Ñuble">XVI del Ñuble (Capital: Chillán)</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label style={{fontWeight: 'bold'}}>Portada</Form.Label>
                    <Form.Control type="file" name="portada" className="form-control" required/>
                    {ActivityIndicator_Loading_Destinos ? 
                        <ProgressBar variant="success" now={valueSpinner_destinos} label={`${valueSpinner_destinos}%`}/>
                        : null
                    }
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label style={{fontWeight: 'bold'}}>Descripcion</Form.Label>
                    <Form.Control as="textarea" rows="3" name="descripcion" required/>
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label style={{fontWeight: 'bold'}}>Recomendaciones</Form.Label>
                    <Form.Control as="textarea" rows="3" name="recomendaciones" required/>
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label style={{fontWeight: 'bold'}}>Como llegar</Form.Label>
                    <Form.Control as="textarea" rows="3" name="acceso" required/>
                </Form.Group>

                <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label style={{fontWeight: 'bold', color: 'white'}}>Galeria 1</Form.Label>
                    <Form.Control type="file" name="url_1" className="form-control" />
                        <small class="form-text text-muted"><span style={{color: 'white'}}>Imágenes cuadradas 600x600 etc.</span></small>
                    {ActivityIndicator_Loading_gal1 ? 
                        <ProgressBar variant="success" now={valueSpinner_gal1} label={`${valueSpinner_gal1}%`}/>
                        : null
                    }
                    </Form.Group>
                    
                    <Form.Group as={Col}>
                    <Form.Label style={{fontWeight: 'bold', color: 'white'}}>Galeria 2</Form.Label>
                    <Form.Control type="file" name="url_2" className="form-control" />
                        <small class="form-text text-muted"><span style={{color: 'white'}}>Imágenes cuadradas 600x600 etc.</span></small>
                    {ActivityIndicator_Loading_gal2 ? 
                        <ProgressBar variant="success" now={valueSpinner_gal2} label={`${valueSpinner_gal2}%`}/>
                        : null
                    }
                    </Form.Group>
                    
                    <Form.Group as={Col}>
                    <Form.Label style={{fontWeight: 'bold', color: 'white'}}>Galeria 3</Form.Label>
                    <Form.Control type="file" name="url_3" className="form-control" />
                        <small class="form-text text-muted"><span style={{color: 'white'}}>Imágenes cuadradas 600x600 etc.</span></small>
                    {ActivityIndicator_Loading_gal3 ? 
                        <ProgressBar variant="success" now={valueSpinner_gal3} label={`${valueSpinner_gal3}%`}/>
                        : null
                    }
                    </Form.Group>
                    
                </Form.Row>
                    { divAlertMB_gal3 || divAlertMB_gal2 || divAlertMB_gal1 || divAlertMB_Destinos ? 
                        <Form.Group id="formGridCheckbox">
                            <div className="alert alert-danger">
                                <strong>Atención!</strong> Las siguientes imagenes superan los 3MB:<br />
                                <ul>
                                    {divAlertMB_Destinos ? <li>Portada</li> : null}
                                    {divAlertMB_gal1 ? <li>Galeria 1</li> : null}
                                    {divAlertMB_gal2 ? <li>Galeria 2</li> : null}
                                    {divAlertMB_gal3 ? <li>Galeria 3</li> : null}
                                </ul>
                            </div> 
                        </Form.Group>
                        : 
                        null
                    }
                

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" name="politicas" label="Acepto los terminos y condicios de uso" style={{color: 'white'}} required/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Cerrar
                </Button>
                <Button variant="success" type="submit">
                    Crear
                </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
export default MIDestinos