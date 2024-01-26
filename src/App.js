import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  extendTheme,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Image, HStack, Box, VStack,
  FormControl, FormLabel, Input, Button,
  Center
} from '@chakra-ui/react';

import Chat from './pages/Chat'
import Projects from './pages/Projects'
import Files from './pages/Files'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

function App() {
  const [loginState, setLoginState] = useState(false);
  
  function setLoginStateFunction() {
    setLoginState(true)
  }

  const [data, setData] = useState([]);

  
  useEffect(() => {
    async function fetchProjects() {
      const result = await fetch("http://localhost:8000/jsmith/projects");
      const body = await result.json();
      setData(body);
    }
    fetchProjects();
  }, []);

  return (
    <ChakraProvider theme={theme}>
     <HStack spacing={8} align='stretch' justify='center'>
     {loginState && <Tabs size='lg' w="80%">
    <TabList>
      <Tab color="DodgerBlue">Advisory</Tab>
      <Tab color="DodgerBlue">Projects</Tab>
      <Tab color="DodgerBlue">Files</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <Chat projects={data}/>
      </TabPanel>
      <TabPanel>
        <Projects projects={data} setdata={setData} />
      </TabPanel>
      <TabPanel>
        <Files projects={data}/>
      </TabPanel>
    </TabPanels>
  </Tabs>}
    <Image h='200px' w='200px' p={2} src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" alt="Salesforce logo" width="100" height="100"/>
    </HStack>
    {!loginState && <Box w='100%' p={4} color='DodgerBlue'>
        <Center>
          <VStack w='50%'>
            <FormControl>
              <FormLabel>User</FormLabel>
              <Input type='email' placeholder='jsmith'/>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder='Password'/>
            </FormControl>
            <FormControl align='right'>
              <Button onClick={() => setLoginStateFunction()} colorScheme='blue' size='md' fontSize='xs'>Login</Button> 
            </FormControl>
          </VStack>
        </Center>
    </Box>}
    </ChakraProvider>
  );
}

export default App;
