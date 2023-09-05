import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import * as Yup from 'yup'

import { ErrorMessage } from '../../components'
import paths from '../../constants/paths'
import api from '../../services/api'
import {
    Container,
    Label,
    Input,
    ReactSelectStyle,
    ButtonStyle,
    LabelUpload,
    ContainerOffer
} from './styles'

function EditProduct() {
    const [categories, setCategories] = useState([])
    const [fileName, setFileName] = useState(null)
    const {
        push,
        location: {
            state: { product }
        }
    } = useHistory()

    const schema = Yup.object().shape({
        name: Yup.string().required('Este campo é obrigatório'),
        price: Yup.string().required('Este campo é obrigatório'),
        category: Yup.object().required('Este campo é obrigatório'),
        offer: Yup.boolean()
    })

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = async data => {
        const productDataFormData = new FormData()

        productDataFormData.append('name', data.name)
        productDataFormData.append('price', data.price)
        productDataFormData.append('file', data.file[0])
        productDataFormData.append('category_id', data.category.id)
        productDataFormData.append('offer', data.offer)

        await toast.promise(
            api.put(`products/${product.id}`, productDataFormData),
            {
                pending: 'Atualizando informações do produto...',
                success: 'Produto atualizado com sucesso!!!',
                error: 'Falha ao atualizar produto. Tente novamente!'
            }
        )

        setTimeout(() => {
            push(paths.Products)
        }, 2000)
    }

    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('categories')

            setCategories(data)
        }
        loadCategories()
    }, [])

    return (
        <Container>
            <form id="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label>Nome</Label>
                    <Input
                        type="text"
                        {...register('name')}
                        defaultValue={product.name}
                    />
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>
                </div>

                <div>
                    <Label>Preço</Label>
                    <Input
                        type="number"
                        {...register('price')}
                        defaultValue={product.price}
                    />
                    <ErrorMessage>{errors.price?.message}</ErrorMessage>
                </div>

                <div>
                    <LabelUpload>
                        {fileName || (
                            <>
                                <CloudUploadOutlinedIcon
                                    style={{ color: '#9758A6' }}
                                />
                                Carregue uma imagem
                            </>
                        )}
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            {...register('file')}
                            onChange={value => {
                                setFileName(value.target.files[0]?.name)
                            }}
                        />
                    </LabelUpload>
                    <ErrorMessage>{errors.file?.message}</ErrorMessage>
                </div>

                <div>
                    <Controller
                        defaultValue={product.category}
                        name="category"
                        control={control}
                        render={({ field }) => {
                            return (
                                <ReactSelectStyle
                                    {...field}
                                    options={categories}
                                    getOptionLabel={cat => cat.name}
                                    getOptionValue={cat => cat.id}
                                    placeholder="...Selecione a categoria"
                                    defaultValue={product.category}
                                />
                            )
                        }}
                    ></Controller>
                    <ErrorMessage>{errors.category?.message}</ErrorMessage>
                </div>
                <ContainerOffer>
                    <Label>Produto em oferta:</Label>
                    <input
                        type="checkbox"
                        {...register('offer')}
                        defaultChecked={product.offer}
                    />
                </ContainerOffer>

                <ButtonStyle>Atualizar</ButtonStyle>
            </form>
        </Container>
    )
}

export default EditProduct
