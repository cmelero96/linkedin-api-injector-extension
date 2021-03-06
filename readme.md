# API Injector for LinkedIn Profiles

This is a simple Chrome extension that makes a call to https://randomuser.me/api whenever we open a Linkedin User profile and displays the results on the profile, under the main panel.

## How to use

- If you don't have it already, [install Git](https://github.com/git-guides/install-git).
- Use the command `git clone https://github.com/cmelero96/linkedin-api-injector-extension.git` to download a local copy
- Alternatively to using Git, you can download a local copy from the repo's main page, by clicking on the _Code_ button and selecting _Download ZIP_. Or just follow [this link](https://github.com/cmelero96/linkedin-api-injector-extension/archive/refs/heads/develop.zip).
- After downloading a copy of the repo, go to Chrome and type `chrome://extensions`.
- Make sure you have the Developer's Mode enabled, and select `Load Unpacked`.
- Navigate to the repo's root folder and select it.
- Go to any [LinkedIn](https://www.linkedin.com/) user profile to see the results!

## TODO

- [x] Get an initial working version using fake data
- [x] Replace fake data with actual API call
- [x] Catch errors and provide fallback data in case of problems
- [x] Create basic styling so that the content matches with LinkedIn's theme somewhat
- [x] (Discarded for clunkyness; see next point) Replace the divs with _details_ tags, so the user can click on a non-primitive parameter to collapse it if they're not interested in it
- [x] Replace the divs with _ul_ and _li_ tags because they make much more sense semantically than _details_.
- [x] (Discarded - irrelevant considering next point) Make _ul_ elements be collapsable on click, and highlighted on hover.
- [x] Make the panel have maximum height and let user scroll through it, instead of taking up a lot of space if the object received has a lot of fields
- [ ] Find a way to setup unit testing for a Chrome extension

## Known bugs

- [x] 01 - The extension doesn't seem to work after creating a new Tab/Window. You need to refresh the page for it to start working normally in all expected scenarios.
