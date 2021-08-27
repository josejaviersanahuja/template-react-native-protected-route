import {useState, useContext} from 'react'
import {Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

//CONTEXT
import userContext from '../context/UserContext'

//import fetching function
import {login} from '../lib/fetchFunctions'

export default function useLogin(navigation) {
    //------------------------------------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginLoading, setisLoginLoading] = useState(false)
  const {setUserMail} = useContext(userContext)
  const handleEmailInput = (event) => {
    setEmail(event);
  };

  const handlePasswordInput = (event) => {
    setPassword(event);
  };

  const handleLogInSubmit = () => {
    setisLoginLoading(true)
      login(email, password)
        .then(data =>{
          if (data.status===200) {
            AsyncStorage.setItem('@cp_token', data.token.id)
              .then(()=>{
                setUserMail(email.toLowerCase())
                setEmail("")
                setPassword("")
                setisLoginLoading(false)
                navigation.push('Home')
              })
            
          } else {
            Alert.alert('Log In Failed.', `Please try again. Error, status code: ${data.status}, ${data.token.Error}`)
            setEmail("")
            setPassword("")
            setisLoginLoading(false)
          }
        })
        .catch(err=>{
          //@TODO log out and push to the log in page
          console.log('hubo un error en el log in ', err);  
          setEmail("")
          setPassword("") 
          setisLoginLoading(false)
        })
  };
  //------------------------------------------------------------------
  return {email, password, handleEmailInput, handlePasswordInput, handleLogInSubmit, isLoginLoading}
}
