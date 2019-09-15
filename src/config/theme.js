export default {
  typography: {
    useNextVariants: true,
  },

  palette: {
    primary: {
      light: '#D404DC',
      main: '#9306BC',
      dark: '#9306BC',
    },
    error: {
      main: '#D6000A',
    },
  },

  overrides: {
    MuiDialog: {
      paper: {
        margin: 10,
      },
    },
    MuiBottomNavigationAction: {
      root: {
        '&$selected': {
          paddingBottom: 0,
        },
      },
      label: {
        display: 'none',
      }
    }
  },

}
