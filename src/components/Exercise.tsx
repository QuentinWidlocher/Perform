import React, { ReactElement } from 'react'
import { Box, Card, Flex, Heading, Image } from 'rebass'
import { theme } from '../theme'

const exerciseTypes = [
    'thighs',
    'arms',
    'back',
    'buttocks',
    'cardio'
] as const

const exerciseTypeColors: Map<typeof exerciseTypes[number], string> = new Map<typeof exerciseTypes[number], string>([
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
    tags: typeof exerciseTypes[number][]
}

export function ExerciseInList(ex: Exercise): ReactElement {

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

    return (
        <Flex as='li' width={[1, 1 / 2, 1 / 3]} p={3}>
            <Card width='100%' height='100%'>
                <Image variant='card.image' src={ex.images && ex.images[0]} />
                <Box variant='card.body'>
                    <Heading color='primary'>{ex.name}</Heading>
                    <Flex>
                        {tags}
                    </Flex>
                </Box>
            </Card>
        </Flex>
    )
}
