import GifBoxIcon from "@mui/icons-material/GifBox";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Button, FormControl, Grid, IconButton, TextField, Typography, Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";
import React, { useEffect, useState } from "react";
import { UnmountClosed } from "react-collapse";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import useKeypress from "react-use-keypress";
import { letterAvatar } from "@core/helper";
import { useStyles } from "../style";
import ChildComment from "./childComment";
import NestedComment from "./nestedComment";
import Mention from "./mention";
import { styled } from "@mui/material/styles";
import Hover from "./profileImageHover.js";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import GifGiphy from "./gifGiphy";
import ClearIcon from "@mui/icons-material/Clear";
import Badge from "@mui/material/Badge";

const Comments = (props) => {
    const classes = useStyles();
    const [allComments, setAllComments] = useState([]);
    const [comment, setComment] = useState("");
    const [gifImg, setGifImg] = useState("");
    const [gifText, setGifText] = useState("");
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [commentCount, setCommentCount] = useState(1);
    const [mentionEl, setMentionEl] = useState(false);
    const [pplMentioned, setPplMentioned] = useState({});
    const [comntBeforeMent, setComntBeforeMent] = useState("");
    const [anchorElGif, setAnchorElGif] = React.useState(null);
    const [mentionFilter, setMentionFilter] = useState("");
    const [filteredUser, setFilteredUser] = useState([]);
    const open = Boolean(anchorElGif);
    const mentionOpen = Boolean(mentionEl);
    const [phoneCopied, setPhoneCopied] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);
    const [deleteCommentID, setDeleteCommentID] = useState("");
    const commentBoxId = props.data && props.data.id + "-commentBox";
    const saveCommentId = props.data && props.data.id + "-saveComment";
    const auth = useSelector((state) => state.auth);
    useKeypress("Enter", () => {
        if (
            (document.activeElement.id == commentBoxId && comment.trim().length > 0 && loading == false) ||
            gifImg.length > 0
        ) {
            props.data.event_type === "event"
                ? postComment(props.data.data.title, props.data.event_type)
                : postComment(props.data.tweet, props.data.event_type);
        }
    });
    useEffect(() => {
        if (gifImg.length > 0) {
            setGifText("");
        }
    }, [gifImg]);

    useEffect(() => {
        if (props.data.latest_reactions.comment !== undefined) {
            setAllComments(props.data.latest_reactions.comment);
        }
    }, []);
    useEffect(() => {
        const filteredList =
            props.userList &&
            props.userList.filter((item) => {
                let search = mentionFilter.toLowerCase();
                return item.full_name.toLowerCase().startsWith(search);
            });
        setFilteredUser(filteredList);
    }, [mentionFilter]);

    const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
        ({ theme }) => ({
            [`& .${tooltipClasses.tooltip}`]: {
                backgroundColor: "#FFFFFF",
                color: "rgba(0, 0, 0, 0.87)",
                // fontSize: theme.typography.pxToRem(12),
                border: "1px solid #dadde9",
            },
        })
    );

    const postComment = (desc, type) => {
        setLoading(true);
        let payload = {
            activity_actor: props.data.actor.data.personal_feed_id,
            activity_id: props.data.id,
            user_id: auth.user_id.toString(),
            text: comment,
            actor: auth.t_feed,
            full_name: auth.full_name,
            email: auth.email,
            description: desc,
            event_type: type,
            mention: pplMentioned,
            gif: gifImg,
        };
        axios
            .post("/api/v1/social/comment", payload, { headers: { Authorization: `Bearer ${auth.access_token}` } })
            .then((response) => {
                if (response.status == 200) {
                    let updated_data = allComments;
                    updated_data.splice(0, 0, response.data.data.comment);
                    setAllComments((prev) => updated_data);
                    props.updateReactionCount(allComments.length);
                    setComment("");
                    setGifImg("");
                    setLoading(false);
                    setPplMentioned({});
                }
            });
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleLoadClick = () => {
        let allCommentsCount = allComments.length;
        let commentAdd = allCommentsCount - commentCount;
        commentAdd >= 5 ? setCommentCount(commentCount + 5) : setCommentCount(allCommentsCount);
    };
    const handleClickGif = (event) => {
        setAnchorElGif(event.currentTarget);
    };
    const handleCloseGif = () => {
        setGifText("");
        setAnchorElGif(null);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteComment = (id) => {
        axios
            .delete(`/api/v1/social/reactions/${id}`, {
                Authorization: `Bearer ${auth.access_token}`,
                "Content-Type": "application/json",
            })
            .then((response) => {
                handleClose();
                setAllComments(allComments.filter((comments) => comments.id !== id));
                props.updateReactionCount(allComments.length - 1);
                setDeleteCommentID("");
            });
    };
    return (
        <>
            <Grid container mb={1} mt={1} px={2}>
                {props.data && props.data.event_type == "birthday" ? (
                    <Grid container mt={1} mb={2}>
                        <Grid item className={classes.alignVerticalCenter} ml={5}>
                            <Typography className={classes.writeComment}>
                                <Button
                                    onClick={(e) => setComment("Happy Birthday")}
                                    variant="outlined"
                                    size="small"
                                    className={classes.postPreMsg}>
                                    Happy Birthday
                                </Button>
                            </Typography>
                            <Typography className={classes.writeComment} ml={2}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.postPreMsg}
                                    onClick={(e) => setComment("Many happy returns of the day")}>
                                    Many happy returns of the day
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                ) : (
                    ""
                )}
                {props.data && props.data.event_type == "goal" ? (
                    <Grid ml={5} container mt={1} mb={2}>
                        <Grid container spacing={1} className={classes.alignVerticalCenter}>
                            <Grid item xs={6} md={6} lg={3}>
                                <Typography className={classes.writeComment}>
                                    <Button
                                        onClick={(e) => setComment("Keep it up")}
                                        variant="outlined"
                                        size="small"
                                        className={classes.postPreMsg}>
                                        Keep it up
                                    </Button>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6} lg={4}>
                                <Typography className={classes.writeComment}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={classes.postPreMsg}
                                        onClick={(e) => setComment("Wish you success")}>
                                        Wish you success
                                    </Button>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} lg={4}>
                                <Typography className={classes.writeComment}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={classes.postPreMsg}
                                        onClick={(e) => setComment("Congratulations")}>
                                        Congratulations
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : (
                    ""
                )}
                <Grid item xs className={classes.alignVerticalCenter}>
                    {props.profileData && props.profileData.user_image ? (
                        <Avatar className={classes.commentProfile} src={props.profileData.user_image} />
                    ) : (
                        <Avatar className={classes.commentUserProfile}>
                            <Typography variant="body1">
                                {letterAvatar(props.profileData && props.profileData.full_name)}
                            </Typography>
                        </Avatar>
                    )}
                    <FormControl fullWidth ml={3}>
                        <TextField
                            id={commentBoxId}
                            value={comment}
                            aria-label="comment"
                            aria-haspopup="true"
                            className={classes.commentBox}
                            placeholder="Add a comment..."
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
                                setComment(val);
                                val[val.length - 1] == "@" && (val.length === 1 || val[val.length - 2] === " ")
                                    ? (setMentionEl(e.currentTarget), setComntBeforeMent(val))
                                    : null;
                            }}
                            InputLabelProps={{
                                classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssLabel,
                                },
                            }}
                            InputProps={{
                                autocomplete: "new-password",
                                style: { padding: "4px 8px" },
                                classes: { notchedOutline: classes.border },
                                startAdornment: (
                                    <>
                                        {gifImg.length > 0 && (
                                            <>
                                                <Badge
                                                    className={classes.badgeStyle}
                                                    overlap="circular"
                                                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                                    badgeContent={
                                                        <ClearIcon
                                                            onClick={() => setGifImg("")}
                                                            className={classes.clearIconSx}
                                                        />
                                                    }>
                                                    <img src={gifImg} width={80} height={80} />
                                                </Badge>
                                            </>
                                        )}
                                    </>
                                ),
                                endAdornment: (
                                    <>
                                        <>
                                            <IconButton sx={{ padding: "2px 8px" }} disabled={gifImg.length > 0}>
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
                                        </>
                                        <IconButton
                                            aria-label="send"
                                            disabled={loading || (!(comment.trim().length > 0) && !(gifImg.length > 0))}
                                            sx={{ padding: "2px 8px" }}>
                                            {loading ? (
                                                <LoadingButton loading variant="text" />
                                            ) : (
                                                <SendOutlinedIcon
                                                    id={saveCommentId}
                                                    className={classes.eventDetailsIcon}
                                                    onClick={(e) => {
                                                        props.data.event_type === "event"
                                                            ? postComment(props.data.data.title, props.data.event_type)
                                                            : postComment(props.data.tweet, props.data.event_type);
                                                    }}
                                                />
                                            )}
                                        </IconButton>
                                    </>
                                ),
                            }}></TextField>
                    </FormControl>
                </Grid>
            </Grid>
            {mentionOpen && (
                <ClickAwayListener onClickAway={() => setMentionEl(null)}>
                    <Grid sx={{ boxShadow: 10, borderRadius: 2, marginLeft: 8 }} className={classes.mentionBox}>
                        <Mention
                            values={filteredUser}
                            Selectedvalue={pplMentioned}
                            handleClick={(value) => {
                                setComment(`${comntBeforeMent}${value.first_name}${value.last_name} `);
                                setMentionEl(null);
                                setPplMentioned({ ...pplMentioned, [value.s_notification_feed]: value.full_name });
                            }}
                        />
                    </Grid>
                </ClickAwayListener>
            )}
            <UnmountClosed isOpened={!props.isOpened && commentCount >= 1}>
                {allComments &&
                    allComments.slice(0, commentCount).map((item, index) => (
                        <Box key={item.id}>
                            <Grid container wrap="nowrap" spacing={2} pt={0} mt={1} px={2}>
                                <Grid item style={{ paddingTop: "5px" }}>
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
                                                    className={classes.commentUserProfile}
                                                    src={item.user.data.profile_image}
                                                />
                                            ) : (
                                                <Avatar className={classes.commentUserProfile}>
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
                                            {(item.user.data.personal_feed_id ===
                                                `${auth.feed_group}:${auth.feed_id}` ||
                                                props.data.actor.data.personal_feed_id ===
                                                    `${auth.feed_group}:${auth.feed_id}`) && (
                                                <IconButton
                                                    size="large"
                                                    color="inherit"
                                                    aria-label="show more"
                                                    aria-haspopup="true"
                                                    style={{ padding: "0px", color: "#73777E" }}
                                                    onClick={(event) => {
                                                        handleProfileMenuOpen(event), setDeleteCommentID(item.id);
                                                    }}>
                                                    <MoreVertOutlinedIcon className={classes.userCommentIcon} />
                                                </IconButton>
                                            )}
                                        </span>
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        component="div"
                                        pt={0}
                                        mb={0}
                                        className={classes.userCommentText}>
                                        {item.data.text
                                            .trim()
                                            .split(" ")
                                            .map((word) =>
                                                word.startsWith("@") ? (
                                                    <a href="#" className={classes.mentionWord}>
                                                        {word.length > 0 && word.length == 1 ? word : word.substring(1)}{" "}
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
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}>
                                    <MenuItem onClick={() => handleDeleteComment(deleteCommentID)}>Delete</MenuItem>
                                </Menu>
                            </Grid>
                            <ChildComment
                                animateLike={props.animateLike}
                                item={item}
                                data={props.data}
                                auth={auth}
                                allReply={props.allReply}
                                handleReplySend={props.handleReplySend}
                                userList={props.userList}
                                allComments={allComments}
                            />
                            <NestedComment
                                animateLike={props.animateLike}
                                item={item}
                                data={props.data}
                                auth={auth}
                                handleReplySend={props.handleReplySend}
                                allReply={props.allReply}
                                handleAllReply={props.handleAllReply}
                                userList={props.userList}
                            />
                        </Box>
                    ))}
                {allComments.length > 1 && allComments.length !== commentCount ? (
                    <Grid container>
                        <Grid xs={12} px={1}>
                            <Button
                                className={classes.loadComments}
                                style={{ fontWeight: 600 }}
                                onClick={handleLoadClick}>
                                Load more comments
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    ""
                )}
            </UnmountClosed>
        </>
    );
};

// const mapStatetoProps = (state) => ({
//     auth: state.auth,
// });
export default Comments;
