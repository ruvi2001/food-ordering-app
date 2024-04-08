import React, { useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../services/foodService';
import classes from './foodPage.module.css';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import Price from '../../components/Price/Price';
import { useCart } from '../../hooks/useCart';
import NotFound from '../../components/NotFound/NotFound';
import axios from 'axios';

export default function FoodPage() {
  
  const [food, setFood] = useState({});
  const {id} = useParams();
  const {addToCart} = useCart();
  const navigate = useNavigate(); //for navigating the user inside a function we need to use this useNavigate hook.
  const handleAddToCart = () => {
   
    addToCart(food);     //use to navigate the user to the cart page whenever user clicks on add to cart button
    navigate('/cart');
};

   useEffect(() => {
   
      getById(id).then(setFood);
 },[id]);
  
  return ( 
    <>
     { !food ? (<NotFound message="Food Not Found!" linkText="Back To Homepage " />  //if the food is not available
     ): (
         <div className={classes.container}>
          <img 
          className={classes.image}
          src={`${food.imageUrl}`}
          alt={food.name}
    />
    

    <div className={classes.details}>
      <div className={classes.header}>
         <span className={classes.name}>{food.name}</span>
         <span 
         className={`${classes.favourite} ${
            food.favourite? '': classes.not
            }`}
            >
           ❤
         </span>
      </div>
        <div className={classes.rating}>
            <StarRating stars={food.stars} size={25} />
        </div>

        <div className={classes.origins}>
           {food.origins?.map(origin => (
            <span key={origin}>{origin}</span>


           ))}
       </div>

       <div className={classes.tags}>
          {food.tags && (
            <Tags 
            tags={food.tags.map(tag => ({ name: tag}))} 
            forFoodPage={true}
            />
          )}
          </div>
       <div className={classes.cook_time}>
        <span>
            Time to cook about  <strong>{food.cookTime}</strong>  minutes
        </span>
       </div>
     
     <div className={classes.price}>
       <Price price={food.price} />
       </div>

       <button onClick={handleAddToCart}> Add to cart</button>
       </div>
      </div>
      
    )}
   </>

  );
    
  
}
