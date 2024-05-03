import { getArtworkById } from "../services/artwork";
import { useLoaderData } from "react-router-dom";
import styles from "./artworkDetail.module.css";

const loader = async ({ params }) => {
    const id = params.id;
    const artwork = await getArtworkById(id);
    return { artwork };
};

const ArtworkDetail = () => {
    const { artwork } = useLoaderData();

    return (
        <div>
            <div className={styles.header}>
                <h2 className={styles.title}>{artwork.title}</h2>
            </div>
            <div className={styles.row}>
            </div>
        </div>
    );
};

ArtworkDetail.loader = loader;

export default ArtworkDetail;
