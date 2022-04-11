import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useStyles } from "../style";

const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "80%",
    borderRadius: "0%",
});

const SingleAnniversary = ({ data }) => {
    const classes = useStyles();
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                    <Grid spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Grid pl={2} pr={2}>
                                <Grid item>
                                    <Grid className={classes.SingleAnniversaryImg}>
                                        <Grid className={classes.gridPositionSx}>
                                            <Img
                                                alt="complex"
                                                src={data.actor.data.profile_image ? data.actor.data.profile_image : "/public/default/user.jpeg"}
                                                className={classes.imgSx}
                                            />
                                            <Typography sx={{ fontWeight: "bold", color: "#000" }}>
                                                {data.actor.data.full_name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
export default SingleAnniversary;
