import React, {useState} from 'react';
import { Carousel } from 'antd';
// import Rating from '@material-ui/lab/Rating';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

const Banner = ({ url, url_1, url_2, url_3, galeria }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    return (<><Carousel autoplay>
                <div>
                    <div onClick={() => setIsOpen(true)} style={{
                        backgroundImage: "url(" + url + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '160px'
                        }}>
                    </div>
                </div>
                {
                    url_1 ?
                        <div>
                            <div onClick={() => setIsOpen(true)} style={{
                                backgroundImage: `url(${url_1})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                height: '160px'
                                }}>
                            </div>
                        </div>
                    : null
                }
                {
                    url_2 ?
                        <div>
                            <div onClick={() => setIsOpen(true)} style={{
                                backgroundImage: `url(${url_2})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                height: '160px'
                                }}>
                            </div>
                        </div>
                    : null
                }
                {
                    url_3 ?
                        <div>
                            <div onClick={() => setIsOpen(true)} style={{
                                backgroundImage: `url(${url_3})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                height: '160px'
                                }}>
                            </div>
                        </div>
                    : null
                }
            </Carousel>
            {isOpen && galeria && (
                <Lightbox
                    mainSrc={galeria[photoIndex]}
                    nextSrc={galeria[(photoIndex + 1) % galeria.length]}
                    prevSrc={galeria[(photoIndex + galeria.length - 1) % galeria.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + galeria.length - 1) % galeria.length)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % galeria.length)
                    }
                />
            )}
    </>);
}
    



export default Banner;