import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#fffde7',
      dark: '#cccab5',
      contrastText: '#003300',
    },
    secondary: {
      light: '#4c8c4a',
      main: '#1b5e20',
      dark: '#003300',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'sans-serif',
      'Nunito'
    ]
  }
});