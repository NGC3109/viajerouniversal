import React, { Component } from 'react';
import {isMobile, isDesktop} from 'react-device-detect';
import DetailActividades from './desktop/DetailActividades';
import DetailActivitiesMobile from './web-mobile/DetailActivitiesMobile';

class DetailActivity extends Component {
    render(){
        if(isMobile){
        return <DetailActivitiesMobile props={this.props} />
        }
        if(isDesktop){
        return <DetailActividades props={this.props} />
        }
    }
}
export default DetailActivity;