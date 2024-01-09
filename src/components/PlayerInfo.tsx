import Lottie from 'lottie-react'
import React from 'react'
import { Player } from './TicTacToe'
import winner from "@/utils/winner.json"

export const PlayerInfo = ({ p }: { p: Player}) => {
  return (
    <div className={`player-info ${p.winner ? "bg-yellow" : "bg-white"}`}>
      <span title={p.name}>{p.name}</span>
      <button className='icon'>{p.icon}</button>
      {p.winner && <Lottie animationData={winner} className='absolute -top-[100%] w-full h-[150%]' />}
    </div>
  )
}
