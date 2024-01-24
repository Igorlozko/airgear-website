import EmptyState from "../componenets/EmptyState";
import ClientOnly from "../componenets/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import ProfileClient from "./ProfileClient";

const ProfilePage = async ()=>{
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    return(
        <ClientOnly>
            <ProfileClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ProfilePage;