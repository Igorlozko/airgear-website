'use client';

import axios from 'axios';
import {AiFillFacebook, AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc"
import{useCallback, useState} from 'react';
import{
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import userRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/input';
import toast from 'react-hot-toast/headless';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import LoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
    const registerModal = userRegisterModal();
    const loginModal = LoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const{
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register',data)
        .then(()=>{
            toast.success("Success");
            registerModal.onClose();
            loginModal.onOpen(); // open log in modal when user signs up
        })
        .catch((error) =>{
            toast.error('Something went wrong');
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    const toggle = useCallback(()=>{
        registerModal.onClose();
        loginModal.onOpen();

    }, [loginModal, registerModal]);

    const bodyContent =(
        <div className = "flex flex-col gap-4">
            <Heading
                title="Welcome to The Gear Repo"
                subtitle="Create an account"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent =(
        <div className="flex flex-col gap-4 mt-3">
                <hr />
                <Button
                    outline
                    label="Continue with Google"
                    icon={FcGoogle}
                    onClick={() => signIn('google')}
                />
                {/*<Button
                    outline
                    label="Continue with Facebook"
                    icon={AiFillFacebook}
                    onClick={() =>{}}
                />*/}
                <div className="
                text-neutral-500
                text-center
                mt-4
                font-light
                "
                >
                    <div className="justify-center flex flex-row items-center gap-2">
                        <div>
                            Already have an account ?
                        </div>
                        <div
                        onClick={toggle}
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        "
                        >
                            Log In
                        </div>
                    </div>

                </div>
        </div>
    )

    return(
        <Modal
            disabled ={isLoading}
            isOpen= {registerModal.isOpen}
            title="Register"
            actionLable="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
export default RegisterModal;