import React, { useRef } from "react";
import { Avatar, Grid, ImageListItemBar, IconButton } from "@material-ui/core";

import { AddCircle } from "@material-ui/icons";

function SearchResults(props) {
    // handle horizontal scroll, window scroll still activated
    const onWheel = (e) => {
        if (window.innerWidth < 900) {
            const container = scrollRef.current;
            const containerScrollPosition = scrollRef.current.scrollLeft;

            container.scrollTo({
                top: 0,
                left: containerScrollPosition + e.deltaY,
            });
        }
    };

    const scrollRef = useRef(null);
    // handle add hero, scroll position reset on add to team
    const handleClick = (json) => {
        let goodHeroes = 0;
        let badHeroes = 0;
        let repeatedHero = false;

        props.team.map((hero) => {
            if (hero.biography.alignment === "good") {
                goodHeroes = ++goodHeroes;
            }
            if (hero.biography.alignment === "bad") {
                badHeroes = ++badHeroes;
            }
            if (hero.id === json.id) {
                repeatedHero = true;
            }
            return 0;
        });

        if (repeatedHero) {  
			
            return;
        }

        if (goodHeroes < 3 && json.biography.alignment === "good") {
            props.setTeam((oldTeam) => [...oldTeam, json]);
        } else if (badHeroes < 3 && json.biography.alignment === "bad") {
            props.setTeam((oldTeam) => [...oldTeam, json]);
        } else if (
            props.team.length < 6 &&
            json.biography.alignment === "neutral"
        ) {
            props.setTeam((oldTeam) => [...oldTeam, json]);
        }
    };

    const setAlignment = (alignment) => {
        if (alignment === "good") {
            return "Good";
        } else if (alignment === "bad") {
            return "Evil";
        } else if (alignment === "neutral") {
            return "Neutral";
        } else {
            return "Unknown";
        }
    };

    return props.results ? (
        <Grid
            ref={scrollRef}
            className="container"
            id="container"
            onWheel={onWheel}
            sx={{
                height: [
                    "auto",
                    "auto",
                    `calc(100vh - ${props.navHeight}px - ${props.searchBarHeight}px)`,
                ],
                overflow: "auto",
                display: "flex",
                flexDirection: ["row", "row", "column"],
            }}
        >
            {props.results.map((item) => (
                <Grid
                    container
                    item
                    key={item.id}
                    sx={{
                        position: "relative",
                        marginY: ["2px", "2px", "2px"],
                        marginX: ["2px", "2px", "0px"],
                    }}
                >
                    <Avatar
                        srcSet={item.image.url}
                        alt={item.name}
                        sx={{
                            borderRadius: "10px",
                            objectFit: "cover",
                            width: ["150px", "150px", "100%"],
                            height: ["125px", "145px", "200px"],
                        }}
                    />
                    <ImageListItemBar
                        title={item.name}
                        subtitle={setAlignment(item.biography.alignment)}
                        sx={{
                            width: ["150px", "150px", "100%"],
                            borderBottomLeftRadius: "10px",
                            borderBottomRightRadius: "10px",
                            zIndex: "1",
                        }}
                        actionIcon={
                            <IconButton
                                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                                aria-label={`info about ${item.name}`}
                                onClick={() => handleClick(item)}
                            >
                                <AddCircle />
                            </IconButton>
                        }
                    />
                </Grid>
            ))}
        </Grid>
    ) : null;
}

export default SearchResults;
