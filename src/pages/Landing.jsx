import Navbar from "../components/Navbar";
import Icon from "../components/Icon";
import { styled } from "styled-components";
import colors from "../colors.json";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BooksIcon from "../assets/bookshelf-library.svg";
import ChatbotIcon from "../assets/chat-bot.svg";
import DiscoverIcon from "../assets/global-search.svg";
import VariableIcon from "../assets/variable-plus.svg";

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
        <Icon
          icon={BooksIcon}
          text="easily store prompts in your own personal library"
          iconHeight={iconSize}
          iconWidth={iconSize}
        />
        <Icon
          icon={VariableIcon}
          text="reuse common prompts via modifiable variables"
          iconHeight={iconSize}
          iconWidth={iconSize}
        />
        <Icon
          icon={ChatbotIcon}
          text="seamlessly try and use prompts through an integrated AI chatbot window"
          iconHeight={iconSize}
          iconWidth={iconSize}
        />
        <Icon
          icon={DiscoverIcon}
          text="discover high-quality prompts from other users"
          iconHeight={iconSize}
          iconWidth={iconSize}
        />
      </Carousel>
    </PageWrapper>
  );
}

export default Landing;
