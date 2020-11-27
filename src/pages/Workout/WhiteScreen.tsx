import { any, equals, isEmpty, isNil } from "ramda"
import React, { ReactElement } from "react"
import { Box, Heading, Image } from "rebass"
import { Exercise } from "../../components/Exercises/Exercise"
import { ExerciseList } from "../../components/Exercises/ExerciseList"
import { assertExist } from "../../services/Helpers"
import { Status } from "./Workout"

type WhiteScreenProps = { 
    workoutStarted: boolean,
    status: Status,
    currentExercise?: Exercise,
    nextExercise?: Exercise,
    exerciseList: Exercise[],
    onExerciseListChange: (list: Exercise[]) => void
}

/**
 * Left/Top side of the workout page displaying the exercise and the exercise list
 */
export function WhiteScreen({ 
    workoutStarted, 
    status, 
    currentExercise, 
    nextExercise,
    exerciseList,
    onExerciseListChange
 }: WhiteScreenProps): ReactElement {

    var statusIs = equals(status)
    var statusIsOneOf = any(statusIs)

    /**
     * Fixed image of gif depending on the state
     * status InProgress displays the current exercise animation
     * status breakBeforeNext and waitingToStart displays the next exercise picture
     * status ended displays confettis
     */
    var ExerciceImage = () => {
        var exerciceToDisplay = null

        // We use grid to stack the "YOU DID IT" text behind the confettis
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

        // We try to get the exercise to display the confettis
        if (statusIsOneOf(['inProgress'])) {
            exerciceToDisplay = currentExercise
            assertExist(exerciceToDisplay, 'Unable to display ExerciceImage, no current exercise found')
        } else if (statusIsOneOf(['breakBeforeNext', 'waitingToStart'])) {
            exerciceToDisplay = nextExercise
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

        // If we have an exercise to display, we check it actually exist and display it (animation of picture depending on the status)
        var images = exerciceToDisplay!.images
        if (isNil(images) || isEmpty(images)) {
            return null
        } else {
            // Those two status must display the picture while the other must display the animation
            var imageIndexToDisplay = statusIsOneOf(['breakBeforeNext', 'waitingToStart']) ? 0 : 1
            return <Image variant='image.redTint' src={images[imageIndexToDisplay]} alt={exerciceToDisplay!.name} sx={{ ...fullSizeImageStyles, objectFit: 'contain' }} />
        }
    }

    // While the workout still haven't started, we can reorder the exerciseList
    if (!workoutStarted) {
        return (
            <Box
                m='auto'
                py='3'
            >
                <Heading color='primary' fontSize='3rem'>Perform.</Heading>
                <Box>
                    <ExerciseList
                        exs={exerciseList}
                        exsChange={onExerciseListChange}
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