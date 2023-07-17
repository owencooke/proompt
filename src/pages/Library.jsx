import { styled } from "styled-components";
import colors from "../colors.json";
import { prompts } from "../mock/prompts";
import PromptCard from "../components/PromptCard";

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
  padding: 64px;
`;

const AddButton = styled.button`
  color: ${colors.primary};
  background-color: ${colors.tertiary};
  border: none;
  font-size: 32px;
`;

function Library() {
  return (
    <PageWrapper>
      <TitleWrapper>
        library
        <AddButton>new</AddButton>
      </TitleWrapper>
      {prompts.map((prompt, i) => (
        <PromptCard
          key={i}
          title={prompt.title}
          prompt={prompt.prompt}
          variableCount={Object.keys(prompt.variables).length}
          categories={prompt.categories}
        />
      ))}
    </PageWrapper>
  );
}

export default Library;
