import React from 'react'
import { Box, Flex, Heading } from 'rebass'
import { Exercise as Exercise, ExerciseInList } from '../components/Exercise'
import { TitleBar } from '../components/TitleBar'
import { Container } from '../theme'

interface Props {

}

export const Exercises = (props: Props) => {

    var exerciseList: Exercise[] = [
        { name: 'Squats', duration: 60, tags: ['thighs', 'buttocks'], images: ['/assets/exercises/squat.jpg'] },
        { name: 'Push-ups', duration: 30, tags: ['arms'], images: ['/assets/exercises/push-up.jpg'] },
        { name: 'Mountain Climbers', duration: 30, tags: ['arms', 'back', "thighs"], images: ['https://www.shape.com.sg/wp-content/uploads/2017/12/mountain_climbers_man.gif'] },
        { name: 'Lunges', duration: 60, tags: ['thighs', 'buttocks'], images: ['https://i.pinimg.com/originals/9d/71/d5/9d71d53fd3ee16d4c534289259167d1b.jpg'] },
        { name: 'Jumping Jacks', duration: 45, tags: ['cardio'], images: ['https://1.bp.blogspot.com/-xgT06ZsDsG8/VWpWDrS-wvI/AAAAAAAAGyc/IutIyq1uWRk/s1600/15-Minute%2BWorkouts%2B-%2BQuick%2Band%2BEasy%2BExercise%2BMoves-706069.jpg'] },
    ]

    var exerciseListToDisplay = (
        <Flex as='ul' flexWrap='wrap'>
            {exerciseList.map(ex => <ExerciseInList {...ex} />)}
        </Flex>
    );

    return (
        <>
            <TitleBar>
                Available Exercises
            </TitleBar>
            <Container as='main'>
                {exerciseListToDisplay}
            </Container>
        </>
    )
}
