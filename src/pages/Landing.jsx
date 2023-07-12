import TitledIcon from "../components/TitledIcon";
import { styled } from "styled-components";
import colors from "../colors.json";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// Icons
import { ReactComponent as BooksIcon } from "../assets/bookshelf-library.svg";
import { ReactComponent as ChatbotIcon } from "../assets/chat-bot.svg";
import { ReactComponent as DiscoverIcon } from "../assets/global-search.svg";
import { ReactComponent as VariableIcon } from "../assets/variable-plus.svg";
import { ReactComponent as CodeIcon } from "../assets/code.svg";
import { ReactComponent as PencilIcon } from "../assets/pencil.svg";
import { ReactComponent as EducationIcon } from "../assets/school.svg";
import { ReactComponent as MegaphoneIcon } from "../assets/megaphone.svg";
import { ReactComponent as SalesIcon } from "../assets/money-bar-chart.svg";
import { ReactComponent as ReportIcon } from "../assets/report.svg";

const PageWrapper = styled.div`
  text-align: center;
`;

const TitleWrapper = styled.div`
  font-weight: bolder;
  font-size: 32px;
  color: ${colors.text};
  padding: 64px;
`;

const CategoryWrapper = styled.div`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  padding: 32px;
  margin-top: 32px;
  font-weight: bold;
  font-size: 20pt;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px 0;
  font-size: 14pt;
  font-weight: normal;
`;

const Footer = styled.div`
  padding: 16px;
`;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    // slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    // slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    // slidesToSlide: 1, // optional, default to 1.
  },
};

function Landing() {
  const iconSize = 96;
  const smallIconSize = 64;

  return (
    <PageWrapper>
      <TitleWrapper>
        save, reuse, and share your favorite AI prompts
      </TitleWrapper>
      <Carousel
        // swipeable={false}
        // draggable={false}
        responsive={responsive}
        // centerMode
        partialVisible
        // ssr={true} // means to render carousel on server-side.
        infinite
        autoPlay
        autoPlaySpeed={7000}
        keyBoardControl
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        <TitledIcon
          icon={
            <BooksIcon fill={colors.text} height={iconSize} width={iconSize} />
          }
          text="easily store prompts in your own personal library"
        />
        <TitledIcon
          icon={
            <VariableIcon
              stroke={colors.text}
              height={iconSize}
              width={iconSize}
            />
          }
          text="reuse common prompts via modifiable variables"
        />
        <TitledIcon
          icon={
            <ChatbotIcon
              fill={colors.text}
              height={iconSize}
              width={iconSize}
            />
          }
          text="seamlessly try and use prompts through an integrated AI chatbot window"
        />
        <TitledIcon
          icon={
            <DiscoverIcon
              stroke={colors.text}
              height={iconSize}
              width={iconSize}
            />
          }
          text="discover high-quality prompts from other users"
        />
      </Carousel>
      <CategoryWrapper>
        the complete AI prompt arsenal
        <IconGrid>
          <TitledIcon
            text="programming"
            textColor={colors.primary}
            icon={
              <CodeIcon
                stroke={colors.primary}
                height={smallIconSize}
                width={iconSize}
              />
            }
          />
          <TitledIcon
            text="writing"
            textColor={colors.primary}
            icon={
              <PencilIcon
                stroke={colors.primary}
                height={smallIconSize}
                width={iconSize}
              />
            }
          />
          <TitledIcon
            text="education"
            textColor={colors.primary}
            icon={
              <EducationIcon
                fill={colors.primary}
                height={smallIconSize}
                width={iconSize}
              />
            }
          />
          <TitledIcon
            text="marketing"
            textColor={colors.primary}
            icon={
              <MegaphoneIcon
                fill={colors.primary}
                height={smallIconSize}
                width={iconSize}
              />
            }
          />
          <TitledIcon
            text="sales"
            textColor={colors.primary}
            icon={
              <SalesIcon
                fill={colors.primary}
                height={smallIconSize}
                width={iconSize}
              />
            }
          />
          <TitledIcon
            text="administration"
            textColor={colors.primary}
            icon={
              <ReportIcon
                fill={colors.primary}
                height={smallIconSize}
                width={iconSize}
              />
            }
          />
        </IconGrid>
      </CategoryWrapper>
      <Footer>created by owen cooke</Footer>
    </PageWrapper>
  );
}

export default Landing;
