import React from "react";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import TeamInfo from "../components/TeamInfo";
import TeamHeroes from "../components/TeamHeroes";
import bgImageAlpha from "../images/bgImageAlpha.png";
import heroImage from "../images/hero.png";
import { Link } from "react-router-dom";

function Home(props) {
    const handleRemove = (hero) => {
        props.setTeam(
            props.team.filter(function (rem) {
                return rem !== hero;
            })
        );
    };

    const post = {
        image: heroImage,
        imageText: "SUPERHEROES ARE COOL",
        title: "HEY THERE!",
        description: "WELCOME TO THE ULTIMATE SUPER HERO TEAM BUILDER",
        linkText: "Log in to start!",
    };

    return (
        <Grid
            container
            display="flex"
            sx={{
                position: "relative",
                justifyContent: "flex-end",
                height: `calc(100vh - ${props.navHeight}px)`,
            }}
        >
            <Grid
                item
                sx={{
                    position: "absolute",
                    height: `calc(100vh - ${props.navHeight}px)`,
                    width: "100vw",
                    background: `url(${bgImageAlpha}) no-repeat center center`,
                    backgroundSize: "cover",
                    zIndex: "0",
                    overflow: "hidden",
                }}
            />
            <Grid item xs={12} md={12}>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        height: `calc(100vh - ${props.navHeight}px)`,
                    }}
                >
                    {props.user ? (
                        <Grid
                            container
                            flexDirection="row-reverse"
                            height={`calc(100vh - ${props.navHeight}px)`}
                        >
                            <Grid item xs={12} md={3} px={1}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <SearchBar
                                            navHeight={props.navHeight}
                                            setSearchBarHeight={
                                                props.setSearchBarHeight
                                            }
                                            setResults={props.setResults}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SearchResults
                                            navHeight={props.navHeight}
                                            searchBarHeight={
                                                props.searchBarHeight
                                            }
                                            results={props.results}
                                            team={props.team}
                                            setTeam={props.setTeam}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={9} px={1}>
                                <TeamInfo
                                    team={props.team}
                                    searchBarHeight={props.searchBarHeight}
                                />
                                <TeamHeroes
                                    team={props.team}
                                    handleRemove={handleRemove}
                                    navHeight={props.navHeight}
                                    searchBarHeight={props.searchBarHeight}
                                />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid
                            container
                            display="flex"
                            sx={{
                                position: "relative",
                                justifyContent: "center",
                                height: `calc(100vh - ${props.navHeight}px)`,
                            }}
                        >
                            <Paper
                                sx={{
                                    position: "relative",
                                    backgroundColor: "grey.800",
                                    color: "#fff",
                                    mb: 4,
                                    top: 15,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundImage: `url(${post.image})`,
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        bottom: 0,
                                        right: 0,
                                        left: 0,
                                        backgroundColor: "rgba(0,0,0,.3)",
                                    }}
                                />
                                <Grid container>
                                    <Grid item md={6}>
                                        <Box
                                            sx={{
                                                position: "relative",
                                                p: { xs: 3, md: 6 },
                                                pr: { md: 0 },
                                            }}
                                        >
                                            <Typography
                                                component="h1"
                                                variant="h3"
                                                color="inherit"
                                                gutterBottom
                                            >
                                                {post.title}
                                            </Typography>
                                            <Typography
                                                variant="h5"
                                                color="inherit"
                                                paragraph
                                            >
                                                {post.description}
                                            </Typography>
                                            <Link
                                                variant="subtitle1"
                                                to="/login"
                                                style={{
                                                    color: "inherit",
                                                }}
                                            >
                                                {post.linkText}
                                            </Link>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Home;
