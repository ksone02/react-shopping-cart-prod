import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { useCartFetch } from '../../../hooks/useCartFetch';

const UserCartInfo = () => {
  const { cartData } = useCartFetch();

  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);

  const [isShown, setIsShown] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (cartData) {
      setCartTotalQuantity(cartData.length);
    }
  }, [cartData]);

  useEffect(() => {
    if (cartTotalQuantity > 0 && !isShown) {
      setIsShown(true);
      return;
    }
    if (cartTotalQuantity === 0 && isShown) {
      setTimeout(() => {
        setIsShown(false);
      }, 200);
    }
  }, [cartTotalQuantity]);

  useEffect(() => {
    if (cartTotalQuantity > 0 && !isShown) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, transform: 'translateX(-10px)', delay: 0.3, ease: 'ease' },
        { opacity: 1, transform: 'translateX(0)' },
      );
    }
    if (cartTotalQuantity === 0) {
      gsap.fromTo(
        ref.current,
        { opacity: 1, transform: 'translateX(0)', delay: 0.3, ease: 'ease' },
        { opacity: 0, transform: 'translateX(-10px)' },
      );
    }
  }, [cartTotalQuantity, isShown]);

  return (
    <CardCounterWrapper ref={ref} to="/cart">
      {isShown && (
        <>
          <Text color="#ffffff" size="large" lineHeight="12px">
            의 장바구니
          </Text>
          <CartCounter>
            <Text size="smallest" color="#ffffff">
              {cartTotalQuantity && cartTotalQuantity > 99 ? 99 : cartTotalQuantity}
            </Text>
          </CartCounter>
        </>
      )}
    </CardCounterWrapper>
  );
};

export default UserCartInfo;

const CardCounterWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CartCounter = styled.div`
  width: 26px;
  height: 26px;
  background-color: #04c09e;
  border-radius: 100px;
  margin-left: 6px;
  text-align: center;
`;
