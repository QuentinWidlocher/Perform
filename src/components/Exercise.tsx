import { map, not, pluck, prop, sum } from 'ramda'
import React, { ReactElement, useState } from 'react'
import { RiCheckboxBlankCircleLine, RiCheckboxCircleLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Box, Button, Card, Flex, Heading, Image } from 'rebass'
import { SelectableExercises } from '../pages/Exercises'
import { workoutState } from '../services/Workout'
import { theme } from '../theme'

const exerciseTypes = [
    'thighs',
    'arms',
    'back',
    'buttocks',
    'cardio',
    'abs'
] as const

type ExerciseType = typeof exerciseTypes[number]

const exerciseTypeColors = new Map<ExerciseType, string>([
    ['thighs', 'green'],
    ['arms', 'orange'],
    ['back', 'indigo'],
    ['buttocks', 'blue'],
    ['cardio', 'red'],
])

export type Exercise = {
    name: string,
    images?: string[],
    duration: number,
    tags: ExerciseType[]
}

export function ExerciseCard(ex: SelectableExercises & { onClick: () => void }): ReactElement {

    var tags = ex.tags.map(tag => {

        var tagColor = exerciseTypeColors.get(tag);

        if (!!tagColor) {
            var tagColorHex = (theme.colors as any)[tagColor];

            return (
                <Box as='span' variant='badge' color={tagColor} sx={{ borderColor: tagColor, backgroundColor: `${tagColorHex}20` }}>
                    {tag.toLocaleUpperCase()}
                </Box>
            )
        } else {
            return null
        }
    })

    var Check = () => (
        <Box m="auto" p={3} fontSize={5} opacity={ex.selected ? 1 : 0.3} color={ex.selected ? 'primary' : 'black'}>
            {ex.selected ? <RiCheckboxCircleLine /> : <RiCheckboxBlankCircleLine />}
        </Box>
    )

    return (
        <Flex as='li' width={[1, 1 / 2, 1 / 3]} p={3} onClick={ex.onClick}>
            <Card variant="card.clickable" width='100%' height='100%'>
                <Image variant='card.image' src={ex.images && ex.images[0]} />
                <Flex variant='card.body'>
                    <Flex flexDirection="column" flex={1}>
                        <Heading color='primary'>{ex.name} ({ex.duration}s)</Heading>
                        <Flex>
                            {tags}
                        </Flex>
                    </Flex>
                    <Check />
                </Flex>
            </Card>
        </Flex>
    )
}

export function ExerciseList({ exs }: { exs: Exercise[] }): ReactElement | null {

    if (!exs || exs.length <= 0) {
        return null
    }

    var totalDuration = sum(map(prop('duration'), exs))
    var totalDurationStr = totalDuration > 60 ? `${~~(totalDuration / 60)}m ${~~(totalDuration % 60)}s` : `${totalDuration}s`

    var listTotal = (
        <li key="list-total">
            <Flex justifyContent="space-between">
                <Box mr={3}><strong>Total</strong></Box>
                <Box>{`${totalDurationStr}`}</Box>
            </Flex>
        </li>
    )

    var exerciseList = exs.map((ex, i) => (
        <li key={`${ex.name}-${i}-list`}>
            <Flex justifyContent="space-between">
                <Box mr={3}>
                    {ex.name}
                </Box>
                <Box>
                    {`${ex.duration}s`}
                </Box>
            </Flex>
        </li>
    ))

    return (
        <ul>
            {exerciseList}
            <hr />
            {listTotal}
        </ul>
    )
}

export function ExerciseListCard({ exs }: { exs: Exercise[] }): ReactElement | null {

    var popupStyle = {
        position: "fixed",
        bottom: 0,
        right: 0,
        m: [0, 4],
        p: 3,
        width: ['100%', 'initial']
    }

    var onStartButtonClick = () => {
        workoutState.workout = exs
    }

    return exs.length > 0 ? (
        <Card sx={popupStyle}>
            <Heading mb={3}>Selected exercises</Heading>
            <ExerciseList {...{ exs }} />
            <Link to='/workout' title="Start your workout">
                <Button variant='primaryGradient' mt={3} p={3} width='100%' onClick={onStartButtonClick}>
                    Let's GO.
                </Button>
            </Link>
        </Card>
    ) : null
}