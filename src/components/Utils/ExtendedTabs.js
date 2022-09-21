import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box } from "@material-ui/core";

const classes = {
  root: {
    flexGrow: 1,
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
  panel: {
    paddingTop: "20px",
  },
};

function TabPanel(props) {
  const { children, value, index, classes, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={classes.panel}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const ExtendedTabs = ({ tabs, children }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {tabs?.map((tab, index) => {
          return (
            <Tab label={tab.name} {...a11yProps(0)} key={"tab-" + index} />
          );
        })}
      </Tabs>

      {children.map((child, index) => {
        return (
          <TabPanel
            value={value}
            index={index}
            key={"tabPanel-" + index}
            classes={classes}
          >
            {child}
          </TabPanel>
        );
      })}
    </Box>
  );
};

export default ExtendedTabs;
