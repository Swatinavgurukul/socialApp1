import { Grid, Typography, Avatar, FormControl, IconButton, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { letterAvatar } from "@core/helper";
import { useStyles } from "../style";
import GifBoxIcon from "@mui/icons-material/GifBox";
import useKeypress from "react-use-keypress";
import CircleIcon from "@mui/icons-material/Circle";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import RecommendIcon from "@mui/icons-material/Recommend";
import { ClickAwayListener } from "@mui/material";
import Mention from "./mention";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import GifGiphy from "./gifGiphy";
import ClearIcon from "@mui/icons-material/Clear";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";

const ChildComment = (props) => {
    useKeypress("Enter", () => {
        if (document.activeElement.id == "reply-box") {
            props.payload !== undefined
                ? (reply.length > 0 && reply.trim() !== "@" + props.payload.full_name.replaceAll(" ", "").trim()) ||
                  gifImg.length > 0
                    ? (props.handleReplySend(props.payload, reply, pplMentioned),
                      setReply(""),
                      setGifImg(""),
                      setOpenReply(false),
                      setPplMentioned({}))
                    : ""
                : reply.trim().length > 0 || gifImg.length > 0
                ? (props.handleReplySend(payload, reply, pplMentioned),
                  setReply(""),
                  setGifImg(""),
                  setOpenReply(false),
                  setPplMentioned({}))
                : "";
        }
    });
    const [mentionFilter, setMentionFilter] = useState("");
    const [filteredUser, setFilteredUser] = useState([]);
    const [mentionEl, setMentionEl] = useState(false);
    const [pplMentioned, setPplMentioned] = useState({});
    const mentionOpen = Boolean(mentionEl);
    const [reply, setReply] = useState("");
    const [anchorElGif, setAnchorElGif] = useState(null);
    const [gifImg, setGifImg] = useState("");
    const [gifText, setGifText] = useState("");
    const open = Boolean(anchorElGif);
    const [replyBeforeMent, setReplyBeforeMent] = useState("");
    const classes = useStyles();
    const auth = useSelector((state) => state.auth);
    const [childOwnLike, setChildOwnLike] = useState([]);
    const [childReactionCount, setChildReactionCount] = useState({ like: 0, comment: 0, yes: 0, no: 0, maybe: 0 });
    const [payload, setPayload] = useState({
        notification_feed_id: props.item.user.data.notification_feed_id,
        actor: auth.t_feed,
        full_name: auth.full_name,
        email: auth.email,
        comment_reaction_id: props.item.id,
        event_type: "comment",
        activity_id: props.item.activity_id,
        gif: gifImg,
    });
    const [openReply, setOpenReply] = useState(false);
    const nestedLikeId = props.item && props.item.id + "_nestedLike";
    const nestedCommentId = props.item && props.item.id + "_nestedComment";
    const saveCommentId = props.item && props.item.id + "_saveComment";
    useEffect(() => {
        setChildReactionCount(
            Object.assign({}, { like: 0, comment: 0, yes: 0, no: 0, maybe: 0 }, props.item.children_counts)
        );
        setPayload({ ...payload, comment_reaction_id: props.item.id });
        if (
            props.item.own_children !== undefined &&
            props.item.own_children.like !== undefined &&
            props.item.own_children.like.length > 0
        ) {
            setChildOwnLike(props.item.own_children.like);
        } else {
            setChildOwnLike([]);
        }
    }, [props.item]);
    useEffect(() => {
        const filteredList =
            props.userList &&
            props.userList.filter((item) => {
                let search = mentionFilter.toLowerCase();
                return item.full_name.toLowerCase().startsWith(search);
            });
        setFilteredUser(filteredList);
    }, [mentionFilter]);
    useEffect(() => {
        setPayload({ ...payload, gif: gifImg });
        if (props.payload !== undefined) {
            props.setPayload({ ...props.payload, gif: gifImg });
        }
        if (gifImg.length > 0) {
            setGifText("");
        }
    }, [gifImg]);

    const handleCloseGif = () => {
        setGifText("");
        setAnchorElGif(null);
    };
    const handleClickGif = (event) => {
        setAnchorElGif(event.currentTarget);
    };
    const handleClick = () => {
        let already_liked = childOwnLike.length > 0 ? true : false;
        !already_liked ? props.animateLike() : null;
        axios
            .post(
                "api/v1/social/comment/reactions",
                {
                    ...payload,
                    data: { like: !already_liked },
                    reaction_id: already_liked ? childOwnLike[0].id : null,
                },
                {
                    headers: { Authorization: `Bearer ${auth.access_token}`, "Content-Type": "application/json" },
                }
            )
            .then((response) => {
                let updated_like_count = already_liked ? childReactionCount.like - 1 : childReactionCount.like + 1;
                if (props.allComments) {
                    let index = props.allComments.findIndex((comment) => comment.id === props.item.id);
                    let item = props.allComments[index].children_counts;
                    let likeValue = Object.assign(item, { like: updated_like_count });
                    let ownChildren = Object.assign(props.allComments[index], { own_children: {} });
                    let ownLike = Object.assign(ownChildren.own_children, { like: [response.data.data] });
                }
                if (props.allReply && props.allReply[props.item.parent]) {
                    let index = props.allReply[props.item.parent].findIndex((reply) => reply.id === props.item.id);
                    let item = props.allReply[props.item.parent][index].children_counts;
                    let likeValue = Object.assign(item, { like: updated_like_count });
                    let ownChildren = Object.assign(props.allReply[props.item.parent][index], { own_children: {} });
                    let ownLike = Object.assign(ownChildren.own_children, { like: [response.data.data] });
                }
                setChildReactionCount(Object.assign({}, childReactionCount, { like: updated_like_count }));
                already_liked ? setChildOwnLike([]) : setChildOwnLike([response.data.data]);
            });
    };
    return (
        <>
            <Grid container mt={0} ml={props.payload !== undefined ? 6 : 0}>
                <Grid item xs className={classes.alignVerticalCenter} ml={8}>
                    <Typography className={classes.commentLikeBlock}>
                        <span
                            onClick={handleClick}
                            id={nestedLikeId}
                            className={classes.marRightt10Reply}
                            style={{
                                color:
                                    childOwnLike.length &&
                                    props.item.id === childOwnLike[0].parent &&
                                    childReactionCount.like
                                        ? "#1B73EB"
                                        : "",
                            }}>
                            Like
                        </span>
                        {childReactionCount.like ? (
                            <>
                                <span className={classes.marRightt10}>
                                    <CircleIcon sx={{ width: "4px" }} />
                                </span>
                                <span className={classes.marRightt10}>
                                    <RecommendIcon sx={{ color: "#1B73EB", width: "20px" }} />
                                </span>
                                <span className={classes.marRightt10}>{childReactionCount.like}</span>
                            </>
                        ) : (
                            ""
                        )}
                        <span className={classes.marRightt10}>|</span>
                        <span
                            id={nestedCommentId}
                            className={classes.marRightt10Reply}
                            onClick={() => {
                                setOpenReply(!openReply);
                                props.payload !== undefined
                                    ? setReply(`@${props.item.user.data.full_name.replaceAll(" ", "")} `)
                                    : null;
                            }}>
                            Reply
                        </span>
                        {props.allReply && props.allReply[props.item.id] && props.allReply[props.item.id].length > 0 ? (
                            <>
                                <span className={classes.marRightt10}>
                                    <CircleIcon sx={{ width: "4px" }} />
                                </span>
                                <span>
                                    {props.allReply[props.item.id].length}
                                    {props.allReply[props.item.id].length > 1 ? " Replies" : " Reply"}
                                </span>
                            </>
                        ) : (
                            ""
                        )}
                    </Typography>
                </Grid>
            </Grid>
            {openReply && (
                <>
                    <Grid container mt={0} px={2}>
                        <Grid item xs ml={6}>
                            <Grid container mt={1}>
                                <Grid item xs className={classes.alignVerticalCenter} mr={1}>
                                    {auth.profile_image ? (
                                        <Avatar
                                            className={classes.SubcommentUserProfile}
                                            src={auth.profile_image}
                                        />
                                    ) : (
                                        <Avatar className={classes.SubcommentUserProfile}>
                                            <Typography variant="body1">
                                                {letterAvatar(props.item.user.data.full_name)}
                                            </Typography>
                                        </Avatar>
                                    )}

                                    <FormControl fullWidth ml={2}>
                                        <TextField
                                            autoFocus
                                            id="reply-box"
                                            placeholder="Add a comment..."
                                            className={classes.commentBox}
                                            value={reply}
                                            onChange={(e) => {
                                                let val = e.target.value;
                                                let last_index = val.lastIndexOf("@");
                                                last_index >= 0 && setMentionFilter(val.substring(last_index + 1));
                                                last_index >= 0 &&
                                                    props.userList &&
                                                    setFilteredUser(
                                                        props.userList.filter((item) => {
                                                            let search = mentionFilter.toLowerCase();
                                                            return item.full_name.toLowerCase().startsWith(search);
                                                        })
                                                    );
                                                setReply(val);
                                                val[val.length - 1] == "@" &&
                                                (val.length === 1 || val[val.length - 2] === " ")
                                                    ? (setMentionEl(e.currentTarget), setReplyBeforeMent(val))
                                                    : null;
                                            }}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.cssLabel,
                                                    focused: classes.cssLabel,
                                                },
                                            }}
                                            InputProps={{
                                                classes: { notchedOutline: classes.border },
                                                startAdornment: (
                                                    <>
                                                        {gifImg.length > 0 && (
                                                            <>
                                                                <Badge
                                                                    className={classes.badgeStyle}
                                                                    overlap="circular"
                                                                    anchorOrigin={{
                                                                        vertical: "top",
                                                                        horizontal: "right",
                                                                    }}
                                                                    badgeContent={
                                                                        <ClearIcon
                                                                            onClick={() => setGifImg("")}
                                                                            className={classes.clearIconSx}
                                                                        />
                                                                    }>
                                                                    <img
                                                                        src={gifImg}
                                                                        width={80}
                                                                        height={80}
                                                                        style={{ margin: "5px" }}
                                                                    />
                                                                </Badge>
                                                            </>
                                                        )}
                                                    </>
                                                ),
                                                endAdornment: (
                                                    <>
                                                        <IconButton
                                                            sx={{ padding: "2px 8px" }}
                                                            disabled={gifImg.length > 0}>
                                                            <GifBoxIcon
                                                                id="fade-button"
                                                                aria-controls={open ? "fade-menu" : undefined}
                                                                aria-haspopup="true"
                                                                aria-expanded={open ? "true" : undefined}
                                                                onClick={handleClickGif}
                                                            />
                                                        </IconButton>
                                                        <Menu
                                                            id="fade-menu"
                                                            MenuListProps={{
                                                                "aria-labelledby": "fade-button",
                                                            }}
                                                            anchorEl={anchorElGif}
                                                            open={open}
                                                            onClose={handleCloseGif}
                                                            TransitionComponent={Fade}
                                                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                                                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                                                            <Grid
                                                                style={{
                                                                    padding: "5px 0px 0px 5px",
                                                                    width: "300px",
                                                                    height: "300px",
                                                                }}
                                                                variant="body">
                                                                <Grid mb={1}>
                                                                    <TextField
                                                                        className={classes.gifInput}
                                                                        placeholder="Search for GIFs"
                                                                        value={gifText}
                                                                        onChange={(e) => setGifText(e.target.value)}
                                                                        fullWidth
                                                                    />
                                                                </Grid>
                                                                <GifGiphy
                                                                    gifText={gifText}
                                                                    setGifImg={setGifImg}
                                                                    setAnchorElGif={setAnchorElGif}
                                                                />
                                                            </Grid>
                                                        </Menu>
                                                        <IconButton
                                                            id={saveCommentId}
                                                            sx={{ padding: "2px 8px" }}
                                                            aria-label="send"
                                                            disabled={
                                                                props.payload !== undefined
                                                                    ? !(gifImg.length > 0) &&
                                                                      reply.length > 0 &&
                                                                      reply.trim() ===
                                                                          "@" +
                                                                              props.payload.full_name
                                                                                  .replaceAll(" ", "")
                                                                                  .trim()
                                                                    : !(reply.trim().length > 0) && !(gifImg.length > 0)
                                                            }>
                                                            <SendOutlinedIcon
                                                                className={classes.eventDetailsIcon}
                                                                onClick={(e) => {
                                                                    props.payload !== undefined
                                                                        ? props.handleReplySend(
                                                                              props.payload,
                                                                              reply,
                                                                              pplMentioned
                                                                          )
                                                                        : props.handleReplySend(
                                                                              payload,
                                                                              reply,
                                                                              pplMentioned
                                                                          );
                                                                    setReply("");
                                                                    setGifImg(""), setOpenReply(false);
                                                                    setPplMentioned({});
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </>
                                                ),
                                            }}></TextField>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {mentionOpen && (
                                <ClickAwayListener onClickAway={() => setMentionEl(null)}>
                                    <Grid
                                        sx={{ boxShadow: 10, borderRadius: 2, marginLeft: 7 }}
                                        className={classes.mentionBox}>
                                        <Mention
                                            values={filteredUser}
                                            Selectedvalue={pplMentioned}
                                            handleClick={(value) => {
                                                setReply(`${replyBeforeMent}${value.first_name}${value.last_name} `);
                                                setMentionEl(null);
                                                setPplMentioned({
                                                    ...pplMentioned,
                                                    [value.s_notification_feed]: value.full_name,
                                                });
                                            }}
                                        />
                                    </Grid>
                                </ClickAwayListener>
                            )}
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
};
export default ChildComment;
