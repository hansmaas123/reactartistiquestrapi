import "../styles/style.css";
import PropTypes from 'prop-types';
import Art from './Art';

const ArtworkCard = ({ artwork }) => {

    return (
        <div className="card__wrapper">
            <div className="artwork__card--wrapper">
                <h3 className="artwork__title">{artwork.title}</h3>
                <Art circles={artwork.amount} colour={artwork.colour} strokeDistance={artwork.expand} angle={artwork.angle} radiusX={artwork.xradius} radiusY={artwork.yradius} />
            </div>
        </div>
    );
}

ArtworkCard.propTypes = {
    artwork: PropTypes.object.isRequired
}

export default ArtworkCard;

