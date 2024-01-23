'use client';

import Container from "../Container";

import {TbBackpack, TbBeach, TbCampfire, TbKayak} from 'react-icons/tb';
import {GiBackpack, GiBoots, GiCampingTent, GiFishing, GiHuntingBolas, GiPaddleSteamer, GiPaddles, GiShotgunRounds, GiWindmill} from 'react-icons/gi';
import {MdElectricBike, MdOutlineHiking, MdOutlinePedalBike, MdOutlineSnowboarding, MdOutlineSurfing, MdOutlineVilla} from 'react-icons/md';
import{FaSkiing, FaSnowboarding} from 'react-icons/fa';
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Pedal',
        icon: MdOutlinePedalBike,
        description: 'Pedal bikes'
    },
    {
        label: 'E Bikes',
        icon: MdElectricBike,
        description: 'E Bikes'
    },
    {
        label: 'Kayaks',
        icon: TbKayak,
        description: 'E Bikes'
    },
    {
        label: 'Surf-Boards',
        icon: MdOutlineSurfing,
        description: 'Surfboards'
    },
    {
        label: 'Paddle-Boards',
        icon: GiPaddles,
        description: 'E Bikes'
    },
    {
        label: 'Tents',
        icon: GiCampingTent,
        description: 'This is camping eqpt'
    },
    {
        label: 'Backpacks',
        icon: GiBackpack,
        description: 'Backpacks to rent'
    },
    {
        label: 'Footwear',
        icon: GiBoots,
        description: 'This is Footwear'
    },
    {
        label: 'Ski gear',
        icon: FaSkiing,
        description: 'This is Winter Sports'
    },
    {
        label: 'Snowboard gear',
        icon: FaSnowboarding,
        description: 'This is Winter Sports'
    },
    {
        label: 'Fishing',
        icon: GiFishing,
        description: 'This is Fishing'
    },
    {
        label: 'Hunting',
        icon: GiShotgunRounds,
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