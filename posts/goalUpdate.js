import { Grid, Typography, Avatar } from "@mui/material";
import React from "react";
import Divider from "@mui/material/Divider";
import { useStyles } from "../style";
import { FlagIcon } from "../../workboard/Icons/flagIcon";

const GoalUpdate = ({ data }) => {
    const classes = useStyles();

    return (
        <>
            <Divider />
            <Grid container spacing={2} px={2}>
                <Grid item xs={12} md={12} lg={12} mt={0}>
                    {/* <Grid p={1} sx={{ width: "fit-content", backgroundColor: "#FEFFB6", borderRadius: "4px" }}>
                        <Typography
                            sx={{
                                fontSize: "16px",
                                color: "#334155",
                            }}>
                            <span style={{ fontWeight: "600" }}>Revenue</span> increased to{" "}
                            <span style={{ fontWeight: "600" }}>$1000K</span> in{" "}
                            <span style={{ fontWeight: "600" }}>45 days.</span>
                        </Typography>
                    </Grid> */}
                </Grid>
                <Grid item xs={12} md={12} lg={12} className={classes.gridFlexSx} >
                    <Avatar className={classes.goalAvatarSx}>
                        <img src="/public/social-img/Objective_icon.svg" />
                    </Avatar>
                    <Typography
                        pl={1}
                        className={classes.typographySx}>
                        {data && data.data && data.data.message && data.data.message}
                    </Typography>
                </Grid>
                {data && data.data && (
                    <Grid
                        container
                        className={classes.muiGridSxItem}
                    >
                        <Grid
                            container
                            spacing={1}
                            pl={7.5}
                            className={classes.goalAlignItems}>
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
                <Grid item xs={12} md={12} lg={12}>
                    <Grid spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Grid pl={2} pr={2}>
                                <Grid item>
                                    <Grid className={classes.SingleGoalUpdateBg}></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid py={1}>
                <Divider />
            </Grid>
        </>
    );
};

export default GoalUpdate;
