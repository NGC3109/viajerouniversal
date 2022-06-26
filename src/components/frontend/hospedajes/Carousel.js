import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact";

const CarouselPage = (props) => {
  let widthScreen = props.widthScreen
  return (
    <MDBContainer style={{height: '100%'}}>
      <MDBCarousel
      activeItem={1}
      length={2}
      showControls={false}
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
          </MDBView>
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
          </MDBView>
        </MDBCarouselItem>
        {/* <MDBCarouselItem itemId="3">
          <MDBView>
          {widthScreen === 12 ? 
            <div style={{
              backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/actividades%2Fbanner-3.png?alt=media&token=f07a81b4-5d31-4ec7-bf62-0508bebbf3c3)",
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
              src="https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/actividades%2Fbanner-3.png?alt=media&token=f07a81b4-5d31-4ec7-bf62-0508bebbf3c3"
              alt="Puerto Aysen"
            />
          }
          </MDBView>
        </MDBCarouselItem> */}
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
  );
}

export default CarouselPage;