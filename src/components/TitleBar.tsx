import React, { FunctionComponent, ReactElement } from 'react'
import { Box, Heading } from 'rebass'

export var TitleBar: FunctionComponent = ({ children }) => {
    return (
        <Box as='header' p={4} pt={[4, '10rem']} variant='gradient'>
            <Heading fontSize={[30, 40]} color='white'>
                {children}
            </Heading>
        </Box>
    )
}
