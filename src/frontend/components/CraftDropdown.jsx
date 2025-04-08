import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { BootstrapDropdownWrapper } from "../styles/CraftDropdown.styled";


function CraftDropdown({ crafts }) {
  const [selectedItem, setSelectedItem] = useState('Select a Craft');

  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);
  };

  return (
    <BootstrapDropdownWrapper>
      <div className="label">{selectedItem}</div>

      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle id="dropdown-basic">
          Crafts
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {crafts.map((craft, index) => (
            <Dropdown.Item key={index} eventKey={craft}>
              {craft}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </BootstrapDropdownWrapper>
  );
}

export default CraftDropdown;
