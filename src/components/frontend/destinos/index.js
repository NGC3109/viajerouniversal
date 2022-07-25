import React, { Component } from 'react';
import {isMobile, isDesktop} from 'react-device-detect';
import DestinosDesktop from './desktop/DestinosDesktop';
import DestinosWebMobile from './web-mobile/DestinosWebMobile';

class Destinos extends Component {
  render(){
    if(isMobile){
      return <DestinosWebMobile />
    }else if(isDesktop){
      return <DestinosDesktop />
    }else{
      return <DestinosDesktop />
    }
  }
}
export default Destinos;