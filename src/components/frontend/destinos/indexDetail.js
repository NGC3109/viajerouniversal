import React, { Component } from 'react';
import {isMobile, isDesktop} from 'react-device-detect';
import DetailDestinosDesktop from './desktop/detailDestinosDesktop';
import DetailDestinosWebMobile from './web-mobile/detailDestinosWebMobile';

class DetailDestinos extends Component {
    render(){
        if(isMobile){
            return <DetailDestinosWebMobile props={this.props} />
        }
        if(isDesktop){
            return <DetailDestinosDesktop props={this.props} />
        }
    }
}
export default DetailDestinos;