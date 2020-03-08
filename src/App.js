import React, { Fragment } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'
import Counter from './components/Counter'
import PublicTelephone from './components/PublicTelephone'

const theme = createMuiTheme({
  palette: {
    primary: orange,
    type: 'dark'
  },
})

export default () => {
  return (
  <ThemeProvider theme={theme}>
  <CssBaseline />
    <Router>
      <ul style={{listStyleType: "none", display: "flex", margin: 0, padding: 0}}>
        <li><Link to="/counter">Counter</Link></li>
        <li><Link to="/public-telephone">Public Telephone</Link></li>
      </ul>
      <Route path="/counter">
        <Counter />
      </Route>
      <Route path="/public-telephone">
        <PublicTelephone />
      </Route>
    </Router>
  </ThemeProvider>
  )
}
