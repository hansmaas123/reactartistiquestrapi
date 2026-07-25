import { Form, redirect, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
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
    // Only the owner may edit. Anyone else (or an artwork with no owner) is
    // sent back to the detail page; the server's is-owner-artwork policy is
    // the real guard on the update/delete requests.
    const isOwner = artwork.owner?.data?.id && user.id == artwork.owner.data.id;
    if (!isOwner) {
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

    const [title, setTitle] = useState(artwork.title);
    const [description, setDescription] = useState(artwork.description);
    const canSubmit = title.trim() !== "" && description.trim() !== "";
    const navigate = useNavigate();
    const submit = useSubmit();

    const handleDelete = () => {
        if (confirm("Confirm to delete this artwork.")) {
            submit(null, { method: "post", action: "destroy" });
        }
    };

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
        <button type="button" className="back__button" onClick={() => navigate(-1)} aria-label="Go back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
            </svg>
            Back
        </button>
        <div className="editor">
        <aside className="editor__preview">
        <div className="artwork__visual">
                <Art circles={properties.circles} colour={properties.colour} strokeDistance={properties.strokeDistance} angle={properties.angle} radiusX={properties.radiusX} radiusY={properties.radiusY} />
        </div>
        </aside>
        <div className="editor__forms">
            <Form className="form" method="POST">
                <div className="form__group">
                    <label className="label" htmlFor="title">TITLE <span className="req">*</span></label>
                    <input type="text" className="input__field" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="form__group">
                    <label className="label" htmlFor="description">DESCRIPTION <span className="req">*</span></label>
                    <textarea className="input__field" name="description" id="description" cols="30" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="form__sliders--wrapper">
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
                </div>
                <div className="form__actions">
                    <input type="submit" className="submit__button" value="UPDATE ARTWORK" disabled={!canSubmit} />
                    <button type="button" className="delete__button" onClick={handleDelete} aria-label="Delete artwork" title="Delete artwork">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M3 6h18" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" />
                        </svg>
                    </button>
                </div>
            </Form>
        </div>
        </div>
        </>
    )
}


UpdateArtwork.loader = loader;
UpdateArtwork.action = action;

export default UpdateArtwork;
