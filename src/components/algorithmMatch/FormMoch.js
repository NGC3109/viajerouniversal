import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'

const FormMoch = (props) => {
  const createUser = props.saveForm
  const handleChange = props.handleChange
  const {region, nacimiento, comuna, intereses, genero, descripcion} = props.dateUser
  console.log(props.dateUser)
  return (
    <div style={{flex: 1}}>
        <MDBContainer>
      <MDBRow>
        <MDBCol md="4">
          <form>
            <p className="h4 text-center mb-4" style={{marginTop: 20}}>Datos Personales</p>

            <label className="grey-text">NOMBRE</label>
            <input type="text" name="nombre" onChange={handleChange} className="form-control" value={this.state.nombre || ''} />

            <label className="grey-text">COMUNA</label>
            <input type="text" name="comuna" onChange={handleChange} className="form-control" value={comuna || ''} />

            <label className="grey-text">REGION</label>
            <input type="text" name="region" onChange={handleChange} className="form-control" value={region || ''} />

            <label className="grey-text">FECHA NACIMIENTO</label>
            <input type="date" name="nacimiento" onChange={handleChange} className="form-control" value={nacimiento || ''} />

            <label className="grey-text" >GENERO</label>
            <input type="text" name="genero" onChange={handleChange} className="form-control" value={genero || ''}/>

            <label className="grey-text">INTERESES</label>
            <input type="text" name="intereses" onChange={handleChange} className="form-control"  value={intereses || ''}/>

            <label className="grey-text">DESCRIPCION PERSONAL</label>
            <textarea type="text" name="descripcion" onChange={handleChange} className="form-control" rows="3"  value={descripcion || ''}/>
            <div className="text-left mt-4">
              <MDBBtn color="info" onClick={createUser}>
                <span style={{color:'white'}}>GUARDAR</span>
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
        <MDBCol md="8">
        <Col xs={12} md={8}>
            <p className="h4 text-center mb-4"></p>
            <br />
            <Image src="https://www.kernpharma.com/sites/default/files/styles/blog_full/public/blog/Diarrea%20del%20viajero.jpg?itok=-Vj1TqgE" thumbnail />
        </Col>
        </MDBCol>
      </MDBRow> 
    </MDBContainer>
    </div>
  )
};

export default FormMoch;
