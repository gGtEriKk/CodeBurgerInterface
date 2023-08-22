import React from 'react'

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import PropTypes from 'prop-types'

import { useUser } from '../../hooks/UserContext'
import listLinks from './menu-list'
import { Container, MenuLinksContainer, ListLink } from './styles'

export function SideMenu({ path }) {
    const { logout } = useUser()

    return (
        <Container>
            <div>
                <hr></hr>
                {listLinks.map(item => (
                    <MenuLinksContainer key={item.id}>
                        <ListLink to={item.link} isactive={path === item.link}>
                            <item.icon className="icon" />
                            {item.label}
                        </ListLink>
                    </MenuLinksContainer>
                ))}
                <hr></hr>
            </div>
            <div>
                <MenuLinksContainer>
                    <ListLink to={'/login'} onClick={() => logout()}>
                        <LogoutOutlinedIcon className="icon" />
                        Sair
                    </ListLink>
                </MenuLinksContainer>
            </div>
        </Container>
    )
}

SideMenu.propTypes = {
    path: PropTypes.string
}
