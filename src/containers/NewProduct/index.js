import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import * as Yup from 'yup'

import { ErrorMessage } from '../../components'
import api from '../../services/api'
import {
    Container,
    Label,
    Input,
    ReactSelectStyle,
    ButtonStyle,
    LabelUpload
} from './styles'

function NewProduct() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [fileName, setFileName] = useState(null)

    const schema = Yup.object().shape({
        name: Yup.string().required('Este campo é obrigatório'),
        price: Yup.string().required('Este campo é obrigatório'),
        category: Yup.object().required('Este campo é obrigatório'),
        file: Yup.mixed()
            .test('required', 'Carregue uma imagem', value => {
                return value?.length > 0
            })
            .test('fileSize', 'Carregue uma imagem de até 2mb', value => {
                return value[0]?.size <= 2000000
            })
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

        await api.post('products', productDataFormData)
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
                    <Input type="text" {...register('name')} />
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>
                </div>

                <div>
                    <Label>Preço</Label>
                    <Input type="number" {...register('price')} />
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
                                />
                            )
                        }}
                    ></Controller>
                    <ErrorMessage>{errors.category?.message}</ErrorMessage>
                </div>

                <ButtonStyle>Adicionar</ButtonStyle>
            </form>
        </Container>
    )
}

export default NewProduct
