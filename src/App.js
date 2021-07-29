import React, { useState } from "react";

import { CssBaseline } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "@fontsource/roboto";

// dark mode toggle resets everything
function App() {
    const [mode, setMode] = useState("light");
    const [user, setUser] = useState("");
    const [navHeight, setNavHeight] = useState(0);
    const [team, setTeam] = useState([]);
    const [results, setResults] = useState();
    const [searchBarHeight, setSearchBarHeight] = useState(0);

    const mainTheme = createTheme({
        palette: {
            mode: mode,
            primary: {
                main: "#115293",
                light: "#42a5f5",
                dark: "#1565c0",
                contrastText: "#fff",
            },
        },
        components: {
            MuiImageListItemBar: {
                styleOverrides: {
                    title: {
                        fontSize: "1.2rem",
                    },
                    subtitle: {
                        fontSize: "1rem",
                    },
                },
            },
            MuiCssBaseline: {
                styleOverrides: `
				html{
					*::-webkit-scrollbar {
						width: 0.4em,
					},
					*::-webkit-scrollbar-track {
						-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.00),
					},
					*::-webkit-scrollbar-thumb {
						backgroundColor: rgba(0,0,0,.1),
						outline: 1px solid slategrey,
					},
				}`,
            },
        },
    });
    const teamTheme = createTheme({
        palette: {
            mode: mode,
        },
    });
    const searchTheme = createTheme({
        palette: {
            mode: mode,
        },
    });

    const handleSetMode = () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    return (
        <div>
            <ThemeProvider theme={mainTheme}>
                <CssBaseline />
                <BrowserRouter>
                    <Nav
                        user={user}
                        setUser={setUser}
                        setNavHeight={setNavHeight}
                        mode={mode}
                        setMode={handleSetMode}
						team={team	}
                    />
                    <main>
                        <ThemeProvider theme={teamTheme}>
                        <Route
                            path="/"
                            exact
                            component={() => (
                                <Home
                                    user={user}
                                    navHeight={navHeight}
                                    team={team}
                                    setTeam={setTeam}
									results={results}
									setResults={setResults}
									searchBarHeight={searchBarHeight}
									setSearchBarHeight={setSearchBarHeight}
                                />
                            )}
                        />
                        </ThemeProvider>
                        <ThemeProvider theme={searchTheme}>
                            <Route
                                path="/login"
                                exact
                                component={() => (
                                    <Login
                                        setUser={setUser}
                                        navHeight={navHeight}
                                    />
                                )}
                            />
                        </ThemeProvider>
                    </main>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
