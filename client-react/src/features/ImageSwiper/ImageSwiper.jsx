/* eslint-disable import/no-unresolved */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ImageSwiper.css';

function ImageSwiper({ images, img, setImg }) {
  return (
    <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
          images
          && images.map((image) => (
            <SwiperSlide key={image.id} className='place_image_small' onClick={() => setImg(image)}>
              <img
                      className={img === image ? 'small_place_image active' : 'small_place_image'}
                      src={image.src}
                      alt={image.title}
                    />
              </SwiperSlide>
          ))
        }
      </Swiper>
  );
}

export default ImageSwiper;

/* eslint-enable import/no-unresolved */
