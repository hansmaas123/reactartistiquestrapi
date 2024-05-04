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
            <div className="header">
                <h2 className="title">{artwork.title}</h2>
                <Link to={`/artwork/${artwork.id}/update`}>Edit artwork</Link>
                <p className="description">{artwork.description}</p>
            </div>
            <div className="row">
            </div>
            <div className='art__wrapper'>
                <Art circles={artwork.amount} colour={artwork.colour} strokeDistance={artwork.expand} angle={artwork.angle} radiusX={artwork.xradius} radiusY={artwork.yradius} />
            </div>
        </div>
        
    );
};

ArtworkDetail.loader = loader;

export default ArtworkDetail;
