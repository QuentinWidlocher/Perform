import { findIndex, includes, propEq, remove } from 'ramda'
import React, { useState } from 'react'
import { Box, Flex } from 'rebass'
import { Exercise, ExerciseCard, ExerciseListCard } from '../components/Exercise'
import { TitleBar } from '../components/TitleBar'

export function ExercisesPage(props: any) {

    var exerciseList: Exercise[] = [
        { name: 'Squats', duration: 60, tags: ['thighs', 'buttocks'], images: ['assets/exercises/squats01.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/squat-exercise-illustration.gif'] },
        { name: 'Push-ups', duration: 30, tags: ['arms'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.gif'] },
        { name: 'Mountain Climbers', duration: 30, tags: ['arms', 'abs', 'thighs'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration-spotebi.gif'] },
        { name: 'Lunges', duration: 60, tags: ['thighs', 'buttocks'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/lunges-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/lunges-exercise-illustration.gif'] },
        { name: 'Jumping Jacks', duration: 45, tags: ['cardio', 'thighs'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/jumping-jacks-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/jumping-jacks-exercise-illustration.gif'] },
        { name: 'Bench Dips', duration: 30, tags: ['arms'], images: ['https://www.spotebi.com/wp-content/uploads/2015/04/tricep-dips-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2015/04/tricep-dips-exercise-illustration-spotebi.gif'] },
        { name: 'Arms Swings', duration: 60, tags: ['arms'], images: ['https://www.spotebi.com/wp-content/uploads/2016/06/arm-swings-exercise-illustration-spotebi.jpg', 'https://www.spotebi.com/wp-content/uploads/2016/06/arm-swings-exercise-illustration-spotebi.gif'] },
        { name: 'Plank', duration: 40, tags: ['abs'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/plank-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/plank-exercise-illustration.jpg'] },
        { name: 'Plank Leg Lifts', duration: 40, tags: ['abs', 'thighs'], images: ['https://www.spotebi.com/wp-content/uploads/2016/02/plank-leg-lifts-exercise-illustration-spotebi.jpg', 'https://www.spotebi.com/wp-content/uploads/2016/02/plank-leg-lifts-exercise-illustration-spotebi.gif'] },
        { name: 'Triceps Extension', duration: 60, tags: ['arms'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/dumbbell-triceps-extension-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/dumbbell-triceps-extension-exercise-illustration.gif'] },
        { name: 'Overhead Circles', duration: 60, tags: ['arms'], images: ['https://www.spotebi.com/wp-content/uploads/2016/03/medicine-ball-overhead-circles-exercise-illustration-spotebi.jpg', 'https://www.spotebi.com/wp-content/uploads/2016/03/medicine-ball-overhead-circles-exercise-illustration-spotebi.gif'] },
        { name: 'Hindu Push-ups', duration: 20, tags: ['arms'], images: ['https://www.spotebi.com/wp-content/uploads/2016/03/hindu-push-ups-exercise-illustration-spotebi.jpg', 'https://www.spotebi.com/wp-content/uploads/2016/03/hindu-push-ups-exercise-illustration-spotebi.gif'] },
    ]

    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])

    var findIndexOfExercise = (ex: Exercise) => findIndex(propEq('name', ex.name), selectedExercises)
    var isExerciseSelected = (ex: Exercise): boolean => includes(ex, selectedExercises)

    var ExerciseCardsList = () => {

        function exerciceSelectToggle(index: number) {
            
            var toggledExercise = exerciseList[index]
            
            var updatedSelectedList = [...selectedExercises]
            if (isExerciseSelected(toggledExercise)) {
                updatedSelectedList = remove(findIndexOfExercise(toggledExercise), 1, updatedSelectedList)
            } else {
                updatedSelectedList.push(toggledExercise)
            }

            setSelectedExercises(updatedSelectedList)
        }

        return (
            <Flex as='ul' flexWrap='wrap'>
                {exerciseList.map((ex, i) => (
                    <ExerciseCard
                        {...ex}
                        selected={isExerciseSelected(ex)}
                        key={`${ex.name}-${i}-card`}
                        onClick={() => exerciceSelectToggle(i)}
                    />
                ))}
            </Flex>
        )
    };

    var MemoizedExerciseCardsList = React.memo(ExerciseCardsList)

    return (
        <>
            <TitleBar>
                Available Exercises
            </TitleBar>
            <Box as='main' mb='10rem'>
                <MemoizedExerciseCardsList/>
            </Box>
            <aside>
                <ExerciseListCard exs={selectedExercises} exsChange={setSelectedExercises} />
            </aside>
        </>
    )
}
