import React from 'react'

export const Draw = ( { icon }: { icon: string | null }) => {
  return (
    <div className="w-full h-full">
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        {icon === "X" && 
          <>
            <line className="letter-x animate-draw" x1="10" y1="10" x2="90" y2="90" />
            <line className="letter-x animate-draw" x1="10" y1="90" x2="90" y2="10" />
          </>
        }
        {icon === "O" && <circle className="letter-o animate-draw" cx="50" cy="50" r="40" />}
      </svg>
    </div>
  )
}
