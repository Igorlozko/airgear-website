'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import Categories, { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}


const RentModal = ()=>{
    const router = useRouter();
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

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
            guestCount: 1,
            imageSrc:'',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
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
    const onSubmit: SubmitHandler<FieldValues> = (data)=>{
        if (step != STEPS.PRICE){
            return onNext();
        }
        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(()=>{
            toast.success('Listing Created!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(()=>{
            toast.error('Something went wrong');
        }).finally(()=>{
            setIsLoading(false);
        })
    }

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
        <div className="flex flex-col gap-8">
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
                subtitle="Help guests find you"                
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
                    title ="guests"
                    subtitle="How many guests do you allow per item ?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount',value)}
                />
            </div>
        )
    }

    if(step == STEPS.IMAGES){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading
                    title = "Add photos of your gear"
                    subtitle="Show guests what your gear looks like"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value)=> setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }
    if(step == STEPS.DESCRIPTION){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading
                    title = "Describe your gear"
                    subtitle="Keep it short and simple"
                />
                <Input
                    id="title"
                    label="title"
                    disabled={isLoading}
                    register={register}
                    errors = {errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="description"
                    disabled={isLoading}
                    register={register}
                    errors = {errors}
                    required
                />
            </div>
        )
    }
    if(step == STEPS.PRICE){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading
                    title = "Set your price"
                    subtitle="How much do you charge ?"
                />
                <Input
                    id="price"
                    label="price"
                    formatPrice={true}
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLable={actionLable}
        secondaryActionLable={secondaryActionLable}
        secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
        title = "Rent your gear"
        body = {bodyContent}
        />
    );
}

export default RentModal;