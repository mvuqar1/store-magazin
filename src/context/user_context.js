import React, { useContext} from 'react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value='user context'>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
