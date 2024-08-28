import { FormControl, FormLabel, Input, InputRightElement, VStack, Button, InputGroup, Toast, useToast } from '@chakra-ui/react'
import { set } from 'mongoose';
import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Register = () => {
    const toast = useToast();
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCpassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [pic, setPic] = useState('');
    const history = useHistory();

    const postDetils = (pic) => {
        
    }

    const submitHandler = async() => {
        
        setLoading(true);
        if(!name||!email||!password||!cPassword){
            toast({
                title: 'Please fill all the fields',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
            setLoading(false);
            return;
        }
        else if(password !== cPassword){
            toast({
                title: 'Password do not match',
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

                const {data} = await axios.post('/api/user/', {name, email, password, pic}, config);

                toast({
                    title: 'User Registered',
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                })

                localStorage.setItem('userInfo', JSON.stringify(data));
                setLoading(false);
                history.push('/chat');
            }
            catch(error){
                toast({
                    title: 'Oops! Something went wrong',
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                })
                setLoading(false);
            }
        }
    }

    return (
        <VStack spacing="5px">

            <FormControl id='first-name' isRequired>
                <FormLabel>
                    Name
                </FormLabel>
                <Input
                    placeholder='Enter your Name'
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                >
                </Input>
            </FormControl>

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

            <FormControl id='cPassowrd' isRequired>
                <FormLabel>
                    Confirm Passoword
                </FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Passoword'
                        onChange={(e)=>setCpassword(e.target.value)}
                        value={cPassword}
                    >
                    </Input>

                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={()=>setShow(!show)}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='pic' isRequired>
                <FormLabel>
                    Profile Picture
                </FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    accept='image/*'
                    onChange={(e)=>postDetils(e.target.files[0])}
                >
                </Input>
            </FormControl>

            <Button
                colorScheme='teal'
                variant='solid'
                onClick={submitHandler}
                loading={loading}
            >
                Register
            </Button>
            
        </VStack>
    )
}

export default Register