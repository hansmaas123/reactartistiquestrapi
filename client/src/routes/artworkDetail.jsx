import { getArtworkById } from "../services/artwork";
import { useLoaderData } from "react-router-dom";
import "./../styles/style.css";
import Art from '../components/Art';
// import Slider from './components/Slider';
// import { useState } from 'react';


const loader = async ({ params }) => {
    const id = params.id;
    const artwork = await getArtworkById(id);
    return { artwork };
};

const ArtworkDetail = () => {
    const { artwork } = useLoaderData();
    const json = artwork.svg;
    console.log(json);
    // console.log(JSON.parse(json));
    // const obj = JSON.parse(json);
    // const [properties, setProperties] = useState({
    //     circles: Math.floor((Math.random() * 49) + 1),
    //     strokeDistance: 0.2,
    //     colour: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase(),
    //     angle: false,
    //     radiusX: '50%',
    //     radiusY: '50%',
    // })


    return (
        <div>
            <div className="header">
                <h2 className="title">{artwork.title}</h2>
                <p className="description">{artwork.description}</p>
            </div>
            <div className="row">
            </div>
            <div className='art__wrapper'>
                <Art circles={JSON.parse(json.circles)} colour={json.colour} strokeDistance={JSON.parse(json.strokeDistance)} angle={JSON.parse(json.angle)} radiusX={json.radiusX} radiusY={json.radiusY} />
            </div>
        </div>
        
    );
};

ArtworkDetail.loader = loader;

export default ArtworkDetail;
