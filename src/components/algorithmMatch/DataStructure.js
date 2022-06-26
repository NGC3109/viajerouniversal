import React from 'react'

const DataStructure = (props) => {
    let match = 0
    let dismatch = 0
    let arrMatch = []
    for (let index = 0; index < props.data.length; index++) {
      const element = props.data[index];
      let ageUser = props.calculateAge(element.FECHA_NACIMIENTO)
      // CONFORMACION DEL EQUIPO, M-F-MIXTO
      if(props.userLoad[0].EL_GRUPO_QUE_QUIERE_SOLO_HOMBRES_MUJERES_O_MIXTO !== 'MIXTO'){
        if(props.userLoad[0].EL_GRUPO_QUE_QUIERE_SOLO_HOMBRES_MUJERES_O_MIXTO === element.SEXO){
          match++
        }else{
          dismatch++
        }
      }else{
        match++
      }
      // DESDE DONDE QUIERE CONOCER
      if(props.userLoad[0].DESDE_DONDE_QUIERE_CONOCER === element.DESDE_DONDE_QUIERE_CONOCER){
        match++
      }else{
        dismatch++
      }
      // HASTA DONDE QUIERE CONOCER (REGIONES)
      if(props.userLoad[0].HASTA_DONDE_QUIERE_CONOCER === element.HASTA_DONDE_QUIERE_CONOCER){
        match++
      }else{
        dismatch++
      }
      // RANGO DE EDAD
      if(props.userLoad[0].RANGO_DE_EDAD_QUE_DESEA_ENCONTRAR_COMPANEROS_MIN < ageUser && ageUser < props.userLoad[0].RANGO_DE_EDAD_QUE_DESEA_ENCONTRAR_COMPANEROS_MAX){
        match++
      }else{
        dismatch++
      }
      // CAPACIDAD DEL GRUPO
      if(props.userLoad[0].MAXIMA_CAPACIDAD_DE_TU_GRUPO === element.MAXIMA_CAPACIDAD_DE_TU_GRUPO){
        match++
      }else if(parseInt(props.userLoad[0].MAXIMA_CAPACIDAD_DE_TU_GRUPO) === (parseInt(element.MAXIMA_CAPACIDAD_DE_TU_GRUPO) + 1)){
        match++
      }else if(parseInt(props.userLoad[0].MAXIMA_CAPACIDAD_DE_TU_GRUPO) === (parseInt(element.MAXIMA_CAPACIDAD_DE_TU_GRUPO) - 1)){
        match++
      }else{
        dismatch++
      }
      // TIEMPO QUE DURARA EL VIAJE
      if(props.userLoad[0].CUANTO_TIEMPO_QUIEREN_VIAJAR === element.CUANTO_TIEMPO_QUIEREN_VIAJAR){
        match++
      }else{
        dismatch++
      }
      // TIPO DE ALOJAMIENTO
      if(props.userLoad[0].SOLO_CARPA_HOSTAL_HOTEL_O_MIXTO === element.SOLO_CARPA_HOSTAL_HOTEL_O_MIXTO){
        match++
      }else{
        dismatch++
      }
      
      arrMatch.push({
        nombre: element.NOMBRE,
        match,
        dismatch
      })
      dismatch = 0
      match = 0
      console.log(arrMatch)
    }
    return(
        <table>
            <thead>
                <tr> 
                    <th>Nombre</th>
                    <th>Match</th>
                    <th>Dismatch</th>
                </tr> 
            </thead>
            <tbody>
            {
            arrMatch.map((item, index) => 
            <tr key={index}>
                <td>{item.nombre}</td>
                <td>{item.match}</td>
                <td>{item.dismatch}</td>
            </tr> 
            )}
            </tbody>
        </table>
    )
  }

  export default DataStructure;