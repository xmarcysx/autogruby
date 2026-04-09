import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
  light?: boolean
  className?: string
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      {eyebrow && (
        <p className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-2">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          'text-3xl md:text-4xl font-bold tracking-tight',
          light ? 'text-white' : 'text-slate-900',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-base md:text-lg leading-relaxed max-w-2xl',
            centered && 'mx-auto',
            light ? 'text-slate-300' : 'text-slate-600',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
