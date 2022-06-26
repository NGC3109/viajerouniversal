import React, { Component } from 'react';
import Helpers from '../../helpers/Helpers';
import LoadPublicaciones from './LoadPublicaciones';
import firebase from 'firebase/app'
import { MDBRow, MDBContainer, MDBCol } from 'mdbreact';
import { Spinner } from 'react-bootstrap';

class PublicacionesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          uid: localStorage.getItem('uid'), 
          url_portada: [],
          ActivityIndicator_Loading: false
        };
    }
      async componentDidMount(){
        try{
          this.setState({ ActivityIndicator_Loading : true }, () => {
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                // User is signed in.
                this.setState({
                  nameUser: user.displayName,
                  uid: user.uid
                });
                Helpers.getPublicacionesUser(this.state.uid, (publicaciones) => {
                  this.setState({
                    url_portada: publicaciones,
                    ActivityIndicator_Loading: false
                  })
                });
                Helpers.getWaitingForPublic('publicaciones', user.uid, (total) => {
                  this.setState({
                    totalActivitiesWaiting: total
                  });
                })
              } else {
                // No user is signed in.
                window.location.href = "http://viajerouniversal.com/#/"
              }
            }.bind(this));
          });
          
             
        }catch(error){
            console.log(error)
        }
      }
  render() {
    return (
      <div>
      {this.state.ActivityIndicator_Loading ? 
        <MDBContainer>
            <MDBRow style={{marginTop: '10%'}}>
                <MDBCol md="5"></MDBCol>
                <MDBCol md="2">
                    <Spinner animation="border" size="lg" className="text-center" /> <span className="text-center" >Cargando...</span>
                </MDBCol>
                <MDBCol md="5"></MDBCol>
            </MDBRow>
        </MDBContainer>
      : 
      <div>
        {parseInt(this.state.totalActivitiesWaiting) !== 0 ? 
        <div style={{color: '#856404', backgroundColor: '#fff3cd', borderColor: '#ffeeba', position: 'relative', padding: '.75rem 1.25rem', marginBottom: '1rem', border: '1px solid transparent', borderRadius: '.25rem'}}>
          <strong>Atención!</strong> Tienes {this.state.totalActivitiesWaiting} publicacion(s) pendiente(s) de aprobación, nuestro equipo tardará hasta un máximo de 24hrs en darle resolución.
        </div> 
        : null}
        <LoadPublicaciones data={this.state.url_portada}/>
      </div>
      }
    </div>
    );
  }
}

export default PublicacionesContainer;
