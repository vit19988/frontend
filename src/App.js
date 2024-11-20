import './App.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import SearchComponent from "./components/SearchComponent";

const theme = createTheme({
    typography: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: 20
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <SearchComponent/>
        </ThemeProvider>
    );

}

export default App;
