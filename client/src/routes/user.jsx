import { useLoaderData, Link } from "react-router-dom";
import { getUserById } from "../services/user";
import '../styles/style.css'

const loader = async ({ params }) => {
    const user = await getUserById(params.id);
    return { user };
}

const User = () => {
    const { user } = useLoaderData();
    return(
        <>
            <h2 className="user__title">{user.username}</h2>
            <div className="works__wrapper">
                <h3 className="works__title">ARTWORKS BY {user.username}</h3>
                <ul className="works__list">
                    {user.artworks.map((artwork) => (
                        <li className="works__list--item" key={artwork.id}>
                            <Link className="works__link" to={`/artwork/${artwork.id}`} >{artwork.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

User.loader = loader;

export default User;