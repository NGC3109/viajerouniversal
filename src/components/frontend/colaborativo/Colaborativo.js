import React, { Component } from 'react';
import Footer from './../container/Footer'
import Menu from './../container/Menu'
import { MDBContainer, MDBRow } from 'mdbreact';
import Helpers from '../helpers/Helpers';

export default class Colaborativo extends Component {
  constructor(props){
    super(props);
    this.state = {
      colaborativo: []
    }
  }
  async componentWillMount(){
    try{
      Helpers.getColaborativos((colaborativo) => {
        this.setState({
          colaborativo
        })
      });
    }catch(error){
      console.log(error)
    }
    
  }
  render(){
    return (
      <div style={{backgroundColor: '#f1f4f7'}}>
        <Menu />
        <MDBContainer>
          <MDBRow>
          <div className="item">
            <div className="row">
                  {
                    this.state.colaborativo.map((item, index) => {
                      return (<div className="col-lg-6col-md-6 col-sm-6 col-xs-12">
                          <div className="card text-center" style={{
                                backgroundColor: '#FFF',
                                border: '1px solid #eceaea',
                                margin: '20px 0px'
                            }}>
                            {/* <img className="card-img-top" src={item.url} alt="" width="100%"/> */}
                            <div style={{
                                backgroundImage: "url(" + item.url + ")",
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                width: '100%',
                                height: 300
                            }}>
                            </div>
                            <div className="card-block" style={{padding: '10px'}}>
                            <h4 className="card-title">[{item.sectorGente}] {item.titulo}</h4>
                            <p className="card-text">{item.descripcion}</p>
                            <a className="btn btn-default" style={{backgroundColor: '#5db4c0', color: '#000',
                                                                      borderRadius: 0,
                                                                      border: 'none',
                                                                      padding: '13px 20px',
                                                                      fontSize: '13px',
                                                                      fontWeight: '600'
                          }} href="iunlugar.com">SOY DE {item.sectorGente}</a>
                            </div>
                          </div>
                      </div>)
                    })
                  }		
              </div>
          </div>
          </MDBRow>
        </MDBContainer>
      <Footer />
      </div>
    );
  }
}
