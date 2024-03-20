import React, { useState } from 'react';
import axios from "axios";
import { API_URL } from '../constants';
import {
    FormControl, Input, Button,
    HStack, VStack, Box
  } from '@chakra-ui/react';

import {
  StarIcon, DeleteIcon
} from '@chakra-ui/icons'

function Projects(props) {
    const [newProject, setNewProject] = useState("");

      const [, setState] = React.useState(new Date());

      const deleteProject = async (index, project) =>  {
       props.projects.projects.splice(index, 1)
        try {
          await axios.delete(API_URL + "/projects/" + props.profile.id + "/" + project)
          console.log(API_URL + "projects/" + props.profile.id + "/" + project);
          props.setdata({"projects" : props.projects.projects})
          
          setState(new Date());

          
          
        } catch(error) {
          console.log(error)
          alert('error')
        }              
      }

      const createProject = async() => {
        try {
          await axios.post(
            API_URL + "/projects",
              {
              username: props.profile.id,
              project: newProject 
              }
            );
          props.projects.projects.push(newProject);
          
          props.setdata({"projects" : props.projects.projects})
          
          setNewProject("")
          setState(new Date());
          
        } catch(error) {
          console.log(error);
          alert("Error")
        }
      }

    return (
      
    <>
    {props.projects.projects && <VStack align='stretch' height='100%'>
      {
        props.projects.projects.map((project,counter) => {
          return <Box bgColor='E5E5E5' key={"box" + counter} color='666' p={3} fontSize="small" borderRadius='2' marginBottom={2}>
                    <HStack key={counter}><StarIcon boxSize={4} marginRight={2} color='orange'/>
                    <span style={{width:'400px'}}>{project}</span>
                    <DeleteIcon boxSize={4} marginLeft={14} color='red' onClick={() => deleteProject(counter, project)}/>
                    </HStack>
                  </Box>
        })
      }
    </VStack>}
    <HStack marginTop={10}>
      <FormControl>
        <Input placeholder='Project name...' onChange={(event) => setNewProject(event.target.value)} value={newProject}/>
      </FormControl>
      <Button colorScheme='blue' size='md' fontSize='xs' onClick={() => createProject()}>Create project</Button>
    </HStack>
    </>
    );
}
export default Projects;