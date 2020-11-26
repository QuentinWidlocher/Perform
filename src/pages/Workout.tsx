import { any, clone, equals, filter, intersperse, isEmpty, isNil, map, not, prop, range, reject, sum, uniqBy } from 'ramda'
import React, { CSSProperties, ReactElement, useEffect, useState } from 'react'
import { IconBaseProps } from 'react-icons/lib'
import { RiPauseCircleLine, RiPlayLine, RiSkipForwardLine } from 'react-icons/ri'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Box, Button, Flex, FlexProps, Heading, Image } from 'rebass'
import useSound from 'use-sound'
import { Exercise } from '../components/Exercises/Exercise'
import { ExerciseList } from '../components/Exercises/ExerciseList'
import { isNotNil } from '../services/Helpers'
import { workoutState } from '../services/Workout'

const dingSound = require('../assets/sounds/ding.mp3')
const cheeringSound = require('../assets/sounds/cheering.mp3')

// Status Graph
// https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFJcbiAgd2FpdGluZ1RvU3RhcnQgLS0tPiBpblByb2dyZXNzXG4gIGluUHJvZ3Jlc3MgLS0tPiBicmVha0JlZm9yZU5leHRcbiAgYnJlYWtCZWZvcmVOZXh0IC0tLT58MTVzfCBpblByb2dyZXNzXG4gIGluUHJvZ3Jlc3MgLS0tPiBlbmRlZFxuICBwYXVzZWQ8LS0-IGluUHJvZ3Jlc3Ncblx0XHQiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCIsInRoZW1lVmFyaWFibGVzIjp7ImJhY2tncm91bmQiOiJ3aGl0ZSIsInByaW1hcnlDb2xvciI6IiNFQ0VDRkYiLCJzZWNvbmRhcnlDb2xvciI6IiNmZmZmZGUiLCJ0ZXJ0aWFyeUNvbG9yIjoiaHNsKDgwLCAxMDAlLCA5Ni4yNzQ1MDk4MDM5JSkiLCJwcmltYXJ5Qm9yZGVyQ29sb3IiOiJoc2woMjQwLCA2MCUsIDg2LjI3NDUwOTgwMzklKSIsInNlY29uZGFyeUJvcmRlckNvbG9yIjoiaHNsKDYwLCA2MCUsIDgzLjUyOTQxMTc2NDclKSIsInRlcnRpYXJ5Qm9yZGVyQ29sb3IiOiJoc2woODAsIDYwJSwgODYuMjc0NTA5ODAzOSUpIiwicHJpbWFyeVRleHRDb2xvciI6IiMxMzEzMDAiLCJzZWNvbmRhcnlUZXh0Q29sb3IiOiIjMDAwMDIxIiwidGVydGlhcnlUZXh0Q29sb3IiOiJyZ2IoOS41MDAwMDAwMDAxLCA5LjUwMDAwMDAwMDEsIDkuNTAwMDAwMDAwMSkiLCJsaW5lQ29sb3IiOiIjMzMzMzMzIiwidGV4dENvbG9yIjoiIzMzMyIsIm1haW5Ca2ciOiIjRUNFQ0ZGIiwic2Vjb25kQmtnIjoiI2ZmZmZkZSIsImJvcmRlcjEiOiIjOTM3MERCIiwiYm9yZGVyMiI6IiNhYWFhMzMiLCJhcnJvd2hlYWRDb2xvciI6IiMzMzMzMzMiLCJmb250RmFtaWx5IjoiXCJ0cmVidWNoZXQgbXNcIiwgdmVyZGFuYSwgYXJpYWwiLCJmb250U2l6ZSI6IjE2cHgiLCJsYWJlbEJhY2tncm91bmQiOiIjZThlOGU4Iiwibm9kZUJrZyI6IiNFQ0VDRkYiLCJub2RlQm9yZGVyIjoiIzkzNzBEQiIsImNsdXN0ZXJCa2ciOiIjZmZmZmRlIiwiY2x1c3RlckJvcmRlciI6IiNhYWFhMzMiLCJkZWZhdWx0TGlua0NvbG9yIjoiIzMzMzMzMyIsInRpdGxlQ29sb3IiOiIjMzMzIiwiZWRnZUxhYmVsQmFja2dyb3VuZCI6IiNlOGU4ZTgiLCJhY3RvckJvcmRlciI6ImhzbCgyNTkuNjI2MTY4MjI0MywgNTkuNzc2NTM2MzEyOCUsIDg3LjkwMTk2MDc4NDMlKSIsImFjdG9yQmtnIjoiI0VDRUNGRiIsImFjdG9yVGV4dENvbG9yIjoiYmxhY2siLCJhY3RvckxpbmVDb2xvciI6ImdyZXkiLCJzaWduYWxDb2xvciI6IiMzMzMiLCJzaWduYWxUZXh0Q29sb3IiOiIjMzMzIiwibGFiZWxCb3hCa2dDb2xvciI6IiNFQ0VDRkYiLCJsYWJlbEJveEJvcmRlckNvbG9yIjoiaHNsKDI1OS42MjYxNjgyMjQzLCA1OS43NzY1MzYzMTI4JSwgODcuOTAxOTYwNzg0MyUpIiwibGFiZWxUZXh0Q29sb3IiOiJibGFjayIsImxvb3BUZXh0Q29sb3IiOiJibGFjayIsIm5vdGVCb3JkZXJDb2xvciI6IiNhYWFhMzMiLCJub3RlQmtnQ29sb3IiOiIjZmZmNWFkIiwibm90ZVRleHRDb2xvciI6ImJsYWNrIiwiYWN0aXZhdGlvbkJvcmRlckNvbG9yIjoiIzY2NiIsImFjdGl2YXRpb25Ca2dDb2xvciI6IiNmNGY0ZjQiLCJzZXF1ZW5jZU51bWJlckNvbG9yIjoid2hpdGUiLCJzZWN0aW9uQmtnQ29sb3IiOiJyZ2JhKDEwMiwgMTAyLCAyNTUsIDAuNDkpIiwiYWx0U2VjdGlvbkJrZ0NvbG9yIjoid2hpdGUiLCJzZWN0aW9uQmtnQ29sb3IyIjoiI2ZmZjQwMCIsInRhc2tCb3JkZXJDb2xvciI6IiM1MzRmYmMiLCJ0YXNrQmtnQ29sb3IiOiIjOGE5MGRkIiwidGFza1RleHRMaWdodENvbG9yIjoid2hpdGUiLCJ0YXNrVGV4dENvbG9yIjoid2hpdGUiLCJ0YXNrVGV4dERhcmtDb2xvciI6ImJsYWNrIiwidGFza1RleHRPdXRzaWRlQ29sb3IiOiJibGFjayIsInRhc2tUZXh0Q2xpY2thYmxlQ29sb3IiOiIjMDAzMTYzIiwiYWN0aXZlVGFza0JvcmRlckNvbG9yIjoiIzUzNGZiYyIsImFjdGl2ZVRhc2tCa2dDb2xvciI6IiNiZmM3ZmYiLCJncmlkQ29sb3IiOiJsaWdodGdyZXkiLCJkb25lVGFza0JrZ0NvbG9yIjoibGlnaHRncmV5IiwiZG9uZVRhc2tCb3JkZXJDb2xvciI6ImdyZXkiLCJjcml0Qm9yZGVyQ29sb3IiOiIjZmY4ODg4IiwiY3JpdEJrZ0NvbG9yIjoicmVkIiwidG9kYXlMaW5lQ29sb3IiOiJyZWQiLCJsYWJlbENvbG9yIjoiYmxhY2siLCJlcnJvckJrZ0NvbG9yIjoiIzU1MjIyMiIsImVycm9yVGV4dENvbG9yIjoiIzU1MjIyMiIsImNsYXNzVGV4dCI6IiMxMzEzMDAiLCJmaWxsVHlwZTAiOiIjRUNFQ0ZGIiwiZmlsbFR5cGUxIjoiI2ZmZmZkZSIsImZpbGxUeXBlMiI6ImhzbCgzMDQsIDEwMCUsIDk2LjI3NDUwOTgwMzklKSIsImZpbGxUeXBlMyI6ImhzbCgxMjQsIDEwMCUsIDkzLjUyOTQxMTc2NDclKSIsImZpbGxUeXBlNCI6ImhzbCgxNzYsIDEwMCUsIDk2LjI3NDUwOTgwMzklKSIsImZpbGxUeXBlNSI6ImhzbCgtNCwgMTAwJSwgOTMuNTI5NDExNzY0NyUpIiwiZmlsbFR5cGU2IjoiaHNsKDgsIDEwMCUsIDk2LjI3NDUwOTgwMzklKSIsImZpbGxUeXBlNyI6ImhzbCgxODgsIDEwMCUsIDkzLjUyOTQxMTc2NDclKSJ9fSwidXBkYXRlRWRpdG9yIjpmYWxzZX0
type Status = 'waitingToStart' | 'breakBeforeNext' | 'paused' | 'inProgress' | 'ended'

type WorkoutStep = {
    status: Status,
    duration?: number,
    exercise?: Exercise,
    step?: number,
}

const nextSteps: { current: Status, next: Status }[] = [
    { current: 'waitingToStart', next: 'inProgress' },
    { current: 'breakBeforeNext', next: 'inProgress' },
    { current: 'inProgress', next: 'breakBeforeNext' },
    { current: 'paused', next: 'inProgress' },
]

export function WorkoutPage(): ReactElement {

    const secondsBeforeStarting = 5
    const secondsToRest = 15

    //#region States

    var [exerciseList, setExerciseList] = useState<Exercise[]>(workoutState.workout)

    var [workout, setWorkout] = useState<WorkoutStep[]>([])

    var [workoutIndex, setWorkoutIndex] = useState(-1)

    var [countdown, setCountDown] = useState(0)

    var [isPaused, setIsPaused] = useState(false)

    var [timer, setTimer] = useState<number>()

    var [totalProgression, setTotalProgression] = useState(-1)

    var [progression, setProgression] = useState(0)

    var [playDingSound] = useSound(dingSound)

    var [playCheeringSound] = useSound(cheeringSound)

    //#endregion

    //#region Utils (pure)

    var getDuration = (w: WorkoutStep) => prop('duration', w)
    var getStatus = (w: WorkoutStep) => prop('status', w)
    var getExercise = (w: WorkoutStep) => prop('exercise', w)

    var getCurrentStep = (): WorkoutStep => workout[workoutIndex]
    var getCurrentDuration = () => getDuration(getCurrentStep())
    var getCurrentExercise = () => getExercise(getCurrentStep())
    var getCurrentStatus = () => getStatus(getCurrentStep())
    var statusIs = equals(getCurrentStatus())
    var statusIsOneOf = any(statusIs)
    var statusHasCountdown = () => statusIsOneOf(['waitingToStart', 'inProgress', 'breakBeforeNext'])

    var getNextStep = (): WorkoutStep => workout[workoutIndex + 1]
    var getNextDuration = () => getDuration(getNextStep())
    var getNextExercise = () => getExercise(getNextStep())
    var getNextStatus = () => getStatus(getNextStep())
    var statusWas = equals(getNextStatus())
    var statusWasOneOf = any(statusWas)

    var assertExist = (o: any, err: string) => { if (isNil(o)) throw new Error(err) }

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

    var isWorkoutStarted = () => !!workout && !isEmpty(workout)

    //#endregion

    //#region Utils (impure)

    var goToNextStep = () => setWorkoutIndex(workoutIndex + 1)

    var decrementCountdown = () => {
        setCountDown(countdown - 1)
        // Broken because of race conditions ?
        // setProgression(progression + 1)
    }

    var createWorkoutFromExercises = (exercises: Exercise[] = exerciseList): WorkoutStep[] => {

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

        var breakState: WorkoutStep = { status: 'breakBeforeNext', duration: secondsToRest }
        var waitingToStartState: WorkoutStep = { status: 'waitingToStart', duration: secondsBeforeStarting }
        var endedState: WorkoutStep = { status: 'ended' }

        var workoutWithExercises: WorkoutStep[] = clone(exercises).flatMap(createWorkoutStepsFromExercise)
        var workoutWithBreaks: WorkoutStep[] = intersperse(breakState, workoutWithExercises)

        // wait ->m e1:1 -> break -> e2:1 -> break -> e2:2 -> break -> e3:1 -> end
    
        var removeBreakBetweenSteps = (v: WorkoutStep, i: number, a: WorkoutStep[]) => {
            if (i + 1 <= a.length && v.status == 'breakBeforeNext') {
                var nextItem = a[i + 1]
                if (!!nextItem?.step && nextItem.step > 1) {
                    return undefined
                }
            }
            return v
        }

        workoutWithBreaks = workoutWithBreaks.map(removeBreakBetweenSteps).filter((x): x is WorkoutStep => !isNil(x))

        return [waitingToStartState, ...workoutWithBreaks, endedState]
    }

    var getTotalProgression = () => sum(workout.map(w => isNil(w.duration) ? 0 : w.duration))

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

    // Update progression when workout change
    useEffect(() => {
        setTotalProgression(getTotalProgression())
    }, [workout])

    //#endregion

    //#region Components

    var Timer = () => {
        var text = null
        var currentStep = getCurrentStep()
        var currentExercise = getCurrentExercise()
        var nextExercise = getNextExercise()

        var assertNextExercise = () => assertExist(nextExercise, 'Unable to display Timer, no next exercise found')
        var assertCurrentExercise = () => assertExist(currentExercise, 'Unable to display Timer, no current exercise found')

        switch (getCurrentStatus()) {
            case 'waitingToStart':
                assertNextExercise()
                text = `Get ready for ${nextExercise!.name} !`
                break

            case 'inProgress':
                assertCurrentExercise()
                text = `${currentExercise!.name} for ${currentExercise!.duration}s`
                if (!isNil(currentStep.step) && !isNil(currentExercise!.steps) && currentExercise!.steps > 1) {
                    text += ` (step ${currentStep.step}/${currentExercise!.steps})`
                }
                break

            case 'breakBeforeNext':
                assertNextExercise()
                text = `Great ! Break for ${secondsToRest}s before the ${nextExercise!.name}`
                break
        }

        return !!text ? (
            <Box m='auto' opacity={isPaused ? 0.5 : 1}>
                <Heading textAlign='center' mb={3}>{text}</Heading>
                <Heading fontSize={7} textAlign='center'>{countdown}</Heading>
            </Box>
        ) : null
    }

    var ExerciceImage = () => {
        var exerciceToDisplay = null

        var stackedInGrid = {
            gridRow: 1,
            gridColumn: 1,
        }

        var fullSizeImageStyles = {
            ...stackedInGrid,
            zIndex: 1,
            width: '100%',
            height: '100%',
        }

        if (statusIsOneOf(['inProgress'])) {
            exerciceToDisplay = getCurrentExercise()
            assertExist(exerciceToDisplay, 'Unable to display ExerciceImage, no current exercise found')
        } else if (statusIsOneOf(['breakBeforeNext', 'waitingToStart'])) {
            exerciceToDisplay = getNextExercise()
            assertExist(exerciceToDisplay, 'Unable to display ExerciceImage, no next exercise found')
        } else if (statusIs('ended')) {
            return (
                <React.Fragment>
                    <Image src='/assets/confettis.webp' alt='confettis' sx={{ ...fullSizeImageStyles, objectFit: 'cover' }} />
                    <Heading color='primary' fontSize='3rem' m='auto' sx={stackedInGrid}>YOU DID IT !</Heading>
                </React.Fragment>
            )
        } else {
            return null
        }

        var images = exerciceToDisplay!.images
        if (isNil(images) || isEmpty(images)) {
            return null
        } else {
            var imageIndexToDisplay = statusIsOneOf(['breakBeforeNext', 'waitingToStart']) ? 0 : 1
            return <Image variant='image.redTint' src={images[imageIndexToDisplay]} alt={exerciceToDisplay!.name} sx={{ ...fullSizeImageStyles, objectFit: 'contain' }} />
        }
    }

    var ToolBar = () => {
        var PlayStopButton = () => {

            var Icon = (props: IconBaseProps) => {
                if (isPaused) {
                    return <RiPlayLine {...props} />
                } else {
                    return <RiPauseCircleLine {...props} />
                }
            }

            var playOrPause = () => {
                var newPause = not(isPaused)

                setIsPaused(newPause)

                if (newPause) {
                    clearTimeout(timer)
                } else {
                    setCountDown(countdown)
                }
            }

            return statusIsOneOf(['inProgress', 'breakBeforeNext', 'waitingToStart']) ? (
                <Button
                    onClick={playOrPause}
                    p={0}
                    variant='primary.hero.outline'
                    display='flex'
                    sx={{
                        borderStyle: 'none',
                        borderRadius: '50%'
                    }}
                >
                    <Icon size={75} />
                </Button>
            ) : null
        }

        var NextButton = () => {

            var nextStep = () => {
                clearTimeout(timer)
                goToNextStep()
            }

            return statusIsOneOf(['inProgress', 'breakBeforeNext', 'waitingToStart']) ? (
                <Button
                    onClick={nextStep}
                    my='auto'
                    p={1}
                    variant='primary.hero.outline'
                    sx={{
                        borderStyle: 'none',
                        borderRadius: '50%'
                    }}
                >
                    <RiSkipForwardLine size={40} />
                </Button>
            ) : null
        }

        return (
            <Flex justifyContent="center">
                <PlayStopButton/>
                <NextButton/>
            </Flex>
        )
    }

    var ProgressBar = () => (
        <Box width={`${(progression / totalProgression) * 100}%`} height={5} backgroundColor='white' />
    )

    var LaunchButton = () => {
        var launch = () => {
            if (!workout || isEmpty(workout)) {
                var createdWorkout = createWorkoutFromExercises()
                setWorkout(createdWorkout)

                var exerciseListWithDuplicates = createdWorkout.map(w => w.exercise).filter((e): e is Exercise => isNotNil(e))
                var exerciseList = uniqBy(prop('name'), exerciseListWithDuplicates)
                workoutState.workout = exerciseList
            }

            goToNextStep()
        }
        return (
            <Button m="auto" p={3} variant='primary.hero.full' onClick={launch}>
                Start the workout !
            </Button>
        )
    }

    var ReturnButton = () => (
        <Box m='auto'>
            <Link to='/'>
                <Button p={3} variant='primary.hero.full'>
                    Go back and rest
            </Button>
            </Link>
        </Box>
    )

    var RedScreen = () => {
        if (!isWorkoutStarted()) {
            return <LaunchButton />
        } else if (statusIs('ended')) {
            return <ReturnButton />
        } else {
            return (
                <Flex width='100%' flexDirection='column'>
                    <ProgressBar />
                    <Timer />
                    <ToolBar />
                </Flex>)
        }
    }

    var WhiteScreen = () => {
        if (!isWorkoutStarted()) {
            return (
                <Box 
                    m='auto'
                    py='3'
                >
                    <Heading color='primary' fontSize='3rem'>Perform.</Heading>
                    <Box>
                        <ExerciseList 
                            exs={exerciseList} 
                            exsChange={setExerciseList} 
                            canDelete={false}
                            canReorder={true}
                            displayTotal={true}
                        />
                    </Box>
                </Box>)
        } else {
            return <ExerciceImage />
        }
    }

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
    var page = !!workoutState.workout && workoutState.workout.length > 0 ? (
        <Flex {...fullscreenClass} flexDirection={['column', 'row']}>
            <Box 
                {...splitScreenClass} 
                sx={{ flexBasis: '100%', ...stackableGridStyles }} 
                backgroundColor="white" 
                color="black"
                overflowY='auto'
            >
                <WhiteScreen />
            </Box>
            <Flex {...splitScreenClass} p={2}>
                <RedScreen />
            </Flex>
        </Flex>
    ) : <Redirect to='/exercises' />

    return page
    //#endregion
}
