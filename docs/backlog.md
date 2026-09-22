# Password Manager — Revised Backlog

This document addresses the instructor feedback: reusable roles, split stories, merged duplicates, and a feature list written as input, activation, action, and output.

## Revised User Stories

1. **Import credentials** — As a logistics coordinator, I want to import a spreadsheet of login credentials so that I do not have to enter every credential manually.
2. **Store credentials** — As a teacher, I want to store my passwords in one secure vault so that I do not have to remember each password individually.
3. **Generate a strong password** — As a password-manager user, I want to generate a strong unique password when creating or updating an account so that I stop reusing weak passwords.
4. **Check password health** — As a password-manager user, I want to see which saved passwords are weak, reused, or overdue for a change so that I can prioritize improving my account security.
5. **Share a credential securely** — As a password-manager user, I want to share a selected credential with an approved person so that they can access a shared account without receiving a password through text or email.
6. **Revoke or expire shared access** — As a logistics coordinator, I want to set an expiration date or revoke access to a shared vendor credential so that temporary access ends when it is no longer needed.
7. **Copy a username or password** — As a logistics coordinator, I want a one-click way to copy a username or password so that I can sign in to vendor portals quickly.
8. **Clear copied credentials** — As a logistics coordinator, I want copied credentials to clear from the clipboard automatically after a short time so that they do not remain available on a shared device.
9. **Tag account risk** — As a teacher, I want to tag accounts by risk level so that the system prioritizes security warnings for sensitive accounts.
10. **Sync the vault across devices** — As a student, I want my saved passwords to sync between my laptop and phone so that I can use my accounts between classes without re-entering credentials.
11. **Remove a lost device** — As a student, I want to remove a lost device’s access to my vault so that my accounts remain protected until I replace it.
12. **Use accessible vault navigation** — As a person with arthritis and limited hand mobility, I want a simple interface with easy-to-select controls so that I can find, copy, and update passwords without painful or complicated navigation.

## Feature List

### F1. Credential Vault
- **Input:** Account name, website or app, username, password, and optional notes.
- **Activation:** User selects **Save credential**.
- **Action:** The application validates the required fields and stores the credential in the user’s encrypted vault.
- **Output:** A confirmation is shown and the saved credential appears in the vault list.
- **Related stories:** 2, 7, 12.

### F2. Spreadsheet Credential Import
- **Input:** A supported spreadsheet/CSV file containing credential fields.
- **Activation:** User selects **Import credentials** and chooses the file.
- **Action:** The application previews, validates, and imports recognized credential rows into the encrypted vault; it reports rows that cannot be imported.
- **Output:** An import summary shows imported and failed rows, and imported entries appear in the vault.
- **Related stories:** 1.

### F3. Strong Password Generator
- **Input:** Requested password length and character options.
- **Activation:** User selects **Generate password** while creating or updating a credential.
- **Action:** The application creates a random password that follows the selected options.
- **Output:** The generated password is displayed and can be saved to the credential entry.
- **Related stories:** 3.

### F4. Password Health Dashboard
- **Input:** Saved credentials and their password metadata.
- **Activation:** User opens the dashboard or saves/imports a credential.
- **Action:** The application evaluates passwords for weakness, reuse, and an overdue-change date.
- **Output:** A prioritized list of affected credentials and the reason for each warning is displayed.
- **Related stories:** 4, 9.

### F5. Secure Credential Sharing
- **Input:** A selected credential, recipient, and optional access-expiration date.
- **Activation:** Owner selects **Share** and confirms the recipient and permissions.
- **Action:** The application grants the recipient access to the selected credential without exposing it through email or text; the owner can later revoke that access.
- **Output:** The owner sees the sharing status and expiration; the recipient sees the shared credential in their vault.
- **Related stories:** 5, 6.

### F6. Clipboard Copy and Auto-Clear
- **Input:** A saved username or password and a clear-after duration.
- **Activation:** User selects the copy control beside the username or password.
- **Action:** The application copies only the selected value, starts the clear timer, and clears it if the clipboard has not changed.
- **Output:** A copy confirmation is shown; a confirmation is shown when the credential is cleared.
- **Related stories:** 7, 8.

### F7. Account Risk Tags
- **Input:** A saved credential and a selected risk level, such as low, medium, or high.
- **Activation:** User saves the risk level on the credential.
- **Action:** The application stores the risk tag and uses it to order password-health warnings.
- **Output:** The credential displays its risk tag and relevant warnings are prioritized accordingly.
- **Related stories:** 9.

### F8. Cross-Device Vault Sync
- **Input:** An authenticated user account and a signed-in device.
- **Activation:** User signs in on an additional device or changes a vault entry.
- **Action:** The application synchronizes encrypted vault changes between authorized devices.
- **Output:** The same current credential list is available on each authorized device.
- **Related stories:** 10.

### F9. Lost-Device Deauthorization
- **Input:** The user’s list of authorized devices and a selected lost device.
- **Activation:** User selects **Remove device access** and confirms.
- **Action:** The application revokes the selected device’s vault session and blocks future synchronization from it.
- **Output:** The device is marked removed and the user receives a confirmation.
- **Related stories:** 11.

### F10. Accessible Vault Interface
- **Input:** User accessibility preferences and vault actions.
- **Activation:** User opens the vault or turns on the accessibility mode.
- **Action:** The application provides clear top-level navigation, large controls, readable contrast, and minimal steps for common actions.
- **Output:** Users can find, copy, and update a credential with fewer precise interactions.
- **Related stories:** 12.

## Suggested Priority Order

| Priority | Feature | Reason |
| --- | --- | --- |
| Must | F1 Credential Vault | Core product capability. |
| Must | F3 Strong Password Generator | Directly addresses password reuse. |
| Must | F4 Password Health Dashboard | Directly addresses weak and reused passwords. |
| Must | F6 Clipboard Copy and Auto-Clear | Supports fast, safer day-to-day use. |
| Should | F2 Spreadsheet Credential Import | Important for Cydney’s migration scenario. |
| Should | F5 Secure Credential Sharing | Supports family and work sharing. |
| Should | F7 Account Risk Tags | Improves health-warning prioritization. |
| Should | F10 Accessible Vault Interface | Meets Snow’s accessibility need. |
| Could | F8 Cross-Device Vault Sync | Valuable but adds synchronization complexity. |
| Could | F9 Lost-Device Deauthorization | Valuable but depends on a device/session system. |

## Notes for the Submission

- The scenario details, such as Cydney working on a warehouse floor or Emily losing a phone, belong in the scenario section—not in the role portion of a user story.
- The generator, health alerts, and credential sharing are intentionally each represented once because multiple personas need them.
- Stories 3, 5, and 12 cover Cydney’s main needs while avoiding combined, untestable stories.


## Jira backlog plan

The instructor wants the Scrum backlog to contain product items only.

- Create 10 epics, one for each feature F1-F10.
- Create the 12 user stories above and link each one to its related epic.
- Do not create separate design, interface, storage, testing, documentation, or security-review tickets in Jira.
- Start the first sprint with the Must-priority features. Keep Should and Could work in the product backlog.
- The humanized Jira-ready content is in `docs/jira/jira-upload.md`. `docs/jira/jira-import.csv` is available if the team needs to import the same backlog again.
