
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast }  from 'react-toastify';
import { createOrder } from '../../services/orderService';
import  classes from './checkoutPage.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import Map from '../../components/Map/Map';
export default function CheckoutPage() {

    const { cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [order, setOrder] = useState({...cart });  //order has all the items of the cart(put a shallow copy of the cart inside the order)
   
    const {                                           //create a form for getting the data from the user
        register,
        formState: { errors},
        handleSubmit,
    } = useForm();


     const submit = async data => {
        if (!order.addressLatLng) {                                                    //check if the user didn't select the address on the map
            toast.warning('please select your location on the map');                  //if user didn't select location
            return ;
        }


        await createOrder({ ...order, name: data.name, address: data.address });  // user selected location
        navigate ('/payment');
     };


  return (
    <>
    <form onSubmit={handleSubmit(submit)} className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.inputs}>
            <Input
              defaultValue={user.name}
              label="Name"
              {...register('name')}
              error={errors.name}
            />
            <Input
              defaultValue={user.address}
              label="Address"
              {...register('address')}
              error={errors.address}
            />
            </div> 
        <OrderItemsList order={order} /> 
        </div>
        <div>
          <Title title="Choose Your Location" fontSize="1.6rem" />
          <Map
             location={order.addressLatLng}
             onChange={latlng => {
               console.log(latlng);
               setOrder({ ...order, addressLatLng: latlng });
             }}
           />
        </div>

        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
          <Button
              type="submit"
              text="Go To Payment"
              width="100%"
              height="3rem"
            />
          </div>
          </div>
      </form>
    
 </>

);
  
}
