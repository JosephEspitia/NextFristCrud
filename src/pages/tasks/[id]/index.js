import React from "react";
import { useState } from "react";
import Error from "next/error";
import { Grid, Button, Confirm, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function TaskDetail({ task, error }) {
  const { query, push } = useRouter();

  const [isDeliting, setIsDeliting] = useState(false);

  const [confirm, setConfirm] = useState(false);
  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteTask = async () => {
    try {
      const { id } = query;
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setIsDeliting(true);
    await deleteTask();
    close();
    push("/");
  };

  if (error && error.statusCode) {
    return (
      <Error statusCode={error.statusCode} title={error.statusText}></Error>
    );
  }
  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <div>
            <Button color="red" onClick={open} loading={isDeliting}>
              Delete
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Confirm
        header="Please confirm"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      ></Confirm>
    </Grid>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

  if (res.status === 200) {
    const task = await res.json();
    return {
      props: {
        task,
      },
    };
  }
  return {
    props: {
      error: { statusCode: res.status, statusText: "invalid id" },
    },
  };
}
