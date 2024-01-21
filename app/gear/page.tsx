import EmptyState from "../componenets/EmptyState";
import ClientOnly from "../componenets/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import GearClient from "./GearClient";
import getListings from "../actions/getListings";

const GearPage = async () =>{
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    });

    if(listings.length == 0){
        <ClientOnly>
                <EmptyState
                    title="No gear found"
                    subtitle="Looks like you haven't listed any gear"
                />
        </ClientOnly>
    }

    return(
        <ClientOnly>
            <GearClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default GearPage;