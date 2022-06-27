import React, { Component } from 'react';
import ItemsActividades from '../ItemsActividades'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Helpers from '../../helpers/Helpers';
import { Spinner, Form, Col } from 'react-bootstrap';
import Footer from '../../container/Footer'
import Menu from '../../container/Menu';
import CarouselPage from '../Carousel';
import Select from 'react-select';
import InfiniteScroll from "react-infinite-scroll-component";
import Alert from 'react-bootstrap/Alert'

class Actividades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataActivities: [],
      idRegion: 0,
      ActivityIndicator_Loading: false,
      optionActivities: [],
      optActivities: '',
      limit: 10,
      hasMore: true
    };
  }
  async componentDidMount(){
    try{
      this.setState({ ActivityIndicator_Loading : true }, () => {
        Helpers.getActivities(this.state.limit, (activities) => {
          this.setState({
              dataActivities: activities,
              ActivityIndicator_Loading: false
          })
        })
        Helpers.getTypeActivities((activities) => {
          this.setState({
            optionActivities: activities
          });
        })
      });
               
    }catch(error){
        console.log(error)
    }
  }
  sortedActivitiesRegion = event => {
    this.setState({
      idRegionValue: (event.target.value === undefined ? "0" : event.target.value)
    })
    if(event.target.value === "0"){
      this.setState({
        limit: 10
      })
      this.setState({ ActivityIndicator_Loading : true }, () => {
        Helpers.getActivities(this.state.limit, (activities) => {
          this.setState({
              dataActivities: activities,
              ActivityIndicator_Loading: false,
              hasMore: true
          })
        }) 
      });
    }else{
        Helpers.sortedActivitiesForRegion(event.target.value, this.state.idExperienciaValue, (activities) => {
          this.setState({
            dataActivities: activities,
            hasMore: false
          })
        })
    }
  }
  sortedActivitiesExperiencia = (idExperiencia, event) => {
    this.setState({
      idExperienciaValue: (idExperiencia === undefined ? "0" : idExperiencia)
    })
    if(idExperiencia === "0"){
      this.setState({
        limit: 10
      })
      this.setState({ ActivityIndicator_Loading : true }, () => {
        Helpers.getActivities(this.state.limit, (activities) => {
          this.setState({
              dataActivities: activities,
              ActivityIndicator_Loading: false,
              hasMore: true
          })
        })  
      });
    }else{
        Helpers.sortedActivitiesForExperiencia(this.state.idRegionValue, idExperiencia, (activities) => {
          this.setState({
            dataActivities: activities,
            hasMore: false
          })
        })
    }
  }
  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        limit: this.state.limit + 10
      });
      Helpers.getActivities(this.state.limit, (activities) => {
        this.setState({
            dataActivities: activities
        })
        if(this.state.limit > activities.length){
          this.setState({
            hasMore: false
          })
        }
      })
      
    }, 1500);
  };
  render() {
    let widthScreen = null
    window.screen.width < 1024 ? widthScreen = 12 : widthScreen = null
    return (
      <div style={{backgroundColor:'#f1f4f7', height: '100%'}}>
        <Menu />
        <CarouselPage widthScreen={widthScreen} />
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
                      <Form.Control as="select" name="region" onChange={this.sortedActivitiesRegion}>
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
                      <Form.Label>Experiencia</Form.Label>
                      <Select 
                      options={this.state.optionActivities} 
                      placeholder="Buscar..." 
                      onChange={(opt) => this.sortedActivitiesExperiencia(opt.value)} />
                  </Form.Group>
                </Form.Row>
            </MDBContainer>
            {this.state.dataActivities.length !== 0 ? 
                <InfiniteScroll
                  dataLength={this.state.dataActivities.length}
                  next={this.fetchMoreData}
                  hasMore={this.state.hasMore}
                  loader={<h4 className="text-center" style={{margin: 10}}>Cargando...</h4>}
                >
                  <ItemsActividades data={this.state.dataActivities} />
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
export default Actividades;