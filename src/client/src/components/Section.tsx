import { forwardRef } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/esm/Button'

type Props = {
  children?: React.ReactNode
  id?: string
  title: string
  bg: string
} & ({
  btnEnabled?: true
  btnText: string
  btnHref: string
} | {
  btnEnabled: false
  btnText?: string
  btnHref?: string
})

const Section = forwardRef<HTMLDivElement, Props>(
  ({ children, id, title, btnEnabled=true, btnText, btnHref, bg }, ref) => {
    const bgClass = (bg) ? `bg-${bg}` : ''

    return (
      <div id={id} ref={ref} className={`section text-center ${bgClass}`}>
        <Container>
          <div className='py-4'>
            <h2 className='section-header'>{title}</h2>
            <div className='pb-0'>
              <hr className='section-header-hr my-0' />
            </div>
            <div className='pt-4'>
              {children}
            </div>
            {btnEnabled &&
              <div className='pt-4'>
                <Button
                  className='section-button section-button-dark'
                  type='button'
                  size='lg'
                  href={btnHref}
                  // style={{ '--sb-background-color': 'var(--background-color-default)' } as React.CSSProperties}
                >
                  {btnText}
                </Button>
              </div>
            }
          </div>
        </Container>
      </div>
    )
  })

export default Section
