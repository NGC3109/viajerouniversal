
import React, { Component } from 'react';
import Menu from '../container/Menu'
import Footer from '../container/Footer'
import { MDBContainer, MDBRow } from 'mdbreact';
export default class Terminos extends Component {
  constructor(props){
    super(props);
    this.textInput = React.createRef();
  }
  async componentDidMount(){
    this.textInput.current.focus();
  }
  render() {
    return (
        <div style={{backgroundColor: '#f1f4f7'}}>
        <input type="text" ref={this.textInput} style={{position: 'absolute', top: 0, zIndex: -9999}} readOnly/>
            <Menu />
            <MDBContainer>
                <MDBRow style={{marginTop: '4%'}}>
                <p style={{fontSize:30, textAlign:'center', fontWeight:'bold', paddingBottom: 30}}>Términos y Condiciones</p>
                <div style={{width: '100%'}}>
                    <p style={{fontSize:20, textAlign:'left',paddingLeft:15, fontWeight:'bold'}}>1) Derechos de autor y marcas registradas</p>
                    <p style={{fontSize:15, textAlign:'justify', padding: 15}}>
                    Todo el contenido aquí mostrado es de propiedad de la compañía o en casos utilizada con la autorización de sus 
                    respectivos titulares. Dicho esto, se autoriza a Viajero Universal a utilizar la información de forma que esta sea 
                    provechosa para la aplicación y se reserva el derecho de publicar o quitar contenido.
                    Ningún tercero puede utilizar ni reproducir ninguna marca registrada que incluya, entre otros, 
                    logotipos y dominios de Internet que utilicen la marca registrada “Viajero Universal”, 
                    (ya sea que se usen o no con letras mayúsculas o espacios) sin el previo consentimiento por escrito del propietario de la marca registrada.
                    </p>

                    <p style={{fontSize:20, textAlign:'left',paddingLeft:15, fontWeight:'bold'}}>2) Contenido</p>
                    <p style={{fontSize:15, textAlign:'justify', padding: 15}}>
                    La Compañía se reserva el derecho de enmendar, complementar o suspender total o 
                    parcialmente la Página web en forma ocasional. Asimismo, la Compañía se reserva el derecho de cambiar 
                    los Términos y Condiciones en cualquier momento, con vigencia inmediata a partir del momento 
                    que se actualiza la Página web. Los términos “Usuario” y “Usuarios” se refieren a todo 
                    individuo o entidad que use, acceda, descargue, instale, obtenga o brinde información desde y 
                    hacia esta Página web. Todas las referencias al plural en la presente incluirán al singular y las 
                    referencias al singular incluirán al plural salvo que se desprenda otra interpretación del contexto.
                    </p>

                    <p style={{fontSize:20, textAlign:'left',paddingLeft:15, fontWeight:'bold'}}>3) Reclamos por violación de derechos en la aplicación móvil</p>
                    <p style={{fontSize:15, textAlign:'left', padding: 15}}>
                    En caso de que un visitante crea que sus derechos de propiedad intelectual o marcas registradas 
                    puedan estar siendo violados por materiales publicados o almacenados en esta Página web, 
                    deberá enviar un correo electrónico a nuestro correo: <p style={{fontWeight:'bold', color:'black'}}>undatorres1994@gmail.com</p>.
                    Dicha Notificación debe brindar la información requerida en cumplimiento de las cláusulas 
                    aplicables de la Ley de derechos de autor.
                    </p>

                    <p style={{fontSize:20, textAlign:'left',paddingLeft:15, fontWeight:'bold'}}>4) Uso</p>
                    <p style={{fontSize:15, textAlign:'left', padding: 15}}>
                    Al usar, acceder, descargar, instalar, obtener o brindar información desde y hacia esta Página web, 
                    se considerará que los Usuarios han leído y aceptado estos Términos y Condiciones (incluyendo nuestra Política de Privacidad), 
                    que se incorpora al presente documento en virtud de esta referencia.
                    Los Usuarios deben suspender el uso de esta Página web inmediatamente si no
                    están de acuerdo o no aceptan todos estos Términos y 
                    Condiciones. La Compañía se reserva el derecho de eliminar o prohibir a cualquier 
                    Usuario la utilización de esta Página web a su sola discreción.
                    </p>

                    <p style={{fontSize:20, textAlign:'left',paddingLeft:15, fontWeight:'bold'}}>5) Envío de contenidos</p>
                    <p style={{fontSize:15, textAlign:'left', padding: 15}}>
                    En caso de que un Usuario envíe imágenes digitales u otro contenido, incluidas todas las 
                    fotografías, ilustraciones, gráficos y texto (en forma conjunta, "Materiales") a la Compañía a 
                    través de la aplicación móvil, pagina web y/o correo electrónico (en forma conjunta, "medios digitales"), 
                    tendrán validez los siguientes términos:
                    El Usuario solo podrá enviar a la compañía, a través de los medios digitales, materiales de los cuales 
                    posea todos los derechos de propiedad intelectual. Dicho de 
                    otro modo, si un Usuario envía una imagen digital a la compañía, el Usuario debe poseer todos los 
                    derechos sobre dicha imagen o el Usuario debe tener la autorización de la persona propietaria de 
                    tales derechos. Los menores de edad no pueden enviar Materiales a la Compañía a través de
                    los medios digitales. Asimismo, un Usuario no puede enviar ninguna información susceptible de identificación 
                    personal sobre un niño menor de 13 años de edad.
                    </p>

                    <p style={{fontSize:20, textAlign:'left',paddingLeft:15, fontWeight:'bold'}}>6) Responsabilidad</p>
                    <p style={{fontSize:15, textAlign:'left', padding: 15}}>
                    LOS TERCEROS, LA COMPAÑÍA Y SUS EMPRESAS MATRICES Y AFILIADAS, JUNTO CON LOS RESPECTIVOS DIRECTIVOS, 
                    DIRECTORES, PERSONAL, EMPLEADOS Y REPRESENTANTES (EN CONJUNTO REFERIDOS COMO LAS “PARTES EXENTAS”) NO 
                    SERÁN RESPONSABLES NI ESTARÁN SUJETOS A ACCIONES LEGALES, Y POR LA PRESENTE EL USUARIO RENUNCIA A TODO 
                    RECLAMO, DEMANDA, IMPUTACIÓN DE RESPONSABILIDADES, CAUSA LEGAL, QUERELLA, RECLAMACIÓN DE DAÑOS Y PERJUICIOS, 
                    POR RAZÓN DE, ENTRE OTROS, DAÑOS DIRECTOS, INDIRECTOS, ACCIDENTALES, INCIDENTALES, DERIVADOS, CIRCUNSTANCIALES, 
                    EXTRAORDINARIOS, ESPECIALES O PUNITIVOS DE CUALQUIER NATURALEZA CON RESPECTO A ESTA PÁGINA WEB (INCLUYENDO 
                    LOS PRODUCTOS, SERVICIOS Y CONTENIDOS DE LAS PARTES EXENTAS), AÚN CUANDO LAS PARTES EXENTAS HUBIERAN SIDO 
                    ADVERTIDAS DE LA POSIBILIDAD DE DICHOS DAÑOS. EL ÚNICO RECURSO DE LOS USUARIOS ANTE TALES RECLAMOS, DEMANDAS, 
                    IMPUTACIÓN DE RESPONSABILIDADES, CAUSAS LEGALES, QUERELLAS O RECLAMOS DE DAÑOS Y PERJUICIOS ES PONER FIN 
                    AL USO DE ESTA PÁGINA WEB.
                    </p>

                    <p style={{fontSize:20, textAlign:'left',paddingLeft:15, fontWeight:'bold'}}>7) Privacidad</p>
                    <p style={{fontSize:15, textAlign:'left', padding: 15}}>
                    Nuestra política de privacidad en relación a cualquier información obtenida por la Compañía a través 
                    de esta Página web puede consultarse en la sección Políticas de privacidad del Sitio Web de la Compañía. 
                    Pueden tener validez algunas reglas adicionales en materia de privacidad según se establece en las funciones 
                    de esta Página web restringidas para servicios específicos del Usuario.
                    El uso de esta Página web implica la transmisión electrónica de información a través de las redes del 
                    proveedor de servicio inalámbrico. En vista de que la Compañía no opera ni controla las redes inalámbricas 
                    utilizadas para acceder a la Página web, la Compañía no es responsable de la privacidad o seguridad 
                    de las transmisiones inalámbricas de datos. Los Usuarios deberán utilizar proveedores de servicios acreditados 
                    y verificar junto a su proveedor de servicios inalámbricos la información relativa a sus prácticas en materia 
                    de privacidad y seguridad.
                    </p>

                    <p style={{fontSize:20, textAlign:'left',paddingLeft:15, fontWeight:'bold'}}>8) Exclusión de garantía</p>
                    <p style={{fontSize:15, textAlign:'left', padding: 15}}>
                    LAS PARTES EXENTAS NO HACEN MANIFESTACIÓN ALGUNA EN CUANTO A LA FUNCIONALIDAD Y USO DEL CONTENIDO DE ESTA PÁGINA WEB. 
                    EL USO Y NAVEGACIÓN QUE HAGA EL USUARIO CON ESTA PÁGINA WEB ES A RIESGO EXCLUSIVO DEL PROPIO USUARIO. TODA LA 
                    INFORMACIÓN CONTENIDA EN ESTA PÁGINA WEB ES PROPORCIONADA "TAL COMO ESTÁ” Y “SEGÚN ESTÁ DISPONIBLE”, SIN 
                    ASEVERACIONES NI GARANTÍAS, YA SEAN EXPRESAS O TÁCITAS. LOS USUARIOS NO DEBEN ASUMIR QUE LA INFORMACIÓN INCLUIDA 
                    EN ESTA PÁGINA WEB SE ACTUALIZA CONSTANTEMENTE NI QUE INCLUYE INFORMACIÓN RECIENTE.
                    ESTA PÁGINA WEB PODRÁ DEJAR DE FUNCIONAR, SER INTERRUMPIDA O FUNCIONAR INDEBIDAMENTE 
                    DE FORMA OCASIONAL. LAS PARTES EXENTAS NO TIENEN RESPONSABILIDAD 
                    POR DICHO CESE DE FUNCIONAMIENTO, INTERRUPCIÓN O FUNCIONAMIENTO INDEBIDO. LOS USUARIOS QUEDAN ADVERTIDOS 
                    DE QUE LA INFORMACIÓN CONTENIDA AQUÍ PODRÍA CONTENER 
                    ERRORES TÉCNICOS, INEXACTITUDES, ERRORES DE PROGRAMACIÓN, VIRUS DESCONOCIDOS Y OMISIONES. EL USUARIO ASUME
                    TODOS LOS RIESGOS VINCULADOS CON EL USO DE ESTA 
                    PÁGINA WEB, Y ACEPTA QUE LA COMPAÑÍA RENUNCIA A TODA GARANTÍA VINCULADA AL USO DE LA PÁGINA WEB 
                    POR PARTE DEL USUARIO.
                    SIN PERJUICIO DE LO DISPUESTO EN CUALQUIER OTRA CLÁUSULA DE ESTOS TÉRMINOS Y CONDICIONES, LA COMPAÑÍA 
                    RECHAZA TODA MANIFESTACIÓN O GARANTÍA, YA SEA EXPRESA 
                    O TÁCITA, DE TODO TIPO EN REFERENCIA A ESTA PÁGINA WEB (INCLUYENDO NUESTROS PRODUCTOS, SERVICIOS Y 
                    CONTENIDO DEL SITIO) INCLUIDAS, ENTRE OTRAS, 
                    LAS GARANTÍAS DE COMERCIABILIDAD Y APTITUD PARA UN PROPÓSITO EN PARTICULAR, DE GOCE PACÍFICO, TÍTULO, 
                    NO VIOLACIÓN DE LOS DERECHOS DE TERCEROS Y PRECISIÓN. 
                    NINGUNA INFORMACIÓN O ASESORAMIENTO ORAL O ESCRITO DADO POR NOSOTROS O NUESTROS REPRESENTANTES 
                    AUTORIZADOS CREARÁ UNA GARANTÍA NI AUMENTARÁ DE NINGUNA 
                    FORMA EL ALCANCE DE NUESTRAS OBLIGACIONES TAL CUAL SE ESTABLECEN EN ESTOS TÉRMINOS Y CONDICIONES.
                    </p>
                    
                    <p style={{fontSize:20, textAlign:'left',paddingLeft:15, fontWeight:'bold'}}>9) Exoneración</p>
                    <p style={{fontSize:15, textAlign:'left', padding: 15}}>
                    Los Usuarios liberarán de toda responsabilidad y exonerarán a las Partes Exentas de todo reclamo, 
                    demanda, responsabilidad civil, causa legal, querella o daños y perjuicios (incluidos los honorarios 
                    y los gastos razonables de abogados) que surjan como consecuencia del uso que dichos Usuarios hagan 
                    de la Página web (incluidos nuestros productos, servicios y Contenido), incluyendo, entre otros, 
                    la información, contenido o entrega incorrectos de la Página web, o de los productos y servicios 
                    de la Compañía o de terceros. La Compañía se reserva el derecho, por cuenta propia, de asumir la defensa 
                    y el control exclusivos de cualquier asunto sujeto a exoneración por parte de los Usuarios, pero el 
                    hacerlo no exime a los Usuarios de sus obligaciones de exoneración.
                    </p>
                    
                    <p style={{fontSize:20, textAlign:'left',paddingLeft:15, fontWeight:'bold'}}>10) Idioma prevaleciente</p>
                    <p style={{fontSize:15, textAlign:'left', padding: 15}}>
                    En el caso de que existiera alguna inconsistencia, ambigüedad o conflicto entre la versión en español de estos 
                    Términos y Condiciones y las traducidas a otros idiomas, la versión en 
                    español prevalecerá sobre el resto.
                    </p>
                </div>
                </MDBRow>
            </MDBContainer>
            <Footer />
        </div>
    );
  }
}
