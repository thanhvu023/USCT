import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ITEM_HEIGHT = 48;

const BasicMenu = ({ anchorEl, open, handleClose, menuItems }) => {
  // Check if menuItems is an array
  if (!Array.isArray(menuItems)) {
    return null; // Return null if menuItems is not an array
  }

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            onClick={handleClose}
            className="shopee-notification"
          >
            <div className="shopee-notification-content">
              <div className="shopee-notification-title">{item.title}</div>
              <div className="shopee-notification-body">{item.content}</div>
              <div className="shopee-notification-date">{item.date}</div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default BasicMenu;
