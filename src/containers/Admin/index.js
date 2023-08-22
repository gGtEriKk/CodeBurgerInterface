import React from 'react'

import PropTypes from 'prop-types'

import { SideMenu } from '../../components/SideMenuAdmin'
import paths from '../../constants/paths'
import ListProducts from '../ListProducts'
import NewProduct from '../NewProduct'
import Orders from './Orders'
import { Container, Tables } from './styles'

export function Admin({ match: { path } }) {
    return (
        <Container>
            <SideMenu path={path} />

            <Tables>
                {path === paths.Order && <Orders />}
                {path === paths.Products && <ListProducts />}
                {path === paths.NewProduct && <NewProduct />}
            </Tables>
        </Container>
    )
}

Admin.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string
    })
}
