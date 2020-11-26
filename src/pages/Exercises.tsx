import { findIndex, includes, propEq, remove } from 'ramda'
import React, { useState } from 'react'
import { Box, Flex } from 'rebass'
import { Exercise, ExerciseCard, ExerciseListCard } from '../components/Exercise'
import { TitleBar } from '../components/TitleBar'
import { workoutState } from '../services/Workout'

export function ExercisesPage(props: any) {

    var exerciseList: Exercise[] = 

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
