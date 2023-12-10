'use client';

import {signIn} from 'next-auth/react';
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
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import RegisterModal from './RegisterModal';

const LoginModal = () => {
    const router = useRouter();
    const registerModal = userRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const{
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials',{
            ...data,
            redirect: false
        })
        .then((callback)=>{
            setIsLoading(false);
            if(callback?.ok){
                toast.success('Logged in')
                router.refresh
                loginModal.onClose();
            }

            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const toggle = useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen();

    }, [loginModal, registerModal]);

    const bodyContent =(
        <div className = "flex flex-col gap-4">
            <Heading
                title="Welcome back !"
                subtitle="Login to your account"
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
                    onClick={() =>signIn('google')}
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
                            First time using Gear Repo ?
                        </div>
                        <div
                        onClick={toggle}
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        "
                        >
                            Create an account 
                        </div>
                    </div>

                </div>
        </div>
    )

    return(
        <Modal
            disabled ={isLoading}
            isOpen= {loginModal.isOpen}
            title="LogIn"
            actionLable="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
export default LoginModal;