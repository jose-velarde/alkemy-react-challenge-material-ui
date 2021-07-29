import React, { useState } from "react";

import {
    Collapse,
    IconButton,
    ImageListItem,
    ImageListItemBar,
    Grid,
    LinearProgress,
} from "@material-ui/core";
import { Cancel, Info } from "@material-ui/icons";

function Hero(props) {
    const [checked, setChecked] = useState(false);

    const handleCollapse = () => {
        setChecked((prev) => !prev);
    };
    const handleRemove = (hero) => {
        props.handleRemove(hero);
    };

    const setInfo = (hero) => {
        const stats = [
            ["Intelligence", hero.powerstats.intelligence],
            ["Strength", hero.powerstats.strength],
            ["Speed", hero.powerstats.speed],
            ["Durability", hero.powerstats.durability],
            ["Power", hero.powerstats.power],
            ["Combat", hero.powerstats.combat],
            ["Alias", hero.biography.aliases[0]],
            ["Weight", hero.appearance.weight[1]],
            ["Height", hero.appearance.height[1]],
            ["Eyes color", hero.appearance["eye-color"]],
            ["Hair color", hero.appearance["hair-color"]],
            ["Base", hero.work.base],
        ];

        return stats.map((stat, index) => {
            return (
                <Grid container key={"stat" + index} mb={"2px"}>
                    <Grid item xs={7}>
                        {stat[0]}
                    </Grid>
                    <Grid item flexGrow={1} alignSelf="center">
                        {index > 5 ? (
                            stat[1]
                        ) : (
                            <LinearProgress
                                variant="determinate"
                                value={Number(stat[1])}
                            />
                        )}
                    </Grid>
                </Grid>
            );
        });
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
    return (
        <ImageListItem key={props.hero.id}>
            <img
                srcSet={props.hero.image.url}
                alt={props.hero.name}
                style={{
                    borderRadius: "10px",
					minHeight: ['auto','auto',`calc(100vh - ${props.navHeight}px - ${props.searchBarHeight}px)`],
                }}
            />
            <ImageListItemBar
                title={props.hero.name}
                position="top"
                subtitle={setAlignment(props.hero.biography.alignment)}
                sx={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    zIndex: "1",
                }}
                actionIcon={
                    <div>
                        <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${props.hero.name}`}
                            onClick={handleCollapse}
                        >
                            <Info />
                        </IconButton>
                        <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${props.hero.name}`}
                            onClick={() => handleRemove(props.hero)}
                        >
                            <Cancel />
                        </IconButton>
                    </div>
                }
            />
            <Collapse in={checked} timeout={0}>
                <ImageListItemBar
                    title={setInfo(props.hero)}
                    position="bottom"
                    sx={{
                        borderRadius: "10px",
                        zIndex: "1",
                    }}
                />
            </Collapse>
        </ImageListItem>
    );
}

export default Hero;
