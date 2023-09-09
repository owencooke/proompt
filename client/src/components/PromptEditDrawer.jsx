import { useState } from "react";
import { Drawer, Button } from "antd";
import PropTypes from "prop-types";
import colors from "../colors.json";
import PromptFields from "./PromptFields";

function PromptEditDrawer(props) {
  const { open, initialPrompt, onClose, onSave } = props;
  const [prompt, setPrompt] = useState(initialPrompt);

  const handleSave = () => {
    onSave(prompt);
  };

  const handleCancel = () => {
    setTimeout(() => {
      setPrompt(initialPrompt);
    }, 500);
    onClose();
  };

  return (
    <Drawer
      title="edit"
      open={open}
      onClose={handleCancel}
      style={{
        backgroundColor: colors.primary,
      }}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
      extra={
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      }
    >
      <PromptFields prompt={prompt} setPrompt={setPrompt} />
    </Drawer>
  );
}

PromptEditDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialPrompt: PropTypes.shape({
    title: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    variables: PropTypes.object,
  }),
};

export default PromptEditDrawer;
