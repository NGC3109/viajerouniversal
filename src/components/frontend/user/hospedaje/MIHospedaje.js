import React, { useState } from 'react';
import {Button, Modal, Form, Col, ProgressBar} from 'react-bootstrap'
import Helpers from './../../helpers/Helpers';
import Select from 'react-select';
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
    setvalueSpinner_gal3,
    selectedArray_services,
    selectedArray_destinos,
    selectedArray_reglas,
    selectedArray_actividades,
    comuna) => event => {
    event.preventDefault();
    const nombre = event.target.nombre.value;
    const descripcion = event.target.descripcion.value;
    const instagram = event.target.instagram.value;
    const whatsapp = event.target.whatsapp.value;
    const politicas = event.target.politicas.value;
    const tipo_hospedaje = event.target.tipo_hospedaje.value;
    const precio = event.target.precio.value;
    const habitaciones = event.target.habitaciones.value;
    const max_huespedes = event.target.max_huespedes.value;
    const camas = event.target.camas.value;
    const wc = event.target.wc.value;
    const direccion = event.target.direccion.value;
    
    var region = event.target.region.value;
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
        descripcion,
        galeria: {
            url_1:'',
            url_2:'',
            url_3:''
        },
        idRegion,
        idUsuario: uid,
        nombre,
        region,
        url: '',
        instagram: instagram.replace('@', ''),
        politicas,
        estado: "0",
        fecha_publicacion,
        servicios: selectedArray_services,
        destinos: selectedArray_destinos,
        reglas: selectedArray_reglas,
        actividades: selectedArray_actividades,
        tipo_hospedaje,
        precio,
        habitaciones,
        max_huespedes,
        camas,
        wc,
        whatsapp,
        comuna,
        direccion
    }
    try{
        Helpers.createNewHospedaje(obj, function(idHospedaje){
            if(file != null){
                if(file.size < 3431990){
                    Helpers.uploadImageHospedaje(file, idHospedaje, (snapD) => {
                        setActivityIndicator_Loading_Destinos(ActivityIndicator_Loading_Destinos = true)
                        if(snapD === 100){
                            setActivityIndicator_Loading_Destinos(ActivityIndicator_Loading_Destinos = false)
                            setdivAlertMB_Destinos(divAlertMB_Destinos = false)
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
                    Helpers.uploadImageHospedajeGal(url_1, idHospedaje, 'url_1', (snap1) => {
                        setActivityIndicator_Loading_gal1(ActivityIndicator_Loading_gal1 = true)
                        if(snap1 === 100){
                            setActivityIndicator_Loading_gal1(ActivityIndicator_Loading_gal1 = false)
                            setdivAlertMB_gal1(divAlertMB_gal1 = false)
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
                    Helpers.uploadImageHospedajeGal(url_2, idHospedaje, 'url_2', (snap2) => {
                        setActivityIndicator_Loading_gal2(ActivityIndicator_Loading_gal2 = true)
                        if(snap2 === 100){
                            setActivityIndicator_Loading_gal2(ActivityIndicator_Loading_gal2 = false)
                            setdivAlertMB_gal2(divAlertMB_gal2 = false)
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
                    Helpers.uploadImageHospedajeGal(url_3, idHospedaje, 'url_3', (snap3) => {
                        setActivityIndicator_Loading_gal3(ActivityIndicator_Loading_gal3 = true)
                        if(snap3 === 100){
                            setActivityIndicator_Loading_gal3(ActivityIndicator_Loading_gal3 = false)
                            setdivAlertMB_gal3(divAlertMB_gal3 = false)
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
                category: 'Create Lodging',
                action: 'New',
                label: idHospedaje
              });
        })
        setTimeout(function(){handleClose()},2000);
    }catch(error){
        console.log(error)
    }
}


const validate = (evt) => {
    var theEvent = evt || window.event;
    var key
    // Handle paste
    if (theEvent.type === 'paste') {
        key = evt.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }
function MIHospedaje(props) {
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
    
    const [selectedArray_services, setselectedArray_services] = useState([]);
    const [selectedArray_destinos, setselectedArray_destinos] = useState([]);
    const [selectedArray_reglas, setselectedArray_reglas] = useState([]);
    const [selectedArray_actividades, setselectedArray_actividades] = useState([]);
    const [comuna, setComuna] = useState([]);
    return (
      <>
        {props.dataPersonal !== 'NN' ? 
        <Button variant="success" onClick={handleShow} style={{marginBottom: 5, backgroundColor: '#fb6012',borderColor: '#fb6012'}}>Nuevo Hospedaje</Button>
        : 
        <div className="alert alert-info">
          <strong>Atención!</strong> Para comenzar a publicar favor ingrese sus datos.
        </div>
        }
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton style={{  
                            backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/insta-clone-3689c.appspot.com/o/fondos%2Ffondo-vertical-relleno.png?alt=media&token=002268e8-0b07-49ef-ba35-ef2e76b72d84)",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
            <Modal.Title>INGRESO HOSPEDAJE</Modal.Title>
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
              setvalueSpinner_gal3,
              selectedArray_services,
              selectedArray_destinos,
              selectedArray_reglas,
              selectedArray_actividades,
              comuna)} style={{  
                            backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/insta-clone-3689c.appspot.com/o/fondos%2Ffondo-vertical.png?alt=media&token=fc40a220-9ed6-4624-aa06-14e2692874a7)",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
            <Modal.Body>
                <Form.Row>
                    <Form.Group as={Col} controlId="nombre">
                        <Form.Label style={{fontWeight: 'bold'}}>Nombre</Form.Label>
                        <Form.Control type="text" name="nombre" placeholder="Nombre"/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontWeight: 'bold'}}>Portada</Form.Label>
                        <Form.Control type="file" name="portada" className="form-control" />
                        {ActivityIndicator_Loading_Destinos ? 
                            <ProgressBar variant="success" now={valueSpinner_destinos} label={`${valueSpinner_destinos}%`}/>
                            : null
                        }
                    </Form.Group>
                    <Form.Group as={Col} controlId="precio">
                        <Form.Label style={{fontWeight: 'bold'}}>Precio noche</Form.Label>
                        <Form.Control type="text" name="precio" onKeyPress={validate} placeholder="Precio"/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="serv">
                      <Form.Label style={{fontWeight: 'bold'}}>Servicios</Form.Label>
                       <div style={{backgroundColor: 'white'}}>
                            <Select 
                                isMulti
                                options={props.optionsServices} 
                                placeholder="Buscar..." 
                                onChange={servOpt => setselectedArray_services(servOpt)} 
                                closeOnSelect={false}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="hospt">
                        <Form.Label style={{fontWeight: 'bold'}}>Tipo Hospedaje</Form.Label>
                        <Form.Control as="select" name="tipo_hospedaje" >
                            <option value="Hospedaje Entero">Hospedaje Entero</option>
                            <option value="Camping">Camping</option>
                            <option value="Habitación Privada">Habitación Privada</option>
                            <option value="Refugio">Refugio</option>
                            <option value="Habitación Hotel">Habitación Hotel</option>
                            <option value="Cabaña">Cabaña</option>
                            <option value="Habitación Compartida">Habitación Compartida</option>
                            <option value="Hostal">Hostal</option>
                        </Form.Control>
                    </Form.Group>                 
                    
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="reg">
                       <Form.Label style={{fontWeight: 'bold'}}>Reglas</Form.Label>
                       <div style={{backgroundColor: 'white'}}>
                            <Select 
                                isMulti
                                options={props.optionReglas} 
                                placeholder="Buscar..." 
                                onChange={RulzOpt => setselectedArray_reglas(RulzOpt)} 
                                closeOnSelect={false}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="hues">
                       <Form.Label style={{fontWeight: 'bold'}}>Max. Huespedes</Form.Label>
                      <Form.Control type="text" name="max_huespedes" placeholder="Huespedes máximos" onKeyPress={validate} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="dest">
                       <Form.Label style={{fontWeight: 'bold'}}>¿Que <span style={{backgroundColor: '#07737f', color: 'white', padding: 4, borderRadius: 5}}>DESTINOS</span> puedes hacer desde tu hospedaje?</Form.Label>
                       <div style={{backgroundColor: 'white'}}>
                            <Select 
                                isMulti
                                options={props.optionsDestinos} 
                                placeholder="Buscar..." 
                                onChange={DesOpt => setselectedArray_destinos(DesOpt)} 
                                closeOnSelect={false}
                            />
                        </div>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="act">
                       <Form.Label style={{fontWeight: 'bold'}}>¿Que <span style={{backgroundColor: '#07737f', color: 'white', padding: 4, borderRadius: 5}}>ACTIVIDADES</span> puedes hacer desde tu hospedaje?</Form.Label>
                      <div style={{backgroundColor: 'white'}}>
                            <Select 
                                isMulti
                                options={props.optionActividades} 
                                placeholder="Buscar..." 
                                onChange={ActOpt => setselectedArray_actividades(ActOpt)} 
                                closeOnSelect={false}
                            />
                        </div>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="region">
                         <Form.Label style={{fontWeight: 'bold'}}>Región</Form.Label>
                        <Form.Control as="select" name="region" >
                            <option value="0"> -- Seleccionar -- </option>
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
                    <Form.Group as={Col} controlId="com">
                       <Form.Label style={{fontWeight: 'bold'}}>Comuna</Form.Label>
                      <Select options={props.comunas} placeholder="Buscar..." onChange={opt => setComuna(opt.value)} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="dir">
                         <Form.Label style={{fontWeight: 'bold'}}>Dirección</Form.Label>
                        <Form.Control type="text" name="direccion" placeholder="Dirección" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="habit">
                       <Form.Label style={{fontWeight: 'bold'}}>Habitaciones</Form.Label>
                        <Form.Control as="select" name="habitaciones">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="camas">
                       <Form.Label style={{fontWeight: 'bold'}}>Camas</Form.Label>
                        <Form.Control as="select" name="camas" >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="wc">
                       <Form.Label style={{fontWeight: 'bold'}}>Baños</Form.Label>
                        <Form.Control as="select" name="wc" >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="formGridAddress1">
                     <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Descripcion</Form.Label>
                    <Form.Control as="textarea" rows="3" name="descripcion" />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label style={{display: 'block', textAlign: 'center', color: 'white', fontWeight: 'bold'}}>COMO QUIERES QUE TE CONTACTEN?</Form.Label>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                         <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Instagram</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="instagram" 
                        placeholder="Sin @"/>
                    </Form.Group>
                    <Form.Group as={Col}>
                         <Form.Label style={{color: 'white', fontWeight: 'bold'}}>WhatsApp</Form.Label>
                        <Form.Control type="text" name="whatsapp" placeholder="9 digitos" maxLength="9" onKeyPress={validate} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Galeria 1</Form.Label>
                        <Form.Control type="file" name="url_1" className="form-control" />
                        <small class="form-text text-muted"><span style={{color: 'white'}}>Imágenes cuadradas 600x600 etc.</span></small>
                        {ActivityIndicator_Loading_gal1 ? 
                            <ProgressBar variant="success" now={valueSpinner_gal1} label={`${valueSpinner_gal1}%`}/>
                            : null
                        }
                    </Form.Group>
                    
                    <Form.Group as={Col}>
                    <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Galeria 2</Form.Label>
                    <Form.Control type="file" name="url_2" className="form-control" />
                        <small class="form-text text-muted"><span style={{color: 'white'}}>Imágenes cuadradas 600x600 etc.</span></small>
                    {ActivityIndicator_Loading_gal2 ? 
                        <ProgressBar variant="success" now={valueSpinner_gal2} label={`${valueSpinner_gal2}%`}/>
                        : null
                    }
                    </Form.Group>
                    
                    <Form.Group as={Col}>
                    <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Galeria 3</Form.Label>
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
                    <Form.Check type="checkbox" name="politicas" label="Acepto los terminos y condicios de uso" style={{color: 'white'}} />
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
export default MIHospedaje