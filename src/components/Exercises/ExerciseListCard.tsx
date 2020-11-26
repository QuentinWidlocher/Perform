import React, { ReactElement, useState } from "react"
import { MdDragHandle } from "react-icons/md"
import { RiArrowDownSLine, RiArrowUpSLine, RiCloseLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { Card, Heading, Button, CardProps, Flex, Box, BoxProps, Link as StyledLink } from "rebass"
import { workoutState } from "../../services/Workout"
import { ExerciseListProps, getTotalDurationString } from "./Exercise"
import { ExerciseList } from "./ExerciseList"

export function ExerciseListCard(props: ExerciseListProps): ReactElement | null {

    const [expanded, setExpanded] = useState(false)

    var totalDurationStr = getTotalDurationString(props.exs)

    var headerSize = '5rem'

    var popupStyle: BoxProps = {
        sx: {
            position: 'fixed',
            bottom: 0,
            right: [0, '1rem'],
            transform: [
                `translateY(${expanded ? '0' : `calc(100% - ${headerSize})`})`,
                `translateY(${expanded ? '1rem' : `calc(100% - ${headerSize} - 2rem)`})`
            ],
            mb: expanded ? 3 : 0,
            px: 3,
            width: ['100%', 'initial'],
            minWidth: '15rem',
            maxHeight: '100%',
            transition: 'transform 0.3s ease-in-out'
        }
    }

    var cardStyle: CardProps = {
        width: '100%',
        minWidth: [0, '20rem'],
        maxHeight: '90vh',
        display: 'flex',
        m: [0, 4],
        p: 3,
        pt: 2,
        sx: {
            flexDirection: 'column',
            boxShadow: 'large'
        }
    }

    var onStartButtonClick = () => {
        workoutState.workout = props.exs
    }

    var toggleExpanded = () => setExpanded(!expanded)

    return props.exs.length > 0 ? (
        <Box {...popupStyle}>
            <Card {...cardStyle}>
                <Box height={headerSize}>
                    <Flex justifyContent="center" onClick={toggleExpanded}>
                        { expanded
                            ? <RiArrowDownSLine size='1.7rem' />
                            : <RiArrowUpSLine size='1.7rem' /> 
                        }
                    </Flex>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading>{props.exs.length} exercice{props.exs.length > 1 ? 's' : ''}</Heading>
                        <Heading fontSize={16} fontWeight={500}>{totalDurationStr}</Heading>
                    </Flex>
                </Box>

                <Button 
                    variant='primary.outline' 
                    width='100%' 
                    sx={{textAlign: 'center'}}
                    onClick={() => {
                        if (!!props.exsChange) {
                            props.exsChange([])
                            setExpanded(false)
                        }
                    }}
                >
                    <RiCloseLine style={{verticalAlign: 'text-bottom'}} />
                    Clear exercise list
                </Button>

                <ExerciseList {...props} />

                <Link to='/workout' title="Start your workout">
                    <Button variant='primary.gradient' mt={3} p={3} width='100%' onClick={onStartButtonClick}>
                        Let's GO.
                    </Button>
                </Link>
            </Card>
        </Box>
    ) : null
}