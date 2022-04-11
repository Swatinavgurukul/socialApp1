import { Menu, MenuItem, Grid, IconButton, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React, { useState, useEffect } from "react";
import ChildComment from "./childComment";
import { letterAvatar } from "@core/helper";
import { useStyles } from "../style";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Hover from "./profileImageHover.js";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

const NestedComment = (props) => {
    const classes = useStyles();
    const auth = useSelector((state) => state.auth);
    const [anchorEl, setAnchorEl] = useState(null);
    const [phoneCopied, setPhoneCopied] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);
    const [deleteReplyID, setDeleteReplyID] = useState("");
    const [payload, setPayload] = useState({
        notification_feed_id: props.item.user.data.notification_feed_id,
        actor: auth.t_feed,
        full_name: auth.full_name,
        email: auth.email,
        comment_reaction_id: props.item.id,
        event_type: "comment",
        activity_id: props.item.activity_id,
        git: "",
    });

    useEffect(() => {
        if (props.item.latest_children !== undefined && props.item.latest_children.comment !== undefined) {
            props.handleAllReply(props.item.latest_children.comment, props.item.id);
        }
    }, []);

    const handleDeleteComment = (id, parentid) => {
        axios
            .delete(`/api/v1/social/reactions/${id}`, {
                Authorization: `Bearer ${auth.access_token}`,
                "Content-Type": "application/json",
            })
            .then((response) => {
                setAnchorEl(null);
                const result = props.allReply[parentid].filter((reply) => reply.id !== id);
                props.handleAllReply(result, parentid);
                setDeleteReplyID("");
            });
    };
    const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
        ({ theme }) => ({
            [`& .${tooltipClasses.tooltip}`]: {
                backgroundColor: "#FFFFFF",
                color: "rgba(0, 0, 0, 0.87)",
                border: "1px solid #dadde9",
            },
        })
    );
    return (
        <>
            {props.allReply &&
                props.allReply[props.item.id] &&
                props.allReply[props.item.id].map((item, index) => (
                    <>
                        <Grid container mt={1} px={2} key={item.id}>
                            <Grid item xs ml={6}>
                                <Grid container mt={1}>
                                    <Grid item>
                                        <div>
                                            <HtmlTooltip
                                                placement="top-start"
                                                title={
                                                    <Hover
                                                        data={{ actor: item.user }}
                                                        phoneCopied={phoneCopied}
                                                        emailCopied={emailCopied}
                                                        handleEmail={() => {
                                                            setPhoneCopied(false);
                                                            setEmailCopied(true);
                                                        }}
                                                        handlePhone={() => {
                                                            setPhoneCopied(true);
                                                            setEmailCopied(false);
                                                        }}
                                                    />
                                                }>
                                                {item.user.data.profile_image ? (
                                                    <Avatar
                                                        className={classes.SubcommentUserProfile}
                                                        src={item.user.data.profile_image}
                                                    />
                                                ) : (
                                                    <Avatar className={classes.SubcommentUserProfile}>
                                                        <Typography variant="body1">
                                                            {letterAvatar(item.user.data.full_name)}
                                                        </Typography>
                                                    </Avatar>
                                                )}
                                            </HtmlTooltip>
                                        </div>
                                    </Grid>
                                    <Grid item xs className={classes.commentBlock}>
                                        <Typography>
                                            <span className={classes.commentUserName}>{item.user.data.full_name}</span>
                                            <span style={{ float: "right" }}>
                                                <small className={classes.textMuted}>
                                                    {formatDistanceToNow(parseISO(item.created_at))} ago
                                                </small>
                                                {(item.user.data.personal_feed_id === auth.t_feed ||
                                                    props.data.actor.data.personal_feed_id === auth.t_feed) && (
                                                    <IconButton
                                                        onClick={(event) => {
                                                            setAnchorEl(event.currentTarget), setDeleteReplyID(item.id);
                                                        }}
                                                        size="large"
                                                        color="inherit"
                                                        style={{ padding: "0px", color: "#73777E" }}>
                                                        <MoreVertOutlinedIcon className={classes.userCommentIcon} />
                                                    </IconButton>
                                                )}
                                            </span>
                                        </Typography>
                                        <Typography pt={0} mb={0} className={classes.userCommentText}>
                                            {item.data.text
                                                .trim()
                                                .split(" ")
                                                .map((word) =>
                                                    word.startsWith("@") ? (
                                                        <a href="#" className={classes.mentionWord}>
                                                            {word.substring(1)}{" "}
                                                        </a>
                                                    ) : (
                                                        <span>{word} </span>
                                                    )
                                                )}
                                        </Typography>
                                        <Grid mt={1} sx={{ justifyContent: "center" }}>
                                            {item.data && item.data.gif && (
                                                <div>
                                                    <img src={item.data.gif} />
                                                </div>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={() => setAnchorEl(null)}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}>
                                        <MenuItem onClick={() => handleDeleteComment(deleteReplyID, props.item.id)}>
                                            Delete
                                        </MenuItem>
                                    </Menu>
                                </Grid>
                            </Grid>
                        </Grid>
                        <ChildComment
                            animateLike={props.animateLike}
                            allReply={props.allReply}
                            item={item}
                            data={props.data}
                            handleReplySend={props.handleReplySend}
                            payload={payload}
                            userList={props.userList}
                            setPayload={setPayload}
                        />
                    </>
                ))}
        </>
    );
};
export default NestedComment;
