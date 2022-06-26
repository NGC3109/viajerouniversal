import React, { useState } from 'react';
import {Button, Modal, Form, Col, ProgressBar} from 'react-bootstrap'
import Helpers from './../../helpers/Helpers';
import ReactGA from "./../../helpers/Analytics";

const handleSubmit = (uid, handleClose, 
  ActivityIndicator_Loading, 
  setActivityIndicator_Loading,
  divAlertMB,
  setdivAlertMB,
  valueSpinner,
  setvalueSpinner) => event =>{
    event.preventDefault();
         
    const titulo = event.target.titulo.value;
    const f_salida = event.target.f_salida.value;
    const lugar_inicio = event.target.lugar_inicio.value;
    const destino_final = event.target.destino_final.value;
    const hora_salida = event.target.hora_salida.value;
    const tiempo_viaje = event.target.tiempo_viaje.value;
    const cupos_pasajeros = event.target.cupos_pasajeros.value;
    const descripcion = event.target.descripcion.value;
    const mascotas = event.target.mascotas.value;
    const requisitos = event.target.requisitos.value;
    // const facebook = event.target.facebook.value;
    const instagram = event.target.instagram.value;
    const whatsapp = event.target.whatsapp.value;
    const politicas = event.target.politicas.value;
    const timeViaje = event.target.timeViaje.value;
    const gastos = event.target.gastos.value;
    const hijos = event.target.hijos.value;
    const gastos_generales = event.target.gastos_generales.value;
    const meridiano = event.target.meridiano.value;
    const desde_edad = event.target.desde_edad.value;
    const hasta_edad = event.target.hasta_edad.value;
     
    
    const file = event.target.portada.files[0]
    var today = new Date();
    const fecha_publicacion = `${new Date(today).getDate()}-${new Date(today).getMonth()}-${new Date(today).getFullYear()} ${new Date(today).getHours()}:${new Date(today).getMinutes()}`  
    const obj = {
      titulo,
      f_salida,
      lugar_inicio,
      destino_final,
      idUsuario: uid,
      hora_salida: hora_salida,
      tiempo_viaje,
      cupos_pasajeros,
      descripcion,
      mascotas,
      requisitos,
      fecha_publicacion,
      gastos,
      whatsapp,
      instagram: instagram.replace('@', ''),
      politicas,
      timeViaje,
      estado: "0",
      hijos,
      gastos_generales,
      estado_viaje: "1",
      meridiano,
      desde_edad,
      hasta_edad
    }
    try{
      //SE GUARDA EL ID (NUMERO DE SEGUNDOS - 1)
        Helpers.createNewPublic(obj, function(idPublic){
          if(file != null){
            if(file.size < 3431990){
              Helpers.uploadImage(file, idPublic, (snap) => {
                  setActivityIndicator_Loading(ActivityIndicator_Loading = true)
                  if(snap === 100){
                    setActivityIndicator_Loading(ActivityIndicator_Loading = false)
                      setdivAlertMB(divAlertMB = false)
                      handleClose()
                  }else{
                      setvalueSpinner(valueSpinner = snap)
                  }
              })
            }else{
                console.log('La imagen no puede ser mayor a 3MB')
                setdivAlertMB(divAlertMB = true)
            }
          }else{
            handleClose()
          }
          ReactGA.event({
            category: 'Create Group',
            action: 'New',
            label: idPublic
          });
        })
        
        // Helpers.uploadImage(file, (id - 1))
        
    }catch(error){
        console.log(error)
        handleClose()
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
function MIPublic(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ActivityIndicator_Loading, setActivityIndicator_Loading] = useState(false);
    const [divAlertMB, setdivAlertMB] = useState(false);
    const [valueSpinner, setvalueSpinner] = useState(0);
    return (
      <>
        {props.dataPersonal !== 'NN' ? 
        <Button variant="success" onClick={handleShow} style={{marginBottom: 5, backgroundColor: '#fb6012',borderColor: '#fb6012'}}>Nuevo Grupo</Button>
        : 
        <div className="alert alert-info">
          <strong>Atención!</strong> Para comenzar a publicar favor ingrese sus datos.
        </div>
        }
        

        <Modal show={show} onHide={handleClose}>
          
        
          <Modal.Header closeButton style={{  
                            backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/sliders%2Fhv.png?alt=media&token=6076f2c0-9c96-4131-bf1e-2535167bf9b5)",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
            <Modal.Title style={{color: 'white'}}>INGRESO GRUPO</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(props.uid, handleClose, 
              ActivityIndicator_Loading, 
              setActivityIndicator_Loading,
              divAlertMB,
              setdivAlertMB,
              valueSpinner,
              setvalueSpinner)} style={{  
                            backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/sliders%2Fdesiertoalta.jpg?alt=media&token=ae073644-9eaa-4124-b0de-0e658938e2d2)",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
            <Modal.Body>
                <Form.Row>
                    <Form.Group as={Col} controlId="ttile">
                     <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Titulo</Form.Label>
                    <Form.Control type="text" name="titulo" placeholder="Titulo de la ruta" required/>
                    </Form.Group>

                    <Form.Group as={Col}>
                     <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Fecha Salida</Form.Label>
                    <Form.Control type="date" name="f_salida" required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="place">
                     <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Lugar de inicio</Form.Label>
                     <Form.Control type="text" name="lugar_inicio" placeholder="País / Región" required/>
                    {/* <Form.Control as="select" name="lugar_inicio" required>
                          <option value="0"> -- Seleccionar Región -- </option>
                          <option value="Tarapacá">I de Tarapacá (Capital: Iquique)</option>
                          <option value="Antofagasta">II de Antofagasta (Capital: Antofagasta)</option>
                          <option value="Atacama">III de Atacama (Capital: Copiapó)</option>
                          <option value="Coquimbo">IV de Coquimbo (Capital: Coquimbo)</option>
                          <option value="Valparaíso">V de Valparaíso (Capital: Valparaíso)</option>
                          <option value="O'Higgins">VI del Libertador General Bernardo O'Higgins (Capital: Rancagua)</option>
                          <option value="Maule">VII del Maule (Capital: Talca)</option>
                          <option value="Biobío">VIII de Biobío (Capital: Concepción)</option>
                          <option value="Araucanía">IX de la Araucanía (Capital: Temuco)</option>
                          <option value="Los Lagos">X de Los Lagos (Capital: Puerto Montt)</option>
                          <option value="Aysén">XI de Aysén del General Carlos Ibañez del Campo (Capital: Coyhaique)</option>
                          <option value="Magallanes">XII de Magallanes y de la Antártica Chilena (Capital: Punta Arenas)</option>
                          <option value="Metropolitana">RM Metropolitana de Santiago (Capital: Santiago)</option>
                          <option value="Los Ríos">XIV de Los Ríos (Capital: Valdivia)</option>
                          <option value="Arica">XV de Arica y Parinacota (Capital: Arica)</option>
                          <option value="Ñuble">XVI del Ñuble (Capital: Chillán)</option>
                    </Form.Control> */}
                    </Form.Group>

                    <Form.Group as={Col}>
                     <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Destino final</Form.Label>
                     <Form.Control type="text" name="destino_final" placeholder="País / Región" required/>
                    {/* <Form.Control as="select" name="destino_final" required>
                          <option value="0"> -- Seleccionar Región -- </option>
                          <option value="Tarapacá">I de Tarapacá (Capital: Iquique)</option>
                          <option value="Antofagasta">II de Antofagasta (Capital: Antofagasta)</option>
                          <option value="Atacama">III de Atacama (Capital: Copiapó)</option>
                          <option value="Coquimbo">IV de Coquimbo (Capital: Coquimbo)</option>
                          <option value="Valparaíso">V de Valparaíso (Capital: Valparaíso)</option>
                          <option value="O'Higgins">VI del Libertador General Bernardo O'Higgins (Capital: Rancagua)</option>
                          <option value="Maule">VII del Maule (Capital: Talca)</option>
                          <option value="Biobío">VIII de Biobío (Capital: Concepción)</option>
                          <option value="Araucanía">IX de la Araucanía (Capital: Temuco)</option>
                          <option value="Los Lagos">X de Los Lagos (Capital: Puerto Montt)</option>
                          <option value="Aysén">XI de Aysén del General Carlos Ibañez del Campo (Capital: Coyhaique)</option>
                          <option value="Magallanes">XII de Magallanes y de la Antártica Chilena (Capital: Punta Arenas)</option>
                          <option value="Metropolitana">RM Metropolitana de Santiago (Capital: Santiago)</option>
                          <option value="Los Ríos">XIV de Los Ríos (Capital: Valdivia)</option>
                          <option value="Arica">XV de Arica y Parinacota (Capital: Arica)</option>
                          <option value="Ñuble">XVI del Ñuble (Capital: Chillán)</option>
                    </Form.Control> */}
                    </Form.Group>
                </Form.Row>

                
                <Form.Row>
                    <Form.Group as={Col}>
                       <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Hora Salida</Form.Label>
                      <Form.Control type="time" name="hora_salida" placeholder="Hora de salida" required/>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>.</Form.Label>
                      <Form.Control as="select" name="meridiano" required>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                       <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Portada</Form.Label>
                      <Form.Control type="file" name="portada" className="form-control" required/>
                      {ActivityIndicator_Loading ? 
                        <ProgressBar variant="success" now={valueSpinner} label={`${valueSpinner}%`}/>
                        : null
                      }
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                       <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Tiempo de viaje</Form.Label>
                      <Form.Control type="text" onKeyPress={validate} name="tiempo_viaje" placeholder="Duracion del viaje" required/>
                    </Form.Group>
                    <Form.Group as={Col}>      
                      <Form.Label style={{color:'white'}}>.</Form.Label>                
                      <Form.Control as="select" name="timeViaje" required>
                            <option value="Horas">Horas</option>
                            <option value="Dias">Días</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                         <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Cupos pasajeros</Form.Label>
                        <Form.Control type="text" onKeyPress={validate} name="cupos_pasajeros" placeholder="Pasajeros permitidos" required/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                       <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Gasto de combustible</Form.Label>
                        <Form.Control as="select" name="gastos" required>
                            <option value="0"> -- Seleccionar -- </option>
                            <option value="Compartido">Compartido</option>
                            <option value="Individual">Individual</option>
                            <option value="Cualquier aporte es bienvenido">Cualquier aporte es bienvenido</option>
                            <option value="Ninguno, autostop">Ninguno, autostop</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                       <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Gastos Generales</Form.Label>
                        <Form.Control as="select" name="gastos_generales" required>
                            <option value="0"> -- Seleccionar -- </option>
                            <option value="Compartido">Compartido</option>
                            <option value="Individual">Individual</option>
                            <option value="Cualquier aporte es bienvenido">Cualquier aporte es bienvenido</option>
                            <option value="Ninguno, autostop">Ninguno, autostop</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

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
                <Form.Group>
                     <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Descripcion</Form.Label>
                    <Form.Control as="textarea" rows="3" name="descripcion" placeholder="Descripción de la ruta, paradas etc." required/>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="mas">
                        <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Mascotas</Form.Label>
                        <Form.Control as="select" name="mascotas" required>
                            <option value="0"> -- Seleccionar -- </option>
                            <option value="Sí">Sí</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="rango">
                        <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Desde</Form.Label>
                        <Form.Control as="select" name="desde_edad" required>
                            <option value="0"> -- Años -- </option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                            <option value="32">32</option>
                            <option value="33">33</option>
                            <option value="34">34</option>
                            <option value="35">35</option>
                            <option value="36">36</option>
                            <option value="37">37</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                            <option value="43">43</option>
                            <option value="44">44</option>
                            <option value="45">45</option>
                            <option value="46">46</option>
                            <option value="47">47</option>
                            <option value="48">48</option>
                            <option value="49">49</option>
                            <option value="50">50</option>
                            <option value="50+">50+</option>
                        </Form.Control>
                      </Form.Group>
                    <Form.Group as={Col} controlId="rango2">
                        <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Hasta</Form.Label>
                        <Form.Control as="select" name="hasta_edad" required>
                            <option value="0"> -- Años -- </option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                            <option value="32">32</option>
                            <option value="33">33</option>
                            <option value="34">34</option>
                            <option value="35">35</option>
                            <option value="36">36</option>
                            <option value="37">37</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                            <option value="43">43</option>
                            <option value="44">44</option>
                            <option value="45">45</option>
                            <option value="46">46</option>
                            <option value="47">47</option>
                            <option value="48">48</option>
                            <option value="49">49</option>
                            <option value="50">50</option>
                            <option value="50+">50+</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="req">
                         <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Requisitos</Form.Label>
                        <Form.Control as="select" name="requisitos" required>
                            <option value="0"> -- Seleccionar Requisitos -- </option>
                            <option value="Solo mujeres">Solo mujeres</option>
                            <option value="Solo hombres">Solo hombres</option>
                            <option value="Mujeres y Hombres">Mujeres y Hombres</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="hij">
                         <Form.Label style={{color: 'white', fontWeight: 'bold'}}>Hijas/os?</Form.Label>
                        <Form.Control as="select" name="hijos" required>
                            <option value="0"> -- Seleccionar -- </option>
                            <option value="Sí">Sí</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                { divAlertMB ? 
                        <Form.Group id="formGridCheckbox">
                            <div className="alert alert-danger">
                                <strong>Atención!</strong> La imagen de portada supera los 3MB.
                            </div> 
                        </Form.Group>
                        : 
                        null
                    }
                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox"  name="politicas" label="Acepto los terminos y condicios de uso" style={{color: 'white'}} required/>
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
export default MIPublic