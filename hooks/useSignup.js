import {useState, useContext} from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
// IMPORT FETCHING FUNCTIONS
import {signup} from '../lib/fetchFunctions'
//CONTEXT
import userContext from '../context/UserContext'

export default function useSignup(navigation) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [isSignupLoading, setisSignupLoading] = useState(false);
    const {setUserMail} = useContext(userContext)
    const handleEmailInput = (event) => {
      setEmail(event);
    };
  
    const handlePasswordInput = (event) => {
      setPassword(event);
    };
    
    const handleUserNameInput = (event) => {
      setUserName(event);
    };

    const handleSignupSubmit = async () => {
      setisSignupLoading(true)
        signup(email, password, userName)
            .then(data =>{
                // console.log('debugg signup ', data); // comentado el 25/08 porque parece que funciona bn
                 
                if (data.statusSignup===200) {
                    if (data.statusLogin===200) {
                        AsyncStorage.setItem('@cp_token', data.responseLogIn.id)
                        // @TODO set a User global state then, push to the home page
                        setUserMail(email.toLowerCase())
                        setUserName("")
                        setPassword("")
                        setEmail("")
                        setisSignupLoading(false)
                        navigation.push('Home')
                    } else {
                        setUserName("")
                        setPassword("")
                        setEmail("")
                        setisSignupLoading(false)
                        Alert.alert("Signup OK BUT Automatic Login Failed", `Please try to Login. Error, status code: ${data.statusLogin}, ${data.responseLogIn.Error}`, [
                            { text: "OK", onPress: () => navigation.push('Login') }
                          ],
                          { cancelable: false }
                        )
                    }
                } else {
                    Alert.alert("Sign Up Failed", `Please try again. Error, status code: ${data.responseSignup}, ${data.responseSignup.Error}`)
                    setUserName('')
                    setPassword('')
                    setEmail('')  
                    setisSignupLoading(false)        
                }
            })
            .catch(err=>{
                //@TODO log out and push to the log in page
                setUserName("")
                setPassword("")
                setEmail("")
                setisSignupLoading(false)
                console.log('hubo un error en el signup ', err);
            })
      };
    
    
    
    return {email, handleEmailInput, handleUserNameInput, userName, password, handlePasswordInput, handleSignupSubmit, isSignupLoading}
}
