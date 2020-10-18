import React, { FC } from "react"
import { NavLink, Route, Switch } from 'react-router-dom';
import { Box, BoxProps, Flex, FlexProps, Heading, Link as RebassLink, LinkProps as RebassLinkProps } from 'rebass';

export type LinkItem = {
  name: string | JSX.Element,
  url: string,
  page: FC,
  props?: any,
}

export type NavbarProps = {
  links: LinkItem[],
  onHero: boolean,
}

export function Navbar({ links, onHero }: NavbarProps) {

  var navStyle: FlexProps = {
    as: 'nav',
    width: '100vw',
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
    flexDirection: ['column', 'row', 'row'],
    sx: {
      position: onHero ? 'absolute' : 'relative'
    }
  }

  var liStyle: BoxProps = {
    as: 'li',
    fontSize: '2rem',
    py: 3,
    sx: {
      listStyle: 'none',
    }
  }

  var aStyle: RebassLinkProps = {
    color: onHero ? 'white' : 'primary',
    p: 3,
    sx: {
      textDecoration: 'none'
    }
  }

  var activeLink = {
    display: 'none'
  }

  var CustomLink = (props: RebassLinkProps) => <RebassLink {...{ ...aStyle, ...props }} />

  var routerLinks = links.map(({ name, url }) => (
    <Box {...liStyle}>
      <NavLink to={url} component={CustomLink} activeStyle={activeLink} exact={true}>{name}</NavLink>
    </Box>
  ))

  var Title = () => onHero ? null : <Heading color='primary' mr='auto' p={3}>Perform.</Heading>

  return (
    <Flex {...navStyle}>
      <Title />
      <Flex as='ul' justifyContent='space-around' p={0} m={0}>
        {routerLinks}
      </Flex>
    </Flex>
  )
}

export type RouterOutletProps = {
  links: LinkItem[]
}

export function RouterOutlet({ links }: RouterOutletProps) {
  var routerPages = links.map(({ url, page }) => (
    <Route path={url} exact key={url}>{page}</Route>
  ))

  return (
    <Switch>
      {routerPages}
    </Switch>
  )
}