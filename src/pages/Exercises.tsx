import { findIndex, includes, propEq, remove } from 'ramda'
import React, { useState } from 'react'
import { Box, Flex } from 'rebass'
import { Exercise, ExerciseCard, ExerciseListCard } from '../components/Exercise'
import { TitleBar } from '../components/TitleBar'
import { workoutState } from '../services/Workout'

export function ExercisesPage(props: any) {

    var exerciseList: Exercise[] = [
        { steps: 1, name: 'Squats', duration: 60, tags: ['thighs', 'buttocks'], images: ['assets/exercises/squats01.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/squat-exercise-illustration.gif'] },
        { steps: 1, name: 'Push-ups', duration: 30, tags: ['arms'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.gif'] },
        { steps: 1, name: 'Mountain Climbers', duration: 30, tags: ['arms', 'abs', 'thighs'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration-spotebi.gif'] },
        { steps: 1, name: 'Lunges', duration: 60, tags: ['thighs', 'buttocks'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/lunges-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/lunges-exercise-illustration.gif'] },
        { steps: 1, name: 'Jumping Jacks', duration: 45, tags: ['cardio', 'thighs'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/jumping-jacks-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/jumping-jacks-exercise-illustration.gif'] },
        { steps: 1, name: 'Bench Dips', duration: 20, tags: ['arms'], images: ['https://www.spotebi.com/wp-content/uploads/2015/04/tricep-dips-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2015/04/tricep-dips-exercise-illustration-spotebi.gif'] },
        { steps: 1, name: 'Arms Swings', duration: 60, tags: ['arms'], images: ['https://www.spotebi.com/wp-content/uploads/2016/06/arm-swings-exercise-illustration-spotebi.jpg', 'https://www.spotebi.com/wp-content/uploads/2016/06/arm-swings-exercise-illustration-spotebi.gif'] },
        { steps: 1, name: 'Plank', duration: 40, tags: ['abs'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/plank-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/plank-exercise-illustration.jpg'] },
        { steps: 1, name: 'Plank Leg Lifts', duration: 40, tags: ['abs', 'thighs'], images: ['https://www.spotebi.com/wp-content/uploads/2016/02/plank-leg-lifts-exercise-illustration-spotebi.jpg', 'https://www.spotebi.com/wp-content/uploads/2016/02/plank-leg-lifts-exercise-illustration-spotebi.gif'] },
        { steps: 1, name: 'Triceps Extension', duration: 60, tags: ['arms'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/dumbbell-triceps-extension-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/dumbbell-triceps-extension-exercise-illustration.gif'] },
        { steps: 1, name: 'Overhead Circles', duration: 60, tags: ['arms'], images: ['https://www.spotebi.com/wp-content/uploads/2016/03/medicine-ball-overhead-circles-exercise-illustration-spotebi.jpg', 'https://www.spotebi.com/wp-content/uploads/2016/03/medicine-ball-overhead-circles-exercise-illustration-spotebi.gif'] },
        { steps: 1, name: 'Bridge', duration: 60, tags: ['abs', 'arms'], images: ['https://www.spotebi.com/wp-content/uploads/2015/01/glute-bridge-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2015/01/glute-bridge-exercise-illustration-spotebi.gif'] },
        { steps: 2, name: 'Donkey Kicks', duration: 40, tags: ['abs'], images: ['https://www.spotebi.com/wp-content/uploads/2015/01/donkey-kicks-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2015/01/donkey-kicks-exercise-illustration.gif'] },
        { steps: 1, name: 'Skaters', duration: 30, tags: ['thighs'], images: ['https://www.spotebi.com/wp-content/uploads/2015/04/skaters-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2015/04/skaters-exercise-illustration.gif'] },
        { steps: 1, name: 'Side Lunges', duration: 40, tags: ['thighs'], images: ['https://www.spotebi.com/wp-content/uploads/2015/01/side-lunge-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2015/01/side-lunge-exercise-illustration.gif'] },
    ]

    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>(workoutState.workout)

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
