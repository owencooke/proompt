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

function Icon(props) {
  const { icon, text, iconColor, textColor, iconHeight, iconWidth } = props;

  return (
    <IconWrapper>
      <img
        src={icon}
        alt={`${text} icon`}
        height={iconHeight}
        width={iconWidth}
        draggable={false}
      />
      <p style={{ color: textColor }}>{text}</p>
    </IconWrapper>
  );
}

Icon.defaultProps = {
  text: "",
  iconColor: colors.text,
  textColor: colors.text,
  iconHeight: "32px",
  iconWidth: "32px",
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string,
  iconColor: PropTypes.string,
  textColor: PropTypes.string,
  iconHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Icon;
