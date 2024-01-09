"use client"

import Lottie from 'lottie-react'
import React, { useState } from 'react'
import celebration from "@/utils/celebration.json"
import { Board } from './Board'
import { PlayerInfo } from './PlayerInfo'
import { SelectInput } from './SelectInput'

export type BoardType = Array<Array<string | null>>
type Icon = "X" | "O"
export type Player = { name: string, icon: Icon | "", clicked: boolean, winner: boolean }
export type ShowIcon = (row: number, col: number ) => void
export type SetState = React.Dispatch<React.SetStateAction<Player>>
export type InfoChange = (method: SetState, name: string, value: string, id: string) => void

const initialBoard = (rows: number, cols: number, value: Icon | ""): BoardType => Array.from({ length: rows }, () => Array(cols).fill(value))

export const TicTacToe = () => {
  const [show, setShow] = useState<string | null>("playerName")
  const [p1, setP1] = useState<Player>({ name: "", icon: "", clicked: false, winner: false })
  const [p2, setP2] = useState<Player>({ name: "", icon: "", clicked: false, winner: false })
  const [board, setBoard] = useState<BoardType>([])
  const [coordinates, setCoordinates] = useState<[number, number][] | null>(null)

  const selectBtn = (p: HTMLButtonElement) => {
    p.style.border = "2px solid #f22853"
    p.style.backgroundColor = "transparent"
  }

  const resetBtn = (btn: HTMLButtonElement) => {
    btn.style.border = "2px solid transparent";
    btn.style.backgroundColor = "#f22853";
  }

  const handlePlayerInfoChange: InfoChange = (method: SetState, name: string, value: string, id: string) => {
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
    setBoard(initialBoard(3, 3, ""))
    setShow("play")
  }

  const isDisabled = (p: Player) => p.name.trim() === "" || p.icon === ""

  const updatePlayerClick = (board: BoardType, row: number, col: number) => {
    const clicked = p1.clicked
    const currentPlayer = !clicked ? p1 : p2;
    board[row][col] = currentPlayer.icon

    setP1((prevP1) => ({ ...prevP1, clicked: !clicked }))
    setP2((prevP2) => ({ ...prevP2, clicked: clicked }))
    setBoard(board)
  }

  const declareWinner = (value: string | null) => {
    p1.icon === value && setP1(prevState => ({ ...prevState, winner: true }))
    p2.icon === value && setP2(prevState => ({ ...prevState, winner: true }))
    return false
  }

  const checkForWinner = (board: BoardType) => {
    // Check for a winner in rows and columns
    for (let i = 0; i < 3; i++) {
      const rowMatch = board[i][0] === board[i][1] && board[i][1] === board[i][2];
      const colMatch = board[0][i] === board[1][i] && board[1][i] === board[2][i];
      const value = board[rowMatch ? i : 0][colMatch ? i : 0]
      const isIcon = value === "X" || value === "O" 
      if(isIcon && rowMatch){
        setCoordinates([[i, 0], [i, 1], [i, 2]])
        return declareWinner(value)
      }
      else if(isIcon && colMatch){
        setCoordinates([[0, i], [1, i], [2, i]])
        return declareWinner(value)
      }
    }
  
    // Check for a winner in diagonals
    const di1 = board[0][0] === board[1][1] && board[1][1] === board[2][2];
    const di2 = board[0][2] === board[1][1] && board[1][1] === board[2][0];
    const value = board[1][1]
    if(value && di1){
      setCoordinates([[0, 0], [1, 1], [2, 2]])
      return declareWinner(value)
    }
    else if(value && di2){
      setCoordinates([[0, 2], [1, 1], [2, 0]])
      return declareWinner(value)
    }

    return false
  };

  const checkForDraw = (board: BoardType, draw: boolean) => {
    const status = board.flat().every(status => status)
      if (status && draw) {
        setTimeout(() => handleReset(), 2000)
      }
  }

  const showIcon: ShowIcon = (row: number, col: number): void => {
    let updatedVisibleBoard: BoardType = [...board]
    if (!updatedVisibleBoard[row][col] && !p1.winner && !p2.winner) {

      updatePlayerClick(updatedVisibleBoard, row, col)

      let draw = true
      draw = checkForWinner(updatedVisibleBoard)

      checkForDraw(updatedVisibleBoard, draw)
    }
  }

  const handleBack = () => {
    setShow("playerName")
    setP1({ name: "", icon: "", clicked: false, winner: false })
    setP2({ name: "", icon: "", clicked: false, winner: false })
    setCoordinates(null)
  }

  const handleReset = () => {
    setP1(prevState => ({ ...prevState, clicked: false, winner: false }))
    setP2(prevState => ({ ...prevState, clicked: false, winner: false }))
    setBoard(initialBoard(3, 3, ""))
    setCoordinates(null)
  }

  if (show === "playerName") {
    return (
      <div className="main">
        <div className="heading">Tic-<span className='text-red'>Tac</span>-Toe</div>
        <div className='content'>
          <form onSubmit={handleSubmit}>

            <SelectInput p={p1} playerType={"p1"} handlePlayerInfoChange={handlePlayerInfoChange} setP={setP1} />
            <SelectInput p={p2} playerType={"p2"} handlePlayerInfoChange={handlePlayerInfoChange} setP={setP2} />
    
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

          {(p1.winner || p2.winner) && <Lottie animationData={celebration} className='absolute h-3/4 z-10' />}

          <div className='flex w-full md:w-1/2 justify-between items-center h-[20%]'>
            <PlayerInfo p={p1} />
            <PlayerInfo p={p2} />
          </div>

          <Board board={board} showIcon={showIcon} coordinates={coordinates}/>

          <div className='h-[10%]'>
            <button className='bg-orange text-black font-bold p-2 rounded-lg'>{!p1.clicked ? p1.name : p2.name}&apos;s Turn</button>
          </div>

          <button className='secondry left-4' onClick={handleBack}>Back</button>
          <button className='secondry' onClick={handleReset}>Reset</button>
        </div>
      </div >
    )
  }
}
