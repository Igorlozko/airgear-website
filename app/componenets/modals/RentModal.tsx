'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";


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

   //const secondaryActionLable = useMemo(()=>{
   // if(step == STEPS.CATEGORY){
   //     return undefined;
   // }
   // return 'Back';
   //},[step])

    let bodyContent = (
        <div className="flex dlex-col gap-8">
            <Heading
                title = "Which of these best describes your Gear"
                subtitle="Pick a category"
            />
        </div>
    )
    return (
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={rentModal.onClose}
        actionLable={actionLable}
     //   secondaryActionLable={secondaryActionLable}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title = "My Gear Repo"
        body = {bodyContent}
        />
    );
}

export default RentModal;