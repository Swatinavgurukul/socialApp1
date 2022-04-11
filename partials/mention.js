import React, { useEffect, useState } from "react";
import { MenuItem } from "@mui/material";
const Mention = (props) => {
    return (
        <>
            {props.values &&
                props.values.map((user,key) => (
                    <MenuItem 
                        value={user.full_name}
                        key={key}
                        onClick={()=>props.handleClick(user)}
                    >
                        {user.full_name}
                    </MenuItem>
                ))
            }
        </>
    )
}
export default Mention;