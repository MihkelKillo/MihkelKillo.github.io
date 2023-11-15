import React, { type ReactElement, useState, useEffect } from 'react'
import './App.css'
import { Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

function App (): ReactElement {
  const [trees, setTrees] = useState(0)
  const [groves, setGroves] = useState(0)
  const [forests, setForests] = useState(0)
  const [groveUpgrades, setGroveUpgrades] = useState(0)
  const [forestUpgrades, setforestUpgrades] = useState(0)
  const [multiplier, setMultiplier] = useState(0.1)

  useEffect(() => {
    const gameInterval: NodeJS.Timer = setInterval(
      () => {
        setTrees(trees + groveProduction())
        setGroves(groves + forestProduction())
      },
      1000
    )

    return () => { clearInterval(gameInterval) }
  })

  const groveProduction = (): number => (
    multiplier * groves * (groveUpgrades + 1)
  )

  const forestProduction = (): number => (
    multiplier * forests * (forestUpgrades + 1)
  )

  const upgradeMultiplier = (cost: number): void => {
    setMultiplier(multiplier + 0.1)
    setTrees(trees - cost)
  }

  const UpgradeMultiplierButton = (): ReactElement => {
    const multiplierCost = Math.pow(1000, Math.pow(0.9 + multiplier, 2))
    return (
      <>
        <p>
          Current multiplier: {Math.floor(10 * multiplier) / 10}
        </p>
        <Button variant='contained' disabled={multiplierCost > trees} onClick={ () => { upgradeMultiplier(multiplierCost) }}>
          Upgrade multiplier for {Math.floor(multiplierCost)} trees
        </Button>
      </>
    )
  }

  const Trees = (): ReactElement => (
    <Grid container spacing={2} alignItems="center">
      <Grid xs={4}>
        <Button variant='contained' onClick={ () => { setTrees(trees + 1) } }>
              Plant tree
        </Button>
      </Grid>
      <Grid xs>
        <p>
          Trees: {Math.floor(trees)}
        </p>
      </Grid>
      <Grid xs>

      </Grid>
    </Grid>
  )

  const Groves = (): ReactElement => {
    const groveCost = 10 * (Math.floor(groves) + 1)
    return (
    <Grid container spacing={2} alignItems="center">
      <Grid xs>
        <Button variant="contained" disabled={groveCost > trees} onClick={ () => { buyGrove(groveCost) } }>
          Buy grove for {Math.floor(groveCost)} trees
        </Button>
      </Grid>
      <Grid xs>
        <p>
          Groves: {Math.floor(groves)}
        </p>
        <p>
          {Math.round(10 * groveProduction()) / 10} trees/s
        </p>
      </Grid>
      <Grid xs>
        <UpgradeGroveButton/>
      </Grid>
    </Grid>
    )
  }

  const Forests = (): ReactElement => {
    const forestCost = 10 * (forests + 1)
    return (
    <Grid container spacing={2} alignItems="center">
      <Grid xs>
        <Button variant="contained" disabled={forestCost > groves} onClick={ () => { buyForest(forestCost) } }>
          Buy forest for {forestCost} groves
        </Button>
      </Grid>
      <Grid xs>
        <p>
          Forests: {Math.floor(forests)}
        </p>
        <p>
          {Math.round(100 * forestProduction()) / 100} groves/s
        </p>
      </Grid>
      <Grid xs>
        <UpgradeForestButton/>
      </Grid>
    </Grid>
    )
  }

  const buyGrove = (groveCost: number): void => {
    setTrees(trees - groveCost)
    setGroves(groves + 1)
  }

  const buyForest = (forestCost: number): void => {
    setGroves(groves - forestCost)
    setForests(forests + 1)
  }

  const UnitGrid = (): ReactElement => <>
    <Trees />
    <Groves />
    <Forests />
  </>

  const upgradeGrove = (upgradeCost: number): void => {
    setTrees(trees - upgradeCost)
    setGroveUpgrades(groveUpgrades + 1)
  }

  const upgradeForest = (upgradeCost: number): void => {
    setGroves(groves - upgradeCost)
    setforestUpgrades(forestUpgrades + 1)
  }

  const UpgradeGroveButton = (): ReactElement => {
    const upgradeCost = 100 + groveUpgrades * 100
    return (
      <Button variant='contained' disabled={upgradeCost > trees} onClick={ () => { upgradeGrove(upgradeCost) }}>
        Upgrade grove production for {upgradeCost} trees
      </Button>
    )
  }

  const UpgradeForestButton = (): ReactElement => {
    const upgradeCost = 100 + forestUpgrades * 100
    return (
      <Button variant='contained' disabled={upgradeCost > groves} onClick={ () => { upgradeForest(upgradeCost) }}>
        Upgrade forest production for {upgradeCost} groves
      </Button>
    )
  }

  return (
    <body className='App-body'>
      <div className="App">
        <Grid container spacing={2} alignItems="center">
          <Grid xs>
            <UnitGrid/>
          </Grid>
          <Grid xs>
            <UpgradeMultiplierButton/>
          </Grid>
        </Grid>
      </div>
    </body>
  )
}

export default App
