import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from "mdbreact";

const GaleriaPage = (props) => {
  const {url_1 } = props
  return (
    <MDBContainer style={{marginBottom: '3%', marginTop: '3%'}}>
      <MDBCarousel
      activeItem={1}
      length={1}
      showControls={false}
      showIndicators={false}
      className="z-depth-1"
    >
      <MDBCarouselInner>
        { url_1 ? 
        <MDBCarouselItem itemId="1">
          <MDBView>
            {/* <div style={{
              backgroundImage: "url(" + url_1 + ")",
              backgroundPosition: 'top',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: 400
              }}>

            </div> */}
            <img
              className="d-block w-100"
              src={url_1}
              alt="First slide"
              style={{maxHeight:600}}
            />
          <MDBMask overlay="black-light" />
          </MDBView>
        </MDBCarouselItem>
        : 
        
        null
        
        }
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
  );
}

export default GaleriaPage;