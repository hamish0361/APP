import React from 'react';

import { Dropdown } from 'react-bootstrap';

const DropdownButton = ({ children, title, ...props }) => {
    return (
        <Dropdown className="custom-dropdown" {...props}>
            <Dropdown.Toggle as={"span"} className="custom-dropdown-toggle cursor-pointer">
                {title}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {children}
            </Dropdown.Menu>
        </Dropdown>
    );
};

DropdownButton.Item = Dropdown.Item;

export default DropdownButton;