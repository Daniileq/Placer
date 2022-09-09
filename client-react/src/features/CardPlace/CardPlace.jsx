import React from 'react';
import './CardPlace.css';

const CardPlace = () => (
    <div className='cardPlace'>
        <div className='cardPlaceImage'>
            {/* <img src="#" alt='best place'/> */}
        </div>
        <div className='cardPlaceTags'>
            <div className='cardPlaceTag'>tag #1</div>
            <div className='cardPlaceTag'>tag #2</div>
        </div>
        <h4 className="cardPlaceTitle">Place#1</h4>
        <p className="cardPlaceText">
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
