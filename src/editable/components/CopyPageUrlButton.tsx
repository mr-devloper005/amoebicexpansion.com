'use client'

import { useState } from 'react'
import { Check, Share2 } from 'lucide-react'

type CopyPageUrlButtonProps = {
  className?: string
}

export function CopyPageUrlButton({ className = '' }: CopyPageUrlButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const url = window.location.href

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
      return
    } catch {
      const input = document.createElement('input')
      input.value = url
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={className}
      aria-live="polite"
    >
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {copied ? 'Copied link' : 'Share page'}
    </button>
  )
}
