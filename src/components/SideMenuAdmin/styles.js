import { Link } from 'react-router-dom'

import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #3c3c3c;
    box-shadow: 0px 0px 14px 0px #00000026;
    width: 20vw;
    margin: 0;
    padding: 75px 15px 15px 15px;
    min-height: 100vh;

    hr {
        background: #e9ecef;
    }
`

export const MenuLinksContainer = styled.div`
    padding: 5px 0;
`

export const ListLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 15px 20px;
    background: ${props => (props.isactive ? '#565656;' : 'none')};
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    cursor: pointer;
    text-decoration: none;

    .icon {
        color: #9758a6;
    }
`
