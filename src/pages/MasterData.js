import React, { useState, useEffect } from 'react';
import axios from "axios";


import {
  FormControl, Input, Button, Select,
  HStack, VStack, Box, Wrap, InputGroup, InputLeftAddon
} from '@chakra-ui/react';

import {
  StarIcon, DeleteIcon
} from '@chakra-ui/icons'
import { API_URL } from '../constants';


function MasterData(props) {
  const [currentProject, setCurrentProject] = useState(null);

  const [masterData, setMasterData] = useState({stakeHolders:"", mainChallenge:""});

  return (
    <>
      {props.projects.projects && <VStack align='stretch' height='100%'>
        <FormControl borderColor='none' padding='2px' w='200px'>
          <Select size='md' placeholder='Project...' onChange={(event) => setCurrentProject(event.target.options[event.target.selectedIndex].value)}>
            {props.projects.projects.map(project => <option key={project} >{project}</option>)}
          </Select>
        </FormControl>
      </VStack>}

      <VStack marginTop={"40px"}>
        <InputGroup>
          <InputLeftAddon style={{marginTop:"5px"}} w='calc(20%)'>
            Customer Name
          </InputLeftAddon>
          <Input
            colorScheme='blue'
            type="text"
            w='calc(100%)'
            textAlign={'left'}
          />
          <Button style={{marginTop:"5px", marginLeft:"5px"}}>Save</Button>
        </InputGroup>
        
        <InputGroup>
          <InputLeftAddon style={{marginTop:"5px"}} w='calc(20%)'>
            Main challenge
          </InputLeftAddon>
          <Input
            colorScheme='blue'
            type="text"
            w='calc(100%)'
            defaultValue={"Synergy between different areas globally spread"}
            onChange={(event) => masterData.stakeHolders = event.target.value}
          />
          <Button style={{marginTop:"5px", marginLeft:"5px"}}>Save</Button>
        </InputGroup>

        <InputGroup>
          <InputLeftAddon style={{marginTop:"5px"}} w='calc(20%)'>
            Stakeholders
          </InputLeftAddon>
          <Input
            colorScheme='blue'
            type="text"
            w='calc(100%)'
            textAlign={'left'}
            defaultValue={"John Smith, Beth Collins"}
            onChange={(event) => masterData.stakeHolders = event.target.value}
          />
          <Button style={{marginTop:"5px", marginLeft:"5px"}}>Save</Button>
        </InputGroup>
      </VStack>
      <Button float={"right"} colorScheme='blue' onClick={() => console.log(masterData)}>Fill empty</Button>
    </>
  );
}
export default MasterData;