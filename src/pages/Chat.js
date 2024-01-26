import React, { useState } from 'react';
import axios from "axios";

import {
    Code,
    FormControl, Input, Button, Select,
    VStack, Box,
    Flex,
    Spinner,
    AlertIcon
  } from '@chakra-ui/react';

import {
  ChatIcon, UpDownIcon
} from '@chakra-ui/icons'

async function llmCall(project, role, message) {
  try {
    const response = await axios.post("http://localhost:8000/", {
      username: "jsmith",
      project: project,
      role: role,
      question: message
    })
    console.log(response.data.message)
    return response.data.message;
  } catch(error) {
    alert("error")
  }
}
function Chat(props) {
    const [currentProject, setCurrentProject] = useState(null);
    const [currentRole, setCurrentRole] = useState(null);
    const [message, setMessage] = useState(null);
    const [messages, setMessages] = useState([])
    const [loaded, setLoaded] = useState(true)

    const getAnswer = async (message, role, project) => {      
      if(!message || !role || !project) return alert("inform Role, Project and Message")
      setLoaded(false)
      setMessages(previousState => {
        return [...previousState, {type:'question', content: message} ]
      })

      const llmResponse = await llmCall(project, role, message);

      setMessages(previousState => {
        return [...previousState, {type:'answer', content: llmResponse}  ]
      })
      setLoaded(true)
    }
   
    return (
    <>
    {props.projects.projects && <VStack align='stretch' height='100%'>
        <Box h='calc(75vh)' bgColor='white' opacity='60%' p='5' borderRadius='2' borderWidth='1px' borderColor='dodgerblue'>
            <Code h='100%' p='4' w='calc(100%)' bgColor='#E0E0E0' style={{ overflow: 'visible', overflowY: "scroll", height: "100%" }}>
              {
              messages.map(currentMessage => {
                return currentMessage.type === "question" ? 
                    <Box bgColor='#666' color='#FFF' p={3} fontSize="x-small" borderRadius='2' marginBottom={2}><UpDownIcon boxSize={4} marginRight={2}/>{currentMessage.content}</Box> : 
                    <Box bgColor='#CCC' p={3} fontSize="x-small" marginBottom={4}><ChatIcon boxSize={3} marginRight={2}/><pre style={{width:'100%',  overflow: 'visible', overflowX: "scroll", overflow: 'scroll'}}>{currentMessage.content}</pre></Box>
              })
              }
              </Code>
        </Box>
        <Flex>
            <FormControl  borderColor='none' padding='2px'>
                <Input w='calc(100%)' borderColor='dodgerblue' borderWidth='1px' opacity='60%' borderRadius='2px' placeholder='Question...'
                onChange={(event) => setMessage(event.target.value)}
                />
            </FormControl>
            
            <FormControl  borderColor='none' padding='2px' w='200px'>
                <Select size='md' placeholder='Role...' onChange={(event) => setCurrentRole(event.target.options[event.target.selectedIndex].value)}>
                    <option value='Advisor'>Advisor</option>
                    <option value='Consultant'>Consultant</option>
                </Select>
            </FormControl>
            <FormControl  borderColor='none' padding='2px' w='200px'>
                <Select size='md' placeholder='Project...' onChange={(event) => setCurrentProject(event.target.options[event.target.selectedIndex].value)}>
                    {props.projects.projects.map(project => <option key={project} >{project}</option>)}
                </Select>
            </FormControl>    
            {!loaded && <Spinner/>}
            {loaded && <Box align='right' size='100px' padding='2px'>
                <Button onClick={() => getAnswer(message, currentRole, currentProject)} colorScheme='blue' size='md' fontSize='xs'>Send message</Button> 
            </Box>}
        </Flex>
    </VStack>}
    </>
    );
}
export default Chat;