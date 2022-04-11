import Spinner from "@core/partials/spinner";
import { Grid } from "@mui/material";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Header from "../partials/header";
import Reactions from "../partials/reactions";
import SingleAnniversary from "../posts/anniversary";
import Birthday from "../posts/birthday";
import Event from "../posts/event";
import GoalUpdate from "../posts/goalUpdate";
import NewJoinee from "../posts/newJoinee";
import Post from "../posts/post";
import Promotion from "../posts/promotion";
import { useLocation } from "react-router-dom";
import { useStyles } from "../style";

const IndividualPost = (props) => {
    const classes = useStyles() ;
    const location = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { from } = location.state;

    const auth = useSelector((state) => state.auth);
    const { activity_id } = useParams();
    useEffect(() => {
        const getData = {
            feed_group: auth.feed_group,
            feed_name: auth.feed_id,
            activity_id: activity_id,
            notification_id: from,
        };
        Axios.post("/api/v1/social/activity/view", getData, {
            headers: { Authorization: `Bearer ${auth.access_token}` },
        }).then(function (response) {
            if (response.status == 200) {
                setData(response.data.data[0]);
                setLoading(true);
            } else if (response.status == 400) {
                <CustomErrorPage />;
            } else {
                <ErrorBoundary />;
            }
        });
    }, [activity_id]);
    return (
        <>
            <Grid container spacing={2} style={{ height: "100vh" }}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    {loading && data ? (
                        <Grid className={classes.viewPost} mb={3}>
                            <Header data={data} />
                            {
                                {
                                    anniversary: <SingleAnniversary data={data} />,
                                    birthday: <Birthday data={data} />,
                                    promotion: <Promotion data={data} />,
                                    joining: <NewJoinee data={data} />,
                                    goal: <GoalUpdate data={data} />,
                                    post: <Post data={data} />,
                                    event: <Event data={data} />,
                                    okr_goal: <GoalUpdate data={data} />,
                                }[data.event_type]
                            }
                            <Reactions data={data} auth={auth} />
                        </Grid>
                    ) : (
                        <Spinner />
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default IndividualPost;
