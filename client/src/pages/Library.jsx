import { useState } from "react";
import { styled } from "styled-components";
import colors from "../colors.json";
import { prompts } from "../mock/prompts";
import PromptCard from "../components/PromptCard";
import { Button, Select, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PromptFields from "../components/PromptFields";

const PageWrapper = styled.div`
  /* text-align: center; */
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bolder;
  font-size: 32px;
  color: ${colors.text};
  padding: 4rem 4rem 1rem 4rem;
`;

const filters = [
  { label: "programming", value: "programming" },
  { label: "writing", value: "writing" },
  { label: "education", value: "education" },
  { label: "sales", value: "sales" },
  { label: "marketing", value: "marketing" },
  { label: "administration", value: "administration" },
];

const defaultPrompt = {
  title: "",
  prompt: "",
  variables: {},
};

function Library() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prompt, setPrompt] = useState(defaultPrompt);

  const closeModal = () => {
    setIsModalOpen(false);
    setPrompt(defaultPrompt);
  };

  const handleCreate = () => {
    // FIXME POST /prompt
    closeModal();
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <PageWrapper>
      <TitleWrapper>
        library
        <Button
          size="large"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          new
        </Button>
      </TitleWrapper>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%", padding: "0rem 4rem 2rem" }}
        placeholder="Tags"
        onChange={handleChange}
        options={filters}
      />
      {prompts.map((prompt, i) => (
        <PromptCard
          key={i}
          title={prompt.title}
          prompt={prompt.prompt}
          variableCount={Object.keys(prompt.variables).length}
          categories={prompt.categories}
        />
      ))}
      <Modal
        bodyStyle={{ paddingBlock: "1.5rem" }}
        title={<h3>create a new prompt</h3>}
        open={isModalOpen}
        okText="Create"
        onOk={handleCreate}
        onCancel={closeModal}
      >
        <PromptFields prompt={prompt} setPrompt={setPrompt} />
      </Modal>
    </PageWrapper>
  );
}

export default Library;
