import React from 'react';
import './CardPlace.css';

const CardPlace = () => (
    <div className='card_place'>
        <div className='card_place_image'>
            {/* <img src="#" alt='best place'/> */}
        </div>
        <div className='card_place_tags'>
            <div className='card_place_tag'>tag #1</div>
            <div className='card_place_tag'>tag #2</div>
        </div>
        <h4 className="card_place_title">Place#1</h4>
        <p className="card_place_text">
            Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Unde fugit rem iure quas
            provident voluptatibus vel hic tenetur assumenda,
            ratione necessitatibus ipsum esse nemo, nisi
            illum cum facilis impedit nesciunt!
            {/* {
                    cardText.length ? cardText : cardText// проверка на длину текста из БД
                } */}
        </p>
    </div>
);

export default CardPlace;
