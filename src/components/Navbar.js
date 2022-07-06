import { Menu, Container, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();

  return (
    <Menu inverted borderless >
      <Container>
        <Menu.Item>
          <Link href="/">
            <img src="/favicon.ico"></img>
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              primary
              size="mini"
              onClick={() => router.push("/tasks/new")}
            >
              New Task
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
