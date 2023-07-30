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
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
`;

function TitledIcon(props) {
  const { icon, text, textColor, link } = props;

  return (
    <IconWrapper
      style={{ color: textColor }}
      onClick={link ? () => console.log(`${text} clicked`) : undefined}
    >
      {icon}
      {text}
    </IconWrapper>
  );
}

TitledIcon.defaultProps = {
  text: "",
  textColor: colors.text,
  link: "",
};

TitledIcon.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string,
  textColor: PropTypes.string,
  link: PropTypes.string,
};

export default TitledIcon;
