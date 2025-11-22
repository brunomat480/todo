import { ChatDots, PaperPlaneRight, X } from '@phosphor-icons/react';
import React, { useEffect, useRef, useState } from 'react';

import styles from './styles.module.css';

export interface IMessage {
  id: number;
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
}

interface IChatProps {
  sendSendMessageChat: (message: string) => Promise<IMessage>;
}

const formatSystemResponse = (text: string) => {
  if (
    text &&
    (text.includes('(concluída)') ||
      text.includes('(pendente)') ||
      text.match(/\d+ -/))
  ) {
    const lines = text.split('\n').filter((line) => line.trim());

    if (lines.length === 1 && text.match(/\d+ -/)) {
      const artificialLines = text
        .split(/(?=\d+ -)/)
        .filter((line) => line.trim());
      if (artificialLines.length > 1) {
        return (
          <div className={styles.tasksList}>
            {artificialLines.map((line, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`task-${index}-${line.substring(0, 10)}`}
                className={styles.taskItem}
              >
                {line.trim()}
              </div>
            ))}
          </div>
        );
      }
    }

    return (
      <div className={styles.tasksList}>
        {lines.map((line, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`task-${index}-${line.substring(0, 15)}`}
            className={styles.taskItem}
          >
            {line}
          </div>
        ))}
      </div>
    );
  }

  return text;
};

export function Chat({ sendSendMessageChat }: IChatProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(`.${styles.chatButton}`)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const systemResponse = async (userMessage: string): Promise<void> => {
    setIsTyping(true);

    try {
      const message = await sendSendMessageChat(userMessage);
      setMessages((prev) => [...prev, message]);
    } catch (error) {
      const errorMessage: IMessage = {
        id: Date.now(),
        text: 'Desculpe, ocorreu um erro. Tente novamente.',
        sender: 'system',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async (): Promise<void> => {
    if (!inputValue.trim()) return;

    const userMessage: IMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    await systemResponse(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div>
      <button
        type="button"
        className={styles.chatButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir chat"
      >
        <span className={styles.iaInitials}>IA</span>
      </button>

      {isOpen && (
        <div className={styles.chatContainer} ref={chatContainerRef}>
          <div className={styles.chatHeader}>
            <h3>Gerencie suas tarefas</h3>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat"
            >
              <X />
            </button>
          </div>

          <div className={styles.chatMessages}>
            {messages.length === 0 ? (
              <div className={styles.emptyState}>
                <ChatDots />
                <h4>Olá!</h4>
                <p>Como posso ajudar você hoje?</p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${styles.message} ${
                      message.sender === 'user' ? styles.messageUser : ''
                    }`}
                  >
                    <div
                      className={`${styles.messageAvatar} ${
                        message.sender === 'system'
                          ? styles.avatarBot
                          : styles.avatarUser
                      }`}
                    >
                      {message.sender === 'system' ? '🤖' : '👤'}
                    </div>
                    <div
                      className={`${styles.messageBubble} ${
                        message.sender === 'system'
                          ? styles.bubbleBot
                          : styles.bubbleUser
                      }`}
                    >
                      {message.sender === 'system'
                        ? formatSystemResponse(message.text)
                        : message.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className={styles.message}>
                    <div
                      className={`${styles.messageAvatar} ${styles.avatarBot}`}
                    >
                      🤖
                    </div>
                    <div className={styles.typingIndicator}>
                      <div className={styles.typingDot} />
                      <div className={styles.typingDot} />
                      <div className={styles.typingDot} />
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.chatInput}>
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={handleKeyPress}
              disabled={isTyping}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            />
            <button
              type="button"
              className={styles.sendButton}
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Enviar mensagem"
            >
              <PaperPlaneRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
