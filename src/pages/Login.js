import React from "react";

import { Grid, Paper } from "@material-ui/core";
import LoginForm from "../components/LoginForm";
import bgImage from "../images/bgImage.png";
import { styled } from "@material-ui/core/styles";

const TransparentPaper = styled(Paper)(({ theme }) => ({
    opacity: "90%",
}));

function Login(props) {
    const flipped = Math.random() < 0.5;

    return (
        <Grid
            container
            display="flex"
            sx={{
                position: "relative",
                overflow: "hidden",
                justifyContent: "flex-end",
                height: `calc(100vh-${props.navHeight}px)`,
            }}
        >
            <Grid
                sx={{
                    position: "absolute",
                    height: `calc(100vh - ${props.navHeight}px)`,
                    width: "100vw",
                    background: `url(${bgImage}) no-repeat center center`,
                    backgroundSize: "cover",
                    zIndex: "-1",
                    overflow: "hidden",
                    transform: flipped ? "" : "scaleX(-1)",
                }}
            />
            <Grid item xs={1} md={6}></Grid>
            <Grid item xs={10} md={5}>
                <TransparentPaper
                    square
                    outlined="true"
                    elevation={0}
                    sx={{
                        marginLeft: "-1px",
                        minHeight: `calc(100vh - ${props.navHeight}px)`,
                    }}
                >
                    <LoginForm
                        setUser={props.setUser}
                        navHeight={props.navHeight}
                    />
                </TransparentPaper>
            </Grid>
            <Grid item xs={1} md={1}></Grid>
        </Grid>
    );
}

export default Login;
