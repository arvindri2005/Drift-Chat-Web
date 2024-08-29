import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useChatState } from '../context/chatProvider'
import { Box, Button } from '@chakra-ui/react'
import SideDrawer from '../miscellaneous/SideDrawer'
import MyChats from '../miscellaneous/MyChats'
import ChatBox from '../miscellaneous/ChatBox'

const ChatPage = () => {
    const { user } = useChatState()

    return (
        <div style={{
            width: '100%',
        }}>
            { user && <SideDrawer/> }

            <Box
                d= "flex"
                justifyContent= "space-between"
                w="100vw"
                h='91.5vh'
                p="10px"
                flexDirection="row"
                
            >
                {user && <MyChats/> }
                {user && <ChatBox/>}
            </Box>
            
        </div>
    )
}

export default ChatPage