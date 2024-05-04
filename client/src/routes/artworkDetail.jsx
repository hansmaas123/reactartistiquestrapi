import { getArtworkById } from "../services/artwork";
import { useLoaderData, Link } from "react-router-dom";
import "./../styles/style.css";
import Art from '../components/Art';


const loader = async ({ params }) => {
    const id = params.id;
    const artwork = await getArtworkById(id);
    return { artwork };
};

const ArtworkDetail = () => {
    const { artwork } = useLoaderData();

    return (
        <div>
            <div className="header__detail">
                <div className="details__wrapper">
                <h2 className="artwork__title">{artwork.title}</h2>
                <p className="description">DESCRIPTION: {artwork.description}</p>
                <p className="by">MADE BY:</p>
                <Link className="creator" to={`/user/${artwork.owner.data.id}`}>
                    {`BY ${artwork.owner.data.attributes.username}`}
                </Link>
                </div>
            <div className='art__wrapper'>
                <div className="artwork__detail--visual">
                <Art circles={artwork.amount} colour={artwork.colour} strokeDistance={artwork.expand} angle={artwork.angle} radiusX={artwork.xradius} radiusY={artwork.yradius} />
                </div>
                <Link className="update__link" to={`/artwork/${artwork.id}/update`}>UPDATE ARTWORK</Link>
            </div>
            </div>
            <div className="row">
            </div>
        </div>
        
    );
};

ArtworkDetail.loader = loader;

export default ArtworkDetail;
