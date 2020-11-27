import { any, clone, equals, intersperse, isEmpty, isNil, not, prop, range, uniqBy } from 'ramda'
import React, { CSSProperties, ReactElement, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { Box, Flex, FlexProps } from 'rebass'
import useSound from 'use-sound'
import { Exercise } from '../../components/Exercises/Exercise'
import { isFilled, isNotEmpty, isNotNil } from '../../services/Helpers'
import { workoutState } from '../../services/Workout'
import { RedScreen } from './RedScreen'
import { WhiteScreen } from './WhiteScreen'

const dingSound = require('../../assets/sounds/ding.mp3')
const cheeringSound = require('../../assets/sounds/cheering.mp3')

// Status Graph
// https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFJcbiAgd2FpdGluZ1RvU3RhcnQgLS0tPiBpblByb2dyZXNzXG4gIGluUHJvZ3Jlc3MgLS0tPiBicmVha0JlZm9yZU5leHRcbiAgYnJlYWtCZWZvcmVOZXh0IC0tLT58MTVzfCBpblByb2dyZXNzXG4gIGluUHJvZ3Jlc3MgLS0tPiBlbmRlZFxuICBwYXVzZWQ8LS0-IGluUHJvZ3Jlc3Ncblx0XHQiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCIsInRoZW1lVmFyaWFibGVzIjp7ImJhY2tncm91bmQiOiJ3aGl0ZSIsInByaW1hcnlDb2xvciI6IiNFQ0VDRkYiLCJzZWNvbmRhcnlDb2xvciI6IiNmZmZmZGUiLCJ0ZXJ0aWFyeUNvbG9yIjoiaHNsKDgwLCAxMDAlLCA5Ni4yNzQ1MDk4MDM5JSkiLCJwcmltYXJ5Qm9yZGVyQ29sb3IiOiJoc2woMjQwLCA2MCUsIDg2LjI3NDUwOTgwMzklKSIsInNlY29uZGFyeUJvcmRlckNvbG9yIjoiaHNsKDYwLCA2MCUsIDgzLjUyOTQxMTc2NDclKSIsInRlcnRpYXJ5Qm9yZGVyQ29sb3IiOiJoc2woODAsIDYwJSwgODYuMjc0NTA5ODAzOSUpIiwicHJpbWFyeVRleHRDb2xvciI6IiMxMzEzMDAiLCJzZWNvbmRhcnlUZXh0Q29sb3IiOiIjMDAwMDIxIiwidGVydGlhcnlUZXh0Q29sb3IiOiJyZ2IoOS41MDAwMDAwMDAxLCA5LjUwMDAwMDAwMDEsIDkuNTAwMDAwMDAwMSkiLCJsaW5lQ29sb3IiOiIjMzMzMzMzIiwidGV4dENvbG9yIjoiIzMzMyIsIm1haW5Ca2ciOiIjRUNFQ0ZGIiwic2Vjb25kQmtnIjoiI2ZmZmZkZSIsImJvcmRlcjEiOiIjOTM3MERCIiwiYm9yZGVyMiI6IiNhYWFhMzMiLCJhcnJvd2hlYWRDb2xvciI6IiMzMzMzMzMiLCJmb250RmFtaWx5IjoiXCJ0cmVidWNoZXQgbXNcIiwgdmVyZGFuYSwgYXJpYWwiLCJmb250U2l6ZSI6IjE2cHgiLCJsYWJlbEJhY2tncm91bmQiOiIjZThlOGU4Iiwibm9kZUJrZyI6IiNFQ0VDRkYiLCJub2RlQm9yZGVyIjoiIzkzNzBEQiIsImNsdXN0ZXJCa2ciOiIjZmZmZmRlIiwiY2x1c3RlckJvcmRlciI6IiNhYWFhMzMiLCJkZWZhdWx0TGlua0NvbG9yIjoiIzMzMzMzMyIsInRpdGxlQ29sb3IiOiIjMzMzIiwiZWRnZUxhYmVsQmFja2dyb3VuZCI6IiNlOGU4ZTgiLCJhY3RvckJvcmRlciI6ImhzbCgyNTkuNjI2MTY4MjI0MywgNTkuNzc2NTM2MzEyOCUsIDg3LjkwMTk2MDc4NDMlKSIsImFjdG9yQmtnIjoiI0VDRUNGRiIsImFjdG9yVGV4dENvbG9yIjoiYmxhY2siLCJhY3RvckxpbmVDb2xvciI6ImdyZXkiLCJzaWduYWxDb2xvciI6IiMzMzMiLCJzaWduYWxUZXh0Q29sb3IiOiIjMzMzIiwibGFiZWxCb3hCa2dDb2xvciI6IiNFQ0VDRkYiLCJsYWJlbEJveEJvcmRlckNvbG9yIjoiaHNsKDI1OS42MjYxNjgyMjQzLCA1OS43NzY1MzYzMTI4JSwgODcuOTAxOTYwNzg0MyUpIiwibGFiZWxUZXh0Q29sb3IiOiJibGFjayIsImxvb3BUZXh0Q29sb3IiOiJibGFjayIsIm5vdGVCb3JkZXJDb2xvciI6IiNhYWFhMzMiLCJub3RlQmtnQ29sb3IiOiIjZmZmNWFkIiwibm90ZVRleHRDb2xvciI6ImJsYWNrIiwiYWN0aXZhdGlvbkJvcmRlckNvbG9yIjoiIzY2NiIsImFjdGl2YXRpb25Ca2dDb2xvciI6IiNmNGY0ZjQiLCJzZXF1ZW5jZU51bWJlckNvbG9yIjoid2hpdGUiLCJzZWN0aW9uQmtnQ29sb3IiOiJyZ2JhKDEwMiwgMTAyLCAyNTUsIDAuNDkpIiwiYWx0U2VjdGlvbkJrZ0NvbG9yIjoid2hpdGUiLCJzZWN0aW9uQmtnQ29sb3IyIjoiI2ZmZjQwMCIsInRhc2tCb3JkZXJDb2xvciI6IiM1MzRmYmMiLCJ0YXNrQmtnQ29sb3IiOiIjOGE5MGRkIiwidGFza1RleHRMaWdodENvbG9yIjoid2hpdGUiLCJ0YXNrVGV4dENvbG9yIjoid2hpdGUiLCJ0YXNrVGV4dERhcmtDb2xvciI6ImJsYWNrIiwidGFza1RleHRPdXRzaWRlQ29sb3IiOiJibGFjayIsInRhc2tUZXh0Q2xpY2thYmxlQ29sb3IiOiIjMDAzMTYzIiwiYWN0aXZlVGFza0JvcmRlckNvbG9yIjoiIzUzNGZiYyIsImFjdGl2ZVRhc2tCa2dDb2xvciI6IiNiZmM3ZmYiLCJncmlkQ29sb3IiOiJsaWdodGdyZXkiLCJkb25lVGFza0JrZ0NvbG9yIjoibGlnaHRncmV5IiwiZG9uZVRhc2tCb3JkZXJDb2xvciI6ImdyZXkiLCJjcml0Qm9yZGVyQ29sb3IiOiIjZmY4ODg4IiwiY3JpdEJrZ0NvbG9yIjoicmVkIiwidG9kYXlMaW5lQ29sb3IiOiJyZWQiLCJsYWJlbENvbG9yIjoiYmxhY2siLCJlcnJvckJrZ0NvbG9yIjoiIzU1MjIyMiIsImVycm9yVGV4dENvbG9yIjoiIzU1MjIyMiIsImNsYXNzVGV4dCI6IiMxMzEzMDAiLCJmaWxsVHlwZTAiOiIjRUNFQ0ZGIiwiZmlsbFR5cGUxIjoiI2ZmZmZkZSIsImZpbGxUeXBlMiI6ImhzbCgzMDQsIDEwMCUsIDk2LjI3NDUwOTgwMzklKSIsImZpbGxUeXBlMyI6ImhzbCgxMjQsIDEwMCUsIDkzLjUyOTQxMTc2NDclKSIsImZpbGxUeXBlNCI6ImhzbCgxNzYsIDEwMCUsIDk2LjI3NDUwOTgwMzklKSIsImZpbGxUeXBlNSI6ImhzbCgtNCwgMTAwJSwgOTMuNTI5NDExNzY0NyUpIiwiZmlsbFR5cGU2IjoiaHNsKDgsIDEwMCUsIDk2LjI3NDUwOTgwMzklKSIsImZpbGxUeXBlNyI6ImhzbCgxODgsIDEwMCUsIDkzLjUyOTQxMTc2NDclKSJ9fSwidXBkYXRlRWRpdG9yIjpmYWxzZX0
export type Status = 'waitingToStart' | 'breakBeforeNext' | 'paused' | 'inProgress' | 'ended'

export type WorkoutStep = {
    status: Status,
    duration?: number,
    exercise?: Exercise,
    step?: number,
}

export function WorkoutPage(): ReactElement {

    const secondsBeforeStarting = 5
    const secondsToRest = 15

    //#region States

    var [exerciseList, setExerciseList] = useState<Exercise[]>(workoutState.workout)

    // The workout is a list of steps containing waiting, exercises, breaks and end
    var [workout, setWorkout] = useState<WorkoutStep[]>([])

    var [workoutIndex, setWorkoutIndex] = useState(-1)

    var [countdown, setCountDown] = useState(0)

    var [isPaused, setIsPaused] = useState(false)

    var [timer, setTimer] = useState<number>()

    var [playDingSound] = useSound(dingSound)

    var [playCheeringSound] = useSound(cheeringSound)

    //#endregion

    //#region Utils (pure)

    var getStatus = (w: WorkoutStep) => prop('status', w)
    var getExercise = (w: WorkoutStep) => prop('exercise', w)

    var getCurrentStep = (): WorkoutStep => workout[workoutIndex]
    var getCurrentExercise = () => getExercise(getCurrentStep())
    var getCurrentStatus = () => getStatus(getCurrentStep())
    var statusIs = equals(getCurrentStatus())
    var statusIsOneOf = any(statusIs)
    var statusHasCountdown = () => statusIsOneOf(['waitingToStart', 'inProgress', 'breakBeforeNext'])

    var getNextStep = (): WorkoutStep => workout[workoutIndex + 1]
    var getNextExercise = () => getExercise(getNextStep())

    var playMultipleDingSound = (timesToPlay = 1) => {
        var i = 0
        var t = setInterval(() => {
            if (i < timesToPlay) {
                playDingSound()
                i++
            } else {
                clearInterval(t)
            }
        }, 500)
    }

    // The workout only get filled when the user press the launch button
    var isWorkoutStarted = () => isFilled(workout)

    //#endregion

    //#region Utils (impure)

    var goToNextStep = () => setWorkoutIndex(workoutIndex + 1)

    var decrementCountdown = () => setCountDown(countdown - 1)

    var createWorkoutFromExercises = (exercises: Exercise[] = exerciseList): WorkoutStep[] => {

        // Exercises can be multi-steps so we create arrays of workout steps
        var createWorkoutStepsFromExercise = (e: Exercise): WorkoutStep[] => {
            return range(0, e.steps).map((_, i) => (
                { 
                    status: 'inProgress', 
                    duration: e.duration / e.steps, 
                    exercise: e, 
                    step: e.steps > 1 ? (i+1) : undefined,
                }
            ))
        }

        // We create the basic steps
        var breakStep: WorkoutStep = { status: 'breakBeforeNext', duration: secondsToRest }
        var waitingToStartStep: WorkoutStep = { status: 'waitingToStart', duration: secondsBeforeStarting }
        var endedStep: WorkoutStep = { status: 'ended' }

        // We use flatMap to flatten the workout steps
        var workoutWithExercises: WorkoutStep[] = clone(exercises).flatMap(createWorkoutStepsFromExercise)

        // We put breaks betwee all steps (not the first and last)
        var workoutWithBreaks: WorkoutStep[] = intersperse(breakStep, workoutWithExercises)
          
        // We need to remove the break between two exercise steps so they can chain
        //     i.e We need to remove this one   v
        // wait ->m e1:1 -> break -> e2:1 -> [break] -> e2:2 -> break -> e3:1 -> end
        var removeBreakBetweenSteps = (v: WorkoutStep, i: number, a: WorkoutStep[]) => {
            // We only check breakBeforeNext steps with a next item
            if (i + 1 <= a.length && v.status == 'breakBeforeNext') {
                var nextItem = a[i + 1]
                // If the next item is a stepped exercise we remove the break
                if (!!nextItem?.step && nextItem.step > 1) {
                    return null
                }
            }
            return v
        }

        // We filter out the null so we get a nice workoutWithBreaks
        workoutWithBreaks = workoutWithBreaks.map(removeBreakBetweenSteps).filter((x): x is WorkoutStep => isNotNil(x))

        // The workout is the start step, followed by the exercises interspersed with breaks and the the end step
        return [waitingToStartStep, ...workoutWithBreaks, endedStep]
    }

    /**
     * Pausing requires clearing the timeout so it doesn't continue to tick
     */
    var togglePause = () => {
        var newPause = not(isPaused)

        setIsPaused(newPause)

        if (newPause) {
            clearTimeout(timer)
        } else {
            setCountDown(countdown)
        }
    }

    /**
     * Skipping requires clearing the timeout so it doesn't continue to tick
     */
    var nextStep = () => {
        clearTimeout(timer)
        goToNextStep()
    }

    var launch = () => {
        if (not(isWorkoutStarted())) {
            var createdWorkout = createWorkoutFromExercises()
            setWorkout(createdWorkout)

            // We extract the exercises from the workout and then save them to the global workout state
            // so we can store in the LocalStorage the right order
            var exerciseListWithDuplicates = createdWorkout.map(x => x.exercise).filter((e): e is Exercise => isNotNil(e))
            var exerciseList = uniqBy(prop('name'), exerciseListWithDuplicates)
            workoutState.workout = exerciseList
        }

        goToNextStep()
    }

    //#endregion

    //#region Hooks

    // Update when step change
    useEffect(() => {
        var currentWorkoutState = workout[workoutIndex]

        if (statusHasCountdown()) {
            var timeToSet = currentWorkoutState.duration || 0
            setCountDown(timeToSet)
        }

        if (statusIs('inProgress')) {
            playDingSound()
        } else if (statusIs('breakBeforeNext')) {
            playMultipleDingSound(2)
        } else if (statusIs('ended')) {
            playCheeringSound()
        }

    }, [workoutIndex])

    // Update when countdown change
    useEffect(function tickOneSecondIfNeeded() {

        var mustTickOneSecond = statusHasCountdown() && countdown >= 0 && not(isPaused)

        if (mustTickOneSecond) {
            var timer = setTimeout(() => {
                decrementCountdown()
                if (countdown <= 0) {
                    goToNextStep()
                }
            }, 1000)

            setTimer(timer)
        }

    }, [countdown, isPaused])

    //#endregion

    //#region Style 

    var fullscreenClass: FlexProps = {
        height: ['100vh'],
        color: 'primaryContrast',
        variant: 'gradient',
    }

    var splitScreenClass: FlexProps = {
        width: '100%',
        height: '100%',
    }

    var stackableGridStyles: CSSProperties = {
        display: 'grid',
        gridTemplateRows: '1fr',
        gridTemplateColumns: '1fr',
    }

    //#endregion

    //#region Page
    var page = isFilled(workoutState.workout) ? (
        <Flex {...fullscreenClass} flexDirection={['column', 'row']}>
            <Box 
                {...splitScreenClass} 
                sx={{ flexBasis: '100%', ...stackableGridStyles }} 
                backgroundColor="white" 
                color="black"
                overflowY='auto'
            >
                <WhiteScreen
                    exerciseList={exerciseList}
                    onExerciseListChange={setExerciseList}
                    status={getCurrentStatus()}
                    workoutStarted={isWorkoutStarted()}
                    currentExercise={getCurrentExercise()}
                    nextExercise={getNextExercise()}
                />
            </Box>
            <Flex {...splitScreenClass} p={2}>
                <RedScreen 
                    workoutStarted={isWorkoutStarted()}
                    currentStep={getCurrentStep()}
                    nextExercise={getNextExercise()}
                    status={getCurrentStatus()}
                    secondsToRest={secondsToRest}
                    isPaused={isPaused}
                    countdown={countdown}
                    onLaunch={launch}
                    onTogglePause={togglePause}
                    onSkip={nextStep}
                />
            </Flex>
        </Flex>
    ) : <Redirect to='/exercises' />

    return page
    //#endregion
}
