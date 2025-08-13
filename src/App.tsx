import { useEffect, useRef, useState } from "react";
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
  Image,
  Badge,
  Separator,
} from "@chakra-ui/react";
import YouTubePlayer from "react-youtube";

/** 0-deps Parallax (mouse) — sits above video, behind content */
function ParallaxWaves({
  backSrc,
  frontSrc,
  zIndex = 1,
}: {
  backSrc: string;
  frontSrc: string;
  zIndex?: number;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLImageElement | null>(null);
  const frontRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile =
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      window.innerWidth < 640;
    if (prefersReduced || isMobile) return;

    let req = 0;
    let px = 0,
      py = 0; // pointer -1..1
    let tx = 0,
      ty = 0; // eased target
    const friction = 0.08;
    const backAmt = 6;
    const frontAmt = 18;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      px = Math.max(-1, Math.min(1, x));
      py = Math.max(-1, Math.min(1, y));
    };

    const tick = () => {
      tx += (px - tx) * friction;
      ty += (py - ty) * friction;
      if (backRef.current) {
        backRef.current.style.transform = `translate3d(${(
          -tx * backAmt
        ).toFixed(2)}px, ${(-ty * backAmt).toFixed(2)}px, 0)`;
      }
      if (frontRef.current) {
        frontRef.current.style.transform = `translate3d(${(
          tx * frontAmt
        ).toFixed(2)}px, ${(ty * frontAmt).toFixed(2)}px, 0)`;
      }
      req = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove);
    req = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(req);
    };
  }, []);

  return (
    <Box
      ref={wrapRef}
      className="parallax-waves"
      position="absolute"
      inset={0}
      zIndex={zIndex}
      pointerEvents="none"
      overflow="hidden"
      style={{ willChange: "transform" }}
    >
      <Image
        ref={backRef}
        src="https://freesvg.org/img/wave-pattern-tile-arvin61r58.svg"
        alt=""
        loading="lazy"
        pointerEvents="none"
        w="full"
        h="auto"
        objectFit="cover"
        opacity={0.85}
        style={{ willChange: "transform" }}
      />
      <Image
        ref={frontRef}
        src="https://upload.wikimedia.org/wikipedia/commons/0/0a/Great_Wave_off_Kanagawa2.jpg"
        alt=""
        loading="lazy"
        pointerEvents="none"
        w="full"
        h="auto"
        objectFit="cover"
        opacity={0.95}
        style={{ willChange: "transform" }}
      />
    </Box>
  );
}

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

      {/* Header — glass with subtle border */}
      <Box
        as="header"
        position="fixed"
        top="0"
        insetX="0"
        zIndex={4}
        bg="rgba(6,11,18,0.55)"
        backdropFilter="saturate(140%) blur(8px)"
        color="white"
        borderBottomWidth="1px"
        borderColor="whiteAlpha.300"
      >
        <Container maxW="6xl" py={3}>
          <HStack justify="space-between">
            <HStack gap={3}>
              <Box
                w="8"
                h="8"
                rounded="full"
                bgGradient="linear(to-br, teal.300, cyan.400)"
                className="pulse-orb"
              />
              <Heading size="md" letterSpacing="-0.02em">
                Xplastic.io
              </Heading>
            </HStack>

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
              <Button
                colorScheme="teal"
                size="sm"
                className="btn-glow"
                _hover={{ transform: "translateY(-1px)" }}
              >
                Join
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Main content */}
      <Box className="app-root" minH="100dvh" position="relative" color="white">
        <Container maxW="6xl" py={{ base: 20, md: 28 }} position="relative">
          {/* SIDE MASKS (above video, below content) */}
          <Box
            aria-hidden
            position="fixed"
            insetY="0"
            left="0"
            zIndex={-1}
            bg="white"
            w={{ base: "64px", md: "120px" }}
            pointerEvents="none"
          />
          <Box
            aria-hidden
            position="fixed"
            insetY="0"
            right="0"
            zIndex={-1}
            bg="white"
            w={{ base: "64px", md: "120px" }}
            pointerEvents="none"
          />

          {/* Parallax waves */}
          <ParallaxWaves
            backSrc="https://freesvg.org/img/wave-pattern-tile-arvin61r58.svg"
            frontSrc="https://upload.wikimedia.org/wikipedia/commons/0/0a/Great_Wave_off_Kanagawa2.jpg"
            zIndex={1}
          />

          {/* HERO CARD */}
          <Card.Root
            className="card-2 glass pop-up"
            mt={55}
            rounded="2xl"
            shadow="xl"
            borderWidth="1px"
            borderColor="whiteAlpha.300"
            w="full"
            maxW="xl"
            mx="auto"
          >
            <Card.Body p={{ base: 8, md: 12 }}>
              <Stack
                align="center"
                textAlign="center"
                gap={0} // remove if using spacing
              >
                <Heading
                  as="h1"
                  size={{ base: "2xl", md: "4xl" }}
                  mb={0} // remove margin below heading
                  lineHeight="1.08"
                  fontWeight="extrabold"
                  letterSpacing="-0.02em"
                  bgGradient="linear(to-r, cyan.300, teal.200)"
                  bgClip="text"
                >
                  Cut microplastics from your day
                </Heading>

                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="whiteAlpha.900"
                  maxW="40rem"
                  mt={0} // ensure no margin-top either
                >
                  Simple, high-impact habits and gear picks—so you breathe,
                  drink, and eat cleaner without obsessing.
                </Text>

                <Box position="relative" w="full" maxW="xl" mx="auto">
                  {/* COUNTER CARD */}
                  <Card.Root
                    mb={6}
                    className="card-1 glass-strong"
                    rounded="2xl"
                    shadow="xl"
                    borderWidth="1px"
                    borderColor="whiteAlpha.400"
                    p={{ base: 6, md: 8 }}
                    w="full"
                  >
                    <Card.Body gap="4" align="center">
                      <Text fontSize="md" color="whiteAlpha.800">
                        Estimated marine lives lost yearly due to plastic
                        pollution:
                      </Text>

                      <Heading as="h2" size="2xl" letterSpacing="-0.02em">
                        <NumberFlow
                          value={val}
                          plugins={[continuous]}
                          format={{ useGrouping: true }}
                        />
                      </Heading>

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
                          Get the 10-minute starter and ongoing tips
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
                          <Button type="submit" className="btn-primary">
                            Get started
                          </Button>
                        </HStack>
                        <Box
                          aria-live="polite"
                          mt="2"
                          fontSize="sm"
                          color="whiteAlpha.800"
                        />
                      </Box>

                      {/* External CTA (kept minimal, cleaner line) */}
                      <HStack pt="2" gap={3} wrap="wrap" opacity={0.9}>
                        <Text>Longevity reading:</Text>
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

      {/* Footer */}
      <Box
        as="footer"
        position="fixed"
        bottom="0"
        insetX="0"
        zIndex={4}
        bg="rgba(6,11,18,0.65)"
        backdropFilter="saturate(140%) blur(8px)"
        color="white"
        borderTopWidth="1px"
        borderColor="whiteAlpha.300"
      >
        <Container maxW="6xl" py={{ base: 3, md: 4 }}>
          <HStack justify="space-between" wrap="wrap" gap={3}>
            <Text fontWeight="semibold">© {currentYear} Xplastic.io</Text>
            <Text fontSize="sm" opacity={0.85}>
              Clean habits. Clear air. Smarter products.
            </Text>
            <HStack gap={3}>
              <chakra.a href="#about" opacity={0.9} _hover={{ opacity: 1 }}>
                About
              </chakra.a>
              <chakra.a href="#contact" opacity={0.9} _hover={{ opacity: 1 }}>
                Contact
              </chakra.a>
            </HStack>
          </HStack>
        </Container>
      </Box>
    </>
  );
}
