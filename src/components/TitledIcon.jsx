import { styled } from "styled-components";
import colors from "../colors.json";
import PropTypes from "prop-types";

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 300px;
  font-size: 16px;
  margin: auto;
`;

function TitledIcon(props) {
  const { icon, text, textColor } = props;

  return (
    <IconWrapper>
      {icon}
      <p style={{ color: textColor }}>{text}</p>
    </IconWrapper>
  );
}

TitledIcon.defaultProps = {
  text: "",
  textColor: colors.text,
};

TitledIcon.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string,
  textColor: PropTypes.string,
};

export default TitledIcon;
