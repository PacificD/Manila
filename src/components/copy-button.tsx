import React from 'react'
import { toast } from 'sonner'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

type CopyButtonProps = {
  value: string
} & React.HTMLAttributes<HTMLButtonElement>

const copyToClipboardWithMeta = async (value: string) => {
  navigator.clipboard.writeText(value)
}

export const CopyButton = ({ value, className, ...props }: CopyButtonProps) => {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <button
      className={cn(
        'relative z-20 inline-flex h-8 items-center justify-center rounded-md border-neutral-200 p-2 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-100 focus:outline-none dark:text-neutral-100 dark:hover:bg-neutral-800',
        className
      )}
      onClick={() => {
        copyToClipboardWithMeta(value)
        setHasCopied(true)
        toast.success('Copied to clipboard!')
      }}
      {...props}
    >
      <span className='sr-only'>Copy</span>
      {hasCopied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
    </button>
  )
}
