import React, { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './search.module.css';

export default function Search() {
  const [ term, setTerm ] = useState('');
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  useEffect(() => {                 // when we search something that name will be there in the search box after that operatin.in order to make the search box placeholder we use this.
       setTerm(searchTerm ?? '');
  }, [searchTerm]);

  const search = async () => {
    term ? navigate('/search/' + term) : navigate('/');
  };

  return (
     <div className={classes.container}>
     <input 
       type="text"
       placeholder='Search Food Mine!'
       onChange={e => setTerm(e.target.value)}
       onKeyUp={e => e.key === 'Enter' && search()}
       value = {term}    // when we search something that name will be there in the search box after that operatin.in order to make the search box placeholder we use this.
       />


       <button onClick={search}>Search</button>
     
     
     
     </div>
  )
  
}
