import React from 'react'
import { Link, LinkProps, NavLink } from 'react-router-dom'
import { Box, Button, ButtonProps, Flex, FlexProps, Heading } from 'rebass'

interface Props {

}

export const Home = (props: Props) => {

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

    var LinkButton = (props: LinkProps & ButtonProps) => {
        var LinkBtn = (p: ButtonProps) => <Button {...props} />
        return (
            <NavLink component={LinkBtn} {...props}>
            </NavLink>
        )
    }

    return (
        <div>
            <Hero>
                <Flex m='auto' mt={[5, 'auto']} flexDirection={['column-reverse', 'row']} width='100%' px={5}>
                    <Box width={[1, 1 / 2]}></Box>
                    <Box width={[1, 1 / 2]}>
                        <Heading fontSize={64}>Perform.</Heading>
                        <Heading fontSize={32} fontWeight={500} mb={5}><em>Commit</em> to be fit. <span role='img'>💪</span></Heading>
                        <Flex width={['100%', '75%']}>
                            <Link to='/exercices' title="Exercices">
                                <Button variant='primary.hero.first' mr="2" flex='1'>
                                    Start Training
                                </Button>
                            </Link>
                            <Link to='/exercices' title="Exercices">
                                <Button variant='primary.hero.second' mr="2" flex='1'>
                                    See exercices
                                </Button>
                            </Link>
                        </Flex>
                    </Box>
                </Flex>
            </Hero>
        </div>
    )
}
