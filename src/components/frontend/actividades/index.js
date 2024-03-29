import React, { Component } from 'react';
import {isMobile, isDesktop} from 'react-device-detect';
import ActivityDesktop from './desktop/ActivityDesktop';
import ActivityMobile from './web-mobile/ActivityMobile';

class Activity extends Component {
  render(){
    if(isMobile){
      return <ActivityMobile />
    }else if(isDesktop){
      return <ActivityDesktop />
    }else{
      return <ActivityDesktop />
    }
  }
}
export default Activity;