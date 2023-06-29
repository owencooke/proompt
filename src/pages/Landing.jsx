import Navbar from "../components/Navbar";
import { styled } from "styled-components";
import colors from "../colors.json";

const PageWrapper = styled.div`
  /* background-color: ${colors.primary}; */
  text-align: center;
`;

const TitleWrapper = styled.div`
  font-weight: bolder;
  font-size: 32px;
  color: ${colors.text};
  padding: 64px;
`;

function Landing() {
  return (
    <PageWrapper>
      <Navbar />
      <TitleWrapper>
        save, reuse, and share your favorite AI prompts
      </TitleWrapper>
    </PageWrapper>
  );
}

export default Landing;
