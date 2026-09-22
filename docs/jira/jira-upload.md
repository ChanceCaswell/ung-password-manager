# Jira upload backlog

Only product features and user stories belong in this Scrum backlog. Do not create implementation-task tickets.

## Epics

### F1 Credential vault
Priority: Highest

Input: Account name, website or app, username, password, and optional notes.
Activation: The user selects Save credential.
Action: The app checks the required fields and stores the credential in the user's encrypted vault.
Output: The user sees a confirmation and the credential appears in the vault list.

### F2 Spreadsheet credential import
Priority: Medium

Input: A supported spreadsheet or CSV file with credential fields.
Activation: The user selects Import credentials and chooses a file.
Action: The app previews and checks the rows, imports the ones it recognizes into the encrypted vault, and reports rows it cannot import.
Output: The user sees how many rows were imported or rejected, and the imported credentials appear in the vault.

### F3 Strong password generator
Priority: Highest

Input: The requested password length and character options.
Activation: The user selects Generate password while adding or editing a credential.
Action: The app creates a random password that matches the selected options.
Output: The generated password is shown and can be saved with the credential.

### F4 Password health dashboard
Priority: Highest

Input: Saved credentials and password details.
Activation: The user opens the dashboard or saves or imports a credential.
Action: The app checks for weak, reused, and overdue passwords.
Output: The user sees affected credentials in priority order, with a reason for each warning.

### F5 Secure credential sharing
Priority: Medium

Input: A selected credential, recipient, and optional access end date.
Activation: The owner selects Share and confirms the recipient and permissions.
Action: The app gives the recipient access without sending the password through email or text. The owner can later remove that access.
Output: The owner sees the sharing status and end date. The recipient sees the shared credential in their vault.

### F6 Clipboard copy and auto-clear
Priority: Highest

Input: A saved username or password and a clear-after time.
Activation: The user selects the copy control beside the username or password.
Action: The app copies only the selected value, starts a timer, and clears it if the clipboard has not changed.
Output: The user sees a copy confirmation and a notice when the copied credential is cleared.

### F7 Account risk tags
Priority: Medium

Input: A saved credential and a selected risk level such as low, medium, or high.
Activation: The user saves the risk level on the credential.
Action: The app stores the tag and uses it to sort password-health warnings.
Output: The credential shows its risk tag and warnings for higher-risk accounts appear first.

### F8 Cross-device vault sync
Priority: Low

Input: An authenticated account and a signed-in device.
Activation: The user signs in on another device or changes a vault entry.
Action: The app syncs encrypted vault changes between approved devices.
Output: Each approved device shows the current credential list.

### F9 Lost-device deauthorization
Priority: Low

Input: The user's authorized-device list and a selected lost device.
Activation: The user selects Remove device access and confirms.
Action: The app ends the selected device's vault session and stops future sync from it.
Output: The device is marked removed and the user sees a confirmation.

### F10 Accessible vault interface
Priority: Medium

Input: The user's accessibility preferences and vault actions.
Activation: The user opens the vault or turns on accessibility mode.
Action: The app uses clear navigation, large controls, readable contrast, and short paths for common actions.
Output: The user can find, copy, and update a credential with less precise hand movement.

## Stories

### Import credentials
Parent epic: F2 Spreadsheet credential import
Priority: Medium

As a logistics coordinator, I want to import a spreadsheet of login credentials so that I do not have to enter every credential manually.

Acceptance criteria:
- A user can choose a supported CSV or spreadsheet file.
- The app shows a preview before importing recognized rows.
- The import result lists imported rows and rows that need attention.

### Store credentials
Parent epic: F1 Credential vault
Priority: Highest

As a teacher, I want to store my passwords in one secure vault so that I do not have to remember each password individually.

Acceptance criteria:
- A user can save an account name, site or app, username, and password.
- A saved credential appears in the vault list.
- The app tells the user when required information is missing.

### Generate a strong password
Parent epic: F3 Strong password generator
Priority: Highest

As a password-manager user, I want to generate a strong unique password when creating or updating an account so that I stop reusing weak passwords.

Acceptance criteria:
- A user can choose a password length and character options.
- The generated password matches the selected options.
- The user can save the generated password with a credential.

### Check password health
Parent epic: F4 Password health dashboard
Priority: Highest

As a password-manager user, I want to see which saved passwords are weak, reused, or overdue for a change so that I can prioritize improving my account security.

Acceptance criteria:
- The dashboard identifies weak passwords.
- The dashboard identifies reused passwords.
- Each warning explains why the credential needs attention.

### Share a credential securely
Parent epic: F5 Secure credential sharing
Priority: Medium

As a password-manager user, I want to share a selected credential with an approved person so that they can access a shared account without receiving a password through text or email.

Acceptance criteria:
- The owner can select a credential and an approved recipient.
- The recipient can see the shared credential in their vault.
- The password is not sent through text or email.

### Revoke or expire shared access
Parent epic: F5 Secure credential sharing
Priority: Medium

As a logistics coordinator, I want to set an expiration date or revoke access to a shared vendor credential so that temporary access ends when it is no longer needed.

Acceptance criteria:
- The owner can set an end date when sharing a credential.
- The owner can remove a recipient's access before the end date.
- The owner can see whether access is active, expired, or removed.

### Copy a username or password
Parent epic: F6 Clipboard copy and auto-clear
Priority: Highest

As a logistics coordinator, I want a one-click way to copy a username or password so that I can sign in to vendor portals quickly.

Acceptance criteria:
- A copy control is available for both the username and password.
- Copying one value does not copy the other value.
- The app confirms that the selected value was copied.

### Clear copied credentials
Parent epic: F6 Clipboard copy and auto-clear
Priority: Highest

As a logistics coordinator, I want copied credentials to clear from the clipboard automatically after a short time so that they do not remain available on a shared device.

Acceptance criteria:
- The user can set or use a clear-after time.
- The app clears a copied credential after that time when the clipboard has not changed.
- The user sees a notice when the copied credential is cleared.

### Tag account risk
Parent epic: F7 Account risk tags
Priority: Medium

As a teacher, I want to tag accounts by risk level so that the system prioritizes security warnings for sensitive accounts.

Acceptance criteria:
- A user can choose a low, medium, or high risk tag for a credential.
- The saved tag is visible on that credential.
- Higher-risk accounts appear before lower-risk accounts in health warnings.

### Sync the vault across devices
Parent epic: F8 Cross-device vault sync
Priority: Low

As a student, I want my saved passwords to sync between my laptop and phone so that I can use my accounts between classes without re-entering credentials.

Acceptance criteria:
- A signed-in user can approve another device.
- A vault change on one approved device appears on another approved device.
- Only approved devices receive vault updates.

### Remove a lost device
Parent epic: F9 Lost-device deauthorization
Priority: Low

As a student, I want to remove a lost device's access to my vault so that my accounts remain protected until I replace it.

Acceptance criteria:
- A user can see their authorized devices.
- A user can remove one selected device after confirmation.
- A removed device cannot start new vault sync.

### Use accessible vault navigation
Parent epic: F10 Accessible vault interface
Priority: Medium

As a person with arthritis and limited hand mobility, I want a simple interface with easy-to-select controls so that I can find, copy, and update passwords without painful or complicated navigation.

Acceptance criteria:
- The vault has clear top-level navigation and large controls.
- Text and controls have readable contrast.
- A user can find, copy, and update a credential without a long series of precise actions.
