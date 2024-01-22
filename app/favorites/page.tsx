import EmptyState from "../componenets/EmptyState";
import ClientOnly from "../componenets/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async ()=>{
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if(listings.length == 0){
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you don't have any favorite listings"
                />
            </ClientOnly>
        )
    } 

    return(
        <ClientOnly>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ListingPage;