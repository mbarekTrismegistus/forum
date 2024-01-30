import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './components/navbar'
import TanstackProvider from './providers/tanstackProvider'
import "./styles/globals.css"
import NextAuthProvider from './providers/sessionProvider'
import SideNavBar from './components/sideNavBar'
import localFont from 'next/font/local'

const myFont = localFont({
  src: 'Louis George Cafe.ttf',
  display: 'swap',
})


export const metadata = {
  title: 'Discuss Dev',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
      <body className={myFont.className}>
      <NextAuthProvider>
        <TanstackProvider>

            <Navbar/>
            <SideNavBar/>
            {children}

        </TanstackProvider>
      </NextAuthProvider>
      <script type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/ping.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/trefoil.js"></script>
      
      </body>
    </html>
  )
}
