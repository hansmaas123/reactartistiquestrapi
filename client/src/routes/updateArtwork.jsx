import { Form, redirect, useLoaderData } from "react-router-dom";
import  "../styles/style.css";
import { getArtworkById, editArtwork } from "../services/artwork";
import Art from "../components/Art";
import { useState } from "react";
import { getAuthData } from "../services/auth";

const loader = async ({ request, params }) => {
    const { user } = getAuthData();
    if (!user) {
        let params = new URLSearchParams();
        params.set("from", new URL(request.url).pathname);
        return redirect("/auth/login?" + params.toString());
    }
    const artwork = await getArtworkById(params.id);
    if (user.id != artwork.owner.data.id) {
        return redirect(`/artwork/${params.id}`);
    }
    return { artwork };
};

const action = async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    await editArtwork(params.id, data);
    return redirect(`/artwork/${params.id}`);
};

const UpdateArtwork = () => {
    const { artwork } = useLoaderData();

    const [properties, setProperties] = useState({
        circles: artwork.amount,
        strokeDistance: artwork.expand,
        colour: artwork.colour,
        angle: artwork.angle,
        radiusX: artwork.xradius,
        radiusY: artwork.yradius,
    })

    const handleSliderAmountChange = (e) => {
        let updatedValue = { "circles": parseInt(e.target.value, 10) }
        setProperties(properties => ({
            ...properties,
            ...updatedValue
        }))
    }
    const handleColourChange = (e) => {
        let updatedValue = { "colour": e.target.value }
        setProperties(properties => ({
            ...properties,
            ...updatedValue
        }))
    }
    const handleSliderStrokeDistanceChange = (e) => {
        let updatedValue = { "strokeDistance": parseInt(e.target.value, 10) }
        setProperties(properties => ({
            ...properties,
            ...updatedValue
        }))
    }
    const handleCheckboxChange = (e) => {
        console.log(e.target.checked)
        let updatedValue = {
            "angle": e.target.checked,
            "radiusX": 50,
            "radiusY": 50,
        }
        setProperties(properties => ({
            ...properties,
            ...updatedValue
        }));
        console.log(properties.angle);
    }
    const handleSliderRadiusXChange = (e) => {
        let updatedValue = { "radiusX": parseInt(e.target.value, 10) }
        setProperties(properties => ({
            ...properties,
            ...updatedValue
        }))
    }
    const handleSliderRadiusYChange = (e) => {
        let updatedValue = { "radiusY": parseInt(e.target.value, 10) }
        setProperties(properties => ({
            ...properties,
            ...updatedValue
        }))
    }
    console.log(properties);

    return (
        <>
            <Form method="POST">
                <div className="form__group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="title" name="title" defaultValue={artwork.title} required />
                </div>

                <div className="form__group">
                    <label htmlFor="description"></label>
                    <textarea name="description" id="description" cols="30" rows="5" defaultValue={artwork.description} required></textarea>
                </div>

                <label className="label">
                    <span>Amount</span>
                    <input
                        type="range"
                        min={1}
                        max={50}
                        value={properties.circles}
                        id="amount"
                        name="amount"
                        onChange={handleSliderAmountChange}
                    />
                </label>
                <label className="label">
                    <span>Expand</span>
                    <input
                        type="range"
                        min={0}
                        max={20}
                        value={properties.strokeDistance}
                        id="expand"
                        name="expand"
                        onChange={handleSliderStrokeDistanceChange}
                    />
                </label>
                <label className="label">
                    <span>Colour</span>
                    <input
                        type="color"
                        value={properties.colour}
                        id="colour"
                        name="colour"
                        onChange={handleColourChange}
                    />
                </label>
                <label className="label">
                    <span>Switch angle</span>
                    <input
                        className='checkbox'
                        type="checkbox"
                        id="angle"
                        name="angle"
                        onChange={handleCheckboxChange}
                        value={properties.angle}
                    />
                </label>
                <label className="label">
                    <span>X-radius</span>
                    <input
                        type="range"
                        min={1}
                        max={100}
                        value={properties.radiusX}
                        id="xradius"
                        name="xradius"
                        onChange={handleSliderRadiusXChange}
                    />
                </label>
                <label className="label">
                    <span>Y-radius</span>
                    <input
                        type="range"
                        min={1}
                        max={100}
                        value={properties.radiusY}
                        id="yradius"
                        name="yradius"
                        onChange={handleSliderRadiusYChange}
                    />
                </label>
                <div className="form__group">
                    <input type="submit" className="submit" value="Add this artwork" />
                </div>
            </Form>
            <Art circles={properties.circles} colour={properties.colour} strokeDistance={properties.strokeDistance} angle={properties.angle} radiusX={properties.radiusX} radiusY={properties.radiusY} />
            <Form
                method="post"
                action="destroy"
                onSubmit={(event) => {
                    if (!confirm("Confirm to delete this artwork.")) {
                        event.preventDefault();
                    }
                }}
            >
                <button type="submit">DELETE</button>
            </Form>
        </>
    )
}


UpdateArtwork.loader = loader;
UpdateArtwork.action = action;

export default UpdateArtwork;
