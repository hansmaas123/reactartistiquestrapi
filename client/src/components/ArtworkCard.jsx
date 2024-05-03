import styles from "./ArtworkCard.module.css";
import PropTypes from 'prop-types';
import Art from './Art';

const ArtworkCard = ({ artwork }) => {
    const json = artwork.svg;

    return (
        <div className={styles.card__wrapper}>
            <h3 className={styles.title}>{artwork.title}</h3>
            <p>{artwork.svg.name}</p>
            <Art circles={JSON.parse(json.circles)} colour={json.colour} strokeDistance={JSON.parse(json.strokeDistance)} angle={JSON.parse(json.angle)} radiusX={json.radiusX} radiusY={json.radiusY} />
        </div>
    );
}

ArtworkCard.propTypes = {
    artwork: PropTypes.object.isRequired
}

export default ArtworkCard;

ArtworkCard.propTypes = {
    circles: PropTypes.number.isRequired,
    strokeDistance: PropTypes.number.isRequired,
    colour: PropTypes.string.isRequired,
    angle: PropTypes.bool.isRequired,
    radiusX: PropTypes.string.isRequired,
    radiusY: PropTypes.string.isRequired,
    handleColourChange: PropTypes.func.isRequired,
    handleSliderAmountChange: PropTypes.func.isRequired,
    handleSliderStrokeDistanceChange: PropTypes.func.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    handleSliderRadiusXChange: PropTypes.func.isRequired,
    handleSliderRadiusYChange: PropTypes.func.isRequired,

}