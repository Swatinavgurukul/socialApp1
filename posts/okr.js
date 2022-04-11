import { Avatar, Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import React from "react";
import { useStyles } from "../style";
import { FlagIcon } from "../../workboard/Icons/flagIcon";

const Okr = ({ data }) => {
    const classes = useStyles();

    return (
        <Grid>
            <Divider />
            <Grid container mt={2} px={2}>
                <Grid item>
                    <Grid pt={0} className={classes.gridFlexSx}>
                        <Avatar className={classes.goalAvatarSx}>
                            <img src="/public/social-img/Objective_icon.svg" />
                        </Avatar>
                        <Typography
                            pl={1}
                            className={classes.okrMsg}>
                            {data && data.data && data.data.message && data.data.message}
                        </Typography>
                    </Grid>
                </Grid>
                {data && data.data && (
                    <Grid item container>
                        <Grid
                            container
                            spacing={1}
                            pl={5.5}
                            pt={1}
                            className={classes.goalAlignItems}
                            >
                            <Grid item xs={12} md={6} lg={4}>
                                <Typography className={classes.okrFeedtext}>
                                    Timeframe :
                                    <Typography pl={1} className={classes.boldText}>
                                        {data.data.session}
                                    </Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <Typography className={classes.okrFeedtext}>
                                    Level :
                                    <Grid px={1} mt={0.5}>
                                        <img src="/public/social-img/Group.svg" sx={{ fontSize: 15 }} />
                                    </Grid>
                                    <Typography className={classes.boldText}>{data.data.level}</Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} lg={4}>
                                <Typography className={classes.okrFeedtext}>
                                    Priority :
                                    <Grid px={1} mt={0.5}>
                                        <FlagIcon
                                            fill={
                                                {
                                                    urgent: "#EE4A47",
                                                    high: "#FFB648",
                                                    medium: "#F6DF62",
                                                    low: "#CBD5E1",
                                                }[data.data.priority]
                                            }
                                        />
                                    </Grid>
                                    <Typography className={classes.boldText}>{data.data.priority}</Typography>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                {data && data.data && data.data.measured_by && (
                    <Grid item pl={5.5} mt={0.8}>
                        <Typography className={classes.okrFeedtext}>
                            Measured by :{" "}
                            <Typography pl={1} className={classes.boldText}>
                                {data.data.measured_by}
                            </Typography>
                        </Typography>
                    </Grid>
                )}
                <Grid item xs={12} md={12} lg={12}>
                    <Grid spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Grid pl={2} pr={2}>
                                <Typography className={classes.eventDetailText}>
                                    {data && data.data.description && data.description}
                                </Typography>
                                <Grid item pt={1}>
                                    <Grid className={classes.okrBg}></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid py={1}>
                <Divider />
            </Grid>
        </Grid>
    );
};
export default Okr;
