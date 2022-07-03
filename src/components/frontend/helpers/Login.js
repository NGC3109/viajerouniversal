import firebase from 'firebase/app'


export const login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {
    }).catch(function(error) {
      console.log(error)
    });
}