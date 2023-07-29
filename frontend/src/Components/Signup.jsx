import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  useStatStyles,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();

  return (
    <VStack spacing="5px">
      <FormControl>
        <FormLabel></FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
    </VStack>
  );
};

export default Signup;
