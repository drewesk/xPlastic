import "./App.css";

// import NumberFlow, { continuous } from "@number-flow/react";

import {
  Text,
  Card,
  Button,
  HStack,
  Heading,
  Link,
  Input,
} from "@chakra-ui/react";

const App = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Heading
        mb={24}
        as="h1"
        size={{ base: "2xl", md: "3xl", lg: "4xl" }}
        lineHeight="1.1"
        fontWeight="extrabold"
        letterSpacing="-0.02em"
      >
        Xplastic.io
      </Heading>
      <Card.Root mb={20}>
        <Card.Body gap="2">
          <h4>Reduce your exposure to harmful micro-plastics 🔪</h4>
          {/* <NumberFlow plugins={[continuous]} value={120} /> */}
          {/* continuous counter that takes a value and animates as value prop changes */}
          <Card.Title mb="3">Join the mailing List!</Card.Title>
          <HStack>
            <Input autoFocus placeholder="Janedoe@hotmail.com" />
            <Button>Join!</Button>
          </HStack>
          <br />

          <Link
            href="https://dontdie.bryanjohnson.com/"
            isExternal
            _hover={{ textDecoration: "none" }}
          >
            <Button as="span">Don’t Die</Button>
          </Link>
          <br />
        </Card.Body>
      </Card.Root>
      <p>
        Save the <code>Planet</code>
      </p>
      <Text className="copyright">
        {" "}
        © {currentYear} Xplastic.io All rights reserved.
      </Text>
    </>
  );
};

export default App;
