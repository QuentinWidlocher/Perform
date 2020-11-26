import React, { ReactElement } from "react";
import { RiCheckboxCircleLine, RiCheckboxBlankCircleLine } from "react-icons/ri";
import { Box, Card, Flex, Heading, Image } from "rebass";
import { Exercise, getTagsFromExercice } from "./Exercise";
import { Tag } from "./Tag";

export function ExerciseCard(ex: Exercise & { onClick: () => void, selected: boolean }): ReactElement {

    var Check = () => (
        <Box m="auto" p={3} fontSize={5} opacity={ex.selected ? 1 : 0.3} color={ex.selected ? 'primary' : 'black'}>
            {ex.selected ? <RiCheckboxCircleLine /> : <RiCheckboxBlankCircleLine />}
        </Box>
    )

    return (
        <Flex as='li' width={[1, 1 / 2, 1 / 3]} p={3} onClick={ex.onClick}>
            <Card variant="card.clickable" width='100%' height='100%'>
                <Image variant='card.image.redTint' src={ex.images && ex.images[0]} />
                <Flex variant='card.body'>
                    <Flex flexDirection="column" flex={1}>
                        <Heading color='primary'>{ex.name} ({ex.duration}s)</Heading>
                        <Flex>
                            { getTagsFromExercice(ex) }
                        </Flex>
                    </Flex>
                    <Check />
                </Flex>
            </Card>
        </Flex>
    )
}