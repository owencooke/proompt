import { useState } from "react";
import { Drawer, Input, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { styled } from "styled-components";
import colors from "../colors.json";

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 16px;
`;

const VariableRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  span {
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
          <Button
            type="text"
            danger
            icon={<MinusCircleOutlined />}
            onClick={() => {
              setVariables((oldVars) => {
                const newVars = { ...oldVars };
                delete newVars[variable];
                return newVars;
              });
              setPrompt((oldPrompt) => oldPrompt.replace(`$${variable}$`, ""));
            }}
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

  const handleCancel = () => {
    setTimeout(() => {
      setTitle(initialPrompt.title);
      setPrompt(initialPrompt.prompt);
      setVariables(initialPrompt?.variables || {});
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
      <FormGroup>
        title
        <Input
          style={{
            minHeight: "2.5rem",
            fontSize: "16px",
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={1000}
        ></Input>
      </FormGroup>
      <FormGroup>
        prompt
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
      </FormGroup>

      <FormGroup>
        <VariableRow>
          <span>variable</span>
          <span>value</span>
          <svg height="16" width="48"></svg>
        </VariableRow>
        {renderVariables()}
        <Button
          icon={<PlusOutlined />}
          style={{ width: "fit-content" }}
          onClick={() => setVariables((oldVars) => ({ ...oldVars, NEW: "" }))}
        >
          New variable
        </Button>
      </FormGroup>
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
