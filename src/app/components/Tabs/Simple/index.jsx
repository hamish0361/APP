import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './index.scss';

export const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={value !== index ? { display: 'none' } : {}}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any,
    value: PropTypes.any,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

/**
 * 
 * @param {*} labels: label hiển thị trên tab head, Exg: ['Tab 1', 'Tab 2'] 
 * @param {*} children: Một list các TabPanel, Exg: (
 *      <TabPanel>... Tab content 1 ...</TabPanel>
 *      <TabPanel>... Tab content 2 ...</TabPanel>
 * )
 * 
 * @returns 
 */
export default function SimpleTabs({ labels = [], children }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabContent = useMemo(() => {
        return React.Children.map(children, (child, cIdx) => {
            return React.cloneElement(child, {
                ...child.props,
                value,
                index: cIdx
            })
        })
    }, [children, value]);

    return (
        <div className="simple-tabs">
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs"
                variant="scrollable"
                scrollButtons="auto"
            >
                {labels.map((label) => (
                    <Tab label={label} {...a11yProps(0)} key={`tab-label-${label}`} />
                ))}
            </Tabs>
            {tabContent}
        </div>
    );
}
