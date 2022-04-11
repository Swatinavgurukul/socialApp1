import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button, Grid, Link, Menu, MenuItem, FormControl, Select } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useCallback, useState } from "react";
import confetti from "canvas-confetti";
import Comments from "../partials/comments";
import { useStyles } from "../style";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import RecommendIcon from "@mui/icons-material/Recommend";
import { useSelector } from "react-redux";

const Reactions = (props) => {
    const classes = useStyles();
    const auth = useSelector((state) => state.auth);
    const payload = {
        activity_id: props.data.id,
        activity_actor: props.data.actor.data.personal_feed_id,
        user_id: auth.user_id.toString(),
        actor: auth.t_feed,
        full_name: auth.full_name,
        email: auth.email,
    };
    const animateLike = useCallback(() => {
        confetti({
            particleCount: 150,
            spread: 60,
            angle: 45,
            origin: { x: 0, y: 1 },
            disableForReducedMotion: true,
        });
    }, []);

    const [loading, setLoading] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const [ownLike, setOwnLike] = useState([]);
    const [reactionCount, setReactionCount] = useState({
        like: 0,
        comment: 0,
        attending: 0,
        not_interested: 0,
        interested: 0,
    });
    const [eventReaction, setEventReaction] = useState("");
    const [eventObject, setEventObject] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [reply, setReply] = useState("");
    const [allReply, setAllReply] = useState({});

    useEffect(() => {
        // Set Initial Reaction Count
        setReactionCount(
            Object.assign(
                {},
                { like: 0, comment: 0, attending: 0, not_interested: 0, interested: 0 },
                props.data.reaction_counts
            )
        );
        // Set Initial Like Object
        if (props.data.own_reactions.like !== undefined && props.data.own_reactions.like.length > 0) {
            setOwnLike(props.data.own_reactions.like);
        }
        // Set Initial Event Object
        if (props.data.own_reactions.attending !== undefined) {
            setEventObject(props.data.own_reactions.attending[0]);
            setEventReaction("attending");
        }
        if (props.data.own_reactions.not_interested !== undefined) {
            setEventObject(props.data.own_reactions.not_interested[0]);
            setEventReaction("not_interested");
        }
        if (props.data.own_reactions.interested !== undefined) {
            setEventObject(props.data.own_reactions.interested[0]);
            setEventReaction("interested");
        }
    }, []);

    const handleAllReply = (allReplys, id) => {
        setAllReply((prevState) => ({
            ...prevState,
            [id]: allReplys,
        }));
    };

    const handleReplySend = (payload, reply, mention) => {
        axios
            .post(
                "/api/v1/social/comment/reply",
                {
                    ...payload,
                    message: reply,
                    mention: mention,
                },
                {
                    headers: { Authorization: `Bearer ${auth.access_token}`, "Content-Type": "application/json" },
                }
            )
            .then((response) => {
                setReply("");
                allReply[response.data.data.parent]
                    ? setAllReply({
                        ...allReply,
                        [response.data.data.parent]: [response.data.data, ...allReply[response.data.data.parent]],
                    })
                    : setAllReply({ ...allReply, [response.data.data.parent]: [response.data.data] });
            });
    };

    useEffect(() => {
        if (props.respondId == props.data.id) {
            setEventReaction(props.eventReactionData);
            setEventObject(props.eventMenuObject);
            if (props.eventRespondCount) {
                setReactionCount((prevState) => ({
                    ...prevState,
                    [props.eventReactionData]: prevState[props.eventReactionData] + 1,
                    [eventReaction]: prevState[eventReaction] - 1,
                }));
                props.setEventRespondCount(false)
            }
        };
    }, [props.respondId]);

    const updateEventReaction = (event_response) => {
        let previous = eventReaction;
        let current = previous != event_response ? event_response : "";
        let already_rspved = eventObject != [] ? true : false;
        setLoading(true);
        axios
            .post(
                "/api/v1/social/calendar/reactions",
                {
                    ...payload,
                    event_type: "event",
                    // Flipping "like" true -> false or false -> true
                    data: { current, previous },
                    // If "Already RSVPed" then send reaction_id of the latest RSVP, else sending null
                    reaction_id: already_rspved ? eventObject.id : null,
                },
                {
                    headers: { Authorization: `Bearer ${auth.access_token}`, "Content-Type": "application/json" },
                }
            )
            .then((response) => {
                setLoading(false);
                {
                    current != "" &&
                        setReactionCount((prevState) => ({
                            ...prevState,
                            [current]: prevState[current] + 1,
                            [previous]: prevState[previous] - 1,
                        }));
                }
                setEventReaction(current);
                setEventObject(response.data.data);
                props.setEventMenuObject(response.data.data)
                props.setRespondId(props.data.id);
            });
    };

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const updateLike = (desc, type) => {
        let already_liked = ownLike.length > 0 ? true : false;
        setLoading(true);
        !already_liked ? animateLike() : null;
        axios
            .post(
                "/api/v1/social/reactions",
                {
                    ...payload,
                    description: desc,
                    event_type: type,
                    // Flipping "like" true -> false or false -> true
                    data: { like: !already_liked },
                    // If "Already liked" then send reaction_id of the latest Like, else sending null
                    reaction_id: already_liked ? ownLike[0].id : null,
                },
                {
                    headers: { Authorization: `Bearer ${auth.access_token}`, "Content-Type": "application/json" },
                }
            )
            .then((response) => {
                setLoading(false);
                // Increase or decrease like count
                let updated_like_count = already_liked ? reactionCount.like - 1 : reactionCount.like + 1;
                setReactionCount(Object.assign({}, reactionCount, { like: updated_like_count }));
                // Add Reaction Object to ownLike array
                already_liked ? setOwnLike([]) : setOwnLike([response.data.data]);
            });
    };
    return (
        <CardActions className={classes.cardActionsSx}>
            <Grid container spacing={0} className={classes.gridContainerSx}>
                <Grid container px={2} className={classes.intrestedUserBlock}>
                    <Grid item xs={6}>
                        {props.data.event_type == "event" ? (
                            <>
                                <Grid item className={classes.reactionCountGrid}>
                                    {reactionCount.attending > 0 && (
                                        <Typography className={classes.respondText}>
                                            {reactionCount.attending}{" "}
                                            {reactionCount.attending > 1 ? "Attendees" : "Attendee"}
                                        </Typography>
                                    )}
                                    {reactionCount.interested > 0 && (
                                        <Typography className={classes.respondText}>
                                            &nbsp;&nbsp;{reactionCount.interested} Interested&nbsp;&nbsp;
                                        </Typography>
                                    )}
                                    {auth.email == props.data.email && reactionCount.not_interested > 0 && (
                                        <Typography className={classes.respondText}>
                                            &nbsp;&nbsp;{reactionCount.not_interested} Not Interested
                                        </Typography>
                                    )}
                                </Grid>
                            </>
                        ) : (
                            <Typography className={classes.intrestedUserText}>
                                {reactionCount.like > 0 || ownLike.length > 0 ? (
                                    <Typography className={classes.intrestedUserText}>
                                        <RecommendIcon className={classes.likePostIcon} />
                                        {reactionCount.like > 0
                                            ? reactionCount.like > 1
                                                ? ownLike && ownLike.length > 0
                                                    ? `You and ${reactionCount.like - 1} ${reactionCount.like > 2 ? " others" : " other"
                                                    }`
                                                    : `${props.data.latest_reactions.like[0].user.data.full_name} and ${reactionCount.like - 1
                                                    } ${reactionCount.like > 2 ? "others" : "other"}`
                                                : ownLike.length > 0
                                                    ? `You`
                                                    : props.data.latest_reactions.like !== undefined &&
                                                    `${props.data.latest_reactions.like[0].user.data.full_name}`
                                            : ""}
                                    </Typography>
                                ) : (
                                    ""
                                )}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        {reactionCount.comment > 0 && (
                            <Typography
                                align="right"
                                className={classes.commentsText}
                                onClick={() => setIsOpened(!isOpened)}>
                                {reactionCount.comment}
                                {reactionCount.comment > 1 ? " Comments" : " Comment"}
                            </Typography>
                        )}
                    </Grid>
                </Grid>

                <Grid container mt={2} px={2} className={classes.gridContentSx}>
                    <Grid item className={classes.alignVerticalCenter}>
                        {props.data.event_type == "event" ? (
                            <Button
                                className={classes.commentShareBtn}
                                ml={2}
                                size="small"
                                startIcon={
                                    <ModeCommentOutlinedIcon
                                        className={classes.eventDetailsIcon}
                                        style={{ marginRight: "0px" }}
                                    />
                                }>
                                Comment
                            </Button>
                        ) : (
                            <Grid container sx={{ display: "flex" }}>
                                <Button
                                    id ={props.data.id +"_like"}
                                    className={classes.writeComment}
                                    style={{
                                        color: ownLike.length > 0 ? "#1B73EB" : "",
                                        marginRight: "5px",
                                        fontWeight: "600",
                                    }}
                                    disabled={loading}
                                    size="small"
                                    onClick={() => {
                                        props.data.event_type === "event"
                                            ? updateLike(props.data.data.title, props.data.event_type)
                                            : updateLike(props.data.tweet, props.data.event_type);
                                    }}
                                    startIcon={
                                        ownLike.length > 0 ? (
                                            <ThumbUpAltIcon style={{ marginRight: "0px" }} />
                                        ) : (
                                            <ThumbUpOutlinedIcon
                                                className={classes.eventDetailsIcon}
                                                style={{ marginRight: "0px" }}
                                            />
                                        )
                                    }>
                                    Like
                                </Button>
                                <Button
                                    className={classes.commentShareBtn}
                                    ml={2}
                                    size="small"
                                    startIcon={
                                        <ModeCommentOutlinedIcon
                                            className={classes.eventDetailsIcon}
                                            style={{ marginRight: "0px" }}
                                        />
                                    }>
                                    Comment
                                </Button>
                                {props.data.data && props.data.data.all && (
                                    <Button
                                        className={classes.commentShareBtn}
                                        ml={2}
                                        size="small"
                                        id="demo-positioned-button"
                                        aria-controls={open ? "demo-positioned-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                        startIcon={
                                            <ShareOutlinedIcon
                                                className={classes.eventDetailsIcon}
                                                style={{ marginRight: "0px" }}
                                            />
                                        }
                                        onClick={handleClick}>
                                        Share
                                    </Button>
                                )}
                            </Grid>
                        )}
                    </Grid>
                    {props.data.event_type == "event" ? (
                        <Grid>
                            <FormControl sx={{ mr: 1 }} className={classes.componentFlex}>
                                <Select
                                    className={classes.selectRespondSx}
                                    value={eventReaction == "not_interested" ? "Not interested" : eventReaction}
                                    onChange={(e) => {
                                        setEventReaction(e.target.value), updateEventReaction(e.target.value), props.setEventReactionData(e.target.value)
                                    }}
                                    displayEmpty
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <>Respond</>;
                                        }
                                        return selected;
                                    }}>
                                    <MenuItem className={classes.selectmenu} value="attending">
                                        Attending
                                    </MenuItem>
                                    <MenuItem className={classes.selectmenu} value="interested">
                                        Interested
                                    </MenuItem>
                                    <MenuItem className={classes.selectmenu} value="not_interested">
                                        Not interested
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    ) : (
                        <></>
                    )}
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}>
                        <Link
                            target="_blank"
                            underline="none"
                            href={`https://twitter.com/intent/tweet?url=${window.location.href}/social-feed/posts/${props.data.id}/details`}>
                            <MenuItem onClick={handleClose} disableRipple>
                                <TwitterIcon /> &nbsp; Twitter
                            </MenuItem>
                        </Link>
                        <Link
                            target="_blank"
                            underline="none"
                            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}>
                            <MenuItem onClick={handleClose} disableRipple>
                                <FacebookIcon /> &nbsp; Facbook
                            </MenuItem>
                        </Link>
                        <Link
                            target="_blank"
                            underline="none"
                            href={`http://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}>
                            <MenuItem onClick={handleClose} disableRipple>
                                <LinkedInIcon /> &nbsp; LinkedIn
                            </MenuItem>
                        </Link>
                    </Menu>
                </Grid>

                <Comments
                    data={props.data}
                    index={props.index}
                    updateReactionCount={(data) =>
                        setReactionCount(Object.assign({}, reactionCount, { comment: data }))
                    }
                    isOpened={isOpened}
                    animateLike={animateLike}
                    handleReplySend={handleReplySend}
                    allReply={allReply}
                    handleAllReply={handleAllReply}
                    userList={props.userList}
                    profileData={props.profileData}
                />
            </Grid>
        </CardActions>
    );
};

export default Reactions;
