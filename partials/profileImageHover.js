import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Avatar, Grid, Typography } from "@mui/material";
import { useStyles } from "../style";
import React from "react";
import { letterAvatar } from "@core/helper";

const Hover = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container className={classes.box}>
                <Grid item className={classes.marRightt10} style={{ marginTop: "10px" }}>
                    {props.data.actor.data.profile_image ? (
                        <Avatar className={classes.commentUserProfile} src={props.data.actor.data.profile_image} />
                    ) : (
                        <Avatar className={classes.commentUserProfile}>
                            <Typography variant="body1">{letterAvatar(props.data.actor.data.full_name)}</Typography>
                        </Avatar>
                    )}
                </Grid>
                <Grid>
                    <Typography className={classes.size14weight600}>{props.data.actor.data.full_name}</Typography>
                    <Typography className={classes.size9mT5}>{`AM00${props.data.actor.data.id}`}</Typography>
                    <Typography className={classes.size9mT5}>
                        <span>{props.data.actor.data.job_title}</span>
                        <span>|</span>
                        <span>{props.data.actor.data.department_name}</span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid>
                <Typography className={classes.size9weight600}>Contact</Typography>
                <Grid container className={classes.spaceBetween}>
                    <Grid item>
                        <Typography className={`${classes.alignVerticalCenter} ${classes.size9mT5}`}>
                            <CallIcon className={classes.callIconSx} />
                            {props.data.actor.data.phone ? props.data.actor.data.phone : "N/A"}
                        </Typography>
                    </Grid>
                    <Grid item className={classes.size9mT5}>
                        <CopyToClipboard
                            text={props.data.actor.data.phone && props.data.actor.data.phone}
                            onCopy={() => {
                                props.handlePhone()
                            }}>
                            <ContentCopyIcon
                                style={{
                                    fontSize: "small",
                                    cursor: "pointer",
                                    marginLeft: "2px",
                                    color: props.phoneCopied ? "green" : "",
                                }}
                            />
                        </CopyToClipboard>
                    </Grid>
                </Grid>
                <Grid container className={classes.spaceBetween}>
                    <Grid item>
                        <Typography className={`${classes.alignVerticalCenter} ${classes.size9mT5}`}>
                            <MailOutlineIcon className={classes.mailOutlineIconSx} />
                            <a href={`mailto:${props.data.actor.data.email}`}>{props.data.actor.data.email}</a>
                        </Typography>
                    </Grid>
                    <Grid item className={classes.size9mT5}>
                        <CopyToClipboard
                            text={props.data.actor.data.email}
                            onCopy={() => {
                                props.handleEmail()
                            }}>
                            <ContentCopyIcon
                                style={{
                                    fontSize: "small",
                                    cursor: "pointer",
                                    marginLeft: "2px",
                                    color: props.emailCopied ? "green" : "",
                                }}
                            />
                        </CopyToClipboard>
                    </Grid>
                </Grid>
            </Grid>
            <Grid>
                <Typography className={classes.size9weight600}>Reporting to</Typography>
                {props.data.actor.data.reporting_to ?
                    <Grid className={`${classes.alignVerticalCenter}`} style={{ marginBottom: "5px" }}>
                        <Avatar className={classes.avatarBoxSx}>
                            <Typography sx={{fontSize:14}} >{letterAvatar(props.data.actor.data.reporting_to)}</Typography>
                        </Avatar>
                        <Typography className={classes.reporting_toSx}>{props.data.actor.data.reporting_to}</Typography>
                    </Grid>
                    : "N/A"
                }
            </Grid>
        </React.Fragment>
    );
};

export default Hover;
