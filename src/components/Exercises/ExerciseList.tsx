import { sum, map, prop, move } from "ramda"
import React, { ReactElement } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import { MdDragHandle } from "react-icons/md"
import { Flex, Box } from "rebass"
import { theme } from "../../theme"
import { ExerciseListProps, getTotalDurationString } from "./Exercise"

export function ExerciseList({ exs, exsChange }: ExerciseListProps): ReactElement | null {

    var totalDurationStr = getTotalDurationString(exs)

    if (!exs || exs.length <= 0) {
        return null
    }

    var listTotal = (
        <li key="list-total">
            <Flex justifyContent="space-between">
                <Box mr={3}><strong>Total</strong></Box>
                <Box>{`${totalDurationStr}`}</Box>
            </Flex>
        </li>
    )

    var itemStyle = {
        p: 3,
        mx: -3,
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: theme.colors.greyLight
        }
    }

    var ExerciseListWithoutTotal = () => (
        <React.Fragment>
            {exs.map((ex, i) => (
                <Draggable key={`${ex.name}-${i}-list`} draggableId={`${ex.name}-${i}`} index={i} >
                    {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Flex sx={itemStyle}>
                                <MdDragHandle />
                                <Box ml={3} mr='auto'>
                                    {ex.name}
                                </Box>
                                <Box>
                                    {`${ex.duration}s`}
                                </Box>
                            </Flex>
                        </li>
                    )}
                </Draggable>
            ))}
        </React.Fragment>
    )

    var dragReorder = ({ source, destination }: DropResult) => {
        if (!!destination && source.index !== destination.index && !!exsChange) {
            console.debug(source, destination, !!exsChange)
            exsChange(move(source.index, destination.index, exs))
        }
    }

    return (
        <DragDropContext onDragEnd={dragReorder}>
            <Box as="ul" overflowY="auto" overflowX="hidden">
                <Droppable droppableId='ExerciseList'>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <ExerciseListWithoutTotal />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <hr />
                {listTotal}
            </Box>
        </DragDropContext>
    )
}