import { any, equals, not, prop, propEq } from 'ramda'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { IconBaseProps } from 'react-icons/lib'
import { RiPauseCircleLine, RiPlayLine } from 'react-icons/ri'
import { Box, Button, Flex, FlexProps, Heading, Image } from 'rebass'
import useSound from 'use-sound'
import { ExerciseList } from '../components/Exercise'
import { workoutState } from '../services/Workout'

const dingSound = require('../assets/sounds/ding.mp3')

interface Props {

}

// Status Graph
// https://mermaid-js.github.io/mermaid-live-editor/#/view/eyJjb2RlIjoiZ3JhcGggTFJcbiAgbm90U3RhcnRlZCAtLS0-fDNzfCBwZW5kaW5nXG4gIHBlbmRpbmcgLS0tPiBvbk5leHRFeGVyY2lzZVxuICBvbk5leHRFeGVyY2lzZSAtLS0-fDIwc3wgaW5Qcm9ncmVzc1xuICBpblByb2dyZXNzIC0tLT4gb25OZXh0RXhlcmNpc2VcbiAgb25OZXh0RXhlcmNpc2UgLS0tPiBlbmRlZFxuICBpblByb2dyZXNzIC0tLT4gcGF1c2VkIC0tLT4gaW5Qcm9ncmVzc1xuXHRcdCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0IiwidGhlbWVWYXJpYWJsZXMiOnsiYmFja2dyb3VuZCI6IndoaXRlIiwicHJpbWFyeUNvbG9yIjoiI0VDRUNGRiIsInNlY29uZGFyeUNvbG9yIjoiI2ZmZmZkZSIsInRlcnRpYXJ5Q29sb3IiOiJoc2woODAsIDEwMCUsIDk2LjI3NDUwOTgwMzklKSIsInByaW1hcnlCb3JkZXJDb2xvciI6ImhzbCgyNDAsIDYwJSwgODYuMjc0NTA5ODAzOSUpIiwic2Vjb25kYXJ5Qm9yZGVyQ29sb3IiOiJoc2woNjAsIDYwJSwgODMuNTI5NDExNzY0NyUpIiwidGVydGlhcnlCb3JkZXJDb2xvciI6ImhzbCg4MCwgNjAlLCA4Ni4yNzQ1MDk4MDM5JSkiLCJwcmltYXJ5VGV4dENvbG9yIjoiIzEzMTMwMCIsInNlY29uZGFyeVRleHRDb2xvciI6IiMwMDAwMjEiLCJ0ZXJ0aWFyeVRleHRDb2xvciI6InJnYig5LjUwMDAwMDAwMDEsIDkuNTAwMDAwMDAwMSwgOS41MDAwMDAwMDAxKSIsImxpbmVDb2xvciI6IiMzMzMzMzMiLCJ0ZXh0Q29sb3IiOiIjMzMzIiwibWFpbkJrZyI6IiNFQ0VDRkYiLCJzZWNvbmRCa2ciOiIjZmZmZmRlIiwiYm9yZGVyMSI6IiM5MzcwREIiLCJib3JkZXIyIjoiI2FhYWEzMyIsImFycm93aGVhZENvbG9yIjoiIzMzMzMzMyIsImZvbnRGYW1pbHkiOiJcInRyZWJ1Y2hldCBtc1wiLCB2ZXJkYW5hLCBhcmlhbCIsImZvbnRTaXplIjoiMTZweCIsImxhYmVsQmFja2dyb3VuZCI6IiNlOGU4ZTgiLCJub2RlQmtnIjoiI0VDRUNGRiIsIm5vZGVCb3JkZXIiOiIjOTM3MERCIiwiY2x1c3RlckJrZyI6IiNmZmZmZGUiLCJjbHVzdGVyQm9yZGVyIjoiI2FhYWEzMyIsImRlZmF1bHRMaW5rQ29sb3IiOiIjMzMzMzMzIiwidGl0bGVDb2xvciI6IiMzMzMiLCJlZGdlTGFiZWxCYWNrZ3JvdW5kIjoiI2U4ZThlOCIsImFjdG9yQm9yZGVyIjoiaHNsKDI1OS42MjYxNjgyMjQzLCA1OS43NzY1MzYzMTI4JSwgODcuOTAxOTYwNzg0MyUpIiwiYWN0b3JCa2ciOiIjRUNFQ0ZGIiwiYWN0b3JUZXh0Q29sb3IiOiJibGFjayIsImFjdG9yTGluZUNvbG9yIjoiZ3JleSIsInNpZ25hbENvbG9yIjoiIzMzMyIsInNpZ25hbFRleHRDb2xvciI6IiMzMzMiLCJsYWJlbEJveEJrZ0NvbG9yIjoiI0VDRUNGRiIsImxhYmVsQm94Qm9yZGVyQ29sb3IiOiJoc2woMjU5LjYyNjE2ODIyNDMsIDU5Ljc3NjUzNjMxMjglLCA4Ny45MDE5NjA3ODQzJSkiLCJsYWJlbFRleHRDb2xvciI6ImJsYWNrIiwibG9vcFRleHRDb2xvciI6ImJsYWNrIiwibm90ZUJvcmRlckNvbG9yIjoiI2FhYWEzMyIsIm5vdGVCa2dDb2xvciI6IiNmZmY1YWQiLCJub3RlVGV4dENvbG9yIjoiYmxhY2siLCJhY3RpdmF0aW9uQm9yZGVyQ29sb3IiOiIjNjY2IiwiYWN0aXZhdGlvbkJrZ0NvbG9yIjoiI2Y0ZjRmNCIsInNlcXVlbmNlTnVtYmVyQ29sb3IiOiJ3aGl0ZSIsInNlY3Rpb25Ca2dDb2xvciI6InJnYmEoMTAyLCAxMDIsIDI1NSwgMC40OSkiLCJhbHRTZWN0aW9uQmtnQ29sb3IiOiJ3aGl0ZSIsInNlY3Rpb25Ca2dDb2xvcjIiOiIjZmZmNDAwIiwidGFza0JvcmRlckNvbG9yIjoiIzUzNGZiYyIsInRhc2tCa2dDb2xvciI6IiM4YTkwZGQiLCJ0YXNrVGV4dExpZ2h0Q29sb3IiOiJ3aGl0ZSIsInRhc2tUZXh0Q29sb3IiOiJ3aGl0ZSIsInRhc2tUZXh0RGFya0NvbG9yIjoiYmxhY2siLCJ0YXNrVGV4dE91dHNpZGVDb2xvciI6ImJsYWNrIiwidGFza1RleHRDbGlja2FibGVDb2xvciI6IiMwMDMxNjMiLCJhY3RpdmVUYXNrQm9yZGVyQ29sb3IiOiIjNTM0ZmJjIiwiYWN0aXZlVGFza0JrZ0NvbG9yIjoiI2JmYzdmZiIsImdyaWRDb2xvciI6ImxpZ2h0Z3JleSIsImRvbmVUYXNrQmtnQ29sb3IiOiJsaWdodGdyZXkiLCJkb25lVGFza0JvcmRlckNvbG9yIjoiZ3JleSIsImNyaXRCb3JkZXJDb2xvciI6IiNmZjg4ODgiLCJjcml0QmtnQ29sb3IiOiJyZWQiLCJ0b2RheUxpbmVDb2xvciI6InJlZCIsImxhYmVsQ29sb3IiOiJibGFjayIsImVycm9yQmtnQ29sb3IiOiIjNTUyMjIyIiwiZXJyb3JUZXh0Q29sb3IiOiIjNTUyMjIyIiwiY2xhc3NUZXh0IjoiIzEzMTMwMCIsImZpbGxUeXBlMCI6IiNFQ0VDRkYiLCJmaWxsVHlwZTEiOiIjZmZmZmRlIiwiZmlsbFR5cGUyIjoiaHNsKDMwNCwgMTAwJSwgOTYuMjc0NTA5ODAzOSUpIiwiZmlsbFR5cGUzIjoiaHNsKDEyNCwgMTAwJSwgOTMuNTI5NDExNzY0NyUpIiwiZmlsbFR5cGU0IjoiaHNsKDE3NiwgMTAwJSwgOTYuMjc0NTA5ODAzOSUpIiwiZmlsbFR5cGU1IjoiaHNsKC00LCAxMDAlLCA5My41Mjk0MTE3NjQ3JSkiLCJmaWxsVHlwZTYiOiJoc2woOCwgMTAwJSwgOTYuMjc0NTA5ODAzOSUpIiwiZmlsbFR5cGU3IjoiaHNsKDE4OCwgMTAwJSwgOTMuNTI5NDExNzY0NyUpIn19LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ
type Status = 'notStarted' | 'pending' | 'onNextExercise' | 'paused' | 'inProgress' | 'ended'

const nextSteps: { current: Status, next: Status }[] = [
    { current: 'notStarted', next: 'pending' },
    { current: 'pending', next: 'inProgress' },
    { current: 'onNextExercise', next: 'inProgress' },
    { current: 'inProgress', next: 'onNextExercise' },
    { current: 'paused', next: 'inProgress' },
]

export function WorkoutPage(props: Props): ReactElement {

    const secondsBeforeStarting = 5
    const secondsToRest = 3

    var workout = [...workoutState.workout]

    // FIXME : VIREZ MOI
    // workout = [
    //     { name: 'Squats', duration: 2, tags: ['thighs', 'buttocks'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/squat-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/squat-exercise-illustration.gif'] },
    //     { name: 'Push-ups', duration: 3, tags: ['arms'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.gif'] },
    //     { name: 'Mountain Climbers', duration: 4, tags: ['arms', 'back', "thighs"], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration-spotebi.gif'] },
    //     { name: 'Lunges', duration: 5, tags: ['thighs', 'buttocks'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/lunges-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/lunges-exercise-illustration.gif'] },
    //     { name: 'Jumping Jacks', duration: 6, tags: ['cardio'], images: ['https://www.spotebi.com/wp-content/uploads/2014/10/jumping-jacks-exercise-illustration.jpg', 'https://www.spotebi.com/wp-content/uploads/2014/10/jumping-jacks-exercise-illustration.gif'] },
    // ]

    //#region States

    const [workoutIndex, setWorkoutIndex] = useState(0)

    const [status, setStatus] = useState<Status>('notStarted')

    const [timer, setTimer] = useState(0)

    const [statusBeforePause, setStatusBeforePause] = useState<Status>('notStarted')

    const [timerBeforePause, setTimerBeforePause] = useState(0)

    const [previousStatus, setPreviousStatus] = useState<Status | null>(null)

    const [playDingSound] = useSound(dingSound)

    //#endregion

    //#region Utils (pure)

    var statusIs = equals(status)
    var statusIsOneOf = any(statusIs)
    var statusWas = equals(previousStatus)
    var statusWasOneOf = any(statusWas)
    var statusWasBeforePause = equals(statusBeforePause)
    var statusWasOneOfBeforePause = any(statusWasBeforePause)

    var getNextStep = (currentStep: Status) => nextSteps.find(propEq('current', currentStep))?.next || 'ended'

    var getCurrentExercise = useCallback(() => workout[workoutIndex] || null, [workout, workoutIndex])
    var getCurrentExerciseDuration = useCallback(() => prop('duration', getCurrentExercise()), [getCurrentExercise])

    var playDoubleDingSound = useCallback(() => {
        var i = 0
        var t = setInterval(() => {
            if (i < 2) {
                playDingSound()
                i++
            } else {
                clearInterval(t)
            }
        }, 100)
    }, [playDingSound])

    //#endregion

    //#region Utils (impure)

    var goToNextStep = useCallback(() => setStatus(getNextStep(status)), [status])

    //#endregion

    //#region Hooks

    // update on status
    useEffect(() => {
        if (not(statusWas(status))) {
            switch (status) {
                case 'pending':
                    if (not(statusWas('paused'))) {
                        setTimer(secondsBeforeStarting)
                    }
                    setPreviousStatus('pending')
                    break;

                case 'onNextExercise':
                    setPreviousStatus('onNextExercise')
                    if (workoutIndex + 1 < workout.length) {
                        playDoubleDingSound()
                        setTimer(secondsToRest)
                    } else {
                        setStatus('ended')
                    }
                    break

                case 'inProgress':
                    if (not(statusWas('paused'))) {
                        setWorkoutIndex(workoutIndex + 1)
                        setTimer(getCurrentExerciseDuration())
                        playDingSound()
                    }
                    setPreviousStatus('inProgress')
                    break

                case 'paused':
                    setPreviousStatus('paused')
                    break

                case 'ended':
                    setPreviousStatus('ended')
                    break

                default:
                    break;
            }
        }

    }, [status, workoutIndex, workout.length, getCurrentExercise, previousStatus, getCurrentExerciseDuration, statusWas, playDingSound, playDoubleDingSound])

    // update on timer
    useEffect(() => {
        if (statusIsOneOf(['inProgress', 'onNextExercise', 'pending'])) {

            if (timer >= 0) {
                var t = setTimeout(() => {
                    setTimer(timer - 1)
                }, 1000);
            } else {
                setTimer(0)
                goToNextStep()
            }
        }

        return () => clearTimeout(t)
    }, [goToNextStep, status, statusIsOneOf, timer])

    //#endregion

    //#region Components

    var LaunchButton = () => (statusIs('notStarted')) ? (
        <Button m="auto" p={3} variant='primary.hero.full' onClick={() => setStatus('pending')}>
            Start the workout !
        </Button>
    ) : null

    var Timer = () => {
        var text = null
        var currentExercise = getCurrentExercise()
        var nextExercise = workout[workoutIndex + 1]

        var statusToCheck = statusIs('paused') ? statusBeforePause : status

        switch (statusToCheck) {
            case 'pending':
                text = `Get ready for ${nextExercise?.name} !`
                break

            case 'inProgress':
                text = `${currentExercise.name} for ${currentExercise.duration}s`
                break

            case 'onNextExercise':
                text = `Great ! Break for ${secondsToRest}s before the ${nextExercise?.name}`
                break
        }

        return !!text ? (
            <Box m='auto' opacity={statusIs('paused') ? 0.5 : 1}>
                <Heading textAlign='center' mb={3}>{text}</Heading>
                <Heading fontSize={7} textAlign='center'>{timer}</Heading>
            </Box>
        ) : null
    }

    var ExerciceImage = () => {
        var exerciceToDisplay = null
        var checkForStatus = statusIs('paused') ? statusWasOneOfBeforePause : statusIsOneOf

        if (checkForStatus(['inProgress'])) {
            exerciceToDisplay = getCurrentExercise()
        } else if (checkForStatus(['onNextExercise', 'pending'])) {
            exerciceToDisplay = workout[workoutIndex + 1]
        }

        if (exerciceToDisplay && exerciceToDisplay.images && exerciceToDisplay.images.length > 1) {
            var imageIndexToDisplay = statusIs('onNextExercise') ? 0 : 1
            return <Image src={exerciceToDisplay.images[imageIndexToDisplay]} alt={exerciceToDisplay.name} sx={{ objectFit: 'contain' }} />
        } else {
            return null
        }
    }

    var PlayStopButton = () => {

        var Icon = (props: IconBaseProps) => {
            if (statusIs('paused')) {
                return <RiPlayLine {...props} />
            } else {
                return <RiPauseCircleLine {...props} />
            }
        }

        var playOrPause = () => {
            if (statusIs('paused')) {
                setStatus(statusBeforePause)
                setTimer(timerBeforePause)
            } else {
                setStatusBeforePause(status)
                setTimerBeforePause(timer)
                setStatus('paused')
            }
        }

        return statusIsOneOf(['paused', 'inProgress', 'onNextExercise', 'pending']) ? (
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

    var ProgressBar = () => {
        return (
            <Box width={`${(workoutIndex / (workout.length - 1)) * 100}%`} height={5} backgroundColor='white' />
        )
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

    //#endregion

    //#region Page
    return (
        <Flex {...fullscreenClass} flexDirection={['column', 'row']}>
            <Flex {...splitScreenClass} sx={{ flexBasis: '100%' }} backgroundColor="white" color="black">
                {
                    statusIs('notStarted')
                        ? (
                            <Box m='auto'>
                                <Heading color='primary' fontSize='3rem'>Perform.</Heading>
                                <ExerciseList exs={workout} />
                            </Box>
                        )
                        : <ExerciceImage />}
            </Flex>
            <Flex {...splitScreenClass} p={2}>

                {
                    statusIs('notStarted')
                        ? <LaunchButton />
                        : <Flex width='100%' flexDirection='column'>
                            <ProgressBar />
                            <Timer />
                            <PlayStopButton />
                        </Flex>
                }

            </Flex>
        </Flex>
    )
    //#endregion
}
