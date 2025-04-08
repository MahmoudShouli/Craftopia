import styled from "styled-components";

export const BootstrapDropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  padding: 0.5rem 1rem;

  .label {
    font-weight: 700;
    color: #333;
    font-size: 1.1rem;
    border: 3px solid #6a380f;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background-color: #fff;
  }

  .dropdown-menu {
    position: absolute;
    z-index: 1000;
    display: none;
    min-width: 10rem;
    padding: 0.5rem 0;
    margin: 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.375rem;
  }

  .dropdown-menu.show {
    display: block;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.25rem 1rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    text-decoration: none;

    &:hover {
      background-color: #f8f9fa;
      color: #16181b;
    }
  }

  .dropdown-toggle {
    display: inline-block;
    font-weight: 400;
    color: #fff;
    background-color: #6a380f;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.375rem;
    cursor: pointer;

    &:hover {
      background-color: #e5c367;
    }
  }
`;
