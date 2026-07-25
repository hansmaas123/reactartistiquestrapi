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
        <header className="gallery__intro">
            <span className="gallery__eyebrow">The collection</span>
            <h2 className="gallery__heading">Generative <em>circle</em> art</h2>
            <p className="gallery__sub">
                A living gallery of algorithmic artworks. Every piece is built from a
                handful of parameters — amount, expansion, colour and shape. Open one to
                explore it, or sign in to make your own.
            </p>
            <p className="gallery__count">{artworks.length} {artworks.length === 1 ? "piece" : "pieces"}</p>
        </header>
        {artworks.length === 0 ? (
            <p className="gallery__sub">No artworks yet — be the first to create one.</p>
        ) : (
            <ul className="artwork__list">
                {artworks.map((artwork) => (
                    <li className="artwork__list--item" key={artwork.id}>
                        <Link className="artwork__link" to={`/artwork/${artwork.id}`}>
                            <ArtworkCard artwork={artwork} />
                        </Link>
                    </li>
                ))}
            </ul>
        )}
    </>
    );
}
Index.loader = loader;

export default Index; 