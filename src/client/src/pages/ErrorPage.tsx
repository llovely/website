type Props = Record<string, never>

const ErrorPage: React.FC<Props> = () => {
  return (
    <div style={{ height: '100vh' }} >
      404: Page not found!
    </div>
  )
}

export default ErrorPage
