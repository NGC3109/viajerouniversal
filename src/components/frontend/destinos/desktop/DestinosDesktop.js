import React, { Component } from 'react';
import ItemsDestinosDesktop from './ItemsDestinosDesktop'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Helpers from './../../helpers/Helpers';
import { Spinner, Form, Col } from 'react-bootstrap';
import Footer from './../../container/Footer'
import Select from 'react-select';
import firebase from 'firebase/app'
import InfiniteScroll from "react-infinite-scroll-component";
import Alert from 'react-bootstrap/Alert'
import Menu from '../../container/Menu'
import Carousel from './../Carousel'

class DestinosDesktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDestiny: [],
      idRegion: 0,
      ActivityIndicator_Loading: false,
      optionsTitlesDestiny: [],
      uid: null,
      limit: 10,
      hasMore: true
    };
  }
  async componentDidMount(){
    try{
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          Helpers.getDestiny2Test(this.state.limit, user.uid, (nameGet) => {
            this.setState({
                dataDestiny: nameGet,
                ActivityIndicator_Loading: false,
                uid: user.uid
            })
          })
        }else{
          Helpers.getDestiny2Test(this.state.limit, null, (nameGet) => {
            this.setState({
                dataDestiny: nameGet,
                ActivityIndicator_Loading: false
            })
          })
        }
      }.bind(this));
      this.setState({ ActivityIndicator_Loading : true }, () => {
        Helpers.getDestinosTitleSorted((destiny) => {
          this.setState({
            optionsTitlesDestiny: destiny
          });
        })
      });
    }catch(error){
        console.log(error)
    }
  }
  
  sortedDestinosForRegion = event => {
    if(event.target.value === "0"){
      this.setState({
        limit: 10
      })
      this.setState({ ActivityIndicator_Loading : true }, () => {
        Helpers.getDestiny2Test(this.state.limit, this.state.uid, (nameGet) => {
          this.setState({
              dataDestiny: nameGet,
              ActivityIndicator_Loading: false,
              hasMore: true
          })
        }) 
      });
    }else{
        Helpers.sortedDestinos(event.target.value, this.state.uid, (nameGet) => {
          this.setState({
              dataDestiny: nameGet,
              hasMore: false
          })
        })
    }
  }
  sortedSearchDestinos = idDestino => {
    if(idDestino === "0"){
        this.setState({
          limit: 10
        })
        Helpers.getDestiny2Test(this.state.limit, this.state.uid,(nameGet) => {
          this.setState({
            dataDestiny: nameGet,
            hasMore: true
          })
        })  
    }else{
        Helpers.sortedDestinosForRegionSearch(idDestino, this.state.uid, (destinos) => {
          this.setState({
            dataDestiny: destinos,
            hasMore: false
          })
        });
    }
  }
  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        limit: this.state.limit + 10
      });
      Helpers.getDestiny2Test(this.state.limit, this.state.uid,(nameGet) => {
        this.setState({
          dataDestiny: nameGet
        })
      })
      if(this.state.limit > this.state.dataDestiny.length){
        this.setState({
          hasMore: false
        })
      }
    }, 1500);
  };
  handleClose = () => {
    this.setState({open: false});
  };
  handleClickOpen = () => {
    this.setState({open: true});
  };
  render() {
    return (
      <div style={{backgroundColor:'#f1f4f7'}}>
        <Menu />
        <Carousel />
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
                      <Form.Label>Región</Form.Label>
                      <Form.Control as="select" name="region" onChange={this.sortedDestinosForRegion}>
                        <option value="0"> -- Seleccionar Región -- </option>
                        <option value="1">I de Tarapacá (Capital: Iquique)</option>
                        <option value="2">II de Antofagasta (Capital: Antofagasta)</option>
                        <option value="3">III de Atacama (Capital: Copiapó)</option>
                        <option value="4">IV de Coquimbo (Capital: Coquimbo)</option>
                        <option value="5">V de Valparaíso (Capital: Valparaíso)</option>
                        <option value="6">VI del Libertador General Bernardo O'Higgins (Capital: Rancagua)</option>
                        <option value="7">VII del Maule (Capital: Talca)</option>
                        <option value="8">VIII de Biobío (Capital: Concepción)</option>
                        <option value="9">IX de la Araucanía (Capital: Temuco)</option>
                        <option value="10">X de Los Lagos (Capital: Puerto Montt)</option>
                        <option value="11">XI de Aysén del General Carlos Ibañez del Campo (Capital: Coyhaique)</option>
                        <option value="12">XII de Magallanes y de la Antártica Chilena (Capital: Punta Arenas)</option>
                        <option value="13">RM Metropolitana de Santiago (Capital: Santiago)</option>
                        <option value="14">XIV de Los Ríos (Capital: Valdivia)</option>
                        <option value="15">XV de Arica y Parinacota (Capital: Arica)</option>
                        <option value="16">XVI del Ñuble (Capital: Chillán)</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Buscador</Form.Label>
                      <Select 
                      options={this.state.optionsTitlesDestiny} 
                      placeholder="Escriba un destino..." 
                      defaultValue={{label: 'Todos**', value: 0}}
                      onChange={(opt) => this.sortedSearchDestinos(opt.value)} />
                  </Form.Group>
                </Form.Row>
            </MDBContainer>
            {this.state.dataDestiny.length !== 0 ?
              <InfiniteScroll
                dataLength={this.state.dataDestiny.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={<h4 className="text-center" style={{margin: 10}}>Cargando...</h4>}
              >
                <ItemsDestinosDesktop data={this.state.dataDestiny}/>
              </InfiniteScroll>
            :
              <MDBContainer>
                <Alert variant='warning'>
                    <p>
                        Sin resultados!
                    </p>
                </Alert> 
              </MDBContainer>
            }
            <Footer />
          </div>
      }
    </div>
    );
  }
}
export default DestinosDesktop;