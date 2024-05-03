import "../styles/style.css";
import PropTypes from 'prop-types';
import Art from './Art';

const ArtworkCard = ({ artwork }) => {

    return (
        <div className="card__wrapper">
            <h3 className="title">{artwork.title}</h3>
            <p>{artwork.title}</p>
            <Art circles={artwork.amount} colour={artwork.colour} strokeDistance={artwork.expand} angle={artwork.angle} radiusX={artwork.xradius} radiusY={artwork.yradius} />
        </div>
    );
}

ArtworkCard.propTypes = {
    artwork: PropTypes.object.isRequired
}

export default ArtworkCard;

