import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans Condensed', sans-serif;
    -webkit-font-smoothing: antialiased;
    margin: 0;
    -moz-osx-font-smoothing: grayscale;
    padding: 20px 40px;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  a {
    color: black;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;