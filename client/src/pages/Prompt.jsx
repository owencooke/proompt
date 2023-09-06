import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import colors from "../colors.json";
import { Input, Button, Skeleton } from "antd";
import { EditOutlined, SendOutlined } from "@ant-design/icons";
import CommonApi from "../util";

const PageWrapper = styled.div`
  padding: 2rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bolder;
  font-size: 32px;
  color: ${colors.text};
  padding: 2rem;
`;

const AlternatingChats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2rem;

  div:nth-child(even) {
    align-self: flex-start;
  }
`;

const ChatBubble = styled.div`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  padding: 1rem;
  border-radius: 1rem;
  max-width: 75%;
`;

const MessageWrapper = styled.div`
  background-color: ${colors.secondary};
  padding: 2rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  gap: 4px;
`;

const CorrectivePagePadding = 96;

const defaultChats = [
  {
    role: "user",
    content:
      "We want to create an AI for prioritizing what areas to fix power outages in first in states of emergency. we want to give as input different parameters such as population, types of buildings, etc.",
  },
  {
    role: "assistant",
    content:
      "To create a neural network for prioritizing power outage fixes, you could use Python and a deep learning framework such as TensorFlow or PyTorch.",
  },
];

function Prompt() {
  const [chats, setChats] = useState(defaultChats);
  const [messageToSend, setMessageToSend] = useState("");
  const [loading, setLoading] = useState(false);

  const messageBoxRef = useRef(null);
  const [scrollPadding, setScrollPadding] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        let { height } = entry.contentRect;
        if (
          entry.target === messageBoxRef.current &&
          height + CorrectivePagePadding !== scrollPadding
        )
          setScrollPadding(height + CorrectivePagePadding || 0);
      }
    });
    observer.observe(messageBoxRef.current);
    return () => observer.disconnect;
  }, [scrollPadding]);

  useEffect(() => {
    if (chats.length || loading) {
      document.body.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chats, loading]);

  const handleSend = async () => {
    const newChats = [...chats, { role: "user", content: messageToSend }];
    setChats(newChats);
    setMessageToSend("");
    setTimeout(() => {
      setLoading(true);
    }, 2000);
    const response = await CommonApi.post("/prompts", newChats);
    setChats((prevChats) => [...prevChats, response]);
    setLoading(false);
  };

  return (
    <>
      <PageWrapper style={{ paddingBottom: `${scrollPadding}px` }}>
        <TitleWrapper>
          title of prompt
          <Button size="large" type="primary" icon={<EditOutlined />} />
        </TitleWrapper>
        <AlternatingChats>
          {chats.map((chat, idx) => (
            <ChatBubble key={idx}>{chat.content}</ChatBubble>
          ))}
          {loading && <Skeleton.Input active block style={{ width: "75%" }} />}
        </AlternatingChats>
      </PageWrapper>
      <MessageWrapper ref={messageBoxRef}>
        <Input.TextArea
          style={{
            minHeight: "2.5rem",
            fontSize: "16px",
          }}
          autoSize={{ maxRows: 8 }}
          placeholder="Send a message"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          maxLength={1000}
        ></Input.TextArea>
        <Button
          type="default"
          size="large"
          icon={<SendOutlined />}
          onClick={handleSend}
        />
      </MessageWrapper>
    </>
  );
}

export default Prompt;
