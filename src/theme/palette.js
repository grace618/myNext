import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
    black,
    white,
    primary: {
        contrastText: white,
        dark: colors.red[700],
        main: '#F44242',
        light: colors.red[100]
    },
    secondary: {
        contrastText: white,
        dark: colors.blue[900],
        main: colors.blue[600],
        light: colors.blue[400]
    },
    success: {
        contrastText: white,
        dark: colors.green[900],
        main: colors.green[600],
        light: colors.green[400]
    },
    info: {
        contrastText: white,
        dark: colors.grey[900],
        main: colors.grey[600],
        light: '#91959a'
    },
    warning: {
        contrastText: white,
        dark: colors.orange[900],
        main: colors.orange[600],
        light: colors.orange[400]
    },
    error: {
        contrastText: white,
        dark: colors.red[900],
        main: colors.red[600],
        light: colors.red[400]
    },
    text: {
        primary: '#333333',
        secondary: 'rgb(100, 101, 105)',
        link: colors.grey[600],
        light: '#91959a'
    },
    background: {
        default: '#282828',
        paper: white,
        light: '#F9F9F9'
    },

};
