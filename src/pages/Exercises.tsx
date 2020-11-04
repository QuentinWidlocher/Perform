import React, { ReactElement, useState } from 'react'
import { Exercise, ExerciseCard, ExerciseList, ExerciseListCard } from '../components/Exercise'
import { TitleBar } from '../components/TitleBar'
import { Box, Card, Flex } from 'rebass'
import { curry, adjust, update, prop, lensProp, set, not, over, omit } from 'ramda'

export type SelectableExercises = Exercise & { selected: boolean }

interface Props { }

export function ExercisesPage(props: any) {

    const [exerciseList, setExerciseList] = useState<SelectableExercises[]>([
        { selected: false, name: 'Squats', duration: 60, tags: ['thighs', 'buttocks'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/squat-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/squat-exercise-illustration.gif'] },
        { selected: false, name: 'Push-ups', duration: 30, tags: ['arms'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.gif'] },
        { selected: false, name: 'Mountain Climbers', duration: 30, tags: ['arms', 'abs', 'thighs'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration-spotebi.gif'] },
        { selected: false, name: 'Lunges', duration: 60, tags: ['thighs', 'buttocks'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/lunges-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/lunges-exercise-illustration.gif'] },
        { selected: false, name: 'Jumping Jacks', duration: 45, tags: ['cardio'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/jumping-jacks-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/jumping-jacks-exercise-illustration.gif'] },
        { selected: false, name: 'Bench Dips', duration: 30, tags: ['arms'], images: ['https://www.spotebi.com/wp-content/uploads/2015/04/tricep-dips-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2015/04/tricep-dips-exercise-illustration-spotebi.gif'] },
        { selected: false, name: 'Arms Swings', duration: 60, tags: ['arms'], images: ['https://www.spotebi.com/wp-content/uploads/2016/06/arm-swings-exercise-illustration-spotebi.jpg', 'https://www.spotebi.com/wp-content/uploads/2016/06/arm-swings-exercise-illustration-spotebi.gif'] },
        { selected: false, name: 'Plank', duration: 40, tags: ['abs'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/plank-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/plank-exercise-illustration.jpg'] },
        { selected: false, name: 'Plank Leg Lifts', duration: 40, tags: ['abs', 'thighs'], images: ['https://www.spotebi.com/wp-content/uploads/2016/02/plank-leg-lifts-exercise-illustration-spotebi.jpg', 'https://www.spotebi.com/wp-content/uploads/2016/02/plank-leg-lifts-exercise-illustration-spotebi.gif'] },
    ])

    var selectedExerciseList = () => exerciseList.filter(ex => ex.selected)

    var ExerciseCardsList = () => {

        function exerciceSelectToggle(index: number) {
            var itemWithSelectUpdated = over(lensProp('selected'), not, exerciseList[index])
            var updatedList = update(index, itemWithSelectUpdated, exerciseList)
            setExerciseList(updatedList)
        }

        return (
            <Flex as='ul' flexWrap='wrap'>
                {exerciseList.map((ex, i) => (
                    <ExerciseCard
                        {...ex}
                        key={`${ex.name}-${i}-card`}
                        onClick={() => exerciceSelectToggle(i)}
                    />
                ))}
            </Flex>
        )
    };

    return (
        <>
            <TitleBar>
                Available Exercises
            </TitleBar>
            <Box as='main' mb='10rem'>
                <ExerciseCardsList />
            </Box>
            <aside>
                <ExerciseListCard exs={selectedExerciseList()} />
            </aside>
        </>
    )
}
