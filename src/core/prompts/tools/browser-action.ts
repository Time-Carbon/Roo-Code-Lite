import { ToolArgs } from "./types"

export function getBrowserActionDescription(args: ToolArgs): string | undefined {
	if (!args.supportsComputerUse) {
		return undefined
	}
	return `## browser_action
Description:
- Puppeteer browser interaction rules:
  1. Always start with `launch` and end with `close`
  2. One action per message - wait for screenshot/logs response
  3. To visit new unreachable URL: close → relaunch
  4. Only `browser_action` allowed while browser is open
  5. Resolution: ${args.browserViewportSize} pixels
  6. Click actions:
     - Verify coordinates via screenshot first
     - Target center of elements, not edges
  7. Error handling:
     - Close browser first if fixes needed
     - Use other tools after closing
     - Relaunch to verify fixes
Parameters:
- action: (required) The action to perform. The available actions are:
    * launch: Launch a new Puppeteer-controlled browser instance at the specified URL. This **must always be the first action**.
        - Use with the \`url\` parameter to provide the URL.
        - Ensure the URL is valid and includes the appropriate protocol (e.g. http://localhost:3000/page, file:///path/to/file.html, etc.)
    * hover: Move the cursor to a specific x,y coordinate.
        - Use with the \`coordinate\` parameter to specify the location.
        - Always move to the center of an element (icon, button, link, etc.) based on coordinates derived from a screenshot.
    * click: Click at a specific x,y coordinate.
        - Use with the \`coordinate\` parameter to specify the location.
        - Always click in the center of an element (icon, button, link, etc.) based on coordinates derived from a screenshot.
    * type: Type a string of text on the keyboard. You might use this after clicking on a text field to input text.
        - Use with the \`text\` parameter to provide the string to type.
    * resize: Resize the viewport to a specific w,h size.
        - Use with the \`size\` parameter to specify the new size.
    * scroll_down: Scroll down the page by one page height.
    * scroll_up: Scroll up the page by one page height.
    * close: Close the Puppeteer-controlled browser instance. This **must always be the final browser action**.
        - Example: \`<action>close</action>\`
- url: (optional) Use this for providing the URL for the \`launch\` action.
    * Example: <url>https://example.com</url>
- coordinate: (optional) The X and Y coordinates for the \`click\` and \`hover\` actions. Coordinates should be within the **${args.browserViewportSize}** resolution.
    * Example: <coordinate>450,300</coordinate>
- size: (optional) The width and height for the \`resize\` action.
    * Example: <size>1280,720</size>
- text: (optional) Use this for providing the text for the \`type\` action.
    * Example: <text>Hello, world!</text>
Usage:
<browser_action>
<action>Action to perform (e.g., launch, click, type, scroll_down, scroll_up, close)</action>
<url>URL to launch the browser at (optional)</url>
<coordinate>x,y coordinates (optional)</coordinate>
<text>Text to type (optional)</text>
</browser_action>`
}
