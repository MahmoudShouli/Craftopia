import React, { useState } from "react";
import styled from "styled-components";

// ----- Styled Components -----
const CardWrapper = styled.div`
  perspective: 1000px;
  margin: 0 auto 20px auto;
  width: 300px;
  height: 180px;
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.8s ease;
  transform-style: preserve-3d;
  transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "rotateY(0deg)")};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  backface-visibility: hidden;
  padding: 20px;
  color: white;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
`;

const CardFront = styled(CardFace)`
  background: linear-gradient(135deg, #1a1f71, #3b82f6);
  font-family: "Courier New", monospace;
`;

const CardBack = styled(CardFace)`
  background: linear-gradient(135deg, #333, #555);
  transform: rotateY(180deg);
`;

const Stripe = styled.div`
  height: 40px;
  background: black;
  margin-top: 20px;
`;

const CvvBox = styled.div`
  margin-top: 40px;
  text-align: right;
  padding: 10px;
  background: white;
  color: black;
  font-weight: bold;
  border-radius: 6px;
`;

const VisaLogo = styled.div`
  position: absolute;
  bottom: 12px;
  right: 20px;
  font-size: 1.4rem;
  font-weight: bold;
`;

// ----- Inputs and Layout -----
const InputWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 0.9rem;
  }
`;

const NameInput = styled.input`
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
`;

const PayButton = styled.button`
  width: 100%;
  background-color: #6a380f;
  color: white;
  padding: 10px;
  font-weight: bold;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const CardName = styled.div`
  font-size: 0.9rem;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CardNumber = styled.div`
  font-size: 1.2rem;
  letter-spacing: 2px;
  margin-bottom: 20px;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
`;

const Label = styled.div`
  opacity: 0.6;
  font-size: 0.7rem;
`;

// ----- Component -----
const CardPaymentSimulator = ({ cardInfo, setCardInfo, onPay }) => {
  const { number, expiry, cvv, name } = cardInfo;
  const [flipped, setFlipped] = useState(false);

  const isValid =
    number.replace(/\s/g, "").length === 16 &&
    expiry.length === 5 &&
    cvv.length === 3 &&
    name;

  const handleNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 16) val = val.slice(0, 16);
    const formatted = val.replace(/(.{4})/g, "$1 ").trim();
    setCardInfo({ ...cardInfo, number: formatted });
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length >= 3) val = `${val.slice(0, 2)}/${val.slice(2)}`;
    setCardInfo({ ...cardInfo, expiry: val });
  };

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      <CardWrapper>
        <CardInner flipped={flipped}>
          <CardFront>
            <CardName>{name || "CARDHOLDER NAME"}</CardName>
            <CardNumber>{number || "•••• •••• •••• ••••"}</CardNumber>
            <CardRow>
              <div>
                <Label>EXPIRY</Label>
                <div>{expiry || "MM/YY"}</div>
              </div>
              <div>
                <Label>CVV</Label>
                <div>{cvv || "***"}</div>
              </div>
            </CardRow>
            <VisaLogo>VISA</VisaLogo>
          </CardFront>

          <CardBack>
            <Stripe />
            <CvvBox>{cvv || "•••"}</CvvBox>
            <VisaLogo>VISA</VisaLogo>
          </CardBack>
        </CardInner>
      </CardWrapper>

      <NameInput
        placeholder="Cardholder Name"
        value={name}
        onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
      />

      <InputWrapper>
        <input
          placeholder="Card Number"
          maxLength={19}
          value={number}
          onChange={handleNumberChange}
        />
        <input
          placeholder="MM/YY"
          value={expiry}
          onChange={handleExpiryChange}
          maxLength={5}
        />
        <input
          placeholder="CVV"
          maxLength={3}
          value={cvv}
          onFocus={() => setFlipped(true)}
          onBlur={() => setFlipped(false)}
          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
        />
      </InputWrapper>

      <PayButton disabled={!isValid} onClick={onPay}>
        Pay Now
      </PayButton>
    </div>
  );
};

export default CardPaymentSimulator;
