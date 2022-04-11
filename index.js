import { Grid, Box } from "@mui/material";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Notification from "@core/notifications/Notification";
import Create from "./create/index";
import Posts from "./posts/index";
import { useStyles } from "./style";
import UpcomingEvents from "./upcomingEvents/upcomingEvents";
import { getAssignees } from "../mygoal/components/transformFunctions";
import UpcomingTasks from "./upcomingEvents/upcomingTask";
import { addWorkspaces } from "@core/redux/slices/navigationSlice";
import { useDispatch, useSelector } from "react-redux";

const Social = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const work = useSelector((state) => state.work);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userList, setUserList] = useState();
    const [offset, setOffset] = useState(0);
    const [profileData, setProfileData] = useState([]);
    const [respondId, setRespondId] = useState("");
    const [eventReactionData, setEventReactionData] = useState("");
    const [eventMenuObject, setEventMenuObject] = useState([]);
    const [eventRespondCount, setEventRespondCount] = useState(false);
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        addRoutes();
    }, [auth.application_list]);
    useEffect(() => {
        addWorkspaces();
        getUserList();
        setProfileData(auth.profile);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    useEffect(() => {
        const getData = {
            feed_group: auth.feed_group,
            feed_name: auth.feed_id,
            offset: offset,
        };

        if (!loading) return;
        fetchMoreData(getData);
    }, [loading]);
    const addRoutes = () => {
        console.log("work", work);
        const newroutes = [];
        work.workspacedata &&
            work.workspacedata.map((item) => {
                const newitem = {
                    icon: "task",
                    display_name: item.application_name,
                    route: `workspace/${item.application_id}`,
                };
                newroutes.push(newitem);
            });
        dispatch(addWorkspaces({ newroutes }));
    };
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 50 >= document.documentElement.offsetHeight)
            setLoading(true);
    };
    const fetchMoreData = (getData) => {
        Axios.post("/api/v1/social/feed", getData, {
            headers: { Authorization: `Bearer ${auth.access_token}` },
        })
            .then((response) => {
                setData((prevState) => [...prevState, ...response.data.data]);
                setLoading(false);
                setOffset(offset + 12);
            })
            .catch((error) => {
                setLoading(false);
            });
    };
    const removePost = (id) => {
        Axios.delete(`/api/v1/social/activity/remove/${auth.feed_group}/${auth.feed_id}/${id}`, {
            headers: { Authorization: `Bearer ${auth.access_token}` },
        }).then((response) => {
            Notification("auth.remove_post", "success");
            setData(data.filter((item) => item.id != id));
        });
    };
    const getUserList = (data = {}) => {
        Axios.post("/api/v1/core/userlist", data, {
            headers: {
                Authorization: `Bearer ${auth.access_token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                setUserList(getAssignees(res.data.data));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const addPost = (payload) => {
        let updated_payload = Object.assign(
            {},
            {
                latest_reactions: {},
                latest_reactions_extra: {},
                own_reactions: {},
                reaction_counts: {},
                score: 1,
                target: "",
            },
            payload
        );
        setData([updated_payload, ...data]);
    };
    return (
        <Grid container spacing={2} className={classes.socailMain}>
            <Grid item xs={12} sm={1} md={1} lg={1} />
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <Create userList={userList} loading={loading} addPost={addPost} profileData={profileData} />
                <Grid mt={4}>
                    <Box className={classes.scrollFeed}>
                        <Posts
                            loading={loading}
                            data={data}
                            auth={auth}
                            removePost={removePost}
                            profileData={profileData}
                            userList={userList}
                            respondId={respondId}
                            eventReactionData={eventReactionData}
                            eventMenuObject={eventMenuObject}
                            setRespondId={setRespondId}
                            setEventReactionData={setEventReactionData}
                            setEventMenuObject={setEventMenuObject}
                            eventRespondCount={eventRespondCount}
                            setEventRespondCount={setEventRespondCount}
                        />
                        {loading && <p className={classes.loader}>Loading...</p>}
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} mb={2}>
                <Grid>
                    <UpcomingEvents
                        auth={auth}
                        respondId={respondId}
                        eventReactionData={eventReactionData}
                        eventMenuObject={eventMenuObject}
                        setRespondId={setRespondId}
                        setEventReactionData={setEventReactionData}
                        setEventMenuObject={setEventMenuObject}
                        setEventRespondCount={setEventRespondCount}
                    />
                    <UpcomingTasks auth={auth} />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={1} md={1} lg={1} />
        </Grid>
    );
};

export default Social;
