import React from 'react'
import { Box, Flex, Heading } from 'rebass'
import { Exercice, ExerciceInList } from '../components/Exercice'
import { TitleBar } from '../components/TitleBar'
import { Container } from '../theme'

interface Props {

}

export const Exercices = (props: Props) => {

    var exerciceList: Exercice[] = [
        { name: 'Flexions', duration: 60, tags: ['thighs', 'buttocks'], images: ['https://meilleurbruleursdegraisse.com/images/flexions-des-jambes.jpg'] },
        { name: 'Pompes', duration: 30, tags: ['arms'], images: ['https://upl.stack.com/wp-content/uploads/2012/10/Flex_o001_2_-e1350409352620.jpg'] },
        { name: 'Escalade', duration: 30, tags: ['arms', 'back', "thighs"] },
        { name: 'Flexions', duration: 60, tags: ['thighs', 'buttocks'] },
        { name: 'Jumping Jacks', duration: 45, tags: ['cardio'] },
    ]

    var exerciceListToDisplay = (
        <Flex as='ul' flexWrap='wrap'>
            {exerciceList.map(ex => <ExerciceInList {...ex} />)}
        </Flex>
    );

    return (
        <>
            <TitleBar>
                Available Exercices
            </TitleBar>
            <Container as='main'>
                {exerciceListToDisplay}
            </Container>
        </>
    )
}
