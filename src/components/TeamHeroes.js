import React from "react";
import { ImageList } from "@material-ui/core";
import Hero from "./Hero";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function TeamHeroes(props) {
    const aboveSm = useMediaQuery("(min-width:600px)", { noSsr: true });
    const aboveMd = useMediaQuery("(min-width:900px)", { noSsr: true });

    return props.team.length > 0 ? (
        <ImageList
            cols={aboveMd ? 3 : aboveSm ? 2 : 1}
            sx={{
                height: [
                    "auto",
                    "auto",
                    `calc(100vh - ${props.navHeight}px - ${props.searchBarHeight}px)`,
                ],
                overflow: "auto",
                margin: "0",
            }}
        >
            {props.team.map((hero) => (
                <Hero
                    hero={hero}
                    handleRemove={props.handleRemove}
                    navHeight={props.navHeight}
                    searchBarHeight={props.searchBarHeight}
                />
            ))}
        </ImageList>
    ) : null;
}

export default TeamHeroes;
