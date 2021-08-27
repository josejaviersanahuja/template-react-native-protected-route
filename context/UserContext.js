import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useState, useEffect} from 'react'
import {Alert} from 'react-native'
//importing fetching function
import {getUser} from '../lib/fetchFunctions.js'

//create context
const Context = React.createContext({ })

// Provider
export function UserContextProvider({children}) {
    //user will be the main context    
    const [user, setUser] = useState(undefined)
    //isUserLoading Para activar o desactivar funcionalidades como botones y spinner
    const [isUserLoading, setisUserLoading] = useState(false)
    //but userMail will be the key to retrieve the user from the server.
    const [userMail, setUserMail] = useState("")
    //onError va a determinar si hacemos logout por error de servidor, DB o fallo de seguridad
    const [onError, setOnError] = useState(false)
    
    // siempre que el key userMail cambie, hay cambio de usuario.
    useEffect(() => {
        //si el userMail no es vacío, 
        if (userMail !== '') {
            setisUserLoading(true)
            // getuser
            getUser(userMail)
                .then(data =>{
                    //si es ok, seteamos el user y seguimos con la APP
                    if (data.status===200) {
                        AsyncStorage.setItem('@cp_email', userMail)
                            .then(()=>{
                                setUser(data.user)
                                setisUserLoading(false)
                            })
                    } else {
                    // si la respuesta no es ok, entonces lanzamos un onError para acer logout y empezar de nuevo
                        Alert.alert("Failed connecting to server to retrieve user data", `Please try again. Error, status code: ${data.status}, ${response.Error}`, [
                            { text: "OK", onPress: () => {
                                    setOnError(true) 
                                    setisUserLoading(false)
                                }
                            }
                        ],
                        { cancelable: false }
                        )
                    }
                })
                .catch( err => {
                    //Si existe un error con el token o con el fetch, lo mismo
                    console.log(err, 'userContext line 48');
                    Alert.alert("Failed  retrieving the token", `Please try log in again.`, [
                        { text: "OK", onPress: () => {
                                setOnError(true)
                                setisUserLoading(false)
                            } 
                        }
                    ],
                    { cancelable: false }
                    )
                })
        }        
    }, [userMail])

    return <Context.Provider value={{user, userMail,setUser, setUserMail, onError, isUserLoading}}>
    {children}
    </Context.Provider>
}
export default Context