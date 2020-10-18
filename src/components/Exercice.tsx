import React, { ReactElement } from 'react'
import { Box, Card, Flex, Image } from 'rebass'

const exerciceTypes = [
    'thighs',
    'arms',
    'back',
    'buttocks',
    'cardio'
] as const

export type Exercice = {
    name: string,
    images?: string[],
    duration: number,
    tags: typeof exerciceTypes[number][]
}

export function ExerciceInList(ex: Exercice): ReactElement {
    return (
        <Flex as='li' width={[1, 1 / 2, 1 / 3]} p={3}>
            <Card width='100%' height='100%'>
                <Image variant='card.image' src={ex.images && ex.images[0]} />
                <Box variant='card.body'>{ex.name}</Box>
            </Card>
        </Flex>
    )
}
