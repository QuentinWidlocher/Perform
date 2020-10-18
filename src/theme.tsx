import React from "react"
import { Button as RebassButton, ButtonProps } from "rebass"

var spacer = 1
var borderWidth = '3px'

export var theme = {
  breakpoints: ['40em', '52em', '64em'],
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 64
  ],
  colors: {
    primary: '#f44336',
    primaryContrast: 'white',
    primaryLight: '#ff7961',
    primaryDark: '#ba000d'
  },
  space: [  
    0, `${0.25*spacer}rem`, `${0.5*spacer}rem`, `${1*spacer}rem`, `${1.5*spacer}rem`, `${3*spacer}rem`
  ],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 0 24px rgba(0, 0, 0, .125)'
  },
  variants: {
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
          borderColor: 'primaryLight',
          '&:hover, &:active': {
            bg: 'primaryLight', 
          },
        },
        second : {
          bg: 'primaryDark',
          border: `solid ${borderWidth}`,
          borderColor: 'primaryDark',
          '&:hover, &:active': {
            bg: '#7f0000',
            borderColor: '#7f0000',
          },
        }
      }
    },
  }
}