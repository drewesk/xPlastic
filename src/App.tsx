import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Button, HStack, Heading, Link } from "@chakra-ui/react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Heading
        as="h1"
        size={{ base: "2xl", md: "3xl", lg: "4xl" }}
        lineHeight="1.1"
        fontWeight="extrabold"
        letterSpacing="-0.02em"
      >
        Xplastic.io
      </Heading>
      <h4>Rid your life of harmful micro-plastics 🔪</h4>
      <HStack>
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <Button
          as={Link}
          href="https://dontdie.bryanjohnson.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Don’t Die
        </Button>

        <Button>Click me</Button>
        <Button>Click me</Button>
      </HStack>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
