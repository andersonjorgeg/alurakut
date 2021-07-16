import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`
  /* reset css (Necolas Reset css <3)*/
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: #D9E6F6;
    /* background-image: url('https://s2.glbimg.com/rwzx_m6jUmY6SOCWn_n9YEjDd84=/0x0:1000x563/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/u/Z/utOe6ORjKrxeBdsaUJIg/wild-rift.jpg'); */
    background-repeat: no-repeat;
    background-size: cover;
  }

  #_next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  /* reset imagens */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: 'red',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
