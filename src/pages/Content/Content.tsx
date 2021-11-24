import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Style = styled.div`
  position: fixed;
  font-size: 50px;
`;

function Content() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState(false);
  const [nameValue, setNameValue] = useState('');

  const clickEvent = () => {
    chrome.tabs.getCurrent((ownTab) => {
      chrome.tabs.sendMessage(ownTab.id, 'selectText');
    });
    chrome.tabs.sendMessage(123, 'message');
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener((text) => {
      setNameValue(text);
    });
  }, []);

  return (
    <>
      <input
        ref={nameRef}
        onFocus={clickEvent}
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
      />
      <input ref={emailRef} />
    </>
  );
}

export default Content;
