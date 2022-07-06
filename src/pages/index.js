import { Button, Card, Container, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useRouter } from "next/router";
import Link from "next/link";

export default function homePage({ tasks }) {
  const router = useRouter();
  if (tasks.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{height:"80vh"}}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are not task yet</h1>
            <img
              src="https://img.freepik.com/vector-gratis/ningun-concepto-ilustracion-datos_108061-573.jpg?size=338&ext=jpg"
              alt="no tasks"
            />
            <div>
              <Button primary>
                Create a Task
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  //render a list of task

  return (
    <Container style={{padding: "20px"}}>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>
                <Link href={`/${task._id}`}>
                  <a>{task.title}</a>
                </Link>
              </Card.Header>
              <p>{task.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button primary onClick={()=> router.push(`/tasks/${task._id}`)}>View</Button>
              <Button primary onClick={()=> router.push(`/tasks/${task._id}/edit`)}>Edit</Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return {
    props: {
      tasks,
    },
  };
};
