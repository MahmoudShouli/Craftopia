import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { updateCardInfo } from "../../api/userService";
import { useUser } from "../../context/UserContext";
import { updateOrder } from "../../api/orderService"; 
import { toast } from "react-toastify";

// ----- Animations -----
const typing = keyframes`
  from { opacity: 0.2; }
  to { opacity: 1; }
`;

// ----- Styled Components -----
const CardWrapper = styled.div`
  perspective: 1000px;
  margin: 0 auto 20px auto;
  width: 320px;
  height: 190px;
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
  animation: ${typing} 0.4s ease-in-out;
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

// ----- Main Component -----
const CardPaymentSimulator = ({ cardInfo, setCardInfo, orderIds = [], onPaymentDone }) => {
  const { user, setUser } = useUser();
  const [flipped, setFlipped] = useState(false);
  const [animIndex, setAnimIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.cardInfo) {
      setCardInfo({
        name: user.name || "",
        number: user.cardInfo.cardNumber || "",
        expiry: user.cardInfo.expiryDate || "",
        cvv: user.cardInfo.cvv || "",
      });
      setAnimIndex((user.cardInfo.cardNumber || "").length);
    } else {
      setCardInfo((prev) => ({ ...prev, name: user?.name || "" }));
    }
  }, [user]);

  const { number, expiry, cvv, name } = cardInfo;

  const isValid =
    number.replace(/\s/g, "").length === 16 &&
    expiry.length === 5 &&
    cvv.length === 3 &&
    name;

  const handleNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 16) val = val.slice(0, 16);
    const formatted = val.replace(/(.{4})/g, "$1 ").trim();
    setAnimIndex(formatted.length);
    setCardInfo({ ...cardInfo, number: formatted });
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length >= 3) val = `${val.slice(0, 2)}/${val.slice(2)}`;
    setCardInfo({ ...cardInfo, expiry: val });
  };

  const handlePay = async () => {
    if (!user?.email) {
      toast.error("No user email found.");
      return;
    }
    setIsSubmitting(true);
    try {
      // 1. Save card info to user
      const updatedUser = await updateCardInfo(user.email, number, expiry, cvv);
      setUser(updatedUser);
      toast.success("Card info saved successfully!");

      // 2. Mark all orders as confirmed & paid
      await Promise.all(
        orderIds.map((id) => updateOrder(id, "confirmed", "paid"))
      );
      toast.success("Payment confirmed!");

      // 3. Callback
      if (onPaymentDone) onPaymentDone();
    } catch (err) {
      toast.error("Payment failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      {/* ... your card visual */}
      <CardWrapper>
        <CardInner flipped={flipped}>
          <CardFront>
            <CardName>{name || "CARDHOLDER NAME"}</CardName>
            <CardNumber>
              {number
                ? number.split("").map((ch, i) => (
                    <span
                      key={i}
                      style={{
                        opacity: i < animIndex ? 1 : 0.3,
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      {ch}
                    </span>
                  ))
                : "•••• •••• •••• ••••"}
            </CardNumber>
            <CardRow>
              <div>
                <Label>EXPIRY</Label>
                <div>{expiry || "MM/YY"}</div>
              </div>
              <div>
                <Label>CVV</Label>
                <div>***</div>
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

      {/* ... your input fields */}
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

      {/* Pay button */}
      <PayButton disabled={!isValid || isSubmitting} onClick={handlePay}>
        {isSubmitting ? "Processing..." : "Pay Now"}
      </PayButton>
    </div>
  );
};

export default CardPaymentSimulator;
