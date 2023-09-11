import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import colors from "../colors.json";
import { Input, Button, Skeleton } from "antd";
import { EditOutlined, SendOutlined } from "@ant-design/icons";
import CommonApi from "../util";
import PromptEditDrawer from "../components/PromptEditDrawer";

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

const testPrompt = {
  title: "Marketing Email",
  prompt: `Write a draft for my marketing email about $TOPIC$. Include a call-to-action that encourages people to $ACTION$. Write it to $AUDIENCE$ in a $TONE$ tone of voice.`,
  variables: {
    TOPIC: "a sale on TVs",
    ACTION: "check out the deals online",
    AUDIENCE: "the general public that watches TV",
    TONE: "excited",
  },
};

const getMsgFromPrompt = (prompt) => {
  let message = prompt.prompt;
  for (const variable in prompt.variables) {
    message = message.replace(`$${variable}$`, prompt.variables[variable]);
  }
  return message;
};

function Prompt() {
  const [chats, setChats] = useState([]);
  const [messageToSend, setMessageToSend] = useState(() =>
    getMsgFromPrompt(testPrompt)
  );
  const [loading, setLoading] = useState(false);

  const messageBoxRef = useRef(null);
  const [scrollPadding, setScrollPadding] = useState(0);

  const [editDrawerOpen, setEditDrawerOpen] = useState(false);

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
    const response = await CommonApi.post("/chats", newChats);
    setChats((prevChats) => [...prevChats, response]);
    setLoading(false);
  };

  const handleEdit = (newPrompt) => {
    // FIXME call to PATCH /prompts
    setMessageToSend(getMsgFromPrompt(newPrompt));
    setEditDrawerOpen(false);
  };

  const handleCloseEdit = () => {
    setEditDrawerOpen(false);
  };

  return (
    <>
      <PageWrapper style={{ paddingBottom: `${scrollPadding}px` }}>
        <TitleWrapper>
          title of prompt
          <Button
            size="large"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setEditDrawerOpen(true)}
          />
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
      <PromptEditDrawer
        open={editDrawerOpen}
        onSave={handleEdit}
        onClose={handleCloseEdit}
        initialPrompt={testPrompt}
      />
    </>
  );
}

export default Prompt;
