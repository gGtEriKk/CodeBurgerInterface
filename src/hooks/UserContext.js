import React, { createContext, useContext, useEffect, useState } from 'react'

import PropTypes from 'prop-types'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({})

    const putUserdata = async userInfo => {
        await localStorage.setItem(
            'codeburger:userData',
            JSON.stringify(userInfo)
        )
    }

    const logout = async () => {
        await localStorage.removeItem('codeburger:userData')
    }

    useEffect(() => {
        const loadUserData = async () => {
            const clientInfo = await localStorage.getItem('codeburger:userData')
            if (clientInfo) {
                setUserData(JSON.parse(clientInfo))
            }
        }
        loadUserData()
    }, [])

    return (
        <UserContext.Provider value={{ putUserdata, userData, logout }}>
            ({children})
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error('useUser must be used with UserContext')
    }

    return context
}

UserProvider.propTypes = {
    children: PropTypes.node
}
