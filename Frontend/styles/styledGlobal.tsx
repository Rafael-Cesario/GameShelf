import { createGlobalStyle } from 'styled-components';

export const StyledGlobal = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: ${({ theme }) => theme.fontFamily}, 'Courier New', Courier, monospace;
    }

    body {
        background-color: ${({ theme }) => theme.mainBackground};
        color: ${({ theme }) => theme.mainText};
    }
`;
