import styled from "styled-components";

export const SectionWrapper = styled.section`
  background-color: #ffffff;
  padding: 5rem 2rem;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #6a380f;
  margin-bottom: 3rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20rem;
  max-width: 1000px;
  margin: 0 auto;
  flex-wrap: wrap;
`;

export const ContactInfo = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* align all content to the left */
  color: #6a380f;
  position: relative;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1rem;
  gap: 0.75rem;

  .icon {
    color: #6a380f;
    font-size: 1.1rem;
    flex-shrink: 0;
    width: 20px;
  }

  strong {
    color: #6a380f;
    min-width: 80px;
    flex-shrink: 0;
    text-align: left;
  }

  span {
    color: #333;
    word-break: break-word;
  }
`;

export const FormWrapper = styled.form`
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h3 {
    font-size: 1.8rem;
    font-weight: bold;
    color: #6a380f;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
  resize: vertical;
  min-height: 150px;

  &:focus {
    border-color: #6a380f;
  }
`;

export const SubmitButton = styled.button`
  background-color: #6a380f;
  color: white;
  padding: 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #5c320d;
  }
`;
export const ContactTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  color: #6a380f;
  margin-bottom: 2rem;
  width: 100%;
  text-align: center; /* center the title only */
`;
