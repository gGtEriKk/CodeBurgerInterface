import React from 'react'

import HomeImage from '../../assets/home-image-2.svg'
import { CategoryCarousel, OffersCarousel } from '../../components'
import { HomeImg, Container } from './styles'

export function Home() {
    return (
        <Container>
            <HomeImg src={HomeImage} alt="hamburger-image" />

            <CategoryCarousel />
            <OffersCarousel />
        </Container>
    )
}
