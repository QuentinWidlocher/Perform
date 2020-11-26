import React, { ReactElement } from "react";
import { RiCheckboxCircleLine, RiCheckboxBlankCircleLine } from "react-icons/ri";
import { Box, Card, Flex, Heading, ImageProps, Image } from "rebass";
import { theme } from "../../theme";
import { Exercise, exerciseTypeColors } from "./Exercise";

export function ExerciseCard(ex: Exercise & { onClick: () => void, selected: boolean }): ReactElement {

    var tags = ex.tags.map((tag, index) => {

        var tagColor = exerciseTypeColors.get(tag);

        if (!!tagColor) {
            var tagColorHex = (theme.colors as any)[tagColor];

            return (
                <Box as='span' variant='badge' color={tagColor} sx={{ borderColor: tagColor, backgroundColor: `${tagColorHex}20` }} key={`${tag}-${index}`}>
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

    var imageStyle: ImageProps = {
        sx: {
            filter: 'hue-rotate(120deg) saturate(1.5)'
        }
    }

    return (
        <Flex as='li' width={[1, 1 / 2, 1 / 3]} p={3} onClick={ex.onClick}>
            <Card variant="card.clickable" width='100%' height='100%'>
                <Image variant='card.image' src={ex.images && ex.images[0]} sx={imageStyle.sx} />
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