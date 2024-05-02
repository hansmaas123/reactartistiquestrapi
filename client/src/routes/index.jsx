import { Link, useLoaderData } from "react-router-dom";
import { getArtworks } from '../services/artwork';
import ArtworkCard from '../components/ArtworkCard';
import styles from "./index.module.css"

const loader = async () => {
    const artworks = await getArtworks();
    return { artworks };
}

const Index = () => {
    const { artworks } = useLoaderData();
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