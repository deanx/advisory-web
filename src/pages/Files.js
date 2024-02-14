import React, { useState, useEffect } from 'react';
import axios from "axios";


import {
  FormControl, Input, Button, Select,
  HStack, VStack, Box, Wrap
} from '@chakra-ui/react';

import {
  StarIcon, DeleteIcon
} from '@chakra-ui/icons'


function Files(props) {
  const [currentProject, setCurrentProject] = useState(null);
  const [files, setFiles] = useState([])

  const [state, setState] = React.useState(new Date());

  const updateProject = async (project) => {
    try {
      const response = await axios.get("http://localhost:8000/projects/" + project + "/files")
      setFiles(response.data.files)
      setCurrentProject(project)
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  const deleteFile = async (id, project, index) => {
    try {
      await axios.delete("http://localhost:8000/aprojects/jsmith/" + project + "/files/" + id)
      files.splice(index, 1)


      setState(new Date());

    } catch (error) {
      console.log(error);
      alert(error)
    }
  }
  const onFileChange = (event) => {
    // Update the state
    setState({
      selectedFile: event.target.files[0],
    });
  };

  // On file upload (click the upload button)
  const onFileUpload = async () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myfile",
      state.selectedFile,
      state.selectedFile.name
    );

    formData.append(
      "name",
      state.selectedFile.name
    );

    formData.append(
      "username",
      "jsmith"
    );

    formData.append(
      "project",
      currentProject
    );
    // Details of the uploaded file
    console.log(formData);

    // Request made to the backend api
    // Send formData object
    try {
      const response = await axios.post("http://localhost:8000/uploadfile", formData);
      files.push([response.data.rowID, "1", "", state.selectedFile.name])
      console.log(response)
      console.log(files)
      setState(new Date());
    } catch (error) {
      alert("error");
      console.log(error);
    }

  };

  const fileData = () => {
    if (state.selectedFile) {
      return (
        <div style={{ display: 'none' }}>
          <h2>File Details:</h2>
          <p>
            File Name:{" "}
            {state.selectedFile.name}
          </p>

          <p>
            File Type:{" "}
            {state.selectedFile.type}
          </p>
          <p>
            File Size:{" "}
            {state.selectedFile.size + " bytes"}
          </p>
          <p>
            Last Modified:{" "}
            {state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>

          </h4>
        </div>
      );
    }
  };



  return (
    <>
      {props.projects.projects && <VStack align='stretch' height='100%'>
        <FormControl borderColor='none' padding='2px' w='200px'>
          <Select size='md' placeholder='Project...' onChange={(event) => updateProject(event.target.options[event.target.selectedIndex].value)}>
            {props.projects.projects.map(project => <option key={project} >{project}</option>)}
          </Select>
        </FormControl>
        {
          files.map((file, counter) => {
            return <Box bgColor='#E5E5E5' key={"box" + counter} color='#666' p={3} fontSize="small" borderRadius='2' marginBottom={2}>
              <HStack key={counter}><StarIcon boxSize={4} marginRight={2} color='orange' />
                <span style={{ width: '400px' }}>{file[3]}</span>
                <DeleteIcon boxSize={4} marginLeft={14} color='red' onClick={() => deleteFile(file[0], currentProject, counter)} />
              </HStack>
            </Box>
          })
        }

      </VStack>}

      <HStack marginTop={"40px"}>
        <Input
          colorScheme='blue' size='md' fontSize='xs'
          type="file"
          onChange={(event) => onFileChange(event)}
          multiple={false}
          w="calc(50%)"
          accept='application/pdf, 
                  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                  application/vnd.openxmlformats-officedocument.presentationml.presentation'
        />
        <Button colorScheme='blue' size='md' fontSize='xs' onClick={() => onFileUpload()}>
          Upload!
        </Button>
      </HStack>
      {fileData()}
    </>
  );
}
export default Files;