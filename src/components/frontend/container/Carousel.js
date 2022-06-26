import React from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import { Link } from "react-router-dom";

const CarouselPage = (props) => {
  let widthScreen = null
  window.screen.width < 1024 ? widthScreen = 12 : widthScreen = null
  const slider = props.slider
  return (
    <MDBContainer>
      <MDBCarousel
      activeItem={1}
      length={3}
      showControls={true}
      showIndicators={true}
      className="z-depth-1"
    >
      <MDBCarouselInner>
        {slider.map((item, i) => 
          <MDBCarouselItem key={i} itemId={item.id}>
              <MDBView>
                <Link to={`/destino/${item.idDestino}`}>
                  <img
                    className="d-block w-100"
                    src={item.slider}
                    alt={item.name}
                  />
                </Link>
              <MDBMask overlay="black-light" />
              </MDBView>
              <MDBCarouselCaption>
                {widthScreen === 12 ? <h6 className="h3-responsive" style={{color: 'white'}}>{item.name}</h6> : <h3 className="h3-responsive" style={{color: 'white'}}>{item.name}</h3>}
              </MDBCarouselCaption>
          </MDBCarouselItem>
        )}
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
  );
}

export default CarouselPage;