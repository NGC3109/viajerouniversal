import React from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";

const CarouselPage = (props) => {  
  let widthScreen = props.widthScreen
  return (
    <MDBContainer style={{height: '100%'}}>
      <MDBCarousel
      activeItem={1}
      length={2}
      showControls={true}
      showIndicators={true}
      className="z-depth-1"
      style={{height: '100%'}}
    >
      <MDBCarouselInner>
        <MDBCarouselItem itemId="1">
          <MDBView>
          {widthScreen === 12 ? 
            <div style={{
              backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/sliders%2Fbanner_1.png?alt=media&token=4c3c45b7-c6de-4f60-a47a-c6671b7239da)",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: 150
            }}>
            </div> 
            : 
            <img
              className="d-block w-100"
              src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/sliders%2Fbanner_1.png?alt=media&token=4c3c45b7-c6de-4f60-a47a-c6671b7239da"
              alt="Glaciar Exploradores"
            />
          }
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
          {widthScreen === 12 ? 
            <h6 className="h6-responsive" style={{color: 'white'}}>Glaciar Exploradores</h6>
            :
            <h3 className="h3-responsive" style={{color: 'white'}}>Glaciar Exploradores</h3>
          }
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView>
          {widthScreen === 12 ? 
            <div style={{
              backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/sliders%2Fbanner2.png?alt=media&token=9a1829ac-c58f-4820-81f5-821740904f93)",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: 150
            }}>
            </div> 
            : 
            <img
              className="d-block w-100"
              src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/sliders%2Fbanner2.png?alt=media&token=9a1829ac-c58f-4820-81f5-821740904f93"
              alt="Catedrales de marmol"
            />
          }
          <MDBMask overlay="black-strong" />
          </MDBView>
          <MDBCarouselCaption>
          {widthScreen === 12 ? 
            <h6 className="h6-responsive" style={{color: 'white'}}>Catedrales de Marmol</h6>
            :
            <h3 className="h3-responsive" style={{color: 'white'}}>Catedrales de Marmol</h3>
          }
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
  );
}

export default CarouselPage;