type Props = {
  id?: string
  initialYear?: string
  currentYear: string
  name: string
  bg: string
}

const Footer: React.FC<Props> = ({ id, initialYear, currentYear, name, bg }) => {
  const bgClass = (bg) ? `bg-${bg}` : '';
  const className = `section-footer text-center py-3 ${bgClass}`
  const years = (initialYear) ? `${initialYear}-${currentYear}` : currentYear

  return (
    <div id={id} className={className}>
      &copy; {years} {name}. All Rights Reserved.
    </div>
  )
}

export default Footer
