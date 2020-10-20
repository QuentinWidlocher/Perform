import React from "react"
import { Box, BoxProps } from "rebass"

var spacer = 1
var borderWidth = '3px'
var borderRadius = 4

export var theme = {
  breakpoints: ['30em', '52em', '64em'],
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 64
  ],
  colors: {
    primary: '#f44336',
    primaryContrast: 'white',
    primaryLight: '#ff7961',
    primaryDark: '#ba000d',
  },
  borderWidth,
  space: [
    0, `${0.25 * spacer}rem`, `${0.5 * spacer}rem`, `${1 * spacer}rem`, `${1.5 * spacer}rem`, `${3 * spacer}rem`
  ],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '\'Sora\', sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 500,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 0 10px rgba(0, 0, 0, .125)',
  },
  variants: {
    gradient: {
      background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
    },
    card: {
      bg: 'white',
      borderRadius: 10,
      boxShadow: 'small',
      cursor: 'pointer',

      '&:hover, &:active': {
        boxShadow: 'large'
      },

      image: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        objectFit: 'cover',
        width: '100%',
        height: '20rem',
      },

      body: {
        p: 3,
      }
    },
    badge: {
      p: 1,
      m: 1,
      borderStyle: 'solid',
      borderWidth: borderWidth,
      borderRadius,

      '&:first-of-type': {
        ml: 0,
      },
      '&:last-of-type': {
        mr: 0,
      },
    }
  },
  text: {
  },
  buttons: {
    primary: {
      color: 'primaryContrast',
      bg: 'primary',

      '&:hover': {
        bg: 'primaryLight',
      },

      hero: {
        first: {
          bg: 'transparent',
          border: `solid ${borderWidth}`,
          borderColor: 'white',
          '&:hover, &:active': {
            bg: 'white',
            color: 'primary'
          },
        },
        second: {
          color: 'primary',
          bg: 'white',
          border: `solid ${borderWidth}`,
          borderColor: 'white',
          '&:hover, &:active': {
            color: 'white',
            bg: 'primary',
          },
        }
      }
    },
  }
}

export var Container = (props: BoxProps) => (
  <Box
    px={[2, 3, 5]}
    mx={[0, 'auto', 'auto']}
    maxWidth={['100vw', '90vw', '75vw']} {...props}
  />
)