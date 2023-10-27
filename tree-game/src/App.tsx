import React, { type ReactElement, useState } from 'react'
import './App.css'
import { Button } from '@mui/material'

function App (): ReactElement {
  const [trees, setTrees] = useState(0)
  const [groves, setGroves] = useState(0)

  const Trees = (): ReactElement => (
    <>
      <Button variant='contained' onClick={ () => { setTrees(trees + 1) } }>
            Plant tree
      </Button>
      <p>
        Trees: {Math.floor(trees)}
      </p>
    </>
  )

  const Groves = (): ReactElement => (
    <p>
      Groves: {Math.floor(groves)}
    </p>
  )

  const buyGrove = (groveCost: number): void => {
    setTrees(trees - groveCost)
    setGroves(groves + 1)
  }

  const BuyGroveButton = (): ReactElement => {
    const groveCost = 10 * (groves + 1)
    return (
      <Button variant="contained" disabled={groveCost > trees} onClick={ () => { buyGrove(groveCost) } }>
        Buy grove for {groveCost} trees
      </Button>
    )
  }
  // useEffect(() => {

  // }, [])

  return (
    <body className='App-body'>
      <div className="App">
          <Trees/>
          <Groves/>
          <BuyGroveButton/>
      </div>
    </body>
  )
}

export default App
