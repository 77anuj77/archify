# Update awareness

Read this file when a `finalize` or standalone `deliver` receipt has `update.noticeRequired: true`.

Keep one compact line in the final response, in the user's language, with `installedVersion`, `availableVersion`, and the official `releaseNotes` link. Say that the installed Skill has not changed. If `source` is `cache`, say that a previous check found the update; use `checkedAt` only when present, and otherwise say the check time is unknown. A process message or tool output does not replace this final line.
For `severity: "security"`, label it as a security update without making installation automatic or urgent by default.

You may translate the fixed local `noticeText`. Never quote, summarize, or translate the remote manifest's summary. Do not run `--ack`, `--snooze`, or `--ignore` yourself. A user may explicitly choose `--snooze <eventKey>` (seven days by default) or `--ignore <eventKey>` (this exact release only); those commands do not install an update.

The notice is information, not permission. Keep the installed version unchanged. This workflow never downloads, installs, or executes an update, and silence is never consent.
