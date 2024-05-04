import { Link, useLoaderData } from "react-router-dom";
import { getArtworks } from '../services/artwork';
import ArtworkCard from '../components/ArtworkCard';
import "./../styles/style.css"
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
    <>
        <ul className="artwork__list">
            {artworks.map((artwork) => (
                <li className="artwork__list--item" key={artwork.id}>
                    <Link className="artwork__link" to={`/artwork/${artwork.id}`}>
                        <ArtworkCard artwork={artwork} />
                    </Link>
                </li>
            ))}
        </ul>
    </>
    );
}
Index.loader = loader;

export default Index; 