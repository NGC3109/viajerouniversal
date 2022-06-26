import React from 'react'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";
const LoadDestinos = (props) => {
  let arrMatch = props.data
  return(
        <CardColumns>
            {
            arrMatch.map((item, i) => 
            item.estado === "1" ? 
                <div key={i}>
                    <Link to={ `/destino/${item.id}`} style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)'}}>
                        <Card className="text-center">
                            <div style={{
                                backgroundImage: "url(" + item.url_portada + ")",
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                width: '100%',
                                height: 200
                                }}>
                            </div>
                        </Card>
                    </Link>
                </div>
            : null
            )}
        </CardColumns>

        
  )
}
export default LoadDestinos;