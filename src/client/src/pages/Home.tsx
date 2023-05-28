import { createRef } from 'react';
import Section from '../components/Section';

type Props = Record<string, never>

const Home: React.FC<Props> = () => {
  const ref = createRef<HTMLDivElement>()

  return (
    <>
      {/* <div style={{ height: '100vh' }} className='bg-primary'>
        <div className='bg-light'>
          Hello, World!
        </div>
      </div> */}
      <Section
        title='Testing'
        ref={ref}
        bg='primary-light'
        btnText='Button'
        btnHref='/'
      >
        &lt;Insert Text Here&gt;
      </Section>
    </>
  )
}

export default Home
