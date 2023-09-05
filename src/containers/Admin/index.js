import React from 'react'

import PropTypes from 'prop-types'

import { SideMenu } from '../../components/SideMenuAdmin'
import paths from '../../constants/paths'
import EditProduct from '../EditProduct'
import ListProducts from '../ListProducts'
import NewCategory from '../NewCategory'
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
                {path === paths.NewCategory && <NewCategory />}
                {path === paths.EditProduct && <EditProduct />}
            </Tables>
        </Container>
    )
}

Admin.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string
    })
}
