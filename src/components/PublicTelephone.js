import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

import twoTouchInput from './twoTouchInput'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  displayBoard: {
    display: 'column',
    padding: theme.spacing(1),
    border: '2px solid #fff',
  },
  display: {
    width: 300,
    height: 80,
    backgroundColor: theme.palette.primary[500],
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1)
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    border: '2px solid #fff'
  }
}))

const DialButton = ({value, ...props}) =>
<Button variant="outlined" color="primary" {...props}>
  <Typography variant="h3">{value}</Typography>
</Button>

// <div style={{ display: "flex" }}>
//   <div style={{ flex: 1 }}></div>
//   <Button variant="outlined">SEND</Button>
// </div>

export default () => {
  const classes = useStyles()
  const values = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["*", "0", "#"]]
  const [text, setText] = useState("")
  const [state, setState] = useState(0)
  const [store, setStore] = useState("")
  const [isSend, setIsSend] = useState(false)
  useEffect(() => {
    console.log(text.slice(0, -2))
  }, [isSend])
  useEffect(() => {
    const storeSplit = store.split('-')
    if(storeSplit[storeSplit.length-1] === '##')  setIsSend(true)
    const textSplit = storeSplit.map(value => twoTouchInput(value))
    setText(textSplit.join(''))
  }, [store])
  const handleClick = value => {
    state===0
      ? setStore(store + "-" + value)
      : setStore(store + value)
    setState((state+1)%2)
  }
  return (
    <div className={ classes.root }>
      <div className={ classes.displayBoard }>
        <Typography variant="h5">WakeUpper</Typography>
        <Divider style={{ background: 'red', marginBottom: 8}}/>
        <div className={ classes.display }>
          <Typography variant="h3" style={{color: "#333"}}>{text}</Typography>
        </div>
      </div>
      <div style={{display: "column", marginLeft: 8}}>
      {values.map((valuesbatch, index) =>
        <Grid container spacing={1} key={index}>
          {valuesbatch.map((value,index) =>
            <Grid item key={index}>
              <DialButton value={value} className={ classes.button } onClick={ () => handleClick(value) }/>
            </Grid>
          )}
        </Grid>
      )}
      </div>
    </div>
  )
}
