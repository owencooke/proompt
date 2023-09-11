import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import colors from "../colors.json";
import PropTypes from "prop-types";
import { Dropdown } from "antd";
import { TagFilled } from "@ant-design/icons";

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

const Flexbox = styled.div`
  display: flex;
  gap: 1rem;
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
  const { prompt } = props;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: `${isOpen ? "Hide" : "Show"} details`,
      key: "0",
    },
    {
      label: "Edit",
      key: "1",
    },
    {
      label: "Delete",
      key: "2",
      danger: true,
    },
    {
      label: "Share",
      key: "3",
    },
  ];

  const handleButtonClick = () => {
    navigate(`/prompt/${prompt.id}`, { state: { prompt } });
  };

  const handleMenuClick = (e) => {
    switch (parseInt(e.key)) {
      case 0:
        setIsOpen((prev) => !prev);
        break;
      case 1:
        // FIXME edit: redirect to prompt editor
        break;
      case 2:
        // FIXME delete: modal confirm delete prompt
        break;
      case 3:
        // FIXME delete: shareable prompt link
        break;
    }
  };

  return (
    <CardWrapper>
      <TitleWrapper>
        {prompt.title}
        <Dropdown.Button
          menu={{ items: menuItems, onClick: handleMenuClick }}
          onClick={handleButtonClick}
          style={{ width: "fit-content" }}
        >
          chat
        </Dropdown.Button>
      </TitleWrapper>
      {isOpen && (
        <>
          <PromptText>{prompt.prompt}</PromptText>
          <Flexbox style={{ justifyContent: "space-between" }}>
            <Flexbox>
              <TagFilled style={{ color: colors.primary }} />
              {prompt.categories.map((category, i) => (
                <FilterTag key={i}>{category}</FilterTag>
              ))}
            </Flexbox>
            <PromptText>
              {Object.keys(prompt.variables).length} variables
            </PromptText>
          </Flexbox>
        </>
      )}
    </CardWrapper>
  );
}

PromptCard.propTypes = {
  prompt: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    variables: PropTypes.objectOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default PromptCard;
