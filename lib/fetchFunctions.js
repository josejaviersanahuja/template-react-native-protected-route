/**
 * lib with fetching functions 
 */
//DEPENDENCIES 
import AsyncStorage from '@react-native-async-storage/async-storage';

// funcion para hacer fetch a get user
export const getUser = async (email) => {
    //chequeamos el token y hacemos fetch a get user
    const token = await AsyncStorage.getItem('@cp_token')
    // la url 
    const url = `${process.env.BASE_URL}/users?email=${email}`;
    // fetch con el metodo y el headers
    const res = await fetch(url, {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "token":token
        }
      })
    // revisamos las respuestas
    const response = await res.json()

      // preparamos el objeto a devolver
    const data = {
        status:res.status,
        user:response
    }
    return data
}

// funcion para hacer fetch a get user
export const login = async (email, password) => {
    // preparamos url y el payload en el body
    const url = `${process.env.BASE_URL}/tokens`;
    const payload = { 
        email: email.toLowerCase(),
        password: password
    };
    // fetch con el metodo y el body
    const res = await fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(payload), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        }
      })
    // revisamos las respuesta que es el token
    const response = await res.json()
    //preparamos la respuesta
    const data = {
        status:res.status,
        token:response
    }
    return data
}

//post new user SIGNUP
export const signup = async (email, password, userName)=>{
    const answer = {}
    //urls for signup
    const url = `${process.env.BASE_URL}/users`;
    const payloadSignup = { 
          email: email.toLowerCase(),
          password: password,
          userName: userName
        };
    //FETCHING THE SIGNUP
    const resSignup = await fetch(url, {
            method: "POST", // or 'PUT'
            body: JSON.stringify(payloadSignup), // data can be `string` or {object}!
            headers: {
              "Content-Type": "application/json",
            }
          })
    const responseSignup = await resSignup.json()

    answer.statusSignup = resSignup.status
    answer.responseSignup = responseSignup
    // IF SIGNUP OK
    if (resSignup.status===200) {
        //THEN WE TRY TO LOG IN
        const token = await login(email, password)
        answer.statusLogin= token.status
        answer.responseLogIn = token.token
    } else {
        answer.statusLogin= 0
        answer.responseLogIn = {Error:'No Login as Signup failed'}
    }
    return answer   
}

export const logout= async (email) => {
  //urls for log out
  const url = `${process.env.BASE_URL}/tokens?email=${email}`;
  const token = await AsyncStorage.getItem('@cp_token')
  // fetch con el metodo y el headers
  const res = await fetch(url, {
    method: "DELETE", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      "token":token
    }
  })
  // if delete was ok, response.Message if delete was not ok, response.Error
  const response = await res.json()

  const data ={
    status: res.status,
    response: response
  }
  return data
}