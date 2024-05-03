import "../styles/style.css";
import { Form, redirect } from "react-router-dom";
import { createArtwork } from "../services/artwork";
import Slider from '../components/Slider';

const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    await createArtwork(data);
    return redirect(`/`);
}

const CreateArtwork = () => {
    return (
        <Form method="POST">
            <div className="form__group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" defaultValue="test artwork" />
            </div>

            <div className="form__group">
                <label htmlFor="description"></label>
                <textarea name="description" id="description" cols="30" rows="5" defaultValue="great"></textarea>
            </div>
            <Slider />
            <div className="form__group">
                <input type="submit" className="submit" value="Add this piece of cheese" />
            </div>
        </Form>
    );
}

CreateArtwork.action = action;

export default CreateArtwork;