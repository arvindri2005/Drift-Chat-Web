import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, useToast} from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Login = () => {
    const toast = useToast();
    
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const submitHandler = async() => {
        setLoading(true);
        if(!email || !password){
            toast({
                title: 'Please fill all the fields',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
            setLoading(false);
            return;
        }
        else{
            try{
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                const {data} = await axios.post('/api/user/login', {email, password}, config);

                toast({
                    title: 'User Logged In',
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                })

                localStorage.setItem('userInfo', JSON.stringify(data));
                setLoading(false);
                history.push('/chat');

            }catch(err){
                toast({
                    title: 'Invalid email or password',
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                })
            }
            setLoading(false);
        }
    }

    return (
        <VStack>
            <FormControl id='email' isRequired>
                <FormLabel>
                    Email
                </FormLabel>
                <Input
                    placeholder='Enter your email'
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                >
                </Input>
            </FormControl>

            <FormControl id='passowrd' isRequired>
                <FormLabel>
                    Passoword
                </FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Passoword'
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                    >
                    </Input>

                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={()=>setShow(!show)}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                
            </FormControl>

            <Button
                colorScheme='teal'
                variant='solid'
                onClick={submitHandler}
                loading = {loading}
            >
                Login
            </Button>

            <Button
                colorScheme='teal'
                variant='solid'
                onClick={() =>{
                    setEmail("test2@gmail.com")
                    setPassword("1234")
                }}
            >
                Guest Login
            </Button>


        </VStack>
  )
}

export default Login
