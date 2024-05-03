import "../styles/style.css";
import PropTypes from 'prop-types';
import Art from './Art';

const ArtworkCard = ({ artwork }) => {
    const json = artwork.svg;

    return (
        <div className="card__wrapper">
            <h3 className="title">{artwork.title}</h3>
            <p>{artwork.svg.name}</p>
            <Art circles={JSON.parse(json.circles)} colour={json.colour} strokeDistance={JSON.parse(json.strokeDistance)} angle={JSON.parse(json.angle)} radiusX={json.radiusX} radiusY={json.radiusY} />
        </div>
    );
}

ArtworkCard.propTypes = {
    artwork: PropTypes.object.isRequired
}

export default ArtworkCard;

