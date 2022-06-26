import React, {Component} from "react";
// import {  MDBRow, MDBCol, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn, MDBContainer } from "mdbreact";
import Helpers from '../helpers/Helpers';
import ItemsPublicaciones from './ItemsPublicaciones'
import Menu from './../container/Menu'
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";
import { Spinner } from "react-bootstrap";
import Footer from './../container/Footer'
import Grid from '@material-ui/core/Grid';

class BlogMochinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDestiny: []
    };
  }
  async componentDidMount(){
    try{
      this.setState({ ActivityIndicator_Loading : true }, () => {
        Helpers.getPublicaciones((d) => {
          this.setState({
              dataDestiny: d,
              ActivityIndicator_Loading: false
          })
        })
      });
        
    }catch(error){
        console.log(error)
    }
  }
render(){
  return (
    <div style={{backgroundColor: '#f1f4f7'}}>
      <Menu />
        {this.state.ActivityIndicator_Loading ? 
          <MDBContainer>
              <MDBRow style={{marginTop: '30%', paddingBottom: '50%'}}>
                  <MDBCol md="5"></MDBCol>
                  <MDBCol md="2">
                      <Spinner animation="border" size="lg" className="text-center" /> <span className="text-center" >Cargando...</span>
                  </MDBCol>
                  <MDBCol md="5"></MDBCol>
              </MDBRow>
          </MDBContainer>
        : 
        <div style={{paddingBottom: '5%'}}>
          <MDBContainer>
            <h2 className="h1-responsive font-weight-bold text-center my-3">Publicaciones de Viajes</h2>
             <p className="text-center w-responsive mx-auto mb-5">
                En esta sección podrás unirte a otros viajeros que desean y comparten el mismo sueño que tú, atrévete y empieza a viajar!
             </p>
            <Grid container spacing={3}>
                <ItemsPublicaciones data={this.state.dataDestiny} />
            </Grid>
          </MDBContainer>
        </div>
        }
      <Footer />
  </div>
  );
}

}
export default BlogMochinder;