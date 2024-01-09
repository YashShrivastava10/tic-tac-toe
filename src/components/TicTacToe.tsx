"use client"

import Lottie from 'lottie-react'
import React, { useState } from 'react'
import celebration from "./celebration.json"
import winner from "./winner.json"

type BoardType = Array<Array<string | null>>
type Icon = "X" | "O" | ""
type Player = { name: string, icon: Icon, clicked: boolean, winner: boolean }

const initialBoard = (rows: number, cols: number, value: null | Icon): BoardType => Array.from({ length: rows }, () => Array(cols).fill(value))

export const TicTacToe = () => {
  const [show, setShow] = useState<string | null>("playerName")
  const [p1, setP1] = useState<Player>({ name: "", icon: "", clicked: false, winner: false })
  const [p2, setP2] = useState<Player>({ name: "", icon: "", clicked: false, winner: false })
  const [board, setBoard] = useState<BoardType>([])
  const [visibleBoard, setVisibleBoard] = useState<BoardType>([])


  const selectBtn = (p: HTMLButtonElement) => {
    p.style.border = "2px solid #f22853"
    p.style.backgroundColor = "transparent"
  }

  const resetBtn = (btn: HTMLButtonElement) => {
    btn.style.border = "2px solid transparent";
    btn.style.backgroundColor = "#f22853";
  }

  const handlePlayerInfoChange = (method: React.Dispatch<React.SetStateAction<Player>>, name: string, value: string, id: string) => {
    if (id.includes("X") || id.includes("O")) {
      // reseting all btns
      document.querySelectorAll(".icon").forEach((btn) => resetBtn(btn as HTMLButtonElement))

      // ! assures that btn will never be null
      const btn: HTMLButtonElement = document.querySelector(`#${id}`)!
      selectBtn(btn)

      // changing btn style of opposition player
      const p1X: any = document.querySelector("#p1X")
      const p1O: any = document.querySelector("#p1O")
      const p2X: any = document.querySelector("#p2X")
      const p2O: any = document.querySelector("#p2O")
      if (id.includes("p1")) {
        id === "p1X" ? selectBtn(p2O) : selectBtn(p2X)
      }
      else {
        id === "p2X" ? selectBtn(p1O) : selectBtn(p1X)
      }
    }
    // changing state of opposition
    if (id === "p1X" || id === "p1O") setP2(prevState => ({ ...prevState, icon: id === "p1X" ? "O" : "X" }))
    else if (id === "p2X" || id === "p2O") setP1(prevState => ({ ...prevState, icon: id === "p2X" ? "O" : "X" }))

    method(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBoard(initialBoard(3, 3, null))
    setVisibleBoard(initialBoard(3, 3, ""))
    setShow("play")
  }

  const isDisabled = (p: Player) => p.name.trim() === "" || p.icon === ""

  const showNumber = (row: number, col: number) => {
    if(!p1.winner && !p2.winner){
      let updatedVisibleBoard: BoardType = [...visibleBoard]
      if(!p1.clicked){
        setP1(prevState => ({...prevState, clicked: true}))
        setP2(prevState => ({...prevState, clicked: false}))
        updatedVisibleBoard[row][col] = p1.icon
      }
      else{
        setP1(prevState => ({...prevState, clicked: false}))
        setP2(prevState => ({...prevState, clicked: true}))
        updatedVisibleBoard[row][col] = p2.icon
      }
  
      let draw = true
  
      const declareWinner = (value: string | null) => {
        p1.icon === value && setP1(prevState => ({ ...prevState, winner: true }))
        p2.icon === value && setP2(prevState => ({ ...prevState, winner: true }))
        draw = false
      }
  
      for(let i = 0; i < 3; i++){
        const rowMatch = updatedVisibleBoard[i][0] === updatedVisibleBoard[i][1] && updatedVisibleBoard[i][1] === updatedVisibleBoard[i][2]
        const colMatch = updatedVisibleBoard[0][i] === updatedVisibleBoard[1][i] && updatedVisibleBoard[1][i] === updatedVisibleBoard[2][i]
        if (rowMatch || colMatch) declareWinner(updatedVisibleBoard[rowMatch ? i : 0][colMatch ? i : 0])
      }
  
      const di1 = updatedVisibleBoard[0][0] === updatedVisibleBoard[1][1] && updatedVisibleBoard[1][1] === updatedVisibleBoard[2][2]
      const di2 = updatedVisibleBoard[0][2] === updatedVisibleBoard[1][1] && updatedVisibleBoard[1][1] === updatedVisibleBoard[2][0]
  
      if (di1 || di2) declareWinner(updatedVisibleBoard[1][1])
      
      setVisibleBoard(updatedVisibleBoard)
  
      const status: boolean = updatedVisibleBoard.flat().every(status => status)
      if(status && draw){
        setTimeout(() => handleReset(), 2000)
      }
    }
  }

  const handleBack = () => {
    setShow("playerName")
    setP1({name: "", icon: "", clicked: false, winner: false})
    setP2({name: "", icon: "", clicked: false, winner: false})
  }

  const handleReset = () => {
    setP1(prevState => ({...prevState, clicked: false, winner: false}))
    setP2(prevState => ({...prevState, clicked: false, winner: false}))
    setBoard(initialBoard(3, 3, null))
    setVisibleBoard(initialBoard(3, 3, ""))
  }

  if (show === "playerName") {
    return (
      <div className="main">
        <div className="heading">Tic-<span className='text-red'>Tac</span>-Toe</div>
        <div className='content'>
          <form onSubmit={handleSubmit}>
            <div className='select-container'>
              <div className='flex flex-col'>
                <label htmlFor='p1'>Enter P1 name</label>
                <input value={p1.name} id="p1" onChange={(e) => handlePlayerInfoChange(setP1, "name", e.target.value, e.target.id)} required />
              </div>
              <div className='flex flex-col justify-start items-center h-fit w-full'>
                <label>Choose One:</label>
                <div className='icon-container'>
                  <button className='icon p1-btn' id="p1X" type="button" onClick={(e) => handlePlayerInfoChange(setP1, "icon", "X", "p1X")}>X</button>
                  <button className='icon p1-btn' id="p1O" type="button" onClick={(e) => handlePlayerInfoChange(setP1, "icon", "O", "p1O")}>O</button>
                </div>
              </div>
            </div>
            <div className='select-container'>
              <div className='flex flex-col'>
                <label htmlFor='p1'>Enter P2 name</label>
                <input value={p2.name} id="p2" onChange={(e) => handlePlayerInfoChange(setP2, "name", e.target.value, e.target.id)} required />
              </div>
              <div className='flex flex-col justify-start items-center h-fit w-full'>
                <label>Choose One:</label>
                <div className='icon-container'>
                  <button className='icon p2-btn' id="p2X" type="button" onClick={(e) => handlePlayerInfoChange(setP2, "icon", "X", "p2X")}>X</button>
                  <button className='icon p2-btn' id="p2O" type="button" onClick={(e) => handlePlayerInfoChange(setP2, "icon", "O", "p2O")}>O</button>
                </div>
              </div>
            </div>
            <button className='primary' type="submit" disabled={isDisabled(p1) || isDisabled(p2)}>Next</button>
          </form>
        </div>
      </div>
    )
  }

  else if (show === "play") {
    return (
      <div className="main">
        <div className="heading">Tic-<span className='text-red'>Tac</span>-Toe</div>
        <div className='content'>
        {p1.winner && <Lottie animationData={celebration} className='absolute h-3/4 z-10'/>}
          <div className='flex w-full md:w-1/2 justify-between items-center h-[20%]'>
            <div className='player-info'>
              <span title={p1.name}>{p1.name}</span>
              <button className='icon'>{p1.icon}</button>
              {p1.winner && <Lottie animationData={winner} className='absolute -top-[75%] -right-[50%] w-full h-[150%]'/>}
            </div>
            <div className='player-info'>
              <span title={p2.name}>{p2.name}</span>
              <button className='icon'>{p2.icon}</button>
              {p2.winner && <Lottie animationData={winner} className='absolute -top-[75%] -left-[50%] w-full h-[150%]'/>}
            </div>
          </div>
          <div className='h-[55%] aspect-square'>
            {board.map((row, rowId) => {
              return (
                <div key={rowId} className='flex w-full h-1/3 justify-center items-center row'>
                  {row.map((col, colId) => {
                    return (
                      <div key={colId} className='h-full w-1/3 text-orange flex justify-center items-center p-2 number' onClick={() => showNumber(rowId, colId)}>
                        <span className='text-5xl font-bold'>{visibleBoard[rowId][colId]}</span>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <div className='h-[10%]'>
            <button className='bg-orange text-black font-bold p-2 rounded-lg'>{!p1.clicked ? p1.name : p2.name}&apos;s Turn</button>
          </div>
          <button className='secondry left-4' onClick={handleBack}>Back</button>
          <button className='secondry' onClick={handleReset}>Reset</button>
        </div>
      </div>
    )
  }
}
