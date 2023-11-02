'use client';

import Container from "../Container";

import {TbBeach, TbCampfire} from 'react-icons/tb';
import {GiBoots, GiFishing, GiHuntingBolas, GiPaddleSteamer, GiWindmill} from 'react-icons/gi';
import {MdOutlineHiking, MdOutlinePedalBike, MdOutlineSnowboarding, MdOutlineSurfing, MdOutlineVilla} from 'react-icons/md';
import{FaSkiing} from 'react-icons/fa';
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Camping',
        icon: TbCampfire,
        description: 'This is camping eqpt'
    },
    {
        label: 'Hiking',
        icon: MdOutlineHiking,
        description: 'This is Hiking'
    },
    {
        label: 'Footwear',
        icon: GiBoots,
        description: 'This is Footwear'
    },
    {
        label: 'Bikes',
        icon: MdOutlinePedalBike,
        description: 'This is Bikes'
    },
    {
        label: 'Water Sports',
        icon: MdOutlineSurfing,
        description: 'This is Water Sports'
    },
    {
        label: 'Snow',
        icon: FaSkiing,
        description: 'This is Winter Sports'
    },
    {
        label: 'Fishing',
        icon: GiFishing,
        description: 'This is Fishing'
    },
    {
        label: 'Hunting',
        icon: GiHuntingBolas,
        description: 'This is Fishing'
    },
]



const Categories = () =>{
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname == '/';

    if(!isMainPage){
        return null;
    }

    return(
        <Container>
            <div
                className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
                "
            >
                {categories.map((item) =>(
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category == item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;