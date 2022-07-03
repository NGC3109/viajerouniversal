import React from "react";
import { login } from "./Login";


export const NO_LOGIN = <div>Para ver los comentarios debes <strong onClick={login} style={{cursor: 'pointer', textDecoration: 'underline'}}>iniciar sesión</strong>, es muy simple, solo dos clicks hacen falta!</div>
export const NO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/viajeros-a267f.appspot.com/o/funciones%2Fno-image2.png?alt=media&token=04203eaf-1fbd-439b-b2d1-88d227793338';
export const MORE_INFO = (
    <div>
        <strong>Atención!</strong> Para ver más información debes registrarte, es muy fácil, no debes llenar formuarios, solo dos click hacen falta!.
    </div>
)
export const ALERT_ACTIVITY_HOSPEDAJE = (
    <div className="alert alert-info">
        <strong>Ups!</strong> No tenemos nada asociado a esta actividad, si tienes un <strong>Hospedaje</strong> desde donde se pueda llegar a realizar esta actividad, <strong>¡inscribelo desde tu perfil!</strong>, si aún no tienes cuenta 
        <strong> registrarte es muy fácil</strong>, podrás comenzar a registrar tus servicios, <strong>aparecerán bien ubicados</strong>, justo donde la gente necesita verte.
    </div>
)

export const INICIO = 'INICIO'
export const DESTINOS = 'DESTINOS'
export const ACTIVIDADES = 'ACTIVIDADES'
export const HOSPEDAJES = 'HOSPEDAJES'
export const MOCHILEROS = 'MOCHILEROS'
export const MIS_GRUPOS = 'MIS_GRUPOS'
export const SALIR = 'SALIR'
export const ENTRAR = 'ENTRAR'