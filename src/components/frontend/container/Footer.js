import React from "react";
import { Link } from "react-router-dom";
let widthScreen = null
window.screen.width < 1024 ? widthScreen = 1 : widthScreen = 0

const stylesWeb = {
    position: "fixed", left: "0", bottom: "0", width: "100%", height: "50px", flexShrink: 0, background: 'linear-gradient(108deg, rgba(26,56,92,1) 0%, rgba(29,38,65,1) 100%)'
}
const stylesMobile = {
    flexShrink: 0, background: 'linear-gradient(108deg, rgba(26,56,92,1) 0%, rgba(29,38,65,1) 100%)', marginTop: 10
}

const Footer = () => (
    <>
        <div style={{height: widthScreen === 12 ? 0 : 66}}></div>
        <footer style={widthScreen === 1 ? stylesMobile : stylesWeb} className="footer navbar-fixed-bottom py-4 bg-light text-black-50">
            <div className="container text-center">
                <small><label style={{color: 'white'}}>Copyright &copy; 2022 -</label> <Link to="/terminos_y_condiciones">Términos y Condiciones</Link> <label style={{color: 'white'}}>-</label> <Link to="/politicas">Políticas de Privacidad</Link> <label style={{color: 'white'}}>-</label> <strong><a href={"https://www.instagram.com/viajero.universal_"} rel="noopener noreferrer" target="_blank">@viajero.universal_</a></strong></small>
            </div>
        </footer> 
    </>
)
export default Footer