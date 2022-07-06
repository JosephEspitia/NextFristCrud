import { Button, Form, Grid } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TaskFormPage() {
  const router = useRouter();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState({
    title: "",
    description: "",
  });

  const validate = () => {
    const error = {};

    if (!newTask.title) error.title = "title is required";
    if (!newTask.description) error.description = "description is required";
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = validate();
    if (Object.keys(error).length) return setError(error);
    if (router.query.id) {
      await updateTask();
    } else {
      await createTask();
    }
    await router.push("/");
  };

  const createTask = async () => {
    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    try {
      await fetch("http://localhost:3000/api/tasks/" + router.query.id, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  };

  const getTask = async () => {
    const res = await fetch(
      "http://localhost:3000/api/tasks/" + router.query.id
    );
    const data = await res.json();
    setNewTask({ title: data.title, description: data.description });
  };
  useEffect(() => {
    if (router.query.id) getTask();
  }, []);

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{router.query.id ? "Update Task" : "Create Task"}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Title"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              error={
                error.title ? { content: error.title, pointing: "below" } : null
              }
              value={newTask.title}
            ></Form.Input>
            <Form.TextArea
              label="Description"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              error={
                error.description
                  ? { content: error.description, pointing: "below" }
                  : null
              }
              value={newTask.description}
            ></Form.TextArea>
            <Button primary>{router.query.id ? "Update":"Create"}</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
