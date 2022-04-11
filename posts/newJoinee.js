import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useStyles } from "../style";
import React from "react";

const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "80%",
    borderRadius: "0%",
});

const NewJoinee = ({ data }) => {
    const classes = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
                <Grid spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid pl={2} pr={2}>
                            <Grid item>
                                <Grid className={classes.SingleBirthdayImg}>
                                    <Grid className={classes.gridPositionSx}>
                                        <Img
                                            alt="complex"
                                            src={data.actor.data.profile_image ? data.actor.data.profile_image : "/public/default/user.jpeg"}
                                            className={classes.newJoineeImg}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default NewJoinee;
