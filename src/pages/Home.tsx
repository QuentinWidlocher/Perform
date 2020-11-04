import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Flex, FlexProps, Heading } from 'rebass'

interface Props {

}

export function HomePage(props: Props) {

    var Hero = ({ children }: FlexProps) => {

        var heroClass: FlexProps = {
            height: ['100vh'],
            pt: 4,
            color: 'primaryContrast',
            variant: 'gradient',
        }

        var imageClass: FlexProps = {
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
        <Hero>
            <Flex m='auto' mt={[5, 'auto']} flexDirection={['column-reverse', 'row']} width='100%' px={5}>
                <Box width={[1, 1 / 2]}></Box>
                <Box width={[1, 1 / 2]}>
                    <Heading fontSize={64}>Perform.</Heading>
                    <Heading fontSize={32} fontWeight={500} mb={5}>
                        <em>Commit</em> to be fit. <span role='img' aria-label='muscle'>💪</span>
                    </Heading>
                    <Flex width={['100%', '75%']}>
                        <Link to='/exercises' title="Exercices">
                            <Button variant='primary.hero.outline' mr="2" flex='1'>
                                Start Training
                            </Button>
                        </Link>
                        <Link to='/exercises' title="Exercices">
                            <Button variant='primary.hero.full' mr="2" flex='1'>
                                See exercices
                            </Button>
                        </Link>
                    </Flex>
                </Box>
            </Flex>
        </Hero>
    )
}
