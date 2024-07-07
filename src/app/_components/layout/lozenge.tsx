interface LozengeProps {
  color: 'red' | 'orange' | 'yellow' | 'lime' | 'green' | 'teal' | 'sky' | 'purple' | 'pink'
  text: string
}

const styles = {
  red: 'bg-red-400/20 text-red-700 dark:bg-red-400/10 dark:text-red-300',
  orange: 'bg-orange-400/20 text-orange-700 dark:bg-orange-400/10 dark:text-orange-300',
  yellow: 'bg-yellow-400/20 text-yellow-700 dark:bg-yellow-400/10 dark:text-yellow-300',
  lime: 'bg-lime-400/20 text-lime-700 dark:bg-lime-400/10 dark:text-lime-300',
  green: 'bg-green-400/20 text-green-700 dark:bg-green-400/10 dark:text-green-300',
  teal: 'bg-teal-400/20 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300',
  sky: 'bg-sky-400/20 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300',
  purple: 'bg-purple-400/20 text-purple-700 dark:bg-purple-400/10 dark:text-purple-300',
  pink: 'bg-pink-400/20 text-pink-700 dark:bg-pink-400/10 dark:text-pink-300',
}

export default function Lozenge({ color, text }: LozengeProps) {
  return (
    <>
      <span className={`whitespace-nowrap rounded-lg p-2 text-xs font-semibold capitalize ${styles[color]}`}>{text}</span>
    </>
  )
}
