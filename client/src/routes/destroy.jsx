import { redirect } from "react-router-dom";
import { deleteArtwork } from "../services/artwork";


export const action = async ({ params }) => {
    await deleteArtwork(params.id);
    return redirect(`/`);
}
