import { sum, map, prop, move, without, findIndex, remove } from "ramda"
import React, { ReactElement } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import { MdDragHandle } from "react-icons/md"
import { RiDeleteBinLine } from "react-icons/ri"
import { Flex, Box } from "rebass"
import { theme } from "../../theme"
import { Exercise, ExerciseListProps, getTagsFromExercice, getTotalDurationString } from "./Exercise"
import { Tag } from "./Tag"

export function ExerciseList({ exs, exsChange, displayTotal, canDelete, canReorder }: ExerciseListProps): ReactElement | null {

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

    var deleteExercise = (ex: Exercise) => {
        if (!!exsChange) {
            var index = findIndex((x) => x.name == ex.name, exs)
            exsChange(remove(index, 1, exs))
        }
    }

    var ExerciseListWithoutTotal = () => (
        <React.Fragment>
            {exs.map((ex, i) => (
                <Draggable key={`${ex.name}-${i}-list`} draggableId={`${ex.name}-${i}`} index={i} isDragDisabled={!canReorder}>
                    {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Flex sx={itemStyle} px='4'>
                                <Box>
                                    {canReorder && <MdDragHandle />}
                                </Box>
                                <Box mr='auto'>
                                    {ex.name}
                                </Box>
                                <Box ml={1}>
                                    { getTagsFromExercice(ex) }
                                </Box>
                                <Box ml='1'>
                                    {`${ex.duration}s`}
                                </Box>
                                <Box ml='1'>
                                    {canDelete && <RiDeleteBinLine onClick={() => deleteExercise(ex)} />}
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

    var Total = () => {
        if (displayTotal) {
            return (
                <React.Fragment>
                    <hr />
                    { listTotal }
                </React.Fragment>
            )
        } else {
            return null
        }
    }

    return (
        <DragDropContext onDragEnd={dragReorder}>
            <Box as="ul" overflowY="auto" overflowX="hidden" p='2px'>
                <Droppable droppableId='ExerciseList' isDropDisabled={!canReorder}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <ExerciseListWithoutTotal />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Total/>
            </Box>
        </DragDropContext>
    )
}