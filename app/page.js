'use client'

import { useEffect } from 'react'
import SCTracker from './tracker'

export default function Home() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    }
  }, [])

  return <SCTracker />
}
