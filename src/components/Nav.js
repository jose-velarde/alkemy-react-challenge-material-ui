import React, { useRef, useEffect, useState } from "react";
import {
    Box,
    AppBar,
    Button,
    Toolbar,
    IconButton,
    Grid,
    Badge,
    Popper,
    Typography,
    Paper,
} from "@material-ui/core";
import { Brightness3, Brightness7, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";

// lazy notifications, should prob implement a state over add to team in search results
function Nav(props) {
    const reference = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();

    useEffect(() => {
        if (reference.current) {
            props.setNavHeight(reference.current.offsetHeight);
        }
    }, [props]);

    const logout = () => {
        localStorage.clear();
        props.setUser("");
    };

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const setNotificationsContent = () => {
        let goodHeroes = 0;
        let badHeroes = 0;
        let notifications = 0;

        props.team.forEach((hero) => {
            if (hero.biography.alignment === "good") {
                goodHeroes = ++goodHeroes;
            }
            if (hero.biography.alignment === "bad") {
                badHeroes = ++badHeroes;
            }
        });

        if (goodHeroes === 3) {
            notifications += 1;
        }
        if (badHeroes === 3) {
            notifications += 1;
        }
        if (badHeroes !== 3 && goodHeroes !== 3) {
            notifications = 0;
        }

        return [
            notifications,
            <Grid container direction="column">
                <Typography>
                    {badHeroes !== 3 && goodHeroes !== 3
                        ? "No notifications"
                        : null}
                </Typography>
                <Typography>
                    {goodHeroes === 3 ? "3 Good Heroes on team" : null}
                </Typography>
                <Typography>
                    {badHeroes === 3 ? "3 Evil Heroes on team" : null}
                </Typography>
            </Grid>,
        ];
    };

    const [notifications, notificationsContent] = setNotificationsContent();

    let menu;
    if (props.user === "") {
        menu = (
            <Grid item>
                <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <Button color="inherit">Login</Button>
                </Link>
            </Grid>
        );
    } else {
        menu = (
            <Grid item>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleClick("bottom-end")}
                >
                    <Badge badgeContent={notifications} color="error">
                        <Notifications />
                    </Badge>
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorEl}
                    placement={placement}
                    style={{ zIndex: "1500" }}
                >
                    <Paper>
                        <Typography sx={{ p: 2 }}>
                            {notificationsContent}
                        </Typography>
                    </Paper>
                </Popper>
                <Link
                    to="/login"
                    onClick={logout}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <Button color="inherit">Logout</Button>
                </Link>
            </Grid>
        );
    }

    return (
        <Box sx={{ flexGrow: 1 }} ref={reference}>
            <AppBar position="sticky">
                <Toolbar
                    display="flex"
                    sx={{ justifyContent: "space-between" }}
                >
                    <Grid item>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={props.setMode}
                        >
                            {props.mode === 'light' ? <Brightness3 /> : <Brightness7 />}
                        </IconButton>
                        <Link
                            to="/"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Button color="inherit">Home </Button>
                        </Link>
                    </Grid>
                    {menu}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Nav;
