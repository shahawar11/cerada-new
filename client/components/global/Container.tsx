import React from 'react'
import { cn } from '@/lib/utils'

function Container({children, className}: {children: React.ReactNode, className?: string}) {
  return (
    <div className={cn('mx-auto max-w-6xl xl:max-w-7xl mt-8 md:mt-2', className)}>
      {children}
    </div>
  )
}

export default Container
