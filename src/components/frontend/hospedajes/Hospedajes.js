
 import React, { Component } from 'react';
 import ItemsHospedajes from './ItemsHospedajes'
 import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
 import Helpers from './../helpers/Helpers';
 import { Spinner, Form, Col } from 'react-bootstrap';
 import Footer from './../container/Footer'
 import Menu from './../container/Menu'
 import CarouselPage from './Carousel';
 import Select from 'react-select';

 class Hospedajes extends Component {
   constructor(props) {
     super(props);
     this.state = {
        dataHospedajes: [],
       idRegion: 0,
       ActivityIndicator_Loading: false,
       selectedArray_actividades: [],
       optionsTitlesDestinos: []
     };
   }
   async componentDidMount(){
     try{
       this.setState({ ActivityIndicator_Loading : true }, () => {
         Helpers.getHospedajes((hospedajes) => {
           this.setState({
               dataHospedajes: hospedajes,
               ActivityIndicator_Loading: false
           })
         });
         Helpers.getDestinosTitle((destiny) => {
            this.setState({
              optionsTitlesDestinos: destiny
            });
          });
       });
     }catch(error){
         console.log(error)
     }
   }
   itemSelected = (itemSelectedArray) => {
        Helpers.getSortedHospedajesByDestinos(itemSelectedArray, (hospedajes) => {
            this.setState({
                dataHospedajes: hospedajes
            });
        });
   }
   render() {
    let widthScreen = null
    window.screen.width < 1024 ? widthScreen = 12 : widthScreen = null
     return (
       <div style={{backgroundColor:'#f1f4f7'}}>
        <Menu />
        <CarouselPage widthScreen={widthScreen}/>
         {this.state.ActivityIndicator_Loading ? 
             <MDBContainer>
                 <MDBRow style={{marginTop: '10%', paddingBottom: '50%'}}>
                     <MDBCol md="5"></MDBCol>
                     <MDBCol md="2">
                         <Spinner animation="border" size="lg" className="text-center" /> <span className="text-center" >Cargando...</span>
                     </MDBCol>
                     <MDBCol md="5"></MDBCol>
                 </MDBRow>
             </MDBContainer>
         : 
           <div>
             <MDBContainer>
               <Form.Row style={{marginTop: '2%'}}>
                   <Form.Group as={Col} controlId="formGridPassword">
                       <Form.Label>Destinos</Form.Label>
                       <div style={{backgroundColor: 'white'}}>
                        <Select 
                            isMulti
                            options={this.state.optionsTitlesDestinos} 
                            placeholder="Buscar..." 
                            onChange={opt => this.itemSelected(opt)} 
                            closeOnSelect={false}
                        />
                       </div>
                   </Form.Group>
                 </Form.Row>
             </MDBContainer>
             <ItemsHospedajes data={this.state.dataHospedajes}/>
             <Footer />
           </div>
       }
     </div>
     );
   }
 }
 export default Hospedajes;