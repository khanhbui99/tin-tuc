import { isArray } from 'lodash';
import React from 'react'
import Carousel from "react-multi-carousel";
import "./style.scss";
import ItemShow from "../ItemShow"





const CarouselRelease = ({
    data = [],
    nberItem = 5
}) => {

    let responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: nberItem,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    return (
        <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            renderArrowsWhenDisabled={true}
        >
            {isArray(data) &&
                data.map((item, index) => {
                    return <ItemShow key={String(index)} item={item} />
                })}
        </Carousel>
    )
}

export default CarouselRelease;
