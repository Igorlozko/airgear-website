import Container from "../componenets/Container";
import Heading from "../componenets/Heading";
import ListingCard from "../componenets/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";
import getCurrentUser from "../actions/getCurrentUser";
import Avatar from "../componenets/Avatar";

interface ProfileClientProps{
    listings:SafeListing[];
    currentUser?: SafeUser | null;
}

const ProfileClient: React.FC<ProfileClientProps> = ({
    listings,
    currentUser
}) =>{
    return(
        <Container>
            <div className="
                        flex
                        flex-col
                        items-center
                        mt-10
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        2xl:grid-cols-6
                        gap-8
                    "
            >
                <Heading
                    title = "Profile"
                    subtitle = "Your info"
                />
            </div>
            <div className="
                    flex
                    flex-col
                    items-center
                    mt-10
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                "
            
            >
                <Avatar 
                    src={currentUser?.image}
                    height={150} // Adjust the height as needed for the profile page
                    width={150} // Adjust the width as needed for the profile page
                />
                <hr/>
                <h1>{currentUser?.name}</h1>
                <p>Email: {currentUser?.email}</p>
                <p>Created At: {currentUser?.createdAt}</p>
            </div>
        </Container>
    );
}

export default ProfileClient;