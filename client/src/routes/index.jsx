import { Link, useLoaderData } from "react-router-dom";
import { getArtworks } from '../services/artwork';
import ArtworkCard from '../components/ArtworkCard';
import styles from "./index.module.css"
// import { useState } from 'react';

const loader = async () => {
    const artworks = await getArtworks();
    return { artworks };
}

const Index = () => {
    const { artworks } = useLoaderData();
    // const [properties, setProperties] = useState({
    //     circles: Math.floor((Math.random() * 49) + 1),
    //     strokeDistance: 0.2,
    //     colour: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase(),
    //     angle: false,
    //     radiusX: '50%',
    //     radiusY: '50%',
    // })
    return (
        <ul className={styles.artwork__list}>
            {artworks.map((artwork) => (
                <li key={artwork.id}>
                    <Link to={`/artwork/${artwork.id}`}>
                        <ArtworkCard artwork={artwork} />
                    </Link>
                </li>
            ))}
        </ul>
    );
}
Index.loader = loader;

export default Index; 