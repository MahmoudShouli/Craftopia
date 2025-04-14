import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { BootstrapDropdownWrapper } from "../styles/CraftDropdown.styled";

function CraftDropdown({ crafts, selectedCraft, onSelectCraft }) {
  const [selectedItem, setSelectedItem] = useState('Select a Craft');

  // Sync local label with selectedCraft from parent
  useEffect(() => {
    if (selectedCraft) {
      setSelectedItem(selectedCraft);
    }
  }, [selectedCraft]);

  const handleSelect = (eventKey) => {
    const lowercaseCraft = eventKey.toLowerCase();
    setSelectedItem(eventKey);        // local label update
    onSelectCraft(lowercaseCraft);          // update parent state
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
