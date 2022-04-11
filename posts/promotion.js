import { Grid } from "@mui/material";
import React from "react";
import { useStyles } from "../style";


const Promotion = ({ data }) => {
    const classes = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
                <Grid spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid pl={2} pr={2}>
                            <Grid item>
                                <Grid className={classes.SinglePromotionBg}>
                                    <Grid className={classes.gridPositionSx}>
                                        <img
                                            alt="complex"
                                            src={data.actor.data.profile_image ? data.actor.data.profile_image : "/public/default/user.jpeg"}
                                            className={classes.PromotionProfileImg}
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
export default Promotion;
