export type ChildrenType = {
  children: React.ReactNode
}

export type ClassNameType = {
  className?: string
}

export type ButtonType = {
  className?: string
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export type ImageType = {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export type LinkType = {
  href: string
  children: React.ReactNode
  className?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
} 