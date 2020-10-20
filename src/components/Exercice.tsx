import React, { ReactElement } from 'react'
import { Box, Card, Flex, Heading, Image } from 'rebass'

const exerciceTypes = [
    'thighs',
    'arms',
    'back',
    'buttocks',
    'cardio'
] as const

const exerciceTypeColors: Map<typeof exerciceTypes[number], string> = new Map<typeof exerciceTypes[number], string>([
    ['thighs', 'green'],
    ['arms', 'orange'],
    ['back', 'indigo'],
    ['buttocks', 'blue'],
    ['cardio', 'red'],
])

export type Exercice = {
    name: string,
    images?: string[],
    duration: number,
    tags: typeof exerciceTypes[number][]
}

export function ExerciceInList(ex: Exercice): ReactElement {

    var tags = ex.tags.map(tag => (
        <Box as='span' variant='badge' color={exerciceTypeColors.get(tag)} sx={{ borderColor: exerciceTypeColors.get(tag)}}>
            {tag.toLocaleUpperCase()}
        </Box>
    ))

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
