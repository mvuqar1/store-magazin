import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const Stars = ({ stars, reviews }) => {
  const renderStars = () => {
    const starsArray = [];

    for (let i = 1; i <= 5; i++) {
      if (stars >= i) {
        starsArray.push(<BsStarFill key={i} />);
      } else if (stars >= i - 0.5) {
        starsArray.push(<BsStarHalf key={i} />);
      } else {
        starsArray.push(<BsStar key={i} />);
      }
    }

    return starsArray;
  };

  return (
    <Wrapper>
      <div className="stars"><span>{renderStars()}</span></div>
      <p className="reviews">{reviews} customer reviews</p>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
