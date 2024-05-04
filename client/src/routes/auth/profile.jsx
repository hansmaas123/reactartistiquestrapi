import { getProfile, getAuthData } from '../../services/auth';
import { useFetcher, useLoaderData, redirect, Link } from 'react-router-dom';

const loader = async ({ request }) => {
    const { user } = getAuthData();
    if (!user) {
        let params = new URLSearchParams();
        params.set("from", new URL(request.url).pathname);
        return redirect("/auth/login?" + params.toString());
    }

    const profile = await getProfile();
    return { profile };
}
const Profile = () => {
    const { profile } = useLoaderData();
    const fetcher = useFetcher();
    let isLoggingOut = fetcher.formData != null;

    return (
        <>
        <div className='profile__wrapper'>
            <h2 className='profile__title'>PERSONAL INFORMATION</h2>
            <dl className='profile__detail--wrapper'>
                <dt className='profile__name--title'>NAME</dt>
                <dd className='profile__name'>{profile.username}</dd>
                <dt className='profile__email--title'>EMAIL</dt>
                <dd className='profile__email'>{profile.email}</dd>
                <dl className='profile__auth--title'>AUTHENTICATION</dl>
                <dd className='profile__auth'>
                    <fetcher.Form method="post" action="/auth/logout">
                        <button className='logout__button' type="submit" disabled={isLoggingOut}>
                            {isLoggingOut ? "SINGING OUT..." : "SIGN OUT"}
                        </button>
                    </fetcher.Form>
                </dd>
            </dl>
            <div className='works__wrapper'>
                <h3 className='works__title'>MY PERSONAL ART</h3>
                <ul className='works__list'>
                    {profile.artworks.map((artwork) => (
                        <li className='works__list--item' key={artwork.id}>
                            <Link className='works__link' to={`/artwork/${artwork.id}`} >{artwork.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </>
    )
}

Profile.loader = loader

export default Profile;