import { useEffect, useState } from "react";
import NumberFlow, { continuous } from "@number-flow/react";
import {
  Box,
  Button,
  Card,
  HStack,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  Container,
  chakra,
} from "@chakra-ui/react";

export default function App() {
  const [val, setVal] = useState(100);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => setVal(1_111_111), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      minH="100%"
      bgGradient="linear(to-b, gray.900, gray.800)"
      color="white"
    >
      <Container maxW="6xl" py={{ base: 10, md: 16 }}>
        {/* HERO */}
        <Stack align="center" textAlign="center">
          <Heading
            mb={35}
            as="h1"
            color="white"
            size={{ base: "2xl", md: "4xl" }}
            lineHeight="1.1"
            fontWeight="extrabold"
            letterSpacing="-0.02em"
            bgImage="none"
            bgClip="border-box"
          >
            Xplastic.io
          </Heading>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="whiteAlpha.800"
            maxW="3xl"
          >
            Reduce your exposure to harmful micro-plastics 🔪 world-changing
            Tech
          </Text>

          {/* COUNTER CARD */}
          <Card.Root
            rounded="2xl"
            shadow="xl"
            bg="gray.800"
            borderColor="whiteAlpha.200"
            borderWidth="1px"
            p={{ base: 6, md: 8 }}
            w="full"
            maxW="xl"
          >
            <Card.Body gap="4" align="center">
              <Text fontSize="sm" color="whiteAlpha.700">
                Plastics kept out of your routine (lifetime)
              </Text>
              <Heading as="div" size="3xl" letterSpacing="-0.03em">
                <NumberFlow
                  value={val}
                  plugins={[continuous]}
                  format={{ useGrouping: true }}
                />
              </Heading>

              {/* Email capture */}
              <Box as="form" onSubmit={(e) => e.preventDefault()} w="full">
                <Text fontSize="sm" color="whiteAlpha.700" mb="2">
                  Join the mailing list
                </Text>
                <HStack w="full" spacing="3">
                  <Input
                    autoFocus
                    type="email"
                    placeholder="janedoe@hotmail.com"
                    bg="white"
                    color="gray.900"
                    _placeholder={{ color: "gray.500" }}
                  />
                  <Button type="submit" colorScheme="teal">
                    Join
                  </Button>
                </HStack>
              </Box>

              {/* External CTA */}
              <HStack pt="2">
                <Button
                  as={chakra.a}
                  href="https://dontdie.bryanjohnson.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecorationColor: "teal.200" }}
                >
                  Don’t Die
                </Button>
              </HStack>
            </Card.Body>
          </Card.Root>
        </Stack>

        {/* FOOTER */}
        <Stack align="center" mt={{ base: 10, md: 16 }} spacing="3">
          <Text>
            Save the{" "}
            <Text as="span" fontWeight="semibold">
              Planet
            </Text>
          </Text>
          <Text className="copyright" fontSize="sm">
            © {currentYear} Xplastic.io. All rights reserved.
          </Text>
          {/* <Link
            href="mailto:hello@xplastic.io"
            color="teal.300"
            _hover={{ color: "teal.200" }}
          >
            hello@xplastic.io
          </Link> */}
        </Stack>
      </Container>
    </Box>
  );
}
