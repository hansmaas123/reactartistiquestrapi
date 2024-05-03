import styles from "./ArtworkCard.module.css";
import PropTypes from 'prop-types';

const ArtworkCard = ({ artwork }) => {
    return (
        <div className={styles.card__wrapper}>
            <h3 className={styles.title}>{artwork.title}</h3>
        </div>
    );
}

ArtworkCard.propTypes = {
    artwork: PropTypes.object.isRequired
}

export default ArtworkCard;