import React from 'react'

// https://tailwindflex.com/@anonymous/loading-dots
export default function Throbber() {
  return (
    <>
      <div className="flex my-16 items-center justify-center space-x-2 dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-black [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-black"></div>
      </div>
    </>
  )
}
