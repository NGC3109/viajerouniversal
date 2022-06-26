import React, { Component } from 'react';
import Helpers from '../../helpers/Helpers';
import ItemsDestinos from './ItemsDestinos';
import firebase from 'firebase/app'
// import firebaseApp from './Firebase'

class DestinosContainer extends Component {
    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {
          _isMounted: false,
          url_portada: []
        };
    }
    componentDidMount(){
      this._isMounted = true
      try{
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              if(this._isMounted){
                this.setState({
                  nameUser: user.displayName,
                  uid: user.uid
                });
              }
              if (this.state.uid) {
                Helpers.getDestinosUser(this.state.uid, (destinos) => {
                  if(this._isMounted){
                    this.setState({
                      url_portada: destinos
                    })
                  }
                });
                Helpers.getWaitingForPublic('destinos', user.uid, (total) => {
                  this.setState({
                    totalActivitiesWaiting: total
                  });
                })
              }
            } else {
              // No user is signed in.
              window.location.href = "http://viajerouniversal.com/#/"
            }
          }.bind(this));
      }catch(error){
          console.log(error)
      }
    }
    componentWillUnmount() {
      this._isMounted = false
    }
  render() {
    return (
      <div>
        {parseInt(this.state.totalActivitiesWaiting) !== 0 ? 
        <div style={{color: '#856404', backgroundColor: '#fff3cd', borderColor: '#ffeeba', position: 'relative', padding: '.75rem 1.25rem', marginBottom: '1rem', border: '1px solid transparent', borderRadius: '.25rem'}}>
          <strong>Atención!</strong> Tienes {this.state.totalActivitiesWaiting} destino(s) pendiente(s) de aprobación, nuestro equipo tardará hasta un máximo de 24hrs en darle resolución.
        </div> 
        : null}
        <ItemsDestinos data={this.state.url_portada}/>
      </div>
    );
  }
}

export default DestinosContainer;
