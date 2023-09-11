import { Input, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { styled } from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

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

function PromptFields(props) {
  const { prompt, setPrompt } = props;

  const renderVariables = () => {
    if (!prompt) {
      return <></>;
    }
    const elements = Object.entries(prompt.variables).map(
      ([variable, value], index) => (
        <VariableRow key={`variable-${index}`}>
          <Variable
            value={variable}
            onChange={(e) => {
              setPrompt((oldPrompt) => {
                const newVars = { ...oldPrompt.variables };
                newVars[e.target.value] = newVars[variable];
                delete newVars[variable];
                return {
                  ...oldPrompt,
                  prompt: oldPrompt.prompt.replace(
                    `$${variable}$`,
                    `$${e.target.value}$`
                  ),
                  variables: newVars,
                };
              });
            }}
          />
          <Variable
            value={value}
            onChange={(e) =>
              setPrompt((oldPrompt) => ({
                ...oldPrompt,
                variables: {
                  ...oldPrompt.variables,
                  [variable]: e.target.value,
                },
              }))
            }
          />
          <Button
            type="text"
            danger
            icon={<MinusCircleOutlined />}
            onClick={() => {
              setPrompt((oldPrompt) => {
                const newVars = { ...oldPrompt.variables };
                delete newVars[variable];
                return {
                  ...oldPrompt,
                  prompt: oldPrompt.prompt.replace(`$${variable}$`, ""),
                  variables: newVars,
                };
              });
            }}
          />
        </VariableRow>
      )
    );
    return elements;
  };

  return (
    <PageWrapper>
      <FormGroup>
        title
        <Input
          style={{
            minHeight: "2.5rem",
            fontSize: "16px",
          }}
          value={prompt?.title}
          onChange={(e) =>
            setPrompt((oldPrompt) => ({ ...oldPrompt, title: e.target.value }))
          }
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
          autoSize={{ minRows: 3 }}
          value={prompt?.prompt}
          onChange={(e) =>
            setPrompt((oldPrompt) => ({ ...oldPrompt, prompt: e.target.value }))
          }
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
          onClick={() =>
            setPrompt((oldPrompt) => ({
              ...oldPrompt,
              variables: { ...oldPrompt.variables, NEW: "" },
            }))
          }
        >
          New variable
        </Button>
      </FormGroup>
    </PageWrapper>
  );
}

PromptFields.propTypes = {
  prompt: PropTypes.shape({
    title: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    variables: PropTypes.object,
  }),
  setPrompt: PropTypes.func.isRequired,
};

export default PromptFields;
