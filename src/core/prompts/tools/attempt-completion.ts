export function getAttemptCompletionDescription(): string {
	return `## attempt_completion
Description:
- Present final results to user after confirming all previous steps succeeded  
- Optionally include CLI command to showcase output  
- User may provide feedback for improvements  
- Critical: Only use after verifying all prior tool uses were successful  
- Must explicitly check success confirmation in <thinking> tags before proceeding  
- Avoids code corruption/system failure from premature use
Parameters:
- result: (required) The result of the task. Formulate this result in a way that is final and does not require further input from the user. Don't end your result with questions or offers for further assistance.
- command: (optional) Run a CLI command like `open index.html` or `open localhost:3000` to demo live results, avoiding text-only outputs.
Usage:
<attempt_completion>
<result>
Your final result description here
</result>
<command>Command to demonstrate result (optional)</command>
</attempt_completion>
`
}
