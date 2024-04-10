import axios from 'axios';

export const getUser = () =>  // we are going to check the user inside the local storage by using the getItem function from the local storage then if it's available we pass the data and get a javascript object of user
localStorage.getItem('user')
? JSON.parse(localStorage.getItem('user'))
: null;                      //if there is nothing in the local storage we return null(if user not logged in)


export const login = async (email, password) => {  // we give email and password as the input
    const { data } = await axios.post('api/users/login', {email, password});  //we send email and password
    localStorage.setItem('user', JSON.stringify(data));  //set user data to the local storage with the key of user and make that user data in to the string to make it possible to be saved inside
    return data;
};

export const register = async registerData => {
    const { data } = await axios.post('api/users/register', registerData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
};

export const logout = () => {        //remove the user from the local storage
    localStorage.removeItem('user');
};