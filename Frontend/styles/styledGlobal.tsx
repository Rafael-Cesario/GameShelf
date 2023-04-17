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

            ::-webkit-scrollbar {
      background-color: ${({ theme }) => theme.mainBackground};
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.containerBackground};
      border-radius: 3px;
    }
    }

    button, input {
        outline:none;
        border: none;
        color: ${({ theme }) => theme.mainText};
        padding: ${({ theme }) => theme.padding};
        border-radius: ${({ theme }) => theme.borderRadius};
        font-weight: bold;
    }
    
    input {
        background-color: ${({ theme }) => theme.insideContainer} ;
    }

    button {
        cursor: pointer;
        background-color: ${({ theme }) => theme.primary} ;

        :hover {
            background-color: ${({ theme }) => theme.mainText};
            color: ${({ theme }) => theme.mainBackground};
        }
    }
`;
