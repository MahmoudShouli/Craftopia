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
    color: #6a380f;
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
    color: #6a380f;
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
    color: #6a380f;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    text-decoration: none;

    &:hover {
      background-color: #f8f9fa;
      color: #6a380f;
    }
  }

  .dropdown-toggle {
    padding: 0.6rem 1.5rem;
    border-radius: 25px;
    background-color: #f7e9d7 !important;
    color: #6a380f !important;
    font-size: 1.3rem;
    font-weight: 500;
    border: 2px solid #6a380f !important;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: none;

    &:hover,
    &:focus,
    &.show {
      background-color: #6a380f !important;
      color: white !important;
    }
  }
`;
