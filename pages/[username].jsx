import { fetchAllProfiles } from "@/utils/api";

function User({ user = {} }) {
    return (
        <>
            <div>
                <h1>You are looking for... @{user.username}</h1>
                <p>{JSON.stringify(user)}</p>
            </div>
        </>
    )
}

export default User;

export async function getServerSideProps(context) {
    const { username } = context.query;
    if (username == null) { return { redirect: { destination: '/feed', permanent: false }} }

    const jwt = context.req.cookies.token;
    if (jwt == null) { return { redirect: { destination: '/Login', permanent: false }} }

    const user = await fetchAllProfiles(jwt).then((profiles) => { return profiles.find(profile => profile.username === username) });
    if (user == undefined) { return { redirect: { destination: '/feed', permanent: false }} }

    return { props: { user } }
}