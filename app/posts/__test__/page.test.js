import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../page'
import SinglePost from '../[postId]/page'
import NextAuthProvider from '@/app/providers/sessionProvider'
import TanstackProvider from '@/app/providers/tanstackProvider'
import { useRouter } from 'next/navigation';


jest.mock('next/navigation');
const pushMock = jest.fn();

useRouter.mockReturnValue({
  push: pushMock,
});
 
describe('Page', () => {
  it('renders', () => {
    render(
        <NextAuthProvider>
            <TanstackProvider>
                <Page />
            </TanstackProvider>
        </NextAuthProvider>
    )
 
  })
  
  it("renders", () =>{
    
    render(
      <NextAuthProvider>
          <TanstackProvider>
              <SinglePost params={1}/>
          </TanstackProvider>
      </NextAuthProvider>
  )
  })
})