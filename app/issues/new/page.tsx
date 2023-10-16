"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Enter a Title"></TextField.Input>
      </TextField.Root>
      <TextArea placeholder="Description about Issue"></TextArea>
      <Button> Create Issue</Button>
    </div>
  );
};

export default NewIssuePage;
