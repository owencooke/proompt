import { useState } from "react";
import { styled } from "styled-components";
import colors from "../colors.json";
import PropTypes from "prop-types";

const CardWrapper = styled.div`
  background-color: ${colors.secondary};
  padding: 16px;
  margin: 16px 32px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.primary};
  font-weight: bold;
  font-size: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PromptText = styled.span`
  color: ${colors.primary};
  font-weight: lighter;
`;

const FilterTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.primary};
  border-radius: 10px;
  color: ${colors.primary};
  font-weight: lighter;
  width: fit-content;
  padding: 2px 8px;
`;

function PromptCard(props) {
  const { title, prompt, variableCount, categories } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CardWrapper>
      <TitleWrapper>
        {title}
        <ButtonGroup>
          <button onClick={() => setIsOpen((prev) => !prev)}>Details</button>
          <button>Open</button>
        </ButtonGroup>
      </TitleWrapper>
      {isOpen && (
        <>
          <PromptText>{prompt}</PromptText>
          {categories.map((category, i) => (
            <FilterTag key={i}>{category}</FilterTag>
          ))}
          <PromptText>{variableCount} variables</PromptText>
        </>
      )}
    </CardWrapper>
  );
}

PromptCard.defaultProps = {
  variableCount: 0,
  categories: [],
};

PromptCard.propTypes = {
  title: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  variableCount: PropTypes.number,
  categories: PropTypes.arrayOf(PropTypes.string),
};

export default PromptCard;
