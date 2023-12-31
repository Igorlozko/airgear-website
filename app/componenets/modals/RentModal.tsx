'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}


const RentModal = ()=>{
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);

    const{
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues:{
            category:'',
            location: null,
            renterCount: 1,
            imageSrc:'',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
    const renterCount = watch('renterCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }),[location]);

    const setCustomValue = (id: string, value: any) =>{
        setValue(id, value,{
            shouldValidate:true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    };
    const onNext = () =>{
        setStep((value) => value + 1);
    };

    const actionLable = useMemo(() => {
        if(step == STEPS.PRICE){
            return 'Create';
        }
        return 'Next';
    },[step]);

   const secondaryActionLable = useMemo(() => {
        if(step == STEPS.CATEGORY){
            return undefined;
        }
        return 'Back';
   },[step])

    let bodyContent = (
        <div className="flex dlex-col gap-8">
            <Heading
                title = "Which of these best describes your Gear"
                subtitle="Pick a category"
            />
            <div
                className ="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
                "
            >
                {categories.map((item) =>(
                    <div key = {item.label} className ="col-span-1" >
                        <CategoryInput
                            onClick={(category)=> setCustomValue('category',category)}
                            selected = {category == item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step == STEPS.LOCATION){
        bodyContent =(
            <div className = "flex flex-col gap-8">
                <Heading 
                title=" Where is your gear located"
                subtitle="Help renters find you"                
                />
                <CountrySelect 
                    value={location}
                    onChange={(value)=> setCustomValue('location', value)}
                />
                <Map 
                    center ={location?.latlng}
                />
            </div>
        )
    }

    if(step == STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title ="Share info about the iteam you are renting"
                    subtitle ="What is the specifications"
                />
                <Counter
                    title ="Renters"
                    subtitle="How many renters do you allow per item ?"
                    value={renterCount}
                    onChange={(value) => setCustomValue('renterCount',value)}
                />
            </div>
        )
    }

    if(step == STEPS.IMAGES){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading
                    title = "Add photos of your gear"
                    subtitle="Show renters what your gear looks like"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value)=> setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    return (
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={onNext}
        actionLable={actionLable}
        secondaryActionLable={secondaryActionLable}
        secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
        title = "My Gear Repo"
        body = {bodyContent}
        />
    );
}

export default RentModal;