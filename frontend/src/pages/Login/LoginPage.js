import React, { useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import classes from './loginPage.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function LoginPage() {
    const {
        handleSubmit,   //this responsible for calling the submit function when there is no validation error
        register,       //this is for sending all the events and references that is need for handling the validation
        formState: { errors},  // this formState and errors are going to have all the validation errors our form has

    } = useForm();

    const navigate = useNavigate(); //after successful login navigate user to another page
    const { user, login } = useAuth();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl');


    useEffect(() => {
        if (!user) return;


        returnUrl ? navigate(returnUrl) : navigate('/');
    }, [user]);

   const submit = async ({ email, password }) => {
    await login (email, password);
   };
   
    return (
    <div className={classes.container}>
      <div className={classes.details}>
           < Title title="Login" />
           <form onSubmit={handleSubmit(submit)} noValidate>
           <Input
            type="email"
            label="Email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: 'Email Is Not Valid',
              },
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: true,
            })}
            error={errors.password}
          />

          <Button type="submit" text="Login" />

          <div className={classes.register}>
            New user? &nbsp; 
            <Link to = {`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
              Register Here
            </Link>
            
            </div>    
           </form>
          </div>
      </div>


  );
}
