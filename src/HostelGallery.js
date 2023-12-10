import * as React from 'react';
import Carousel from 'react-material-ui-carousel'
import './App.css';

function HostelGallery() {
    return (
        <Carousel>
            {
                items.map((item, i) => <img src={item.src} alt={item.alt} className='GalleryImg' />)
            }
        </Carousel>
    );
}

const items = [
    {
        src: "img/HostelGallery/1.jpg",
        alt: "Common Room"
    },
    {
        src: "img/HostelGallery/2.jpg",
        alt: "Dormitory"
    },
    {
        src: "img/HostelGallery/3.jpg",
        alt: "Dormitory"
    },
    {
        src: "img/HostelGallery/4.jpg",
        alt: "Dormitory"
    },
    {
        src: "img/HostelGallery/5.jpg",
        alt: "Dormitory"
    },
    {
        src: "img/HostelGallery/6.jpg",
        alt: "Dormitory"
    },
    {
        src: "img/HostelGallery/7.jpg",
        alt: "Dormitory"
    },
    {
        src: "img/HostelGallery/9.jpg",
        alt: "Dormitory"
    },
    {
        src: "img/HostelGallery/10.jpg",
        alt: "Dormitory"
    },
    {
        src: "img/HostelGallery/11.jpg",
        alt: "Dormitory"
    },
    {
        src: "img/HostelGallery/12.jpg",
        alt: "Dormitory"
    },
    {
        src: "img/HostelGallery/13.jpg",
        alt: "Dormitory"
    }
];

export default HostelGallery;
