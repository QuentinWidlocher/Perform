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
        { name: 'Escalade', duration: 30, tags: ['arms', 'back', "thighs"], images: ['https://www.shape.com.sg/wp-content/uploads/2017/12/mountain_climbers_man.gif'] },
        { name: 'Fentes', duration: 60, tags: ['thighs', 'buttocks'], images: ['https://i.pinimg.com/originals/9d/71/d5/9d71d53fd3ee16d4c534289259167d1b.jpg'] },
        { name: 'Jumping Jacks', duration: 45, tags: ['cardio'], images: ['https://1.bp.blogspot.com/-xgT06ZsDsG8/VWpWDrS-wvI/AAAAAAAAGyc/IutIyq1uWRk/s1600/15-Minute%2BWorkouts%2B-%2BQuick%2Band%2BEasy%2BExercise%2BMoves-706069.jpg'] },
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
