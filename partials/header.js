import MoreIcon from "@mui/icons-material/MoreVert";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from "@mui/icons-material/Circle";
import { addHours, addMinutes, formatDistance } from "date-fns";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { letterAvatar } from "@core/helper";
import { useStyles } from "../style";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Hover from "./profileImageHover.js";
import GroupsIcon from "@mui/icons-material/Groups";
const Header = (props) => {
    let propsActor = props.data && props.data.actor && props.data.actor.data;
    const configurations = {
        goal: {
            el: ["${full_name}", " achieved a ", "${event_type}"],
            iconColor: "#fff",
            icon: "goal.svg",
        },
        birthday: {
            el: ["Today is ", "${full_name}", "'s ", "${event_type}"],
            iconColor: "#fff",
            icon: "birthday.svg",
        },
        promotion: {
            el: ["Today is ", "${full_name}", "'s ", "${event_type}"],
            iconColor: "#fff",
            icon: "promotion.svg",
        },
        post: {
            el: ["${full_name}", " added a ", "${event_type}"],
            iconColor: "#fff",
            icon: `${propsActor.full_name && letterAvatar(propsActor.full_name)}`,
        },
        event: {
            el: ["${full_name}", " added an ", "${event_type}"],
            iconColor: "#fff",
            icon: `${propsActor.full_name && letterAvatar(propsActor.full_name)}`,
        },
        joining: {
            el: ["${full_name}", " has joined as a Graphic Designer", " UI Team "],
            iconColor: "#fff",
            icon: "joinee.svg",
        },
        anniversary: {
            el: [" Today is ", "${full_name}", "'s ", " 1 year work ", "${event_type}"],
            iconColor: "#fff",
            icon: "anniversary.svg",
        },
        okr: {
            el: [
                "${full_name}",
                `${
                    props.data.data && props.data.data.type && props.data.data.type == "Objective"
                        ? " created an"
                        : " created a"
                } `,
                "${event_type}",
            ],
            iconColor: "#fff",
            icon: `${propsActor.full_name && letterAvatar(propsActor.full_name)}`,
        },
    };
    const classes = useStyles();
    const auth = useSelector((state) => state.auth);
    const [anchorEl, setAnchorEl] = useState(null);
    const [phoneCopied, setPhoneCopied] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);
    const handleEmail = () => {
        setPhoneCopied(false);
        setEmailCopied(true);
    };
    const handlePhone = () => {
        setPhoneCopied(true);
        setEmailCopied(false);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function formatDate(date) {
        let formatted_date = addHours(new Date(date), 5);
        formatted_date = addMinutes(formatted_date, 30);
        return formatDistance(formatted_date, new Date());
    }

    const headerText = () => {
        let display_config = configurations[props.data.event_type];
        if (display_config == undefined) {
            return null;
        }

        let data = {
            full_name: CompileEventUserName(),
            event_type:
                props.data && props.data.event_type == "okr" ? (
                    props.data && props.data.data && props.data.data.type
                ) : (
                    <span style={{ textTransform: "capitalize" }}>{props.data.event_type}</span>
                ),
        };
        var jsx_array = display_config.el;
        for (var key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }
            if (jsx_array.includes("${" + key + "}")) {
                jsx_array.splice(jsx_array.indexOf("${" + key + "}"), 1, data[key]);
            }
        }

        return jsx_array;
    };
    const CompileEventUserName = () => (
        <HtmlTooltip
            placement="top-start"
            title={
                <Hover
                    data={props.data}
                    phoneCopied={phoneCopied}
                    emailCopied={emailCopied}
                    handleEmail={handleEmail}
                    handlePhone={handlePhone}
                />
            }>
            <a
                // {`social-${props.data.id}`}
                href="javascript:void(0)"
                className={classes.fullNameSx}>
                {propsActor.full_name && propsActor.full_name}
            </a>
        </HtmlTooltip>
    );
    const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
        ({ theme }) => ({
            [`& .${tooltipClasses.tooltip}`]: {
                backgroundColor: "#FFFFFF",
                color: "rgba(0, 0, 0, 0.87)",
                border: "1px solid #dadde9",
            },
        })
    );
    const CompileEventIcon = () => {
        let display_config = configurations[props.data.event_type];
        if (display_config == undefined) {
            return null;
        }
        var icon = display_config.icon;
        return props.data.event_type == "event" || props.data.event_type == "okr" || props.data.event_type == "post" ? (
            <div>
                <HtmlTooltip
                    placement="top-start"
                    title={
                        <Hover
                            data={props.data}
                            phoneCopied={phoneCopied}
                            emailCopied={emailCopied}
                            handleEmail={handleEmail}
                            handlePhone={handlePhone}
                        />
                    }>
                    {propsActor.profile_image ? (
                        <Avatar className={classes.commentUserProfile} src={propsActor.profile_image} />
                    ) : (
                        <Avatar className={classes.commentUserProfile}>
                            <Typography variant="body1">{icon}</Typography>
                        </Avatar>
                    )}
                </HtmlTooltip>
            </div>
        ) : (
            <Avatar className={classes.commentUserProfile}>
                <img src={`/public/social-img/${icon}`} alt="Icon" />
            </Avatar>
        );
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const departmentName = (data) => {
        if (data != undefined) {
            var newStr = data.split(":");
            return newStr[1];
        }
        return "No department!";
    };
    return (
        <>
            <Grid container px={2} py={2}>
                <Grid item pt={0}>
                    {CompileEventIcon()}
                </Grid>
                <Grid item xs pl={1}>
                    <Typography className={classes.userInfo}>{headerText()}</Typography>
                    <a href="javascript:void(0)" className={classes.timeInterval}>
                        <span>{formatDate(props.data.time)}</span>
                        <span className={classes.alignVerticalCenter}>
                            <CircleIcon className={classes.dotIcon} />
                            {props.data.data && props.data.data.all ? (
                                <Tooltip title="All" arrow>
                                    <PublicOutlinedIcon className={classes.departPublicIcon} />
                                </Tooltip>
                            ) : (
                                <Tooltip
                                    title={departmentName(props.data.data && props.data.data.to)}
                                    placement="top"
                                    arrow>
                                    <GroupsIcon className={classes.departPublicIcon} />
                                </Tooltip>
                            )}
                        </span>
                    </a>
                </Grid>
                <Grid item>
                    <IconButton
                        onClick={handleProfileMenuOpen}
                        size="small"
                        aria-label="show more"
                        aria-haspopup="true"
                        color="inherit"
                        id={props.data.id}>
                        <MoreIcon />
                    </IconButton>
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
                    <MenuItem onClick={() => props.removePost(props.data.id)} id={props.data.id + "_removeHide"}>
                        {auth.email == props.data.email ? "Remove" : "Hide"}
                    </MenuItem>
                </Menu>
            </Grid>
        </>
    );
};

export default Header;
