import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/RichTextEditor";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

const CourseTab = () => {
  const [input,setInput]=useState({
    courseTitle:"",
    subTitle:"",
    description:"",
    category:"",
    courseLevel:"",
    coursePrice:"",
    couseThumnail:""
  }) 
  const changeEventHandler = (e) => {
    const{name,value}=e.target;
    setInput({...input,[name]:value})
  };
  const isPublished = false;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to the course here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            {isPublished ? "Unpublished" : "Publish"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={input.courseTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Fullstack Developer"
          />
        </div>
        <div>
          <Label>Subtitle</Label>
          <Input
            type="text"
            name="subTitle"
            value={input.subTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Become a Fullstack Developer from zero to hero in 60 days"
          />
        </div>
        <div>
          <Label>Description</Label>
          <RichTextEditor input={input}setInput={i=setInput}/>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;