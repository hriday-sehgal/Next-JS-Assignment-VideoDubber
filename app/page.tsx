"use client"

import { useState, useRef, useEffect } from "react"
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Textarea,
  Box,
  Paper,
  ColorSwatch,
  SimpleGrid,
  CopyButton,
  Divider,
  Tooltip,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import "@mantine/notifications/styles.css"

// Discord ANSI color codes
const fgColors = [
  { name: "Dark Gray (33%)", code: 30, hex: "#4f545c" },
  { name: "Red", code: 31, hex: "#dc322f" },
  { name: "Yellowish Green", code: 32, hex: "#859900" },
  { name: "Gold", code: 33, hex: "#b58900" },
  { name: "Light Blue", code: 34, hex: "#268bd2" },
  { name: "Pink", code: 35, hex: "#d33682" },
  { name: "Teal", code: 36, hex: "#2aa198" },
  { name: "White", code: 37, hex: "#ffffff" },
]

const bgColors = [
  { name: "Bluish Black", code: 40, hex: "#002b36" },
  { name: "Rust Brown", code: 41, hex: "#cb4b16" },
  { name: "Gray (40%)", code: 42, hex: "#586e75" },
  { name: "Gray (45%)", code: 43, hex: "#657b83" },
  { name: "Light Gray (55%)", code: 44, hex: "#839496" },
  { name: "Blurple", code: 45, hex: "#6c71c4" },
  { name: "Light Gray (60%)", code: 46, hex: "#93a1a1" },
  { name: "Cream White", code: 47, hex: "#fdf6e3" },
]

export default function Home() {
  const [text, setText] = useState("Welcome to Rebane's Discord Colored Text Generator!")
  const [formattedText, setFormattedText] = useState("Welcome to Rebane's Discord Colored Text Generator!")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .mantine-Textarea-root {
        background-color: #2F3136 !important;
        color: #B9BBBE !important;
        border: 1px solid #202225 !important;
      }
      .mantine-Textarea-input {
        background-color: #2F3136 !important;
        color: #B9BBBE !important;
        border: 1px solid #202225 !important;
        font-family: monospace !important;
        font-size: 0.875rem !important;
        line-height: 1.125rem !important;
        white-space: pre-wrap !important;
        outline: none !important;
        padding: 0.5rem !important;
        resize: none !important;
        width: 100% !important;
        min-height: 100px !important;
        border-radius: 5px !important;
        box-sizing: border-box !important;
      }
      .mantine-Button-root {
        background-color: #4f545c !important;
      }
      .mantine-Button-root:hover {
        background-color: #5f646c !important;
      }
      .mantine-Button-root:active {
        background-color: #3f444c !important;
      }
    `
    document.head.appendChild(style)
    return () => style.remove()
  }, [])

  // Initialize with default text
  useEffect(() => {
    updatePreview(text)
  }, [])

  // Apply color to selected text
  const applyColor = (colorCode: number) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    if (start === end) return // No text selected

    const selectedText = text.substring(start, end)
    const coloredText = `\u001b[${colorCode}m${selectedText}\u001b[0m`

    const newText = text.substring(0, start) + coloredText + text.substring(end)
    setText(newText)

    // Update the preview
    updatePreview(newText)
    
    // Restore selection
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start, start + coloredText.length)
    }, 0)
  }

  // Apply bold formatting
  const applyBold = () => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    if (start === end) return // No text selected

    const selectedText = text.substring(start, end)
    const boldText = `\u001b[1m${selectedText}\u001b[0m`

    const newText = text.substring(0, start) + boldText + text.substring(end)
    setText(newText)

    // Update the preview
    updatePreview(newText)
    
    // Restore selection
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start, start + boldText.length)
    }, 0)
  }

  // Apply underline formatting
  const applyUnderline = () => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    if (start === end) return // No text selected

    const selectedText = text.substring(start, end)
    const underlineText = `\u001b[4m${selectedText}\u001b[24m`

    const newText = text.substring(0, start) + underlineText + text.substring(end)
    setText(newText)

    // Update the preview
    updatePreview(newText)
    
    // Restore selection
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start, start + underlineText.length)
    }, 0)
  }

  // Reset all formatting
  const resetAll = () => {
    setText("Welcome to Rebane's Discord Colored Text Generator!")
    updatePreview("Welcome to Rebane's Discord Colored Text Generator!")
  }

  // Update the preview with formatted text
  const updatePreview = (inputText: string) => {
    setFormattedText(inputText)
  }

  // Format the text for display in the preview
  const formatTextForDisplay = (inputText: string) => {
    let formattedHtml = inputText

    // Replace ANSI color codes with spans for display
    // Replace foreground colors
    fgColors.forEach((color) => {
      const regex = new RegExp(`\\u001b\\[${color.code}m(.*?)\\u001b\\[0m`, "g")
      formattedHtml = formattedHtml.replace(regex, `<span style="color: ${color.hex}">$1</span>`)
    })

    // Replace background colors
    bgColors.forEach((color) => {
      const regex = new RegExp(`\\u001b\\[${color.code}m(.*?)\\u001b\\[0m`, "g")
      formattedHtml = formattedHtml.replace(regex, `<span style="background-color: ${color.hex}">$1</span>`)
    })

    // Replace bold
    formattedHtml = formattedHtml.replace(/\u001b\[1m(.*?)\u001b\[0m/g, '<span style="font-weight: bold">$1</span>')

    // Replace underline
    formattedHtml = formattedHtml.replace(
      /\u001b\[4m(.*?)\u001b\[24m/g,
      '<span style="text-decoration: underline">$1</span>',
    )

    return formattedHtml
  }

  return (
    <Container size="md" py="xl" style={{ backgroundColor: "#36393F", minHeight: "100vh" }}>
      <Stack spacing="lg" align="center">
        <Title order={1} align="center" style={{ color: "white" }}>
          Rebane&apos;s Discord{" "}
          <Text component="span" variant="gradient" gradient={{ from: "indigo", to: "blue" }} inherit>
            Colored
          </Text>{" "}
          Text Generator
        </Title>

        <Box w="100%" maw={800}>
          <Title order={2} align="center" size="h3" mb="xs" style={{ color: "white" }}>
            About
          </Title>
          <Text align="center" mb="md" style={{ color: "white" }}>
            This is a simple app that creates colored Discord messages using the ANSI color codes available on the
            latest Discord desktop versions.
          </Text>
          <Text align="center" mb="lg" style={{ color: "white" }}>
            To use this, write your text, select parts of it and assign colors to them, then copy it using the button
            below, and send in a Discord message.
          </Text>
        </Box>

        <Box w="100%" maw={800}>
          <Title order={2} align="center" size="h3" mb="xs" style={{ color: "white" }}>
            Source Code
          </Title>
          <Text align="center" mb="lg" style={{ color: "white" }}>
            This app runs entirely in your browser and the source code is freely available on{" "}
            <Text
              component="a"
              href="https://gist.github.com/rebane2001/07f2d8e80df053c70a1576d27eabe97c"
              style={{ color: "#00AFF4" }}
            >
              GitHub
            </Text>
            . Shout out to{" "}
            <Text
              component="a"
              href="https://gist.github.com/kkrypt0nn"
              style={{ color: "#00AFF4" }}
            >
              kkrypt0nn
            </Text>{" "}
            for {" "}
            <Text
              component="a"
              href="https://gist.github.com/kkrypt0nn/a02506f3712ff2d1c8ca7c9e0aed7c06"
              style={{ color: "#00AFF4" }}
            >
              this guide
            </Text>
          </Text>
        </Box>

        <Box w="100%" maw={800}>
          <Title order={2} align="center" size="h3" mb="md" style={{ color: "white" }}>
            Create your text
          </Title>

          <Group position="center" mb="md">
            <Button variant="default" onClick={resetAll}>
              Reset All
            </Button>
            <Button variant="default" onClick={applyBold}>
              Bold
            </Button>
            <Button variant="default" onClick={applyUnderline}>
              Line
            </Button>
          </Group>

          <Group position="apart" mb="xs">
            <Text weight={700} style={{ color: "white" }}>FG</Text>
            <SimpleGrid cols={8} spacing="xs">
              {fgColors.map((color) => (
                <Tooltip
                  key={color.code}
                  label={color.name}
                  position="top"
                  withArrow
                  transitionProps={{ duration: 200 }}
                  style={{ backgroundColor: "#3BA55D", color: "white", padding: "8px 16px", borderRadius: "3px" }}
                >
                  <ColorSwatch
                    color={color.hex}
                    onClick={() => applyColor(color.code)}
                    style={{ cursor: "pointer", width: "32px", height: "32px" }}
                  />
                </Tooltip>
              ))}
            </SimpleGrid>
          </Group>

          <Group position="apart" mb="md">
            <Text weight={700} style={{ color: "white" }}>BG</Text>
            <SimpleGrid cols={8} spacing="xs">
              {bgColors.map((color) => (
                <Tooltip
                  key={color.code}
                  label={color.name}
                  position="top"
                  withArrow
                  transitionProps={{ duration: 200 }}
                  style={{ backgroundColor: "#3BA55D", color: "white", padding: "8px 16px", borderRadius: "3px" }}
                >
                  <ColorSwatch
                    color={color.hex}
                    onClick={() => applyColor(color.code)}
                    style={{ cursor: "pointer", width: "32px", height: "32px" }}
                  />
                </Tooltip>
              ))}
            </SimpleGrid>
          </Group>

          <Textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              setText(e.currentTarget.value)
              updatePreview(e.currentTarget.value)
            }}
            minRows={5}
            autosize
            mb="md"
            style={{ backgroundColor: "#2F3136", color: "#B9BBBE", border: "1px solid #202225" }}
          />

          <Paper withBorder p="md" style={{ 
            minHeight: "150px", 
            backgroundColor: "#2C2E33", 
            color: "#B9BBBE",
            border: "1px solid #202225",
            borderRadius: "5px",
            fontFamily: "monospace",
            fontSize: "0.875rem",
            lineHeight: "1.125rem",
            whiteSpace: "pre-wrap"
          }}>
            <div dangerouslySetInnerHTML={{ __html: formatTextForDisplay(formattedText) }} />
          </Paper>

          <Group position="center" mt="md">
            <CopyButton value={"```ansi\n" + formattedText + "\n```"}>
              {({ copied, copy }) => (
                <Button
                  color={copied ? "teal" : "blue"}
                  onClick={() => {
                    copy()
                    notifications.show({
                      title: "Copied!",
                      message: "Text copied to clipboard",
                      color: "teal",
                    })
                  }}
                >
                  {copied ? "Copied!" : "Copy text as Discord formatted"}
                </Button>
              )}
            </CopyButton>
          </Group>
        </Box>

        <Divider my="md" w="100%" color="#202225" />

        <Box w="100%" maw={800} mt="xl">
          <Text size="sm" style={{ color: "#FFF" }} ta="center">
          This is an unofficial tool, it is not made or endorsed by Discord.
          </Text>
        </Box>
      </Stack>
    </Container>
  )
}
