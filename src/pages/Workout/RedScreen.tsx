import { any, equals } from "ramda"
import React, { ReactElement } from "react"
import { IconBaseProps } from "react-icons/lib"
import { RiPauseCircleLine, RiPlayLine, RiSkipForwardLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { Box, Button, Flex, Heading } from "rebass"
import { Exercise } from "../../components/Exercises/Exercise"
import { assertExist, isNotNil } from "../../services/Helpers"
import { Status, WorkoutStep } from "./Workout"

type RedScreenProps = {
    workoutStarted: boolean,
    currentStep: WorkoutStep,
    nextExercise?: Exercise,
    status: Status,
    secondsToRest: number,
    isPaused: boolean,
    countdown: number,
    onLaunch: () => void,
    onTogglePause: () => void
    onSkip: () => void
}

/**
 * Right/Bottom side of the workout page displaying the timer and the controls
 */
export function RedScreen({
    workoutStarted,
    currentStep,
    nextExercise,
    status,
    secondsToRest,
    isPaused,
    countdown,
    onLaunch,
    onTogglePause,
    onSkip,
}: RedScreenProps): ReactElement {

    var statusIs = equals(status)
    var statusIsOneOf = any(statusIs)

    var LaunchButton = () => {
        return (
            <Button m="auto" p={3} variant='primary.hero.full' onClick={onLaunch}>
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

    /**
     * The countdown of the exercise, also displays a bit of text depending of the status
     */
    var Countdown = () => {
        var text = null
        var currentExercise = currentStep.exercise

        var assertNextExercise = () => assertExist(nextExercise, 'Unable to display Timer, no next exercise found')
        var assertCurrentExercise = () => assertExist(currentExercise, 'Unable to display Timer, no current exercise found')

        switch (status) {
            case 'waitingToStart':
                assertNextExercise()
                text = `Get ready for ${nextExercise!.name} !`
                break

            case 'inProgress':
                assertCurrentExercise()
                text = `${currentExercise!.name} for ${currentExercise!.duration}s`

                // If the exercise has multiple steps, we display them
                if (isNotNil(currentExercise!.steps) && currentExercise!.steps > 1 && isNotNil(currentStep.step)) {
                    text += ` (step ${currentStep.step}/${currentExercise!.steps})`
                }
                break

            case 'breakBeforeNext':
                assertNextExercise()
                text = `Great ! Break for ${secondsToRest}s before the ${nextExercise!.name}`
                break
        }

        return isNotNil(text) ? (
            <Box m='auto' opacity={isPaused ? 0.5 : 1}>
                <Heading textAlign='center' mb={3}>{text}</Heading>
                <Heading fontSize={7} textAlign='center'>{countdown}</Heading>
            </Box>
        ) : null
    }

    /**
     * The toolbar allow the user to pause and skip an exercise
     */
    var ToolBar = () => {

        // Display a Play or a Stop icon depending on the status
        var PlayStopButton = () => {

            var Icon = (props: IconBaseProps) => {
                if (isPaused) {
                    return <RiPlayLine {...props} />
                } else {
                    return <RiPauseCircleLine {...props} />
                }
            }

            return statusIsOneOf(['inProgress', 'breakBeforeNext', 'waitingToStart']) ? (
                <Button
                    onClick={onTogglePause}
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

        // Display a "skip" button if the status allows it
        var NextButton = () => {
            return statusIsOneOf(['inProgress', 'breakBeforeNext', 'waitingToStart']) ? (
                <Button
                    onClick={onSkip}
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

        // The toolbar is just those two buttons in a row
        return (
            <Flex justifyContent="center">
                <PlayStopButton />
                <NextButton />
            </Flex>
        )
    }

    if (!workoutStarted) {
        return <LaunchButton />
    } else if (statusIs('ended')) {
        return <ReturnButton />
    } else {
        return (
            <Flex width='100%' flexDirection='column'>
                <Countdown />
                <ToolBar />
            </Flex>
        )
    }
}