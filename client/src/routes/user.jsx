import { useLoaderData, Link } from "react-router-dom";
import { getUserById } from "../services/user";

const loader = async ({ params }) => {
    const user = await getUserById(params.id);
    return { user };
}

const User = () => {
    const { user } = useLoaderData();
    return(
        <>
            <h2>{user.username}</h2>
            <div>
                <h3>ARTWORKS BY {user.username}</h3>
                <ul>
                    {user.artworks.map((artwork) => (
                        <li key={artwork.id}>
                            <Link to={`/artwork/${artwork.id}`} >{artwork.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

User.loader = loader;

export default User;