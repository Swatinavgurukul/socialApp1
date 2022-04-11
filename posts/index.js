import { Grid } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import Header from "../partials/header";
import Reactions from "../partials/reactions";
import SingleAnniversary from "./anniversary";
import Birthday from "./birthday";
import Event from "./event";
import GoalUpdate from "./goalUpdate";
import NewJoinee from "./newJoinee";
import Okr from "./okr";
import Post from "./post";
import Promotion from "./promotion";
import { useStyles } from "../style";
import { useSelector } from "react-redux";

const Posts = (props) => {
    const auth = useSelector((state) => state.auth);
    const classes = useStyles();
    return (
        <Grid>
            {props.data &&
                props.data.map((item, index) => (
                    <Grid key={item.id} p={0} className={classes.eventContainer} sx={{ borderRadius: 2 }} mb={3}>
                        <Header data={item} removePost={(id) => props.removePost(id)} />
                        {
                            {
                                anniversary: <SingleAnniversary data={item} />,
                                birthday: <Birthday data={item} />,
                                promotion: <Promotion data={item} />,
                                joining: <NewJoinee data={item} />,
                                goal: <GoalUpdate data={item} />,
                                post: <Post data={item} />,
                                event: <Event data={item} />,
                                okr: <Okr data={item} />,
                            }[item.event_type]
                        }
                        <Reactions
                            data={item}
                            index={index}
                            auth={auth}
                            profileData={props.profileData}
                            sx={{ padding: "0" }}
                            userList={props.userList}
                            respondId={props.respondId}
                            eventReactionData={props.eventReactionData}
                            eventMenuObject={props.eventMenuObject}
                            setRespondId={props.setRespondId}
                            setEventReactionData={props.setEventReactionData}
                            setEventMenuObject={props.setEventMenuObject}
                            eventRespondCount={props.eventRespondCount}
                            setEventRespondCount={props.setEventRespondCount}
                        />
                    </Grid>
                ))}
        </Grid>
    );
};

// const mapStatetoProps = (state) => ({
//     auth: state.auth,
// });
export default Posts;
