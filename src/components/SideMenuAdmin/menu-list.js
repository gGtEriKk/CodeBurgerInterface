import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'

import paths from '../../constants/paths'

const listLinks = [
    {
        id: 1,
        label: 'Pedidos',
        link: paths.Order,
        icon: ShoppingBagOutlinedIcon
    },
    {
        id: 2,
        label: 'Produtos',
        link: paths.Products,
        icon: StorefrontOutlinedIcon
    },
    {
        id: 3,
        label: 'Adicionar produto',
        link: paths.NewProduct,
        icon: AddOutlinedIcon
    }
]

export default listLinks
