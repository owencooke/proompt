import { useState } from "react";
import { Drawer, Input, Button } from "antd";
import PropTypes from "prop-types";
import { styled } from "styled-components";
import colors from "../colors.json";

const VariableRow = styled.div`
  display: flex;
  gap: 2rem;
  h3 {
    width: 100%;
  }
`;

const Variable = styled(Input)`
  min-height: "2.5rem";
  font-size: "16px";
  width: 100%;
`;

function PromptEditDrawer(props) {
  const { open, initialPrompt, onClose, onSave } = props;

  const [title, setTitle] = useState(initialPrompt.title);
  const [prompt, setPrompt] = useState(initialPrompt.prompt);
  const [variables, setVariables] = useState(initialPrompt?.variables || {});

  const renderVariables = () => {
    const elements = Object.entries(variables).map(
      ([variable, value], index) => (
        <VariableRow key={`variable-${index}`}>
          <Variable
            value={variable}
            onChange={(e) => {
              setVariables((oldVars) => {
                const newVars = { ...oldVars };
                newVars[e.target.value] = newVars[variable];
                delete newVars[variable];
                return newVars;
              });
              setPrompt((oldPrompt) =>
                oldPrompt.replace(`$${variable}$`, `$${e.target.value}$`)
              );
            }}
          />
          <Variable
            value={value}
            onChange={(e) =>
              setVariables((oldVars) => ({
                ...oldVars,
                [variable]: e.target.value,
              }))
            }
          />
        </VariableRow>
      )
    );
    return elements;
  };

  const handleSave = () => {
    onSave({
      title,
      prompt,
      variables,
    });
  };

  return (
    <Drawer
      title="edit"
      open={open}
      onClose={onClose}
      style={{
        backgroundColor: colors.primary,
      }}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
      extra={
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      }
    >
      <h3>title</h3>
      <Input
        style={{
          minHeight: "2.5rem",
          fontSize: "16px",
        }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={1000}
      ></Input>
      <h3>prompt</h3>
      <Input.TextArea
        style={{
          minHeight: "2.5rem",
          fontSize: "16px",
        }}
        autoSize
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        maxLength={1000}
      ></Input.TextArea>
      <VariableRow>
        <h3>variable</h3>
        <h3>value</h3>
      </VariableRow>
      {renderVariables()}
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
