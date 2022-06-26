import React from 'react'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Link } from "react-router-dom";
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import Grow from '@material-ui/core/Grow';
import Rating from '@material-ui/lab/Rating';
const useStyles = makeStyles(() => ({
    root: {
        width: 550,
        margin: 'auto',
        borderRadius: 12,
        padding: 14,
    },
    media: {
        borderRadius: 6,
    },
}));

const HospedajesCard = (props) => {
    const item = props.item
    const styles = useStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    return ( <
        Card className = { cx(styles.root, shadowStyles.root) }
        style = {
            { marginTop: '2%', minWidth: 345 } } >
        <
        Link to = { `/hospedaje/${item.id}` }
        style = {
            { textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' } } >
        <
        MDBRow >
        <
        MDBCol lg = "6" >
        <
        div style = {
            {
                backgroundImage: "url(" + item.thumbnail + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                maxWidth: 550,
                height: 240,
                borderRadius: 12
            }
        } >
        <
        /div> <
        /MDBCol> <
        MDBCol lg = "6" >
        <
        h6 className = "mb-3"
        style = {
            { marginTop: '1%', color: '#6f6f6f' } } > { item.tipo_hospedaje }
        en { item.region } < /h6> <
        h5 className = "mb-3" > < strong style = {
            { color: '#454545', fontSize: 16 } } > { item.name } < /strong></h
        5 >
        <
        h5 className = "mb-3" > < strong style = {
            { color: '#6f6f6f', fontSize: 16 } } > $ { item.precio }
        CLP por noche < /strong></h
        5 >
        <
        p style = {
            { color: '#07737f', borderTop: '1px solid #ccc', paddingTop: 4, marginTop: '5%' } } > { item.max_huespedes > 1 ? item.max_huespedes + ' huéspedes' : item.max_huespedes + ' huésped' }· { item.habitaciones > 1 ? item.habitaciones + ' habitaciones' : item.habitaciones + ' habitación' } < br / > { item.camas > 1 ? item.camas + ' camas' : item.camas + ' cama' }· { item.wc > 1 ? item.wc + ' baños' : item.wc + ' baño' } <
        /p> <
        p >
        <
        Rating name = "read-only"
        size = "small"
        value = { 3 }
        readOnly / >
        <
        /p> <
        /MDBCol> <
        /MDBRow> <
        /Link> <
        /Card>
    );
};
const ItemsHospedajes = (props) => {
        const [checked] = React.useState(true);
        let arrMatch = props.data
        return ( <
            MDBContainer >
            <
            div className = "row"
            style = {
                { marginTop: 15 } } > {
                arrMatch.map((item, index) =>
                    item.estado === "1" ?
                    <
                    Grow key = { index } in = { checked }
                    style = {
                        { transformOrigin: '0 0 0' } } {...(checked ? { timeout: ((index * 1000) < 4000 ? (index * 1000) : 4000) } : {}) } >
                    { < HospedajesCard item = { item }
                        /> } <
                        /Grow>: null
                    )
                } <
                /div> <
                /MDBContainer>
            )
        }
        export default ItemsHospedajes;