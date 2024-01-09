import React from 'react'
import { BoardType, ShowIcon } from './TicTacToe'
import { Draw } from './Draw'

export const Board = ({ board, showIcon, coordinates }: { board: BoardType, showIcon: ShowIcon, coordinates: [number, number][] | null }) => {
  return (
    <div className='h-[55%] aspect-square'>
      {board.map((row, rowId) => {
        return (
          <div key={rowId} className='flex w-full h-1/3 justify-center items-center row'>
            {row.map((col, colId) => {
              const isWinningCell = coordinates && coordinates.some(([i, j]) => rowId === i && colId === j)
              return (
                <div
                  key={colId}
                  className={`h-full w-1/3 text-orange flex justify-center items-center p-2 number`}
                  onClick={() => showIcon(rowId, colId)}
                >
                  <Draw icon={board[rowId][colId]} isWinningCell={isWinningCell}/>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

