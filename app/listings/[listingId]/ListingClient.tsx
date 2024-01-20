'use client';

import Container from "@/app/componenets/Container";
import ListingHead from "@/app/componenets/listings/ListingHead";
import ListingInfo from "@/app/componenets/listings/ListingInfo";
import { categories } from "@/app/componenets/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const initialDateRange={
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingClientProps{
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser| null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [] ,
    currentUser
}) =>{

    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(()=>{
        let dates: Date[] = [];

        reservations.forEach((reservation) =>{
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        });

        return dates;
    },[reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);

    const category = useMemo(() => {
        return categories.find((item) =>
        item.label == listing.category);
    },[listing.category]);
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title ={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-7
                        md:gap-10
                        mt-6
                    ">   
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            guestCount={listing.guestCount}
                            locationValue={listing.locationValue}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ListingClient;