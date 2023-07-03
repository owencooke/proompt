import Navbar from "../components/Navbar";
import TitledIcon from "../components/TitledIcon";
import { styled } from "styled-components";
import colors from "../colors.json";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ReactComponent as BooksIcon } from "../assets/bookshelf-library.svg";
import { ReactComponent as ChatbotIcon } from "../assets/chat-bot.svg";
import { ReactComponent as DiscoverIcon } from "../assets/global-search.svg";
import { ReactComponent as VariableIcon } from "../assets/variable-plus.svg";

const PageWrapper = styled.div`
  text-align: center;
`;

const TitleWrapper = styled.div`
  font-weight: bolder;
  font-size: 32px;
  color: ${colors.text};
  padding: 64px;
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

  return (
    <PageWrapper>
      <Navbar />
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
    </PageWrapper>
  );
}

export default Landing;
