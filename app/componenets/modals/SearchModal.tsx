'use client'

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS{
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal =() =>{
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const[location, setLocation] = useState<CountrySelectValue>();

    const[step,setStep]= useState(STEPS.LOCATION);
    const[guestCount, setGuestCount] = useState(1);
    const[dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(()=> dynamic(() => import('../Map'), {
        ssr: false,
    }),[location]);

    const onBack = useCallback(()=>{
        setStep((value)=>value -1 )
    },[]);

    const onNext = useCallback(()=>{
        setStep((value)=>value +1 )
    },[]);

    const onSubmit = useCallback(async() =>{
        if(step != STEPS.INFO){
            return onNext();
        }

        let currentQuery ={};

        if(params){
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount
        };

        if(dateRange.startDate){
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }
        if(dateRange.endDate){
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url =qs.stringifyUrl({
            url:'/',
            query: updatedQuery
        },{skipNull: true});

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    },[step,searchModal, location,router,guestCount, dateRange,onNext,params]);

    const actionLabel = useMemo(()=>{
        if(step == STEPS.INFO){
            return 'Search';
        }

        return 'Next';

    },[step]);

    const secondaryactionLabel = useMemo(()=>{
        if(step == STEPS.LOCATION){
            return undefined;
        }

        return 'Back';

    },[step]);

    let bodyContent = (
        <div className="
        flex
        flex-col
        gap-8
        ">
            <Heading
                title="Pick a location ?"
                subtitle="Find the perfect gear"
            />
            <CountrySelect
                value={location}
                onChange={(value)=> 
                    setLocation(value as CountrySelectValue)
                }
            />
            <hr/>
            <Map center ={ location?.latlng}/>
        </div>
    )

    if(step == STEPS.DATE){
        bodyContent=(
            <div className=" flex flex-col gap-8">
                <Heading
                    title="When do you plan to rent?"
                    subtitle="Make sure that you are all set"
                />
                <Calendar
                    value={dateRange}
                    onChange={(value)=> setDateRange(value.selection)}
                />
            </div>
        )
    }

    if(step == STEPS.INFO){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading
                    title="How many are renting ?"
                    subtitle=""
                />
                <Counter
                    title ="Renters"
                    subtitle="Enter the number of renters per iteam ?"
                    value={guestCount}
                    onChange={(value)=> setGuestCount(value)}
                />
            </div>
        )
    }

    return(
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLable={actionLabel}
            secondaryActionLable={secondaryactionLabel}
            secondaryAction={step == STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    );
}

export default SearchModal;