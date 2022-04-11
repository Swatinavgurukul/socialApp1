import { Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventRespond from "./eventRespond.js";
import { getDate, format } from "date-fns";
import { useStyles } from "../style";
import Axios from "axios";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

const UpcomingEvents = ({
    auth,
    setRespondId,
    setEventReactionData,
    setEventMenuObject,
    respondId,
    eventReactionData,
    eventMenuObject,
    setEventRespondCount,
}) => {
    const [eventsList, setEventsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();
    useEffect(() => {
        const eventData = {
            feed_group: auth.feed_group,
            feed_name: auth.feed_id,
        };
        fetchEventsData(eventData);
    }, []);
    const fetchEventsData = (eventData) => {
        Axios.post("/api/v1/social/events", eventData, {
            headers: { Authorization: `Bearer ${auth.access_token}` },
        })
            .then((response) => {
                setEventsList(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    };
    return (
        <Grid container>
            <Grid container className={classes.ueGrid}>
                <Typography className={classes.ueTypography}>Upcoming Events</Typography>
                {eventsList.length > 0 && !loading ? (
                    eventsList.map((data) => (
                        <Grid key={data.data.id} container className={classes.ueGrid2}>
                            <Grid container padding={2} className={classes.ueGridStyling}>
                                <Grid item className={classes.ueStyledGrid}>
                                    <Grid className={classes.ueGridStyling1}>
                                        <Typography className={classes.textStyling}>
                                            {getDate(new Date(data.data.start_date))}
                                        </Typography>
                                        <Typography className={classes.dateStyling}>
                                            {format(new Date(data.data.start_date), "MMM")}
                                        </Typography>
                                    </Grid>
                                    <Grid container pl={1}>
                                        <Grid item>
                                            <Link to={`social-${data.id}`} state={{ from: `${data.id}` }} className={classes.linkStyle}>
                                                <Typography className={classes.taskTitle}>{data.data.title}</Typography>
                                            </Link>
                                            <Typography className={classes.timeStyling}>
                                                <AccessAlarmIcon className={classes.AccessAlarmIcon} />
                                                <Typography className={classes.textStyling1}>
                                                    {new Date(data.data.start_date).toLocaleString("en-US", {
                                                        hour: "numeric",
                                                        hour12: true,
                                                    })}{" "}
                                                    -{" "}
                                                    {new Date(data.data.end_date).toLocaleString("en-US", {
                                                        hour: "numeric",
                                                        hour12: true,
                                                    })}
                                                </Typography>
                                            </Typography>
                                            <Typography className={classes.textStyling2}>
                                                <LocationOnIcon className={classes.locationIcon} />
                                                <Typography className={classes.textStyling3}>
                                                    {data.data.location
                                                        ? data.data.location.length >= 15
                                                            ? data.data.location.substr(0, 15) + "..."
                                                            : data.data.location
                                                        : "--"}
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <EventRespond
                                        data={data}
                                        auth={auth}
                                        respondId={respondId}
                                        eventReactionData={eventReactionData}
                                        eventMenuObject={eventMenuObject}
                                        setRespondId={setRespondId}
                                        setEventReactionData={setEventReactionData}
                                        setEventMenuObject={setEventMenuObject}
                                        setEventRespondCount={setEventRespondCount}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    ))
                ) : eventsList.length == 0 && !loading ? (
                    <Grid pt={2} className={classes.upcomingEvents}>
                        <Divider />
                        <Grid py={1}>No Upcoming Events</Grid>
                    </Grid>
                ) : (
                    <Grid className={classes.loading} sx={{ padding: 2 }}>
                        <img width="100px" src="/public/default/loader.gif" />
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default UpcomingEvents;
