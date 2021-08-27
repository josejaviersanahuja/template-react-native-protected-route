import React, {useState} from 'react'

//create context
const Context = React.createContext({ })

// Provider
export function MenuContextProvider({children}) {
    //user will be the main context    
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    return <Context.Provider value={{ isMenuOpen, setIsMenuOpen }}>
    {children}
    </Context.Provider>
}
export default Context