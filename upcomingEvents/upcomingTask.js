import React, { useState, useEffect } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Grid, Typography, Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useStyles } from "../style";
import { useDispatch, useSelector } from "react-redux";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Tooltip from "@mui/material/Tooltip";
import { worksoftlogin } from "../../redux/slices/workSlice";
function UpcomingTasks(props) {
    const [value, setValue] = useState("1");
    const [taskDueToday, setTaskDueToday] = useState([]);
    const [taskOverDue, setTaskOverDue] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();
    const emptyState = ["You don't have any task due for Today", "You don't have any Overdue Tasks"];

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const dispatch = useDispatch();
    const authstatus = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(worksoftlogin({ access_token: authstatus.access_token })).then((response) => {
            if (response.error) {
                setTaskDueToday([]);
                setTaskOverDue([]);
            } else {
                let URL1 = "/api/v1/social/task/leadApplication/task_due_today";
                let URL2 = "/api/v1/social/task/leadApplication/task_over_due";
                let data = {
                    user_data: {
                        ...authstatus.profile,
                    },
                    access_token: response.payload.data.data.access_token,
                }
                const promise1 = axios.post(URL1, data, {
                    headers: { Authorization: `Bearer ${authstatus.access_token}` },
                });
                const promise2 = axios.post(URL2, data, {
                    headers: { Authorization: `Bearer ${authstatus.access_token}` },
                });
                Promise.all([promise1, promise2]).then((values) => {
                    console.log("data from promise all ", values[0], values[1]);
                    if (values[0].data[0].success || values[1].data[0].success) {
                        const mergeArray = values[0].data[0].data.AmoDemoEntity.concat(
                            values[0].data[0].data.AmoCallEntity,
                            values[0].data[0].data.AmoEmailEntity
                        );
                        const mergeArray1 = values[1].data[0].data.AmoDemoEntity.concat(
                            values[1].data[0].data.AmoEmailEntity,
                            values[1].data[0].data.AmoCallEntity
                        );
                        setTaskDueToday(mergeArray);
                        setTaskOverDue(mergeArray1);
                        setLoading(false);
                    } else {
                        setTaskDueToday([]);
                        setTaskOverDue([]);
                        setLoading(false);
                    }
                });
                setLoading(false);
            }
        });
    }, []);

    function ButtonHandler(props) {
        return <span className={classes.buttonStyle}>{props}</span>;
    }
    function TaskHandler(data) {
        return (
            <>
                <Grid container className={classes.GridStyle}>
                    <Grid item className={classes.spacing}>
                        <AssignmentTurnedInIcon className={classes.assignmentIcon} />
                        <Tooltip title={data.task_title}>
                            <Typography className={classes.textStyle}>
                                {data.task_title.length >= 20 ? data.task_title.substr(0, 20) + "..." : data.task_title}
                            </Typography>
                        </Tooltip>
                    </Grid>
                    <Grid item className={classes.GridStyle}>
                        <Chip label={data.task_type} size="small" className={classes.chipStyle} />
                        <Grid className={classes.styledGrid}>
                            <Chip
                                label={
                                    {
                                        completeSuccessful: "Completed",
                                        completeSuccessfully: "Completed",
                                        toDo: "To Do",
                                        todo: "To Do",
                                        in_progress: "In Progress",
                                        inprogress: "In Progress",
                                        inProgress: "In Progress",
                                        completeUnsuccessfully: "Not Completed",
                                        completeUnsuccessful: "Not Completed",
                                        demoAgain: "Demo Again",
                                        callAgain: "Call Again",
                                        notConnected: "Not Cpnnected",
                                        sent: "Sent",
                                        notSent: "Not Sent",
                                        on_hold: "On Hold",
                                        onHold: "On Hold",
                                    }[data.status]
                                }
                                size="small"
                                className={classes.styledChip}
                                
                                sx={{
                                    backgroundColor: {
                                        completeSuccessful: "#62C3A0",
                                        completeSuccessfully: "#62C3A0",
                                        toDo: "#647488",
                                        todo: "#64748B",
                                        in_progress: "#F6DF62",
                                        inprogress: "#F6DF62",
                                        inProgress: "#F6DF62",
                                        completeUnsuccessfully: "#EE4A47",
                                        completeUnsuccessful: "#EE4A47",
                                        demoAgain: "#FFCC80",
                                        callAgain: "#FFCC80",
                                        notConnected: "#EE4A47",
                                        sent: "#62C3A0",
                                        notSent: "#EE7977",
                                        on_hold: "#FFCC80",
                                        onHold: "#FFCC80",
                                    }[data.status],
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
    function EmptyStateHandler(props) {
        return <Grid className={classes.emptyState}>{props}</Grid>;
    }
    return (
        <Paper elevation={0} className={classes.stylingGrid} square sx={{ marginTop: "20px" }}>
            <Grid>
                <Grid>
                    <TabContext value={value}>
                        <Grid sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList
                                onChange={handleChange}
                                aria-label="secondary tabs"
                                textColor="primary"
                                indicatorColor="primary"
                                sx={{ height: "60px" }}>
                                <Tab
                                    icon={ButtonHandler(taskDueToday.length)}
                                    iconPosition="end"
                                    className={classes.tabStyle}
                                    label="Tasks due today"
                                    value="1"
                                />
                                <Tab
                                    icon={ButtonHandler(taskOverDue.length)}
                                    iconPosition="end"
                                    className={classes.tabStyle1}
                                    label="Overdue tasks"
                                    value="2"
                                />
                            </TabList>
                        </Grid>
                        {loading ? (
                            <Grid className={classes.loading}>
                                <img width="100px" src="/public/default/loader.gif" />
                            </Grid>
                        ) : (
                            <Grid>
                                <TabPanel className={classes.tabPanel} value="1">
                                    {taskDueToday.length == 0
                                        ? EmptyStateHandler(emptyState[0])
                                        : taskDueToday.map((data) => {
                                            return TaskHandler(data);
                                        })}
                                </TabPanel>
                                <TabPanel className={classes.tabPanel} value="2">
                                    {taskOverDue.length == 0
                                        ? EmptyStateHandler(emptyState[1])
                                        : taskOverDue.map((data) => {
                                            return TaskHandler(data);
                                        })}
                                </TabPanel>
                            </Grid>
                        )}
                    </TabContext>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default UpcomingTasks;
