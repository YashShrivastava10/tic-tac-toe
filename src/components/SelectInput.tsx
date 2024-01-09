import React from 'react'
import { InfoChange, Player, SetState } from './TicTacToe'

export const SelectInput = ({ p, playerType, handlePlayerInfoChange, setP }:
  {
    p: Player,
    playerType: string,
    handlePlayerInfoChange: InfoChange,
    setP: SetState,
  }) => {
  return (
    <div className='select-container'>
      <div className='flex flex-col'>
        <label htmlFor={playerType}>Enter P1 name</label>
        <input value={p.name} id={playerType} onChange={(e) => handlePlayerInfoChange(setP, "name", e.target.value, e.target.id)} required />
      </div>
      <div className='flex flex-col justify-start items-center h-fit w-full'>
        <label>Choose One:</label>
        <div className='icon-container'>
          <button className={`icon ${playerType}-btn`} id={`${playerType}X`} type="button" onClick={(e) => handlePlayerInfoChange(setP, "icon", "X", `${playerType}X`)}>X</button>
          <button className={`icon ${playerType}-btn`} id={`${playerType}O`} type="button" onClick={(e) => handlePlayerInfoChange(setP, "icon", "O", `${playerType}O`)}>O</button>
        </div>
      </div>
    </div>
  )
}
