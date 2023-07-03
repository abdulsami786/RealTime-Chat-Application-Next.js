'use client'

import axios from 'axios'
import { FC, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import TextareaAutosize from 'react-textarea-autosize'
import Button from './ui/Button'
import EmojiPicker from "emoji-picker-react";
import ClickAwayListener from "react-click-away-listener";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import Icon from './Icon'


interface ChatInputProps  {
    chatPartner: User
    chatId : string
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
    
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const [input, setInput] = useState<string>('')
    const [showImojiPicker, setShowImojiPicker] = useState(false);
    const onEmojiClick = (emojiData:any, event:any) => {
        console.log(emojiData, event);
        let text = input;
        setInput((text += emojiData.emoji));
    };
    const sendMessage = async () => {
        if (!input) return
        setIsLoading(true)

        try {
            await axios.post('/api/message/send', { text: input, chatId })
            setInput('')
            textareaRef.current?.focus()
        } catch (error) {
            toast.error('Something went wrong.Please Try again later.')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0'>
            <div className='relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600'>
                <TextareaAutosize
                    ref={textareaRef}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            sendMessage()
                    }
                    }}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message ${chatPartner.name}`}
                    className='block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6'
                />
                 <div
                    onClick={() => textareaRef.current?.focus()}
                    
                    className='py-2'
                    
                    aria-hidden='true'>
                    
                    <div className='py-px'>
                        
                        <div className='h-9' />
                        
                    </div>
                    <div className="absolute right-20 bottom-0 flex justify-between py-2 pl-3 pr-2">
                <Icon
                    size="small"
                    className={`${showImojiPicker ? "bg-c1" : ""}`}
                    icon={<HiOutlineEmojiHappy size={24} className="text-c3" />}
                    onClick={() => setShowImojiPicker(true)}
                />
                
            </div> 
                </div>
                <div className='absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
          <div className='flex-shrin-0'>
            <Button isLoading={isLoading} onClick={sendMessage} type='submit'>
              Send
            </Button>
        </div>
                    
        </div>
            </div>
           
            {showImojiPicker && (
                    <ClickAwayListener
                        onClickAway={() => setShowImojiPicker(false)}
                    >
                        <div className="absolute bottom-12 right-20 shadow-lg flow-auto">
                            <EmojiPicker
                            
                                onEmojiClick={onEmojiClick}
                                autoFocusSearch={false}
                            />
                        </div>
                    </ClickAwayListener>
                )}
    </div>
  );
};
export default ChatInput;