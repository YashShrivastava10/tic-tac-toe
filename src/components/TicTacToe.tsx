"use client"

import React, { useState } from 'react'

type BoardType = Array<Array<string | null>>
type Icon = "X" | "O" | ""
type Player = { name: string, icon: Icon }

const initialBoard = (rows: number, cols: number): BoardType => Array.from({ length: rows }, () => Array(cols).fill(null))

export const TicTacToe = () => {
  const [board, setBoard] = useState<BoardType>(initialBoard(3, 3))
  const [show, setShow] = useState<string | null>("play")
  const [p1, setP1] = useState<Player>({ name: "Yash", icon: "X" })
  const [p2, setP2] = useState<Player>({ name: "Rajdeep", icon: "O" })

  const showNumber = (val: number) => console.log(val);

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
    setShow("play")
  }

  const isDisabled = (p: Player) => p.name.trim() === "" || p.icon === ""

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
              <div className='flex flex-col justify-start items-center h-fit w-full gap-2'>
                <span>Choose One:</span>
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
              <div className='flex flex-col justify-start items-center h-fit w-full gap-2'>
                <span>Choose One:</span>
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
          <div className='flex w-full justify-between items-center h-[20%]'>
            <div className='player-info'>
              <span title={p1.name}>{p1.name}</span>
              <button className='icon'>{p1.icon}</button>
            </div>
            <div className='player-info'>
              <span title={p2.name}>{p2.name}</span>
              <button className='icon'>{p2.icon}</button>
            </div>
          </div>
          <div className='h-[55%] aspect-square'>
            {board.map((row, rowId) => {
              return (
                <div key={rowId} className='flex w-full h-1/3 justify-center items-center row'>
                  {row.map((col, colId) => {
                    return (
                      <div key={colId} className='h-full w-1/3 flex justify-center items-center p-2 number' onClick={() => showNumber(colId)}>
                        <span className='text-5xl font-bold'>{col}</span>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <div className='h-[10%]'>
            <button className='bg-orange text-black font-bold p-2 rounded-lg'>{p1.name}&apos;s Turn</button>
          </div>
        </div>
      </div>
    )
  }
}
