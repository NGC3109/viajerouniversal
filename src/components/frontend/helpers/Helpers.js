import firebaseApp from './Firebase'

class Helpers {
    static createNewDestiny(obj, callback){
        let userNamePath = "/contenido/destinos/"
        const postKey = firebaseApp.database().ref(userNamePath).push(obj).key;
        callback(postKey)
    }
    static createLikesDestiny(idUser, idDestino, state){
        let userNamePath = "/contenido/destinos/" + idDestino + "/likes/" + idUser
        return firebaseApp.database().ref(userNamePath).set(state)
    }
    static deleteLikesDestiny(idUser, idDestino, state){
        let userNamePath = "/contenido/destinos/" + idDestino + "/likes/" + idUser
        let userLike = firebaseApp.database().ref(userNamePath)
        return userLike.remove()
    }
    static createNewPublic(obj, callback){
        let userNamePath = "/contenido/publicaciones/"
        const postKey = firebaseApp.database().ref(userNamePath).push(obj).key;
        callback(postKey)
    }
    static createNewContact(obj, need, callback){
        let userNamePath = "/contenido/contacto/" + need + "/"
        const postKey = firebaseApp.database().ref(userNamePath).push(obj).key;
        callback(postKey)
    }
    static createNewColaborativo(obj, callback){
        let userNamePath = "/contenido/colaborativo/"
        const postKey = firebaseApp.database().ref(userNamePath).push(obj).key;
        callback(postKey)
    }
    static createNewActivity(obj, callback){
        let userNamePath = "/contenido/actividades/"
        const postKey = firebaseApp.database().ref(userNamePath).push(obj).key;
        callback(postKey)
    }
    static createNewHospedaje(obj, callback){
        let userNamePath = "/contenido/hospedajes/"
        const postKey = firebaseApp.database().ref(userNamePath).push(obj).key;
        callback(postKey)
    }
    static createNewComment(obj){
        let userNamePath = "/contenido/comments/"
        return firebaseApp.database().ref(userNamePath).push(obj);
    }
    static setJoinGroup(idUsuarioGet, idUsuarioSend, idPublic, obj, objAcepted, callback){
        firebaseApp.database().ref("/contenido/user/"+ idUsuarioGet + "/notificaciones/grupos/" + idUsuarioGet).set(objAcepted);
        firebaseApp.database().ref("/contenido/user/"+ idUsuarioGet + "/notificaciones/general/history").push(objAcepted);
        firebaseApp.database().ref("/contenido/user/"+ idUsuarioGet + "/notificaciones/general/count").push(objAcepted);
        firebaseApp.database().ref("/contenido/publicaciones/" + idPublic + "/solicitudes/" + idUsuarioSend).set(obj);
        callback(1)
    }
    static getPublicaciones(callback){
        const Publicaciones = firebaseApp.database().ref("/contenido/publicaciones/")
        const Usuarios = firebaseApp.database().ref("/contenido/user/")
        let arrayOfServices = []
        Publicaciones.on('value', function (snapshot) {
            let data = snapshot.val(); // line 1 (results like 1,2,3,4,5,6)
            arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let cupos_pasajeros = obj.cupos_pasajeros
                    let descripcion = obj.descripcion
                    let destino_final = obj.destino_final
                    let f_salida = obj.f_salida
                    let hora_salida = obj.hora_salida
                    let id = key
                    let idUsuario = obj.idUsuario
                    let lugar_inicio = obj.lugar_inicio
                    let mascotas = obj.mascotas
                    let requisitos = obj.requisitos
                    let tiempo_viaje = obj.tiempo_viaje
                    let titulo = obj.titulo
                    let url_portada = obj.url_portada
                    let gastos = obj.gastos
                    let estado = obj.estado
                    let timeViaje = obj.timeViaje
                    let fecha_publicacion = obj.fecha_publicacion
                    let estado_viaje = obj.estado_viaje
                    
                    idUsuario = obj.idUsuario
                    // eslint-disable-next-line no-loop-func
                    Usuarios.child(idUsuario).once('value', function(mediaSnap) {
                        let mediaS = mediaSnap.val();
                        if(mediaS){
                            let autor = mediaS.name
                            let url_user = mediaS.url
                            arrayOfServices.push({
                                cupos_pasajeros,
                                descripcion,
                                destino_final,
                                f_salida,
                                hora_salida,
                                id,
                                idUsuario,
                                lugar_inicio,
                                mascotas,
                                requisitos,
                                tiempo_viaje,
                                titulo,
                                url_portada,
                                autor,
                                gastos,
                                estado,
                                timeViaje,
                                fecha_publicacion,
                                estado_viaje,
                                url_user
                            })
                        }
                        arrayOfServices.sort(function(a, b){return a - b});
                        callback(arrayOfServices)
                    });             
                    
                }
            }
        });
    }
    static sortedDestinos(idRegion, uid, callback) {
        let arrayOfServices = []
        firebaseApp.database().ref('/contenido/destinos').orderByChild('idRegion').equalTo(idRegion).on('value',(snapshot)=>{
            let data = snapshot.val();
            arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.nombre
                    let thumbnail = obj.thumbnail
                    let id = key
                    let region = obj.region
                    let descripcion = obj.descripcion
                    let estado = obj.estado
                    let likes = obj.likes || null
                    let youStatus = 0
                    if(likes !== null){
                        if(Object.keys(likes).indexOf(uid) > -1){
                            youStatus = 1
                        }
                    }
                    arrayOfServices.push({
                        name,
                        thumbnail,
                        id,
                        region,
                        descripcion,
                        estado,
                        likes,
                        youStatus
                    })
                }
            }
            callback(arrayOfServices);
        });
    }
    static sortedDestinosForRegionSearch(idDestino, uid, callback) {
        let arrayOfServices = []
        firebaseApp.database().ref('/contenido/destinos/' + idDestino).on('value',(snapshot)=>{
            let data = snapshot.val();
            arrayOfServices = []
            if(data){
                    let name = data.nombre
                    let thumbnail = data.thumbnail
                    let id = idDestino
                    let region = data.region
                    let descripcion = data.descripcion
                    let estado = data.estado
                    let likes = data.likes || null
                    let youStatus = 0
                    if(likes !== null){
                        if(Object.keys(likes).indexOf(uid) > -1){
                            youStatus = 1
                        }
                    }
                    arrayOfServices.push({
                        name,
                        thumbnail,
                        id,
                        region,
                        descripcion,
                        estado,
                        likes,
                        youStatus
                    })
            }
            callback(arrayOfServices);
        });
    }
    
    static getSortedHospedajesByDestinos(dataObj, callback) {
        let arrayOfServices = []
        firebaseApp.database().ref('/contenido/hospedajes/').orderByChild("fecha_publicacion").on('value', (snapshot) => {
            let data = snapshot.val();
            arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let destinos = obj.destinos
                    let name = obj.nombre
                    let id = key
                    let region = obj.region
                    let descripcion = obj.descripcion
                    let idUsuario = obj.idUsuario
                    let estado = obj.estado
                    let thumbnail = obj.thumbnail
                    if(dataObj.length !== 0){
                        for(let k in destinos){
                            for(let index in dataObj){
                                if(destinos[k].value === dataObj[index].value){
                                    arrayOfServices.push({
                                        name,
                                        id,
                                        region,
                                        descripcion,
                                        idUsuario,
                                        estado,
                                        thumbnail
                                    })
                                }
                            }
                        }
                    }else{
                        arrayOfServices.push({
                            name,
                            id,
                            region,
                            descripcion,
                            idUsuario,
                            estado,
                            thumbnail
                        })
                    }
                }
            }
            var flags = [], output = [], l = arrayOfServices.length, i;
            for( i=0; i<l; i++) {
                if( flags[arrayOfServices[i].id]) continue;
                flags[arrayOfServices[i].id] = true;
                output.push({
                    name: arrayOfServices[i].name,
                    id: arrayOfServices[i].id,
                    region: arrayOfServices[i].region,
                    descripcion: arrayOfServices[i].descripcion,
                    idUsuario: arrayOfServices[i].idUsuario,
                    estado: arrayOfServices[i].estado,
                    thumbnail: arrayOfServices[i].thumbnail,
                });
            }
            callback(output);
        });
    }
    static getHospedajeByActivity(idActividad, callback) {
        let arrayOfServices = []
        firebaseApp.database().ref('/contenido/hospedajes/').orderByChild("fecha_publicacion").on('value', (snapshot) => {
            let data = snapshot.val();
            arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.nombre
                    let id = key
                    let region = obj.region
                    let descripcion = obj.descripcion
                    let idUsuario = obj.idUsuario
                    let estado = obj.estado
                    let thumbnail = obj.thumbnail
                    let actividades = obj.actividades
                    for(let index in actividades){
                        if(actividades[index].id === idActividad){
                            arrayOfServices.push({
                                name,
                                id,
                                region,
                                descripcion,
                                idUsuario,
                                estado,
                                thumbnail
                            })
                        }
                    }
                }
            }
            callback(arrayOfServices);
        });
    }
    static getHospedajeByDestino(idDestino, callback) {
        let arrayOfServices = []
        firebaseApp.database().ref('/contenido/hospedajes/').orderByChild("fecha_publicacion").on('value', (snapshot) => {
            let data = snapshot.val();
            arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.nombre
                    let thumbnail = obj.thumbnail
                    let id = key
                    let region = obj.region
                    let descripcion = obj.descripcion
                    let estado = obj.estado
                    let tipo_hospedaje = obj.tipo_hospedaje
                    let precio = obj.precio
                    let max_huespedes = obj.max_huespedes
                    let camas = obj.camas
                    let wc = obj.wc
                    let habitaciones = obj.habitaciones
                    let destinos = obj.destinos
                    let idUsuario = obj.idUsuario
                    for(let index in destinos){
                        if(destinos[index].value === idDestino){
                            arrayOfServices.push({
                                name,
                                thumbnail,
                                id,
                                region,
                                descripcion,
                                estado,
                                tipo_hospedaje,
                                precio,
                                max_huespedes,
                                camas,
                                habitaciones,
                                wc,
                                idUsuario,
                                destinos
                            })
                        }
                    }
                }
            }
            callback(arrayOfServices);
        });
    }
    
    static getDestinosByHospedaje(dataObj, callback) {
        if(dataObj !== null){
            let arrayOfServices = []
            firebaseApp.database().ref('/contenido/destinos/').orderByChild("fecha_publicacion").on('value', (snapshot) => {
                let data = snapshot.val();
                arrayOfServices = []
                if(data){
                    for(let key in data){
                        let obj = data[key]
                        let name = obj.nombre
                        let thumbnail = obj.thumbnail
                        let id = key
                        let region = obj.region
                        let descripcion = obj.descripcion
                        let estado = obj.estado
                        if(dataObj.length !== 0){
                            for(let index in dataObj){
                                if(id === dataObj[index].value){
                                    arrayOfServices.push({
                                        name,
                                        thumbnail,
                                        id,
                                        region,
                                        descripcion,
                                        estado
                                    })
                                }
                            }
                        }
                    }
                }
                callback(arrayOfServices);
            });
        }
    }

    static getActivitiesByHospedaje(dataObj, callback) {
        if(dataObj !== null){
            let arrayOfServices = []
            firebaseApp.database().ref('/contenido/actividades/').orderByChild("fecha_publicacion").on('value', (snapshot) => {
                let data = snapshot.val();
                arrayOfServices = []
                if(data){
                    for(let key in data){
                        let obj = data[key]
                        let name = obj.nombre
                        let thumbnail = obj.thumbnail
                        let id = key
                        let region = obj.region
                        let descripcion = obj.descripcion
                        let estado = obj.estado
                        if(dataObj.length !== 0){
                            for(let index in dataObj){
                                if(id === dataObj[index].value){
                                    arrayOfServices.push({
                                        name,
                                        thumbnail,
                                        id,
                                        region,
                                        descripcion,
                                        estado
                                    })
                                }
                            }
                        }
                    }
                }
                callback(arrayOfServices);
            });
        }
    }
    
    static sortedActivitiesForRegion(idRegion, idExperiencia, callback) {
        let arrayOfServices = []
        if(idExperiencia !== undefined && idExperiencia !== "0"){
            firebaseApp.database().ref('/contenido/actividades').orderByChild('idRegion').equalTo(idRegion).on('value',(snapshot)=>{
                let data = snapshot.val();
                arrayOfServices = []
                if(data){
                    for(let key in data){
                        let obj = data[key]
                        let titulo = obj.nombre
                        let thumbnail = obj.thumbnail
                        let id = key
                        let region = obj.region
                        let descripcion = obj.descripcion
                        let estado = obj.estado
                        let idServicio = obj.idServicio
                        if(idExperiencia === idServicio){
                            arrayOfServices.push({
                                titulo,
                                thumbnail,
                                id,
                                region,
                                descripcion,
                                estado
                            })
                        }
                    }
                }
                callback(arrayOfServices);
            });
        }else{
            firebaseApp.database().ref('/contenido/actividades').orderByChild('idRegion').equalTo(idRegion).on('value',(snapshot)=>{
                let data = snapshot.val();
                arrayOfServices = []
                if(data){
                    for(let key in data){
                        let obj = data[key]
                        let titulo = obj.nombre
                        let thumbnail = obj.thumbnail
                        let id = key
                        let region = obj.region
                        let descripcion = obj.descripcion
                        let estado = obj.estado
                        arrayOfServices.push({
                            titulo,
                            thumbnail,
                            id,
                            region,
                            descripcion,
                            estado
                        })
                    }
                }
                callback(arrayOfServices);
            });
        }
        
    }
    static sortedActivitiesForExperiencia(idRegionValue, idExperiencia, callback) {
        let arrayOfServices = []
        if(idRegionValue !== undefined && idRegionValue !== "0"){
            firebaseApp.database().ref('/contenido/actividades').orderByChild('idServicio').equalTo(idExperiencia).on('value',(snapshot)=>{
                let data = snapshot.val();
                arrayOfServices = []
                if(data){
                    for(let key in data){
                        let obj = data[key]
                        let titulo = obj.nombre
                        let thumbnail = obj.thumbnail
                        let id = key
                        let region = obj.region
                        let descripcion = obj.descripcion
                        let estado = obj.estado
                        let idRegion = obj.idRegion
                        if(idRegionValue === idRegion){
                            arrayOfServices.push({
                                titulo,
                                thumbnail,
                                id,
                                region,
                                descripcion,
                                estado
                            })
                        }
                    }
                }
                callback(arrayOfServices);
            });
        }else{
            firebaseApp.database().ref('/contenido/actividades').orderByChild('idServicio').equalTo(idExperiencia).on('value',(snapshot)=>{
                let data = snapshot.val();
                arrayOfServices = []
                if(data){
                    for(let key in data){
                        let obj = data[key]
                        let titulo = obj.nombre
                        let thumbnail = obj.thumbnail
                        let id = key
                        let region = obj.region
                        let descripcion = obj.descripcion
                        let estado = obj.estado
                        arrayOfServices.push({
                            titulo,
                            thumbnail,
                            id,
                            region,
                            descripcion,
                            estado
                        })
                    }
                }
                callback(arrayOfServices);
            });
        }
        
    }
    static getPublicacionesUser(idUser, callback) {
        let arrayOfServices = []
        firebaseApp.database().ref('/contenido/publicaciones').orderByChild('idUsuario').equalTo(idUser).on('value',(snapshot)=>{
            let data = ""
            data = snapshot.val();
            arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let url_portada = obj.url_portada
                    let estado = obj.estado
                    let titulo = obj.titulo
                    let estado_viaje = obj.estado_viaje
                    let id = key
                    arrayOfServices.push({
                        url_portada,
                        estado,
                        id,
                        estado_viaje,
                        titulo
                    })
                }
            }
            callback(arrayOfServices);
        });
    }
    static getHospedajesUser(idUser, callback) {
        let arrayOfServices = []
        firebaseApp.database().ref('/contenido/hospedajes').orderByChild('idUsuario').equalTo(idUser).on('value',(snapshot)=>{
            let data = ""
            data = snapshot.val();
            arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let thumbnail = obj.thumbnail
                    let estado = obj.estado
                    let id = key
                    arrayOfServices.push({
                        thumbnail,
                        estado,
                        id
                    })
                }
            }
            callback(arrayOfServices);
        });
    }
    
    static getDestinosUser(idUser, callback) {
        let arrayOfServices = []
        firebaseApp.database().ref('/contenido/destinos').orderByChild('idUsuario').equalTo(idUser).limitToLast(30).on('value',(snapshot)=>{
            let data = snapshot.val();
            arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let url_portada = obj.url
                    let estado = obj.estado
                    let id = key
                    let thumbnail = obj.thumbnail
                    arrayOfServices.push({
                        url_portada,
                        estado,
                        id,
                        thumbnail
                    })
                }
            }
            callback(arrayOfServices);
        });
    }
    static getActividadesUser(idUser, callback) {
        let arrayOfServices = []
        firebaseApp.database().ref('/contenido/actividades').orderByChild('idUsuario').equalTo(idUser).on('value',(snapshot)=>{
            let data = snapshot.val();
            arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let url_portada = obj.url
                    let estado = obj.estado
                    let id = key
                    arrayOfServices.push({
                        url_portada,
                        estado,
                        id
                    })
                }
            }
            callback(arrayOfServices);
        });
    }
    
    static getColaborativosUser(idUser, callback) {
        let arrayOfServices = []
        firebaseApp.database().ref('/contenido/colaborativo').orderByChild('idUsuario').equalTo(idUser).on('value',(snapshot)=>{
            let data = snapshot.val();
            arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let url_portada = obj.url
                    let estado = obj.estado
                    let id = key
                    arrayOfServices.push({
                        url_portada,
                        estado,
                        id
                    })
                }
            }
            callback(arrayOfServices);
        });
    }
    static uploadImageUser(file, idUser, callback){
        const User = firebaseApp.database().ref("/contenido/user/" + idUser + "/url")
        const Thumb = firebaseApp.database().ref("/contenido/user/" + idUser + "/thumbnail")
        const storageRef = firebaseApp.storage().ref(`user/${file.name}`)
        const task = storageRef.put(file)
        task.on('state_changed', (snapshot) => {
            const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
            callback(progress)
        }, (error) => {
            console.error(error.message)
        }, () => {
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                User.set(downloadURL)
                Thumb.set(downloadURL)
            });
        })
    }
    static uploadImageHospedaje(file, idHospedaje, callback){
        const User = firebaseApp.database().ref("/contenido/hospedajes/" + idHospedaje + "/url")
        const Thumb = firebaseApp.database().ref("/contenido/hospedajes/" + idHospedaje + "/thumbnail")
        const storageRef = firebaseApp.storage().ref(`hospedajes/${file.name}`)
        const task = storageRef.put(file)
        task.on('state_changed', (snapshot) => {
            const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
            callback(progress)
        }, (error) => {
            console.error(error.message)
        }, () => {
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                User.set(downloadURL)
                Thumb.set(downloadURL)
            });
        })
    }
    
    static uploadImageActivities(file, idActividad, callback){
        const User = firebaseApp.database().ref("/contenido/actividades/" + idActividad + "/url")
        const Thumb = firebaseApp.database().ref("/contenido/actividades/" + idActividad + "/thumbnail")
        const storageRef = firebaseApp.storage().ref(`actividades/${file.name}`)
        const task = storageRef.put(file)
        task.on('state_changed', (snapshot) => {
            const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
            callback(progress)
        }, (error) => {
          console.error(error.message)
        }, () => {
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                User.set(downloadURL)
                Thumb.set(downloadURL)
            });
        })
    }
    
    static uploadImageDestinos(file, idDestino, callback){
        const User = firebaseApp.database().ref("/contenido/destinos/" + idDestino + "/url")
        const Thumb = firebaseApp.database().ref("/contenido/destinos/" + idDestino + "/thumbnail")
        const storageRef = firebaseApp.storage().ref(`destinos/destinos_${idDestino}_0_${file.name}`)
        const task = storageRef.put(file)
        task.on('state_changed', (snapshot) => {
            const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
            callback(progress)
        }, (error) => {
          console.error(error.message)
        }, () => {
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                User.set(downloadURL)
                Thumb.set(downloadURL)
            });
        })
    }
    static uploadImage(file, idPublic, callback){
        const Publicaciones = firebaseApp.database().ref("/contenido/publicaciones/" + idPublic + "/url_portada")
        const Thumb = firebaseApp.database().ref("/contenido/publicaciones/" + idPublic + "/thumbnail")
        const storageRef = firebaseApp.storage().ref(`publicaciones/publicaciones_${idPublic}_0_${file.name}`)
        const task = storageRef.put(file)
        task.on('state_changed', (snapshot) => {
            const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
            callback(progress)
        }, (error) => {
          console.error(error.message)
        }, () => {
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                Publicaciones.set(downloadURL)
                Thumb.set(downloadURL)
            });
        })
    }
    static uploadImageActividadesGal(file, idActividad, item, callback){
        const Publicaciones = firebaseApp.database().ref("/contenido/actividades/" + idActividad + "/galeria/" + item)
        const splitItem = item.split("_")
        const storageRef = firebaseApp.storage().ref(`actividades/actividades_${idActividad}_galeria_${splitItem[0]} ${splitItem[1]}_${file.name}`)
        const task = storageRef.put(file)
        task.on('state_changed', (snapshot) => {
            const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
            callback(progress)
        }, (error) => {
          console.error(error.message)
        }, () => {
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                Publicaciones.set(downloadURL)
            });
        })
    }
    static uploadImageDestinosGal(file, idDestino, item, callback){
        const Publicaciones = firebaseApp.database().ref("/contenido/destinos/" + idDestino + "/galeria/" + item)
        const splitItem = item.split("_")
        const storageRef = firebaseApp.storage().ref(`destinos/destinos_${idDestino}_galeria_${splitItem[0]} ${splitItem[1]}_${file.name}`)
        const task = storageRef.put(file)
        task.on('state_changed', (snapshot) => {
            const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
            callback(progress)
        }, (error) => {
          console.error(error.message)
        }, () => {
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                Publicaciones.set(downloadURL)
            });
        })
    }
    static uploadImageContact(file, idContact, need, item, callback){
        const Contacto = firebaseApp.database().ref("/contenido/contacto/" + need + "/" + idContact + "/" + item)
        const storageRef = firebaseApp.storage().ref(`contacto/${file.name}`)
        const task = storageRef.put(file)
        task.on('state_changed', (snapshot) => {
            const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
            callback(progress)
        }, (error) => {
          console.error(error.message)
        }, () => {
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                Contacto.set(downloadURL)
            });
        })
    }
    
    static uploadImageHospedajeGal(file, idHospedaje, item, callback){
        const Publicaciones = firebaseApp.database().ref("/contenido/hospedajes/" + idHospedaje + "/galeria/" + item)
        const splitItem = item.split("_")
        const storageRef = firebaseApp.storage().ref(`hospedajes/hospedajes_${idHospedaje}_galeria_${splitItem[0]} ${splitItem[1]}_${file.name}`)
        const task = storageRef.put(file)
        task.on('state_changed', (snapshot) => {
            const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
            callback(progress)
        }, (error) => {
          console.error(error.message)
        }, () => {
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                Publicaciones.set(downloadURL)
            });
        })
    }
    static getInscripcionesGroup(idUsuario, callback){
        const Publicaciones = firebaseApp.database().ref("/contenido/publicaciones/")
        let arrayOfServices = []
        Publicaciones.on('value', function (snapshot) {
            let data = snapshot.val();
            arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let integrantes = obj.integrantes || null
                    let solicitudes = obj.solicitudes || null
                    let cupos_pasajeros = obj.cupos_pasajeros
                    let titulo = obj.titulo
                    let url_portada = obj.url_portada
                    let id = key
                    let estado_viaje = obj.estado_viaje
                    let estado = obj.estado
                    let descripcion = obj.descripcion
                    let destino_final = obj.destino_final
                    let lugar_inicio = obj.lugar_inicio
                    let idUserMaster = obj.idUsuario
                    
                    if(integrantes !== null){
                        // eslint-disable-next-line no-loop-func
                        Object.values(integrantes).map((item) => 
                            idUsuario === item.idUsuario ?
                                firebaseApp.database().ref("/contenido/user/" + idUserMaster).on('value', function(snapshot2) {
                                    let data2 = snapshot2.val();
                                    if(data2){
                                        let url_user = data2.url
                                        let name_user = data2.name
                                        arrayOfServices.push({
                                            integrantes,
                                            solicitudes,
                                            cupos_pasajeros,
                                            titulo,
                                            url_portada,
                                            id,
                                            estado_viaje,
                                            estado,
                                            descripcion,
                                            url_user,
                                            name_user,
                                            idUsuario: idUserMaster,
                                            lugar_inicio,
                                            destino_final
                                        })
                                        callback(arrayOfServices)
                                    }
                                })
                            : null
                       )
                    }
                }
            }
        });
    }

    // static test2(idUsuario, callback){
    //     const Publicaciones = firebaseApp.database().ref("/contenido/publicaciones/")
    //     // var Integrantes = ""
    //     let arrayOfServices = []
    //     let arrayOfUser = []
    //     Publicaciones.on('value', function (snapshot) {
    //         let data = snapshot.val();
    //         arrayOfServices = []
    //         if(data){
    //             for(let key in data){
    //                 let obj = data[key]
    //                 let integrantes = obj.integrantes || null
    //                 let solicitudes = obj.solicitudes || null
    //                 let cupos_pasajeros = obj.cupos_pasajeros
    //                 let titulo = obj.titulo
    //                 let url_portada = obj.url_portada
    //                 let id = key
    //                 let estado_viaje = obj.estado_viaje
    //                 let estado = obj.estado
    //                 let descripcion = obj.descripcion
    //                 let idUserMaster = obj.idUsuario
    //                 if(idUsuario === idUserMaster){
    //                     if(integrantes !== null){
    //                         Object.values(integrantes).map((item) => 
    //                                 firebaseApp.database().ref("/contenido/user/" + item.idUsuario).on('value', function(snapshot2) {
    //                                     let data2 = snapshot2.val();
    //                                     if(data2){
    //                                         let obj = [{"data2": {name: data2.name}}]
    //                                         arrayOfUser.push({
    //                                             obj
    //                                         })
    //                                     }
    //                                 })
    //                         )
    //                         arrayOfServices.push({
    //                             integrantes,
    //                             solicitudes,
    //                             cupos_pasajeros,
    //                             titulo,
    //                             url_portada,
    //                             id,
    //                             estado_viaje,
    //                             estado,
    //                             descripcion,
    //                             arrayOfUser
    //                         })
    //                     }else{
    //                         arrayOfServices.push({
    //                             integrantes,
    //                             solicitudes,
    //                             cupos_pasajeros,
    //                             titulo,
    //                             url_portada,
    //                             id,
    //                             estado_viaje,
    //                             estado,
    //                             descripcion,
    //                             arrayOfUser: null
    //                         })
    //                     }
                        
    //                 }
                    
    //             }
    //             callback(arrayOfServices)
    //         }
    //     });
    // }
    static getPublicacionesDetail(idPublic, callback){
        const Publicaciones = firebaseApp.database().ref("/contenido/publicaciones/" + idPublic)
        const Usuarios = firebaseApp.database().ref("/contenido/user/")
        let arrayOfServices = []
        Publicaciones.on('value', function (snapshot) {
            let data = snapshot.val(); // line 1 (results like 1,2,3,4,5,6)
            if(data){
                let obj = data
                let cupos_pasajeros = obj.cupos_pasajeros
                let descripcion = obj.descripcion
                let destino_final = obj.destino_final
                let f_salida = obj.f_salida
                let hora_salida = obj.hora_salida
                let idUsuario = obj.idUsuario
                let lugar_inicio = obj.lugar_inicio
                let mascotas = obj.mascotas
                let requisitos = obj.requisitos
                let tiempo_viaje = obj.tiempo_viaje
                let titulo = obj.titulo
                let url_portada = obj.url_portada
                let gastos = obj.gastos
                let facebook = obj.facebook
                let instagram = obj.instagram
                let whatsapp = obj.whatsapp
                let timeViaje = obj.timeViaje
                let estado = obj.estado
                let hijos = obj.hijos
                let estado_viaje = obj.estado_viaje
                let gastos_generales = obj.gastos_generales
                let meridiano = obj.meridiano
                let desde_edad = obj.desde_edad
                let hasta_edad = obj.hasta_edad

                let integrantes = obj.integrantes || null

                Usuarios.child(idUsuario).once('value', function(mediaSnap) {
                    let mediaS = mediaSnap.val();
                    if(mediaS){
                        let autor = mediaS.name
                        arrayOfServices.push({
                            cupos_pasajeros,
                            descripcion,
                            destino_final,
                            f_salida,
                            hora_salida,
                            idUsuario,
                            lugar_inicio,
                            mascotas,
                            requisitos,
                            tiempo_viaje,
                            titulo,
                            url_portada,
                            autor,
                            gastos,
                            facebook,
                            instagram,
                            whatsapp,
                            timeViaje,
                            estado,
                            hijos,
                            gastos_generales,
                            estado_viaje,
                            meridiano,
                            integrantes,
                            desde_edad,
                            hasta_edad
                        })
                    }
                    callback(arrayOfServices[0])
                });
            }
        });
    }
    static getStatusUserPublicDetail(idUser, idPublic, callback){
        const Publicaciones = firebaseApp.database().ref("/contenido/publicaciones/" + idPublic + "/integrantes/" + idUser)
        Publicaciones.on('value', function (snapshot) {
            let data = snapshot.val(); // line 1 (results like 1,2,3,4,5,6)
            if(data){
                let obj = data
                let acepted = obj.acepted
                callback(acepted)
            }
        });
    }
    static getStatusSolicitudUserPublicDetail(idUser, idPublic, callback){
        const Publicaciones = firebaseApp.database().ref("/contenido/publicaciones/" + idPublic + "/solicitudes/" + idUser)
        Publicaciones.on('value', function (snapshot) {
            let data = snapshot.val(); // line 1 (results like 1,2,3,4,5,6)
            if(data){
                let obj = data
                let acepted = obj.acepted
                callback(acepted)
            }
        });
    }
    static getColaborativos(callback){
        let userNamePath = "/contenido/colaborativo/"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let data = snapshot.val()
            let arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let titulo = obj.titulo//
                    let url = obj.url//
                    let id = key//
                    let descripcion = obj.descripcion//
                    let idUsuario = obj.idUsuario
                    let facebook = obj.facebook
                    let instagram = obj.instagram
                    let whatsapp = obj.whatsapp
                    let maxDias = obj.maxDias//
                    let cupos_huespedes = obj.cupos_huespedes//
                    let requisito_genero = obj.requisito_genero
                    let estado = obj.estado //CERRADO - ABIERTO
                    let sectorGente = obj.sectorGente //LUGAR DE DONDE ACEPTAS EL VISITANTE
                    let lugar_propiedad = obj.lugar_propiedad
                    arrayOfServices.push({
                        id,
                        titulo,
                        descripcion,
                        url,
                        maxDias,
                        cupos_huespedes,
                        requisito_genero,
                        facebook,
                        instagram,
                        whatsapp,
                        idUsuario,
                        estado,
                        sectorGente,
                        lugar_propiedad
                    })
                }
            }
            arrayOfServices.sort(function(a, b){return a - b});
            callback(arrayOfServices)
        })
    }
    static getActivities(limit, callback){
        let userNamePath = "/contenido/actividades/"
        firebaseApp.database().ref(userNamePath).limitToFirst(limit).on('value', (snapshot) => {
            let data = ""
            data = snapshot.val()
            let arrayOfServices = [] 
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let titulo = obj.nombre
                    let thumbnail = obj.thumbnail
                    let id = key
                    let region = obj.region
                    let descripcion = obj.descripcion
                    let estado = obj.estado
                    arrayOfServices.push({
                        titulo,
                        thumbnail,
                        id,
                        region,
                        descripcion,
                        estado
                    })
                }
            }
            arrayOfServices.sort(function(a, b){return a - b});
            callback(arrayOfServices)
        })
    }
    static getDestiny(callback){
        let userNamePath = "/contenido/destinos/"
        firebaseApp.database().ref(userNamePath).orderByChild("fecha_publicacion").on('value', (snapshot) => {
            let data = ""
            data = snapshot.val()
            let arrayOfServices = [] 
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.nombre
                    let thumbnail = obj.thumbnail
                    let id = key
                    let region = obj.region
                    let descripcion = obj.descripcion
                    let estado = obj.estado
                    let likes = obj.likes || null
                    arrayOfServices.push({
                        name,
                        thumbnail,
                        id,
                        region,
                        descripcion,
                        estado,
                        likes
                    })
                }
            }
            arrayOfServices.sort(function(a, b){return a - b});
            callback(arrayOfServices)
        })
    }
    static getDestiny2Test(limit, uid, callback){
        let userNamePath = "/contenido/destinos/"
        const Destinos = firebaseApp.database().ref(userNamePath).limitToFirst(limit)
        Destinos.on('value', (snapshot) => {
            let data = ""
            data = snapshot.val()
            let arrayOfServices = [] 
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.nombre
                    let thumbnail = obj.thumbnail
                    let id = key
                    let region = obj.region
                    let descripcion = obj.descripcion
                    let estado = obj.estado
                    let likes = obj.likes || null
                    let youStatus = 0
                    if(likes !== null){
                        if(Object.keys(likes).indexOf(uid) > -1){
                            youStatus = 1
                        }
                    }
                    arrayOfServices.push({
                        name,
                        thumbnail,
                        id,
                        region,
                        descripcion,
                        estado,
                        likes,
                        youStatus
                    })
                }
            }
            arrayOfServices.sort(function(a, b){return a - b});
            callback(arrayOfServices)
        })
    }
    static getTopDestiny(callback){
        let userNamePath = "/contenido/tops/destinos/"
        const Destinos = firebaseApp.database().ref(userNamePath).orderByChild("position")
        Destinos.on('value', (snapshot) => {
            let data = snapshot.val()
            let arrayOfServices = [] 
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.nombre
                    let thumbnail = obj.thumbnail
                    let id = key
                    arrayOfServices.push({
                        name,
                        thumbnail,
                        id
                    })
                }
            }
            callback(arrayOfServices)
        })
    }
    static getTopGroup(callback){
        let userNamePath = "/contenido/tops/grupos/"
        const Destinos = firebaseApp.database().ref(userNamePath).orderByChild("position")
        Destinos.on('value', (snapshot) => {
            let data = snapshot.val()
            let arrayOfServices = [] 
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.nombre
                    let thumbnail = obj.thumbnail
                    let id = key
                    arrayOfServices.push({
                        name,
                        thumbnail,
                        id
                    })
                }
            }
            callback(arrayOfServices)
        })
    }
    static getTopAllServices(callback){
        let userNamePath = "/contenido/tops/allServices/"
        const Destinos = firebaseApp.database().ref(userNamePath)
        Destinos.on('value', (snapshot) => {
            let data = snapshot.val()
            let arrayOfServices = [] 
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.nombre
                    let thumbnail = obj.thumbnail
                    let id = key
                    arrayOfServices.push({
                        name,
                        thumbnail,
                        id
                    })
                }
            }
            callback(arrayOfServices)
        })
    }
    static getComunas(callback){
        let userNamePath = "/contenido/comunas/"
        firebaseApp.database().ref(userNamePath).orderByChild("fecha_publicacion").on('value', (snapshot) => {
            let data = snapshot.val()
            let arrayOfServices = [] 
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.comuna_nombre
                    arrayOfServices.push({
                        label: name,
                        value: name
                    })
                }
            }
            callback(arrayOfServices)
        })
    }
    static getHospedajes(callback){
        let userNamePath = "/contenido/hospedajes/"
        firebaseApp.database().ref(userNamePath).orderByChild("fecha_publicacion").on('value', (snapshot) => {
            let data = ""
            data = snapshot.val()
            let arrayOfServices = [] 
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.nombre
                    let thumbnail = obj.thumbnail
                    let id = key
                    let region = obj.region
                    let descripcion = obj.descripcion
                    let estado = obj.estado
                    let tipo_hospedaje = obj.tipo_hospedaje
                    let precio = obj.precio
                    let max_huespedes = obj.max_huespedes
                    let camas = obj.camas
                    let wc = obj.wc
                    let habitaciones = obj.habitaciones
                    arrayOfServices.push({
                        name,
                        thumbnail,
                        id,
                        region,
                        descripcion,
                        estado,
                        tipo_hospedaje,
                        precio,
                        max_huespedes,
                        camas,
                        habitaciones,
                        wc
                    })
                }
            }
            arrayOfServices.sort(function(a, b){return a - b});
            callback(arrayOfServices)
        })
    }
    static getServices(callback){
        let userNamePath = "/contenido/servicios/"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let data = snapshot.val()
            let arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.name
                    arrayOfServices.push({
                        label: name,
                        value: name
                    })
                }
            }
            callback(arrayOfServices)
        })
    }
    static getReglas(callback){
        let userNamePath = "/contenido/reglas/"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let data = snapshot.val()
            let arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.name
                    arrayOfServices.push({
                        label: name,
                        value: name
                    })
                }
            }
            callback(arrayOfServices)
        })
    }
    static getTypeActivities(callback){
        let userNamePath = "/contenido/tipo_actividad/"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let data = snapshot.val()
            let arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let label = obj.label
                    arrayOfServices.push({
                        label,
                        value: key
                    })
                }
            }
            callback(arrayOfServices)
        })
    }
    static getAllIntereses(callback){
        let userNamePath = "/contenido/intereses/"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let data = snapshot.val()
            let arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.name
                    let id = obj.id
                    arrayOfServices.push({
                        label: name,
                        value: id
                    })
                }
            }
            callback(arrayOfServices)
        })
    }
    static getDestinosTitle(callback){
        let userNamePath = "/contenido/destinos/"
        firebaseApp.database().ref(userNamePath).orderByChild("fecha_publicacion").on('value', (snapshot) => {
            let data = ""
            data = snapshot.val()
            let arrayOfServicesActividades = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.nombre
                    if(obj.estado !== "0"){
                        if(key !== "0"){
                            if(name !== "" && name !== null){
                                arrayOfServicesActividades.push({
                                    label: name,
                                    value: key
                                })
                            }
                        }
                    }
                }
            }
            arrayOfServicesActividades.sort(function(a, b){return a - b});
            callback(arrayOfServicesActividades)
        })
    }
    static getDestinosTitleSorted(callback){
        let userNamePath = "/contenido/destinos/"
        firebaseApp.database().ref(userNamePath).orderByChild("fecha_publicacion").on('value', (snapshot) => {
            let data = ""
            data = snapshot.val()
            let arrayOfServicesActividades = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.nombre
                    if(obj.estado !== "0"){
                        if(name !== "" && name !== null){
                            arrayOfServicesActividades.push({
                                label: name,
                                value: key
                            })
                        }
                    }
                }
            }
            arrayOfServicesActividades.sort(function(a, b){return a - b});
            callback(arrayOfServicesActividades)
        })
    }
    static getActivityTitle(callback){
        let userNamePath = "/contenido/actividades/"
        firebaseApp.database().ref(userNamePath).orderByChild("fecha_publicacion").on('value', (snapshot) => {
            let data = ""
            data = snapshot.val()
            let arrayOfServicesActividades = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.nombre
                    arrayOfServicesActividades.push({
                        label: name,
                        value: key
                    })
                }
            }
            arrayOfServicesActividades.sort(function(a, b){return a - b});
            callback(arrayOfServicesActividades)
        })
    }
    static getComments(idActividad, segmento, callback){
        const Comments = firebaseApp.database().ref("/contenido/comments/").orderByChild('idSegmento').equalTo(idActividad + '_' + segmento)
        const Usuarios = firebaseApp.database().ref("/contenido/user/")
        let arrayOfServices = []
        Comments.on('value', function (snapshot) {
            let data = snapshot.val(); // line 1 (results like 1,2,3,4,5,6)
            arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let comentario = obj.comentario
                    let fecha_publicacion = obj.fecha_publicacion
                    let idSegmento = obj.idSegmento
                    let idUsuario = obj.idUsuario
                    let valoracion = obj.valoracion
                    let id = key
                    // eslint-disable-next-line no-loop-func
                    Usuarios.child(idUsuario).once('value', function(mediaSnap) {
                        let mediaS = mediaSnap.val();
                        if(mediaS){
                            let thumbnail = mediaS.thumbnail
                            let name = mediaS.name
                            arrayOfServices.push({
                                comentario,
                                fecha_publicacion,
                                idSegmento,
                                idUsuario,
                                valoracion,
                                id,
                                thumbnail,
                                name
                            })
                        }
                        arrayOfServices.sort(function(a, b){return a - b});
                        callback(arrayOfServices)
                    });             
                    
                }
            }
        });
    }
    static getUserRequestByGroup(idusuario, callback){
        let arrayPublic = []
        const Publicaciones = firebaseApp.database().ref("/contenido/publicaciones/").orderByChild('idUsuario').equalTo(idusuario)
        Publicaciones.on('value', function(snapshot) {
            let data = snapshot.val();
            arrayPublic = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let cupos_pasajeros = obj.cupos_pasajeros
                    let titulo = obj.titulo
                    let url_portada = obj.url_portada
                    let estado = obj.estado
                    let estado_viaje = obj.estado_viaje
                    let idUsr = obj.idUsuario
                    let integrantes = obj.integrantes || null
                    let solicitudes = obj.solicitudes || null
                    let id = key
                    if(estado_viaje !== "0"){
                        if(estado !== "0"){
                            arrayPublic.push({
                                cupos_pasajeros,
                                titulo,
                                url_portada,
                                estado_viaje,
                                estado,
                                idUsr,
                                integrantes,
                                id,
                                solicitudes
                            })
                        }
                    }
                }
                callback(arrayPublic)  
            }
        })
    }
    static getSolicitudesRequestByGroup(idPublic, callback){
        let arrayPublic = []
        const Publicaciones = firebaseApp.database().ref("/contenido/publicaciones/" + idPublic + "/solicitudes")
        Publicaciones.on('value', function(snapshot) {
            let data = snapshot.val();
            arrayPublic = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let user_url = obj.user_url
                    let nombreUser = obj.nombreUser
                    let idUsuario = obj.idUsuario
                    let acepted = obj.acepted
                    let comentario = obj.comentario
                    let id = key
                    if(acepted !== "2"){
                        arrayPublic.push({
                            user_url,
                            nombreUser,
                            idUsuario,
                            acepted,
                            id,
                            obj,
                            comentario
                        })
                    }
                }
                callback(arrayPublic)  
            }
        })
    }
    static getIntegrantesRequestByGroup(idPublic, callback){
        let arrayPublic = []
        const Publicaciones = firebaseApp.database().ref("/contenido/publicaciones/" + idPublic + "/integrantes")
        Publicaciones.on('value', function(snapshot) {
            let data = snapshot.val();
            arrayPublic = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let user_url = obj.user_url
                    let nombreUser = obj.nombreUser
                    let idUsuario = obj.idUsuario
                    let acepted = obj.acepted
                    let comentario = obj.comentario
                    let id = key
                    if(acepted !== "2"){
                        arrayPublic.push({
                            user_url,
                            nombreUser,
                            idUsuario,
                            acepted,
                            id,
                            obj,
                            comentario
                        })
                    }
                }
                callback(arrayPublic)  
            }
        })
    }
    static getDestinosDetail(idDestino, callback){
        let userNamePath = "/contenido/destinos/"+idDestino
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let data = snapshot.val()
            if(data){
                    let name = data.nombre
                    let url = data.url
                    let region = data.region
                    let descripcion = data.descripcion
                    let autor = data.autor
                    let autor_galeria = data.autor_galeria
                    let autor_portada = data.autor_portada
                    let acceso = data.acceso
                    let recomendaciones = data.recomendaciones
                    let url_1 = data.galeria.url_1
                    let url_2 = data.galeria.url_2
                    let url_3 = data.galeria.url_3
                    let galeria = [data.url, data.galeria.url_1, data.galeria.url_2, data.galeria.url_3]
                    let instagram = data.instagram
                    let idUsuario = data.idUsuario
                    let obj = {
                        name,
                        url,
                        region,
                        descripcion,
                        autor,
                        autor_galeria,
                        autor_portada,
                        acceso,
                        recomendaciones,
                        url_1,
                        url_2,
                        url_3,
                        instagram,
                        idUsuario,
                        galeria
                    }
                    callback(obj)
            }
        })
    }
    static getHospedajeDetail(idHospedaje, callback){
        let userNamePath = "/contenido/hospedajes/"+idHospedaje
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let data = snapshot.val()
            if(data){
                    let name = data.nombre
                    let url = data.url
                    let idRegion = data.idRegion
                    let region = data.region
                    let descripcion = data.descripcion
                    let url_1 = data.galeria.url_1
                    let url_2 = data.galeria.url_2
                    let url_3 = data.galeria.url_3
                    let galeria = [data.url, data.galeria.url_1, data.galeria.url_2, data.galeria.url_3]
                    // let galeria = data.galeria
                    let servicios = data.servicios
                    let destinos = data.destinos
                    let actividades = data.actividades
                    let reglas = data.reglas

                    let instagram = data.instagram
                    let idUsuario = data.idUsuario
                    let comuna = data.comuna
                    let habitaciones = data.habitaciones
                    let max_huespedes = data.max_huespedes
                    let camas = data.camas
                    let precio = data.precio
                    let wc = data.wc
                    let whatsapp = data.whatsapp
                    let tipo_hospedaje = data.tipo_hospedaje
                    let direccion = data.direccion
                    let obj = {
                        name,
                        url,
                        region,
                        idRegion,
                        descripcion,
                        url_1,
                        url_2,
                        url_3,
                        instagram,
                        idUsuario,
                        servicios,
                        destinos,
                        actividades,
                        comuna,
                        tipo_hospedaje,
                        precio,
                        habitaciones,
                        max_huespedes,
                        camas,
                        wc,
                        reglas,
                        whatsapp,
                        galeria,
                        direccion,
                    }
                    callback(obj)
            }
        })
    }
    static getActivityDetail(idActividad, callback){
        let userNamePath = "/contenido/actividades/"+idActividad
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let data = snapshot.val()
            if(data){
                    let name = data.nombre
                    let url = data.url
                    let id = data.id
                    let region = data.region
                    let descripcion = data.descripcion
                    let autor = data.autor
                    let recomendaciones = data.recomendaciones
                    let url_1 = data.galeria.url_1
                    let url_2 = data.galeria.url_2
                    let url_3 = data.galeria.url_3
                    let galeria = [data.url, data.galeria.url_1, data.galeria.url_2, data.galeria.url_3]
                    let instagram = data.instagram
                    let idUsuario = data.idUsuario
                    let dificultad = data.dificultad
                    let obj = {
                        name,
                        url,
                        id,
                        region,
                        descripcion,
                        autor,
                        recomendaciones,
                        url_1,
                        url_2,
                        url_3,
                        instagram,
                        idUsuario,
                        galeria,
                        dificultad
                    }
                    callback(obj)
            }
        })
    }
    static getHospedajeByUser(idUsuario, callback){
        firebaseApp.database().ref('/contenido/hospedajes').orderByChild('idUsuario').equalTo(idUsuario).on('value',(snapshot)=>{
            let data = ""
            data = snapshot.val()
            let arrayOfServices = [] 
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.nombre
                    let thumbnail = obj.thumbnail
                    let id = key
                    let region = obj.region
                    let descripcion = obj.descripcion
                    let estado = obj.estado
                    arrayOfServices.push({
                        name,
                        thumbnail,
                        id,
                        region,
                        descripcion,
                        estado
                    })
                }
            }
            arrayOfServices.sort(function(a, b){return a - b});
            callback(arrayOfServices)
        })
    }
    static getActivitiesByUser(idUsuario, callback){
        firebaseApp.database().ref('/contenido/actividades').orderByChild('idUsuario').equalTo(idUsuario).limitToLast(30).on('value',(snapshot)=>{
            let data = ""
            data = snapshot.val()
            let arrayOfServices = [] 
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.nombre
                    let thumbnail = obj.thumbnail
                    let id = key
                    let region = obj.region
                    let descripcion = obj.descripcion
                    let estado = obj.estado
                    arrayOfServices.push({
                        name,
                        thumbnail,
                        id,
                        region,
                        descripcion,
                        estado
                    })
                }
            }
            arrayOfServices.sort(function(a, b){return a - b});
            callback(arrayOfServices)
        })
    }
    static getActivitiesByDestiny(idDestino, callback){
        firebaseApp.database().ref('/contenido/actividades').orderByChild('idDestino').equalTo(idDestino).on('value',(snapshot)=>{
            let data = ""
            data = snapshot.val()
            let arrayOfServices = [] 
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.nombre
                    let thumbnail = obj.thumbnail
                    let id = key
                    let region = obj.region
                    let descripcion = obj.descripcion
                    let estado = obj.estado
                    arrayOfServices.push({
                        name,
                        thumbnail,
                        id,
                        region,
                        descripcion,
                        estado
                    })
                }
            }
            arrayOfServices.sort(function(a, b){return a - b});
            callback(arrayOfServices)
        })
    }
    static getWaitingForPublic(element, uid, callback) {
        firebaseApp.database().ref('/contenido/' + element ).orderByChild('idUsuario').equalTo(uid).on('value',(snapshot)=>{
            let data = snapshot.val();
            let arrayOfState = []
            if(data){
                for (let key in data) {
                    let obj = data[key];
                    if(obj.estado === "0"){
                        arrayOfState.push({
                            pub: data[key]
                        })
                    }
                }
                callback(arrayOfState.length);
            }else{
                callback("0");
            }
        });
    }
// SET
    static setUserName(userId, name){
        let userNamePath = "/contenido/user/"+userId+"/name"
        return firebaseApp.database().ref(userNamePath).set(name)
    }
    static setUserEmail(userId, email){
        let userNamePath = "/contenido/user/"+userId+"/email"
        return firebaseApp.database().ref(userNamePath).set(email)
    }
    static setUserComuna(userId, comuna){
        let userNamePath = "/contenido/user/"+userId+"/comuna"
        return firebaseApp.database().ref(userNamePath).set(comuna)
    }
    static setUserRegion(userId, region){
        let userNamePath = "/contenido/user/"+userId+"/region"
        return firebaseApp.database().ref(userNamePath).set(region)
    }
    static setUserFNacimiento(userId, nacimiento){
        let userNamePath = "/contenido/user/"+userId+"/nacimiento"
        return firebaseApp.database().ref(userNamePath).set(nacimiento)
    }
    static setUserGenero(userId, genero){
        let userNamePath = "/contenido/user/"+userId+"/genero"
        return firebaseApp.database().ref(userNamePath).set(genero)
    }
    static setUserIntereses(userId, intereses){
        let userNamePath = "/contenido/user/"+userId+"/intereses"
        return firebaseApp.database().ref(userNamePath).set(intereses)
    }
    static setUserDescripcion(userId, descripcion){
        let userNamePath = "/contenido/user/"+userId+"/descripcion"
        return firebaseApp.database().ref(userNamePath).set(descripcion)
    }
// GET
    static getSliders(callback){
        let userNamePath = "/contenido/sliders/"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let data = snapshot.val()
            let arrayOfServices = [] 
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let name = obj.name
                    let slider = obj.slider
                    let id = key
                    let idDestino = obj.idDestino
                    arrayOfServices.push({
                        name,
                        slider,
                        id,
                        idDestino
                    })
                }
            }
            callback(arrayOfServices)
        })
    }
    static getUser(userId, callback){
        let userNamePath = "/contenido/user/"+userId
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let data = snapshot.val()
            if(data){
                let name = data.name
                let region = data.region
                let nacimiento = data.nacimiento
                let descripcion = data.descripcion
                let intereses = data.intereses
                let genero = data.genero
                let comuna = data.comuna
                let url = data.url
                let obj = {
                    name,
                    region,
                    nacimiento,
                    descripcion,
                    genero,
                    intereses,
                    comuna,
                    url
                }
                callback(obj)
            }
        })
    }
    static getUrlUser(userId, callback){
        let userNamePath = "/contenido/user/"+userId+"/url"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let url = ''
            if(snapshot.val()){
                url = snapshot.val()
            }
            callback(url)
        })
    }
    static getName(userId, callback){
        let userNamePath = "/contenido/user/"+userId+"/name"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let name = ''
            if(snapshot.val()){
                name = snapshot.val()
            }
            callback(name)
        })
    }
    static getComuna(userId, callback){
        let userNamePath = "/contenido/user/"+userId+"/comuna"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let comuna = ''
            if(snapshot.val()){
                comuna = snapshot.val()
            }
            callback(comuna)
        })
    }
    static getRegion(userId, callback){
        let userNamePath = "/contenido/user/"+userId+"/region"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let region = ''
            if(snapshot.val()){
                region = snapshot.val()
            }
            callback(region)
        })
    }
    static getNacimiento(userId, callback){
        let userNamePath = "/contenido/user/"+userId+"/nacimiento"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let nacimiento = ''
            if(snapshot.val()){
                nacimiento = snapshot.val()
            }
            callback(nacimiento)
        })
    }
    static getGenero(userId, callback){
        let userNamePath = "/contenido/user/"+userId+"/genero"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let genero = ''
            if(snapshot.val()){
                genero = snapshot.val()
            }
            callback(genero)
        })
    }
    static getIntereses(userId, callback){
        let userNamePath = "/contenido/user/"+userId+"/intereses"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let intereses = ''
            if(snapshot.val()){
                intereses = snapshot.val()
            }
            callback(intereses)
        })
    }
    static getDescripcion(userId, callback){
        let userNamePath = "/contenido/user/"+userId+"/descripcion"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let descripcion = ''
            if(snapshot.val()){
                descripcion = snapshot.val()
            }
            callback(descripcion)
        })
    }
    static getStateLikeUser(idUser, idDestino, callback){
        let userNamePath = "/contenido/destinos/" + idDestino + "/likes/" + idUser
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let statusLike = ''
            if(snapshot.val()){
                statusLike = snapshot.val()
            }else{
                statusLike = null
            }
            callback(statusLike)
        })
    }
    static notifi_getNotificacionesGeneral(userId, callback){
        let userNamePath = "/contenido/user/"+userId+"/notificaciones/general/history"
        firebaseApp.database().ref(userNamePath).orderByKey().limitToLast(5).on('value', (snapshot) => {
            let data = snapshot.val()
            // let notifi = data.grupos
            let arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let msg = obj.msg
                    let idUsuarioMasterGroup = obj.idUsuarioMasterGroup
                    let nameGrupo = obj.nameGrupo
                    let nameUsuarioMasterGroup = obj.nameUsuarioMasterGroup
                    let urlUsuarioMasterGroup = obj.urlUsuarioMasterGroup
                    let createdAt = obj.createdAt
                    let view = obj.view
                    let link = obj.link
                    let id = key
                    arrayOfServices.push({
                        msg,
                        idUsuarioMasterGroup,
                        nameGrupo,
                        nameUsuarioMasterGroup,
                        urlUsuarioMasterGroup,
                        createdAt,
                        view,
                        link,
                        id
                    })
                }
            }
            callback(arrayOfServices.reverse())
        })
    }

    static setAllNotify(userId){        
        firebaseApp.database().ref("/contenido/user/"+userId+"/notificaciones/general/count").remove()
    }
    static LookNotify(userId, idNotify){        
        firebaseApp.database().ref("/contenido/user/"+userId+"/notificaciones/general/history/" + idNotify + "/view").set(true)
    }
    
    static notifi_getNotificacionesGeneralLength(userId, callback){
        let userNamePath = "/contenido/user/"+userId+"/notificaciones/general/count"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let data = snapshot.val()
            let arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let idUsuarioMasterGroup = obj.idUsuarioMasterGroup
                    let view = obj.view
                    if(!view){
                        arrayOfServices.push({
                            idUsuarioMasterGroup
                        })
                    }
                }
            }
            callback(arrayOfServices)
        })
    }
    static notifi_getNotificaciones(userId, callback){
        let userNamePath = "/contenido/user/"+userId+"/notificaciones/grupos"
        firebaseApp.database().ref(userNamePath).on('value', (snapshot) => {
            let data = snapshot.val()
            let arrayOfServices = []
            if(data){
                for(let key in data){
                    let obj = data[key]
                    let comentario = obj.comentario
                    let idUsuario = obj.idUsuario
                    let flag = obj.flag
                    let fecha_publicacion = obj.fecha_publicacion
                    let tituloGrupo = obj.tituloGrupo
                    arrayOfServices.push({
                        comentario,
                        idUsuario,
                        flag,
                        fecha_publicacion,
                        tituloGrupo
                    })
                }
            }
            callback(arrayOfServices)
        })
    }
    // PUBLICACIONES SET
    static pub_setTimeViaje(publicacionId, timeViaje){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/timeViaje"
        return firebaseApp.database().ref(userNamePath).set(timeViaje)
    }
    static pub_setInstagram(publicacionId, instagram){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/instagram"
        return firebaseApp.database().ref(userNamePath).set(instagram)
    }
    static pub_setFacebook(publicacionId, facebook){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/facebook"
        return firebaseApp.database().ref(userNamePath).set(facebook)
    }
    static pub_setWhatsapp(publicacionId, whatsapp){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/whatsapp"
        return firebaseApp.database().ref(userNamePath).set(whatsapp)
    }
    static pub_setGastos(publicacionId, gastos){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/gastos"
        return firebaseApp.database().ref(userNamePath).set(gastos)
    }
    static pub_setAutor(publicacionId, autor){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/autor"
        return firebaseApp.database().ref(userNamePath).set(autor)
    }
    static pub_setRequisitos(publicacionId, requisitos){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/requisitos"
        return firebaseApp.database().ref(userNamePath).set(requisitos)
    }
    static pub_setMascotas(publicacionId, mascotas){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/mascotas"
        return firebaseApp.database().ref(userNamePath).set(mascotas)
    }
    static pub_setDescripcion(publicacionId, descripcion){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/descripcion"
        return firebaseApp.database().ref(userNamePath).set(descripcion)
    }
    static pub_setCuposPasajeros(publicacionId, cupos_pasajeros){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/cupos_pasajeros"
        return firebaseApp.database().ref(userNamePath).set(cupos_pasajeros)
    }
    static pub_setTiempoViaje(publicacionId, tiempo_viaje){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/tiempo_viaje"
        return firebaseApp.database().ref(userNamePath).set(tiempo_viaje)
    }
    static pub_setHoraSalida(publicacionId, hora_salida){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/hora_salida"
        return firebaseApp.database().ref(userNamePath).set(hora_salida)
    }
    static pub_setDestinoFinal(publicacionId, destino_final){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/destino_final"
        return firebaseApp.database().ref(userNamePath).set(destino_final)
    }
    static pub_setLugarInicio(publicacionId, lugar_inicio){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/lugar_inicio"
        return firebaseApp.database().ref(userNamePath).set(lugar_inicio)
    }
    static pub_setFsalida(publicacionId, f_salida){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/f_salida"
        return firebaseApp.database().ref(userNamePath).set(f_salida)
    }
    static pub_setTitulo(publicacionId, titulo){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/titulo"
        return firebaseApp.database().ref(userNamePath).set(titulo)
    }
    static pub_setStatusFinally(publicacionId, statusFinally){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/estado_viaje"
        return firebaseApp.database().ref(userNamePath).set(statusFinally)
    }
    static pub_setMeridiano(publicacionId, meridiano){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/meridiano"
        return firebaseApp.database().ref(userNamePath).set(meridiano)
    }
    static pub_setGgenerales(publicacionId, gastos_generales){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/gastos_generales"
        return firebaseApp.database().ref(userNamePath).set(gastos_generales)
    }
    static pub_setHijos(publicacionId, hijos){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/hijos"
        return firebaseApp.database().ref(userNamePath).set(hijos)
    }
    static pub_setDesde(publicacionId, desde){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/desde_edad"
        return firebaseApp.database().ref(userNamePath).set(desde)
    }
    static pub_setHasta(publicacionId, hasta){
        let userNamePath = "/contenido/publicaciones/"+publicacionId+"/hasta_edad"
        return firebaseApp.database().ref(userNamePath).set(hasta)
    }
    // SETEO DE DESTINOS
    static des_setActividad(destinoId, idActividad){
        let userNamePath = "/contenido/destinos/"+destinoId+"/actividades/"
        return firebaseApp.database().ref(userNamePath).push(idActividad)
    }
    

    // SET HOSPEDAJES
    static hosp_setname(idHospedaje, name){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/nombre"
        return firebaseApp.database().ref(userNamePath).set(name)
    }
    static hosp_setregion(idHospedaje, region, idRegion){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/region"
        let userNamePathidRegion = "/contenido/hospedajes/" + idHospedaje + "/idRegion"
        firebaseApp.database().ref(userNamePath).set(region)
        firebaseApp.database().ref(userNamePathidRegion).set(idRegion)
        return;
    }
    static hosp_setdescripcion(idHospedaje, descripcion){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/descripcion"
        return firebaseApp.database().ref(userNamePath).set(descripcion)
    }
    static hosp_setinstagram(idHospedaje, instagram){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/instagram"
        return firebaseApp.database().ref(userNamePath).set(instagram)
    }
    static hosp_setservicios(idHospedaje, servicios){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/servicios"
        return firebaseApp.database().ref(userNamePath).set(servicios)
    }
    static hosp_setdestinos(idHospedaje, destinos){
        if(destinos){
            let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/destinos"
            return firebaseApp.database().ref(userNamePath).set(destinos)
        }else{
            return null;
        }
    }
    static hosp_setactividades(idHospedaje, actividades){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/actividades"
        return firebaseApp.database().ref(userNamePath).set(actividades)
    }
    static hosp_setcomuna(idHospedaje, comuna){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/comuna"
        return firebaseApp.database().ref(userNamePath).set(comuna)
    }
    static hosp_settipo_hospedaje(idHospedaje, tipo_hospedaje){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/tipo_hospedaje"
        return firebaseApp.database().ref(userNamePath).set(tipo_hospedaje)
    }
    static hosp_setprecio(idHospedaje, precio){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/precio"
        return firebaseApp.database().ref(userNamePath).set(precio)
    }
    static hosp_sethabitaciones(idHospedaje, habitaciones){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/habitaciones"
        return firebaseApp.database().ref(userNamePath).set(habitaciones)
    }
    static hosp_setmax_huespedes(idHospedaje, max_huespedes){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/max_huespedes"
        return firebaseApp.database().ref(userNamePath).set(max_huespedes)
    }
    static hosp_setcamas(idHospedaje, camas){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/camas"
        return firebaseApp.database().ref(userNamePath).set(camas)
    }
    static hosp_setwc(idHospedaje, wc){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/wc"
        return firebaseApp.database().ref(userNamePath).set(wc)
    }
    static hosp_setreglas(idHospedaje, reglas){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/reglas"
        return firebaseApp.database().ref(userNamePath).set(reglas)
    }
    static hosp_setwhatsapp(idHospedaje, whatsapp){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/whatsapp"
        return firebaseApp.database().ref(userNamePath).set(whatsapp)
    }
    static hosp_setdireccion(idHospedaje, direccion){
        let userNamePath = "/contenido/hospedajes/" + idHospedaje + "/direccion"
        return firebaseApp.database().ref(userNamePath).set(direccion)
    }
    static getUserResetByGroup(idUser){
        let userRef = firebaseApp.database().ref("/contenido/user/" + idUser + "/notificaciones/grupos");
        return userRef.remove()
    }
    static solicitudes_setAcepted(idUsuarioAceptado, idPublicacion, idGrupo, acepted, obj, objAcepted){
        firebaseApp.database().ref("/contenido/user/"+ idUsuarioAceptado + "/notificaciones/general/history/").push(objAcepted);
        firebaseApp.database().ref("/contenido/user/"+ idUsuarioAceptado + "/notificaciones/general/count/").push(objAcepted);
        firebaseApp.database().ref("/contenido/publicaciones/" + idPublicacion + "/integrantes/" + idUsuarioAceptado).set(obj);
        firebaseApp.database().ref("/contenido/publicaciones/" + idPublicacion + "/integrantes/" + idUsuarioAceptado + "/acepted").set(acepted)
        let userRef = firebaseApp.database().ref("/contenido/publicaciones/" + idPublicacion + "/solicitudes/" + idGrupo);
        return userRef.remove()
    }
    static solicitudes_setDeleteed(idPublicacion, idGrupo){
        let userRefSolc = firebaseApp.database().ref("/contenido/publicaciones/" + idPublicacion + "/solicitudes/" + idGrupo);
        let userRefInt = firebaseApp.database().ref("/contenido/publicaciones/" + idPublicacion + "/integrantes/" + idGrupo);
        userRefSolc.remove()
        return userRefInt.remove()
    }
    
    
}

export default Helpers