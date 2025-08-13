import { useEffect, useState } from "react";
import NumberFlow, { continuous } from "@number-flow/react";
import {
  Box,
  Button,
  Card,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  Container,
  chakra,
} from "@chakra-ui/react";
import YouTubePlayer from "react-youtube";

export default function App() {
  const [val, setVal] = useState(100000);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => setVal(100000000), 300);
    return () => clearTimeout(timer);
  }, []);

  const opts = {
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      playsinline: 1,
      modestbranding: 1,
      rel: 0,
      loop: 1,
      playlist: "T2FNqfpdHV8",
    },
  };

  return (
    <>
      {/* Background video (non-interactive) */}
      <YouTubePlayer
        className="yt-bg"
        videoId="T2FNqfpdHV8"
        opts={opts}
        onReady={(e) => {
          e.target.setPlaybackRate(0.75);
          e.target.playVideo();
        }}
        onEnd={(e) => e.target.playVideo()}
      />

      {/* Header stays above everything */}
      <Box
        as="header"
        position="fixed"
        top="0"
        insetX="0"
        zIndex={4}
        bg="blue.600"
        color="white"
        borderBottomWidth="1px"
        borderColor="whiteAlpha.300"
        shadow="sm"
      >
        <Container maxW="6xl" py={3}>
          <HStack justify="space-between">
            <Heading size="md">Xplastic.io</Heading>
            <HStack gap={4} display={{ base: "none", md: "flex" }}>
              <Button as={chakra.a} href="#about" variant="link" color="white">
                About
              </Button>
              <Button
                as={chakra.a}
                href="#contact"
                variant="link"
                color="white"
              >
                Contact
              </Button>
              <Button colorScheme="teal" size="sm">
                Join
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Main content sits in its own stacking context */}
      <Box className="app-root" minH="100dvh" position="relative" color="white">
        <Container maxW="6xl" py={{ base: 10, md: 16 }} position="relative">
          {/* SIDE MASKS (above video, below content) */}
          <Box
            aria-hidden
            position="fixed"
            insetY="0"
            left="0"
            zIndex={-1}
            bg="white"
            w={{ base: "80px", md: "120px" }}
            pointerEvents="none"
          />
          <Box
            aria-hidden
            position="fixed"
            insetY="0"
            right="0"
            zIndex={-1}
            bg="white"
            w={{ base: "80px", md: "120px" }}
            pointerEvents="none"
          />

          <Card.Root
            className="card-2"
            mt={55}
            rounded="2xl"
            shadow="xl"
            borderWidth="3px"
            w="full"
            maxW="xl"
            mx="auto"
          >
            {/* HERO */}
            <Card.Body p={{ base: 6, md: 10 }}>
              <Stack align="center" textAlign="center" gap={4}>
                <Heading
                  as="h1"
                  color="white"
                  size={{ base: "2xl", md: "4xl" }}
                  lineHeight="1.1"
                  fontWeight="extrabold"
                  letterSpacing="-0.02em"
                  mb={2}
                >
                  Join the mission!
                </Heading>

                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="whiteAlpha.800"
                  maxW="3xl"
                >
                  Reduce your exposure to harmful micro-plastics 🔪
                </Text>

                <Box position="relative" w="full" maxW="xl" mx="auto">
                  {/* COUNTER CARD */}
                  <Card.Root
                    mb={6}
                    className="card-1"
                    rounded="2xl"
                    shadow="xl"
                    borderWidth="1px"
                    borderColor="whiteAlpha.900"
                    p={{ base: 6, md: 8 }}
                    w="full"
                    maxW="xl"
                  >
                    <Card.Body gap="4" align="center">
                      <Text fontSize="lg" color="whiteAlpha.700">
                        Over{" "}
                        <NumberFlow
                          value={val}
                          plugins={[continuous]}
                          format={{ useGrouping: true }}
                        />{" "}
                        marine animals die each year from plastics.
                      </Text>

                      {/* Email capture */}
                      <Box
                        as="form"
                        onSubmit={(e) => e.preventDefault()}
                        w="full"
                        aria-labelledby="newsletter-title"
                      >
                        <Text
                          id="newsletter-title"
                          fontSize="sm"
                          color="whiteAlpha.700"
                          mb="2"
                        >
                          Join the mailing list
                        </Text>
                        <HStack w="full" spacing="3" align="stretch">
                          <label className="visually-hidden" htmlFor="email">
                            Email address
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@company.com"
                            bg="white"
                            color="gray.900"
                            _placeholder={{ color: "gray.500" }}
                            required
                          />
                          <Button type="submit" colorScheme="teal">
                            Join
                          </Button>
                        </HStack>
                        <Box
                          aria-live="polite"
                          mt="2"
                          fontSize="sm"
                          color="whiteAlpha.800"
                        />
                      </Box>

                      {/* External CTA with flowing underline */}
                      <HStack pt="2" gap={3} wrap="wrap">
                        <Text>Inspired by Bryan Johnson’s</Text>
                        <chakra.a
                          href="https://dontdie.bryanjohnson.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-flow"
                        >
                          Don’t Die
                        </chakra.a>
                      </HStack>
                    </Card.Body>
                  </Card.Root>
                </Box>
              </Stack>
            </Card.Body>
          </Card.Root>
        </Container>
      </Box>

      {/* Footer stays above everything */}
      <Box
        as="footer"
        position="fixed"
        bottom="0"
        insetX="0"
        zIndex={4}
        bg="blue.700"
        color="white"
        borderTopWidth="1px"
        borderColor="whiteAlpha.300"
        shadow="sm"
      >
        <Container maxW="6xl" py={{ base: 4, md: 5 }}>
          <HStack justify="space-between" wrap="wrap" gap={2}>
            <Text fontWeight="semibold">© {currentYear} Xplastic.io</Text>
            <Text fontSize="sm" opacity={0.8}>
              All rights reserved.
            </Text>
            <Text>
              Save the{" "}
              <Text as="span" fontWeight="semibold">
                Planet
              </Text>
            </Text>
          </HStack>
        </Container>
      </Box>
    </>
  );
}
