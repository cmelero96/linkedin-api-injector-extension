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
- [ ] Replace fake data with actual API call
- [ ] Catch errors and provide fallback data in case of problems
- [ ] Create basic styling so that the content matches with LinkedIn's theme somewhat
- [ ] Replace the divs with _details_ tags, so the user can click on a non-primitive parameter to collapse it if they're not interested in it
- [ ] Make the panel have maximum height and let user scroll through it, instead of taking up a lot of space if the object received has a lot of fields
- [ ] Find a way to setup unit testing for a Chrome extension
- [ ] Create advanced styling and maybe replace image URLs with the actual image

## Known bugs

- [ ] 01 - The extension doesn't seem to work after creating a new Tab/Window. You need to refresh the page for it to start working normally in all expected scenarios.
