import React from 'react';
import {Container, Box, Text, Tabs, TabList, Tab, TabPanel, TabPanels} from '@chakra-ui/react';
import Login from '../components/auth/login';
import Register from '../components/auth/register';

const HomePage = () => {

    return <Container maxW='xl' centerContent>

        <Box
            d = 'flex'
            justifyContent = 'center'
            p = '4'
            bg = 'gray.100'
            w="100%"
            m="40px 0 15px 0"
            borderRadius='lg'
            borderWidth='1px'

        >
            <Text>
                Drift Chat
            </Text>
        </Box>

        <Box
            d = 'flex'
            justifyContent = 'center'
            p = '4'
            bg = 'gray.100'
            w="100%"
            m="40px 0 15px 0"
            borderRadius='lg'
            borderWidth='1px'
        >
            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList mb="1em">
                    <Tab width="50%">Login</Tab>
                    <Tab width="50%">Register</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                    <Login />
                    </TabPanel>
                    <TabPanel>
                    <Register />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    </Container>
  
}

export default HomePage