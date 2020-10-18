import React from 'react'
import { Box, Button, Flex, FlexProps, Heading } from 'rebass'

interface Props {
    
}

export const Home = (props: Props) => {

    var Hero = ({children}: FlexProps) => {
        var heroClass: FlexProps = {
            color: 'primaryContrast',
            height: ['100vh', '75vh'],
            sx: {
                background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
            }
        }

        var imageClass: FlexProps = {
            color: 'primaryContrast',
            height: ['100vh', '75vh'],
            width: '100%',
            sx: {
                backgroundImage: 'url(landing01.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPositionY: 'bottom',
                backgroundPositionX: ['center', '5vw', '15vw'],
                backgroundSize: ['40vh', 'contain']
            }
        }

        return (
            <Flex {...heroClass}>
                <Flex {...imageClass}>
                    {children}
                </Flex>
            </Flex>
        )
    }

    return (
        <div>
            <Hero>
                <Flex m='auto' mt={[5, 'auto']} flexDirection={['column-reverse', 'row']} width='100%' px={5}>
                    <Box width={[1, 1/2]}></Box>
                    <Box width={[1, 1/2]}>
                        <Heading fontSize={64}>Perform</Heading>
                        <Heading fontSize={32} fontWeight='lighter' mb={5}><em>Commit</em> to be fit. 💪</Heading>
                        <Flex width={['100%', 'inherit']}>
                            <Button variant='primary.hero.first' mr="2" flex='1'>Sign In</Button>
                            <Button variant='primary.hero.second' flex='1'>Log In</Button>   
                        </Flex>
                    </Box>
                </Flex>
            </Hero>
        </div>
    )
}
