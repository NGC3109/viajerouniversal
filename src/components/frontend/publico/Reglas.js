
import React, { Component } from 'react';
import Menu from '../container/Menu'
import Footer from '../container/Footer'
import { MDBContainer, MDBRow } from 'mdbreact';
export default class Reglas extends Component {
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
                <p style={{fontSize:30, textAlign:'center', fontWeight:'bold', paddingBottom: 30}}>Reglas de subida de contenido</p>
                <div style={{width:'100%'}}>
                    <p style={{fontSize:20, textAlign:'left',paddingLeft:15, fontWeight:'bold'}}>1) Imágenes</p>
                    <p style={{fontSize:15, textAlign:'justify', padding: 15}}>
                    Viajero Universal no divulgará ninguna imagen con contenido:
                    <ul>
                        <li>Sexual o aludiendo a este mismo.</li>
                        <li>Ofensivo o que perjudique directa o indirectamente a terceros.</li>
                        <li>Sin relación a la información que quiera ser publicada.</li>
                    </ul>
                    De no cumplirse estos requisitos, se rechazará inmediatamente su publicación.
                    </p>

                    <p style={{fontSize:20, textAlign:'left',paddingLeft:15, fontWeight:'bold'}}>2) Información</p>
                    <p style={{fontSize:15, textAlign:'left', padding: 15}}>
                    Viajero Universal no divulgará ninguna información con contenido:
                    <ul>
                        <li>Sexual o aludiendo a este mismo.</li>
                        <li>Ofensivo o que perjudique directa o indirectamente a terceros.</li>
                        <li>Sin relación a la información que quiera ser publicada.</li>
                    </ul>
                    De no cumplirse estos requisitos, se rechazará inmediatamente su publicación.
                    </p>
                </div>
                </MDBRow>
            </MDBContainer>
            <Footer />
        </div>
    );
  }
}
