import { createTheme } from "@material-ui/core/styles"

const theme = {
  palette: {
    primary: {
      main: "#243A5E",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#AE3F25",
      contrastText: "#ffffff"
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#ffffff"
        }
      }
    }
  }
}

export default createTheme(theme)
