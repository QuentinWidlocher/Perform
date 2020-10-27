import { time } from 'console'
import { any, assoc, clone, equals, flatten, flip, inc, intersperse, isEmpty, isNil, not, pipe, prop, propEq, repeat, sum, zip, __ } from 'ramda'
import React, { CSSProperties, ReactElement, useCallback, useEffect, useState } from 'react'
import { IconBaseProps } from 'react-icons/lib'
import { RiPauseCircleLine, RiPlayLine } from 'react-icons/ri'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Box, Button, Flex, FlexProps, Heading, Image } from 'rebass'
import { interval, Subject } from 'rxjs'
import useSound from 'use-sound'
import { Exercise, ExerciseList } from '../components/Exercise'
import { workoutState } from '../services/Workout'

const dingSound = require('../assets/sounds/ding.mp3')
const cheeringSound = require('../assets/sounds/cheering.mp3')

interface Props {

}

// Status Graph
// https://mermaid-js.github.io/mermaid-live-editor/#/view/eyJjb2RlIjoiZ3JhcGggTFJcbiAgbm90U3RhcnRlZCAtLS0-fDNzfCBwZW5kaW5nXG4gIHBlbmRpbmcgLS0tPiBvbk5leHRFeGVyY2lzZVxuICBvbk5leHRFeGVyY2lzZSAtLS0-fDIwc3wgaW5Qcm9ncmVzc1xuICBpblByb2dyZXNzIC0tLT4gb25OZXh0RXhlcmNpc2VcbiAgb25OZXh0RXhlcmNpc2UgLS0tPiBlbmRlZFxuICBpblByb2dyZXNzIC0tLT4gcGF1c2VkIC0tLT4gaW5Qcm9ncmVzc1xuXHRcdCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0IiwidGhlbWVWYXJpYWJsZXMiOnsiYmFja2dyb3VuZCI6IndoaXRlIiwicHJpbWFyeUNvbG9yIjoiI0VDRUNGRiIsInNlY29uZGFyeUNvbG9yIjoiI2ZmZmZkZSIsInRlcnRpYXJ5Q29sb3IiOiJoc2woODAsIDEwMCUsIDk2LjI3NDUwOTgwMzklKSIsInByaW1hcnlCb3JkZXJDb2xvciI6ImhzbCgyNDAsIDYwJSwgODYuMjc0NTA5ODAzOSUpIiwic2Vjb25kYXJ5Qm9yZGVyQ29sb3IiOiJoc2woNjAsIDYwJSwgODMuNTI5NDExNzY0NyUpIiwidGVydGlhcnlCb3JkZXJDb2xvciI6ImhzbCg4MCwgNjAlLCA4Ni4yNzQ1MDk4MDM5JSkiLCJwcmltYXJ5VGV4dENvbG9yIjoiIzEzMTMwMCIsInNlY29uZGFyeVRleHRDb2xvciI6IiMwMDAwMjEiLCJ0ZXJ0aWFyeVRleHRDb2xvciI6InJnYig5LjUwMDAwMDAwMDEsIDkuNTAwMDAwMDAwMSwgOS41MDAwMDAwMDAxKSIsImxpbmVDb2xvciI6IiMzMzMzMzMiLCJ0ZXh0Q29sb3IiOiIjMzMzIiwibWFpbkJrZyI6IiNFQ0VDRkYiLCJzZWNvbmRCa2ciOiIjZmZmZmRlIiwiYm9yZGVyMSI6IiM5MzcwREIiLCJib3JkZXIyIjoiI2FhYWEzMyIsImFycm93aGVhZENvbG9yIjoiIzMzMzMzMyIsImZvbnRGYW1pbHkiOiJcInRyZWJ1Y2hldCBtc1wiLCB2ZXJkYW5hLCBhcmlhbCIsImZvbnRTaXplIjoiMTZweCIsImxhYmVsQmFja2dyb3VuZCI6IiNlOGU4ZTgiLCJub2RlQmtnIjoiI0VDRUNGRiIsIm5vZGVCb3JkZXIiOiIjOTM3MERCIiwiY2x1c3RlckJrZyI6IiNmZmZmZGUiLCJjbHVzdGVyQm9yZGVyIjoiI2FhYWEzMyIsImRlZmF1bHRMaW5rQ29sb3IiOiIjMzMzMzMzIiwidGl0bGVDb2xvciI6IiMzMzMiLCJlZGdlTGFiZWxCYWNrZ3JvdW5kIjoiI2U4ZThlOCIsImFjdG9yQm9yZGVyIjoiaHNsKDI1OS42MjYxNjgyMjQzLCA1OS43NzY1MzYzMTI4JSwgODcuOTAxOTYwNzg0MyUpIiwiYWN0b3JCa2ciOiIjRUNFQ0ZGIiwiYWN0b3JUZXh0Q29sb3IiOiJibGFjayIsImFjdG9yTGluZUNvbG9yIjoiZ3JleSIsInNpZ25hbENvbG9yIjoiIzMzMyIsInNpZ25hbFRleHRDb2xvciI6IiMzMzMiLCJsYWJlbEJveEJrZ0NvbG9yIjoiI0VDRUNGRiIsImxhYmVsQm94Qm9yZGVyQ29sb3IiOiJoc2woMjU5LjYyNjE2ODIyNDMsIDU5Ljc3NjUzNjMxMjglLCA4Ny45MDE5NjA3ODQzJSkiLCJsYWJlbFRleHRDb2xvciI6ImJsYWNrIiwibG9vcFRleHRDb2xvciI6ImJsYWNrIiwibm90ZUJvcmRlckNvbG9yIjoiI2FhYWEzMyIsIm5vdGVCa2dDb2xvciI6IiNmZmY1YWQiLCJub3RlVGV4dENvbG9yIjoiYmxhY2siLCJhY3RpdmF0aW9uQm9yZGVyQ29sb3IiOiIjNjY2IiwiYWN0aXZhdGlvbkJrZ0NvbG9yIjoiI2Y0ZjRmNCIsInNlcXVlbmNlTnVtYmVyQ29sb3IiOiJ3aGl0ZSIsInNlY3Rpb25Ca2dDb2xvciI6InJnYmEoMTAyLCAxMDIsIDI1NSwgMC40OSkiLCJhbHRTZWN0aW9uQmtnQ29sb3IiOiJ3aGl0ZSIsInNlY3Rpb25Ca2dDb2xvcjIiOiIjZmZmNDAwIiwidGFza0JvcmRlckNvbG9yIjoiIzUzNGZiYyIsInRhc2tCa2dDb2xvciI6IiM4YTkwZGQiLCJ0YXNrVGV4dExpZ2h0Q29sb3IiOiJ3aGl0ZSIsInRhc2tUZXh0Q29sb3IiOiJ3aGl0ZSIsInRhc2tUZXh0RGFya0NvbG9yIjoiYmxhY2siLCJ0YXNrVGV4dE91dHNpZGVDb2xvciI6ImJsYWNrIiwidGFza1RleHRDbGlja2FibGVDb2xvciI6IiMwMDMxNjMiLCJhY3RpdmVUYXNrQm9yZGVyQ29sb3IiOiIjNTM0ZmJjIiwiYWN0aXZlVGFza0JrZ0NvbG9yIjoiI2JmYzdmZiIsImdyaWRDb2xvciI6ImxpZ2h0Z3JleSIsImRvbmVUYXNrQmtnQ29sb3IiOiJsaWdodGdyZXkiLCJkb25lVGFza0JvcmRlckNvbG9yIjoiZ3JleSIsImNyaXRCb3JkZXJDb2xvciI6IiNmZjg4ODgiLCJjcml0QmtnQ29sb3IiOiJyZWQiLCJ0b2RheUxpbmVDb2xvciI6InJlZCIsImxhYmVsQ29sb3IiOiJibGFjayIsImVycm9yQmtnQ29sb3IiOiIjNTUyMjIyIiwiZXJyb3JUZXh0Q29sb3IiOiIjNTUyMjIyIiwiY2xhc3NUZXh0IjoiIzEzMTMwMCIsImZpbGxUeXBlMCI6IiNFQ0VDRkYiLCJmaWxsVHlwZTEiOiIjZmZmZmRlIiwiZmlsbFR5cGUyIjoiaHNsKDMwNCwgMTAwJSwgOTYuMjc0NTA5ODAzOSUpIiwiZmlsbFR5cGUzIjoiaHNsKDEyNCwgMTAwJSwgOTMuNTI5NDExNzY0NyUpIiwiZmlsbFR5cGU0IjoiaHNsKDE3NiwgMTAwJSwgOTYuMjc0NTA5ODAzOSUpIiwiZmlsbFR5cGU1IjoiaHNsKC00LCAxMDAlLCA5My41Mjk0MTE3NjQ3JSkiLCJmaWxsVHlwZTYiOiJoc2woOCwgMTAwJSwgOTYuMjc0NTA5ODAzOSUpIiwiZmlsbFR5cGU3IjoiaHNsKDE4OCwgMTAwJSwgOTMuNTI5NDExNzY0NyUpIn19LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ
type Status = 'notStarted' | 'waitingToStart' | 'breakBeforeNext' | 'paused' | 'inProgress' | 'ended'

type WorkoutState = {
    status: Status,
    duration?: number,
    exercise?: Exercise,
}

const nextSteps: { current: Status, next: Status }[] = [
    { current: 'notStarted', next: 'waitingToStart' },
    { current: 'waitingToStart', next: 'inProgress' },
    { current: 'breakBeforeNext', next: 'inProgress' },
    { current: 'inProgress', next: 'breakBeforeNext' },
    { current: 'paused', next: 'inProgress' },
]

export function WorkoutPage(props: Props): ReactElement {

    const secondsBeforeStarting = 5
    const secondsToRest = 3

    const workout: WorkoutState[] = (() => {

        var createWorkoutStateFromExercise = (e: Exercise): WorkoutState => ({ status: 'inProgress', duration: e.duration, exercise: e })

        var breakState: WorkoutState = { status: 'breakBeforeNext', duration: secondsToRest }
        var notStartedState: WorkoutState = { status: 'notStarted' }
        var waitingToStartState: WorkoutState = { status: 'waitingToStart', duration: secondsBeforeStarting }
        var endedState: WorkoutState = { status: 'ended' }

        var workout: WorkoutState[] = clone(workoutState.workout).map(createWorkoutStateFromExercise)
        var workoutWithBreaks: WorkoutState[] = intersperse(breakState, workout)

        return [notStartedState, waitingToStartState, ...workoutWithBreaks, endedState]
    })()

    const totalProgression: number = sum(workout.map(w => isNil(w.duration) ? 0 : w.duration))

    //#region States

    var [workoutIndex, setWorkoutIndex] = useState(0)

    var [countdown, setCountDown] = useState(0)

    var [isPaused, setIsPaused] = useState(false)

    var [timer, setTimer] = useState<number>()

    var [progression, setProgression] = useState(0)

    var [playDingSound] = useSound(dingSound)

    var [playCheeringSound] = useSound(cheeringSound)

    //#endregion

    //#region Utils (pure)

    var getDuration = (w: WorkoutState) => prop('duration', w)
    var getStatus = (w: WorkoutState) => prop('status', w)
    var getExercise = (w: WorkoutState) => prop('exercise', w)

    var getCurrentStep = (): WorkoutState => workout[workoutIndex]
    var getCurrentDuration = () => getDuration(getCurrentStep())
    var getCurrentExercise = () => getExercise(getCurrentStep())
    var getCurrentStatus = () => getStatus(getCurrentStep())
    var statusIs = equals(getCurrentStatus())
    var statusIsOneOf = any(statusIs)
    var statusHasCountdown = () => statusIsOneOf(['waitingToStart', 'inProgress', 'breakBeforeNext'])

    var getNextStep = (): WorkoutState => workout[workoutIndex + 1]
    var getNextDuration = () => getDuration(getNextStep())
    var getNextExercise = () => getExercise(getNextStep())
    var getNextStatus = () => getStatus(getNextStep())
    var statusWas = equals(getNextStatus())
    var statusWasOneOf = any(statusWas)

    var assertExist = (o: any, err: string) => { if (isNil(o)) throw err }

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

    //#endregion

    //#region Utils (impure)

    var goToNextStep = () => {
        setWorkoutIndex(workoutIndex + 1)
    }

    var decrementCountdown = () => {
        setCountDown(countdown - 1)
        // Broken because of race conditions ?
        // setProgression(progression + 1)
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

    //#region Components

    var Timer = () => {
        var text = null
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
        }

        var images = exerciceToDisplay!.images
        if (isNil(images) || isEmpty(images)) {
            return null
        } else {
            var imageIndexToDisplay = statusIsOneOf(['breakBeforeNext', 'waitingToStart']) ? 0 : 1
            return <Image src={images[imageIndexToDisplay]} alt={exerciceToDisplay!.name} sx={{ ...fullSizeImageStyles, objectFit: 'contain' }} />
        }
    }

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
                mx='auto'
                p={0}
                fontSize={5}
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

    var ProgressBar = () => (
        <Box width={`${(progression / totalProgression) * 100}%`} height={5} backgroundColor='white' />
    )

    var LaunchButton = () => (
        <Button m="auto" p={3} variant='primary.hero.full' onClick={goToNextStep}>
            Start the workout !
        </Button>
    )

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
        if (statusIs('notStarted')) {
            return <LaunchButton />
        } else if (statusIs('ended')) {
            return <ReturnButton />
        } else {
            return (
                <Flex width='100%' flexDirection='column'>
                    <ProgressBar />
                    <Timer />
                    <PlayStopButton />
                </Flex>)
        }
    }

    var WhiteScreen = () => {
        if (statusIs('notStarted')) {
            return (
                <Box m='auto'>
                    <Heading color='primary' fontSize='3rem'>Perform.</Heading>
                    <ExerciseList exs={workout.filter(propEq('status', 'inProgress')).map(prop('exercise') as any)} />
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
            <Box {...splitScreenClass} sx={{ flexBasis: '100%', ...stackableGridStyles }} backgroundColor="white" color="black">
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
