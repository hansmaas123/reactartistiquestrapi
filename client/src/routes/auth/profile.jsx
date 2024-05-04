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
            <h2>PERSONAL INFORMATION</h2>
            <dl>
                <dt>NAME</dt>
                <dd>{profile.username}</dd>
                <dt>EMAIL</dt>
                <dd>{profile.email}</dd>
                <dl>AUTHENTICATION</dl>
                <dd>
                    <fetcher.Form method="post" action="/auth/logout">
                        <button type="submit" disabled={isLoggingOut}>
                            {isLoggingOut ? "Signing out..." : "Sign out"}
                        </button>
                    </fetcher.Form>
                </dd>
            </dl>
            <div>
                <h3>MY PERSONAL ART</h3>
                <ul>
                    {profile.artworks.map((artwork) => (
                        <li key={artwork.id}>
                            <Link to={`/artwork/${artwork.id}`} >{artwork.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

Profile.loader = loader

export default Profile;