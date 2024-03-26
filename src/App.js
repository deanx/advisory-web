import React, { useState, useEffect, useRef } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';

import { API_URL } from './constants';

import {
  ChakraProvider,
  extendTheme,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Image, HStack
} from '@chakra-ui/react';

import Chat from './pages/Chat'
import Projects from './pages/Projects'
import Files from './pages/Files'
import MasterData from './pages/MasterData'
import Login from './pages/Login'

const colors = {
  brand: {
    900: '1a365d',
    800: '153e75',
    700: '2a69ac',
  },
}

const theme = extendTheme({ colors })

function App() {

  
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState({id: '109074701532584190598', email: 'alex@divinocosta.com.br', 
  verified_email: true, name: 'Alex Costa', given_name: 'Alex'});

  useEffect(() => {
    async function fetchProjects() {
      const result = await fetch(API_URL + "/" + profile.id + "/projects");
      const body = await result.json();
      setData(body);
    }
    if(profile) fetchProjects();
  }, [profile]);

  /*

  const setProfile = ""
  const profile = {id: '109074701532584190598', email: 'alex@divinocosta.com.br', 
                verified_email: true, name: 'Alex Costa', given_name: 'Alex'};
                
  async function fetchProjects() {
    const result = await fetch(API_URL + "/" + profile.id + "/projects");
    const body = await result.json();

    return body;
  }

  const [data, setData] = useState([])

  fetchProjects().then((value) => {
    setData(value)
  })
*/

  return (
    <GoogleOAuthProvider clientId="243368007189-tcgllfn35oavp746qicue8cn266q3qu0.apps.googleusercontent.com">
      <ChakraProvider theme={theme}>
        <HStack spacing={8} align='stretch' justify='center'>
          {profile && <Tabs size='lg' w="80%">
          <p style={{textAlign:'right'}}>welcome <span style={{fontWeight:'bold'}}>{profile.name}</span></p>
            <TabList>
              <Tab color="DodgerBlue">Advisory</Tab>
              <Tab color="DodgerBlue">Projects</Tab>
              <Tab color="DodgerBlue">Files</Tab>
              <Tab color="DodgerBlue">Master Data</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Chat projects={data} setdata={setData} profile={profile}/>
              </TabPanel>
              <TabPanel>
                <Projects projects={data} setdata={setData} profile={profile} />
              </TabPanel>
              <TabPanel>
                <Files projects={data} profile={profile} />
              </TabPanel>
              <TabPanel>
                <MasterData projects={data} profile={profile} />
              </TabPanel>
            </TabPanels>
          </Tabs>
          
          }
          
          <Image h='200px' w='200px' p={2} src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" alt="Salesforce logo" width="100" height="100" />
        </HStack>
        {!profile && <Login setProfile={setProfile} />}

      </ChakraProvider>
    </GoogleOAuthProvider >
  );
}

export default App;
