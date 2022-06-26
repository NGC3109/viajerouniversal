
import React, { Component } from 'react';
import Menu from '../container/Menu'
import Footer from '../container/Footer'
import { MDBContainer, MDBRow } from 'mdbreact';
export default class Terminos extends Component {
  constructor(props){
    super(props);
    this.textInput = React.createRef();
  }
  async componentDidMount(){
    this.textInput.current.focus();
  }
  render() {
    return (
        <div style={{backgroundColor: '#f1f4f7'}}>
            <input type="text" ref={this.textInput} style={{position: 'absolute', top: 0, zIndex: -9999}} readOnly/>
            <Menu />
            <MDBContainer>
                <MDBRow style={{marginTop: '4%'}}>
                <p style={{fontSize:30, textAlign:'center', fontWeight:'bold', paddingBottom: 30}}>Política de privacidad</p>
                <div style={{width:'100%'}}>
                    <p style={{fontSize:20, textAlign:'left',paddingLeft:15, fontWeight:'bold'}}>1) Divulgación de su información a terceros</p>
                    <p style={{fontSize:15, textAlign:'justify', padding: 15}}>
                    Viajero Universal no divulgará, sin su consentimiento, ninguna información personal a terceros para sus propios fines comerciales, 
                    con excepción de que Viajero Universal puede divulgar su información personal a terceros, incluidas ciertas empresas afiliadas 
                    (en concordancia con las leyes y reglamentaciones pertinentes) u otras empresas confiables, únicamente con el fin de permitirles 
                    que brinden servicios a Viajero Universal relacionados con los fines comerciales propios de Viajero Universal (con sujeción a las 
                    obligaciones de confidencialidad y seguridad).
                    Cumplimiento de leyes y seguridad pública: Viajero Universal también puede divulgar información personal si considera, 
                    de buena fe, que tal divulgación es necesaria para cumplir con las leyes pertinentes, o para responder a citaciones u órdenes 
                    judiciales de las que haya sido notificada, o para proteger o defender los derechos, la propiedad y la seguridad de nuestros usuarios, 
                    de terceros o de nosotros mismos. Las autoridades judiciales o las agencias del orden público pueden exigir que Viajero Universal 
                    proporcione información personal a las autoridades gubernamentales que correspondan. Divulgaremos información personal a partir de 
                    la recepción de una citación u orden judicial para cooperar con una investigación de las fuerzas de orden público. Viajero Universal 
                    colabora plenamente con las agencias del orden público en la identificación de aquellos que utilizan nuestros servicios para 
                    actividades ilegales. Viajero Universal se reserva el derecho de informar a las agencias del orden público sobre cualquier 
                    actividad que, de buena fe, considere ilegal.
                    Fusiones y adquisiciones: En caso de una fusión, consolidación, reorganización o venta o transferencia de todos o 
                    sustancialmente todos los activos o actividades comerciales de Viajero Universal, uno de los activos que normalmente 
                    se transferiría es la información que recopilamos de nuestros visitantes y clientes (incluida tanto la información 
                    personal como la información no personal). Sin embargo, el uso de esta información por parte de cualquier entidad 
                    sucesora seguiría estando sujeto a los términos de esta política, con sus eventuales enmiendas, incluidas todas las 
                    enmiendas posteriores a dicha transacción.
                    </p>

                    <p style={{fontSize:20, textAlign:'left',paddingLeft:15, fontWeight:'bold'}}>2) Enmiendas a esta política de privacidad</p>
                    <p style={{fontSize:15, textAlign:'left', padding: 15}}>
                    Viajero Universal se reserva el derecho, en cualquier momento y sin aviso previo, de agregar, cambiar, modificar o 
                    actualizar esta Política de Privacidad mediante la publicación de una política enmendada en esta Página web. Toda Política 
                    de Privacidad enmendada entrará en vigor inmediatamente después de su publicación. No obstante, siempre que esta política 
                    se actualice, se publicará la fecha de modificación.
                    </p>

                    <p style={{fontSize:20, textAlign:'left',paddingLeft:15, fontWeight:'bold'}}>3) Descargo de responsabilidad</p>
                    <p style={{fontSize:15, textAlign:'left', padding: 15}}>
                    Viajero Universal no se hace responsable de ninguna actividad ilícita en relación con esta Página web ni en caso de que un 
                    tercero obtenga una contraseña que se haya brindado a un usuario. En caso de que un usuario crea que una contraseña 
                    ha sido obtenida sin permiso por terceros o si un visitante tiene otras inquietudes relativas a la privacidad, 
                    debería ponerse inmediatamente en contacto con Viajero Universal para que podamos cambiar la contraseña o tomar las medidas 
                    pertinentes. Esta notificación debe enviarse a <strong>undatorres1994@gmail.com</strong>.
                    </p>
                </div>
                </MDBRow>
            </MDBContainer>
            <Footer />
        </div>
    );
  }
}
