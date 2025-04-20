import styled from "styled-components";

export const FooterWrapper = styled.footer`
  background-color: #6a380f;
  color: white;
  padding: 3rem 2rem;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FooterColumn = styled.div`
  flex: 1;
  min-width: 250px;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .icon {
    font-size: 1rem;
    flex-shrink: 0;
  }
`;

export const SocialIcons = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;

  a {
    color: white;
    font-size: 1.2rem;
    transition: 0.2s;

    &:hover {
      color: #f7e9d7;
    }
  }
`;

export const FooterBottom = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #f7e9d7;
`;
