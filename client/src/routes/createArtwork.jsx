import "../styles/style.css";
import { Form, redirect } from "react-router-dom";
import { createArtwork } from "../services/artwork";
import Art from '../components/Art'
import { useState } from 'react';

const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    await createArtwork(data);
    return redirect(`/`);
}

const CreateArtwork = () => {
    const [properties, setProperties] = useState({
        circles: Math.floor((Math.random() * 49) + 1),
        strokeDistance: 0.2,
        colour: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase(),
        angle: false,
        radiusX: 50,
        radiusY: 50,
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


    return (
        <>
            <Form method="POST">
                <div className="form__group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="title" name="title" />
                </div>

                <div className="form__group">
                    <label htmlFor="description"></label>
                    <textarea name="description" id="description" cols="30" rows="5" ></textarea>
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
        </>
    );
}

CreateArtwork.action = action;

export default CreateArtwork;