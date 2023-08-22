import React from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

import api from '../../../services/api'
import status from './order-status'
import { ProductImg, ReactSelectStyle } from './styles'

function Row({ row, orders, setOrders }) {
    const [open, setOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const setNewStatus = async (id, status) => {
        try {
            setIsLoading(true)
            await api.put(`orders/${id}`, {
                status
            })
            const newOrders = orders.map(order => {
                return order._id === id ? { ...order, status } : order
            })
            setOrders(newOrders)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <React.Fragment>
            <TableRow
                sx={{ '& > *': { borderBottom: 'unset' } }}
                style={{ background: '#3C3C3C' }}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                        style={{ color: '#ffffff' }}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell
                    component="th"
                    scope="row"
                    style={{ color: '#ffffff' }}
                >
                    {row.orderId}
                </TableCell>
                <TableCell style={{ color: '#ffffff' }}>{row.name}</TableCell>
                <TableCell style={{ color: '#ffffff' }}>{row.date}</TableCell>
                <TableCell>
                    {
                        <ReactSelectStyle
                            options={status.filter(
                                stts => stts.value !== 'Todos'
                            )}
                            menuPortalTarget={document.body}
                            placeholder={'Selecione o status...'}
                            defaultValue={status.find(
                                option => option.value === row.status
                            )}
                            onChange={newStatus => {
                                setNewStatus(row.orderId, newStatus.value)
                            }}
                            isLoading={isLoading}
                        />
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Pedido
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Quantidade</TableCell>
                                        <TableCell>Produtos</TableCell>
                                        <TableCell>Categoria</TableCell>
                                        <TableCell>Imagem do produto</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.products.map(productRow => (
                                        <TableRow key={productRow.id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {productRow.quantity}
                                            </TableCell>
                                            <TableCell>
                                                {productRow.name}
                                            </TableCell>
                                            <TableCell>
                                                {productRow.category}
                                            </TableCell>
                                            <TableCell>
                                                <ProductImg
                                                    src={productRow.url}
                                                    alt="product-image"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default Row

Row.propTypes = {
    orders: PropTypes.array,
    setOrders: PropTypes.func,
    row: PropTypes.shape({
        orderId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                quantity: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                category: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
}
