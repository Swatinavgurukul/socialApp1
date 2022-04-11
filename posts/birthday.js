import { Grid } from "@mui/material";
import { useStyles } from "../style";
import { Typography, Avatar } from "@mui/material";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import React from "react";

const SingleBirthday = ({ data }) => {
    const classes = useStyles();
    return (
        <>
            <Grid container mt={1}>
                <Grid item xs>
                    <Typography className={classes.birthdayImageSection} pt={3} sx={{ position: "relative" }}>
                        <Avatar className={classes.birthdayUserProfile}>
                            <img
                                alt="complex"
                                src={data.actor.data.profile_image ? data.actor.data.profile_image : "/public/default/user.jpeg"}
                                style={{
                                    height: "100px",
                                }}
                            />
                        </Avatar>
                        <Avatar className={classes.birthdayPostIcon}>
                            <Typography variant="body1">
                                <CakeOutlinedIcon />
                            </Typography>
                        </Avatar>
                        <Typography className={classes.birthdayUserName}>{data.actor.data.full_name}</Typography>
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};
export default SingleBirthday;
