import './PlaceToGoButton.css';

function PlaceToGoButton({ place }) {
  const handlePlaceToGoSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/placetogos/${place.id}`, { method: 'POST' });
    const data = await response.json();
    console.log(data);
  };
  return (
        <div className='place_to_go_container'>
            <form action="#" onSubmit={handlePlaceToGoSubmit}>
                <button type='submit' className='place_to_go_btn'>Хочу пойти</button>
                <div className='font_caption_small'>
                    {place.PlaceToGos.length}
                </div>
            </form>
        </div>
  );
}
export default PlaceToGoButton;
