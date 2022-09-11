import React from 'react';
import './PlacePage.css';

function PlacePage() {
  return (
    <div className='content_container'>
      <div className='place_container'>
        <div className='place_container_left'>
          <div className='place_container_image'>
            <img alt='mock' />
          </div>
          <div className='above_place_image'>
            <div className='place_image_small'>
              <img alt='mock_small' />
            </div>
            <div className='place_image_small'>
              <img alt='mock_small' />
            </div>
            <div className='place_image_small'>
              <img alt='mock_small' />
            </div>
          </div>
          <span className='place_left_location font_subheading_small'>МЕСТОПОЛОЖЕНИЕ :</span>
          <div className='place_location_text font_body_small'>
            <p>4070 Kirke Hyllinge, Дания</p>
            <p>55°42'37.0"N 11°54'24.8"E</p>
          </div>
        </div>
        <div className='place_container_right'>
          <h4>
            Place #1
          </h4>
          <div>
            <span className='font_subheading_small'>ОПИСАНИЕ :</span>
            <p className='place_description font_body_small' style={{ lineHeight: '26px' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quis culpa rem fugit aliquam aperiam maxime adipisci
              modi nostrum, vitae explicabo ipsam reiciendis ducimus
              consequuntur iure, voluptas vero. Officia, tenetur quidem.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quis culpa rem fugit aliquam aperiam maxime adipisci
              modi nostrum, vitae explicabo ipsam reiciendis ducimus.
            </p>
          </div>
          <div>
            <span className='font_subheading_small'>ТЭГ :</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacePage;
