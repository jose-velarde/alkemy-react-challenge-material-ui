import React, { useState } from "react";
import {
    Grid,
    Paper,
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    LinearProgress,
} from "@material-ui/core";
import { Cancel, Info, AddCircle } from "@material-ui/icons";

function TeamInfo(props) {
    const [open, setOpen] = useState(false);
    const handleShowDialog = () => {
        setOpen(true);
    };
    const handleHideDialog = () => {
        setOpen(false);
    };

    const castToNumber = (weightOrHeight) => {
        let number = weightOrHeight.replace(/\s[a-z]+|,/gi, "");
        if (number === "null") {
            return 0;
        } else {
            if (number.includes("tons")) {
                return Number(number) * 1000;
            } else {
                return Number(number);
            }
        }
    };

    const sortStats = (list) => {
        let statList = {
            Intelligence: list[0],
            Strength: list[1],
            Speed: list[2],
            Durability: list[3],
            Power: list[4],
            Combat: list[5],
        };
        let sorted_stats = [];
        for (let stat in statList) {
            sorted_stats.push([stat, statList[stat]]);
        }
        sorted_stats.sort((a, b) => {
            return a[1] - b[1];
        });

        sorted_stats = sorted_stats.reverse();
        return sorted_stats;
    };

    const data = (props) => {
        let weight = 0;
        let height = 0;
        let statList = [0, 0, 0, 0, 0, 0];
        props.team.forEach((hero) => {
            weight += castToNumber(hero.appearance.weight[1]);
            height += castToNumber(hero.appearance.height[1]);
            statList[0] +=
                hero.powerstats.intelligence === "null"
                    ? 0
                    : Number(hero.powerstats.intelligence);
            statList[1] +=
                hero.powerstats.strength === "null"
                    ? 0
                    : Number(hero.powerstats.strength);
            statList[2] +=
                hero.powerstats.speed === "null"
                    ? 0
                    : Number(hero.powerstats.speed);
            statList[3] +=
                hero.powerstats.durability === "null"
                    ? 0
                    : Number(hero.powerstats.durability);
            statList[4] +=
                hero.powerstats.power === "null"
                    ? 0
                    : Number(hero.powerstats.power);
            statList[5] +=
                hero.powerstats.combat === "null"
                    ? 0
                    : Number(hero.powerstats.combat);
        });

        let highestStat = sortStats(statList);
        // highestStat = [highestStat[0], highestStat[1]];
        height = ["Height", Math.floor(height / props.team.length)];
        weight = ["Weight", Math.floor(weight / props.team.length)];

        return [highestStat, weight, height];
    };

    const [highestStat, weight, height] = data(props);

    return props.team.length === 0 ? (
        <Grid
            container
            display="flex"
            sx={{
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
                    <Grid item md={10}>
                        <Box
                            sx={{
                                position: "relative",
                                p: { xs: 3, md: 6 },
                                pr: { md: 0 },
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                color="inherit"
                                gutterBottom
                            >
                                Search for Heroes and build your Team!
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                Add up to 3{" "}
                                <span style={{ color: "#7ED321" }}>GOOD</span>{" "}
                                heroes and 3{" "}
                                <span style={{ color: "#D0021B" }}>EVIL</span>{" "}
                                heroes!
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <AddCircle />{" "}
                                <span style={{ paddingLeft: "10px" }}>
                                    to add a hero
                                </span>
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{ display: "flex", alignItems: "center" }}
                            >
                                <Cancel />{" "}
                                <span style={{ paddingLeft: "10px" }}>
                                    to remove a hero
                                </span>
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{ display: "flex", alignItems: "center" }}
                            >
                                <Info />{" "}
                                <span style={{ paddingLeft: "10px" }}>
                                    for hero details!
                                </span>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    ) : (
        <Paper
            elevation={2}
            sx={{
                // minHeight: `calc(${props.searchBarHeight}px - 8px - 16px)`,
                marginY: "8px",
                marginX: "4px",
                // background: `url(${heroImage}) no-repeat center center`,
                position: "relative",
                backgroundColor: "rgba(0,0,0,.8)",
                color: "#fff",
            }}
        >
            <Grid container px={2} flexDirection="column">
                <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                        variant="h6"
                        color="#fff"
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        {highestStat[0][0]} Team!
                    </Typography>
                </Grid>
                <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                        variant="body2"
                        color="#fff"
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        Click here for more{" "}
                        <Button size="small" onClick={handleShowDialog}>
                            details
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleHideDialog}
                            fullWidth={true}
                            sx={{ margin: "0 auto" }}
                        >
                            <DialogTitle>Team Stats</DialogTitle>
                            <Divider />
                            <DialogContent>
                                {highestStat.map((stat, index) => {
                                    return (
                                        <Grid
                                            container
                                            key={"stat" + index}
                                            mb={"2px"}
                                        >
                                            <Grid item xs={4}>
                                                {stat[0]}
                                            </Grid>
                                            <Grid
                                                item
                                                flexGrow={1}
                                                alignSelf="center"
                                            >
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={Math.floor(
                                                        stat[1] /
                                                            props.team.length
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                                <Grid container mb={"2px"}>
                                    <Grid item xs={4}>
                                        {weight[0]}
                                    </Grid>
                                    <Grid item flexGrow={1}>
                                        {weight[1]}
                                    </Grid>
                                </Grid>
                                <Grid container mb={"2px"}>
                                    <Grid item xs={4}>
                                        {height[0]}
                                    </Grid>
                                    <Grid item flexGrow={1}>
                                        {height[1]}
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <Divider />
                            <DialogActions>
                                <Button autoFocus onClick={handleHideDialog}>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}
// sx={{
// 	position: "relative",
// 	backgroundColor: "grey.800",
// 	color: "#fff",
// 	mb: 4,
// 	top: 15,
// }}
export default TeamInfo;
