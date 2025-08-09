'use client'

import { usePathname } from 'next/navigation'
import { Fragment, useEffect } from 'react'

// Extend Window interface for Preline
declare global {
  interface Window {
    HSStaticMethods?: {
      autoInit: () => void;
    };
  }
}

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  useEffect(() => {
    const splashElement =
      document.querySelector<HTMLDivElement>('#__next_splash')
    const splashScreen = document.querySelector('#splash-screen')

    if (!splashElement || !splashScreen) return

    const handleMutations = (mutationsList: MutationRecord[]) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && splashElement.hasChildNodes()) {
          splashScreen.classList.add('remove')
        }
      }
    }

    // Import preline for UI components
    import('preline/preline')

    const observer = new MutationObserver(handleMutations)
    observer.observe(splashElement, { childList: true, subtree: true })
    if (splashElement.hasChildNodes()) {
      splashScreen.classList.add('remove')
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (window.HSStaticMethods) window.HSStaticMethods.autoInit()
    }, 400)
  }, [pathname])

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default AppProviders 