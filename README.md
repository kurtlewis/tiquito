# Tiquito Project Charter

## Background
A hackathon is a programming competition that encourages people to learn new things and to build something creative and novel. Because of the explorative nature of hackathons, it is common for participants to have questions and issues throughout the event. While mentors are usually present, it is a challenge to connect teams having issues with mentors with the relevant knowledge. Tiquito is the solution to this. Tiquito is a customer service ticket tracking system designed for hackathons that will allow participants to publish a description of their issue with tags indicating the relevant topics. Mentors will then be able to view issues, assign themselves, and ultimately resolve the issues.

## Scope
This project will:
- Consist of:
    - A website
    - Electron application for use on macOS 10.9 and above, Windows 7 and above, and Linux distributions Ubuntu 12.04 and above, Fedora 21 and above, and Debian 8 and above 
    - Android 6.0 mobile application
- Allow hackathon participants to create a help ticket on the website
- Allow assignment of a mentor to a ticket using the desktop and mobile apps
- Allow mentors to resolve tickets using the desktop and mobile apps
- Allow for participants or mentors to add comments to tickets
- Allow participants to resolve only their own tickets
- Allow for custom theming by deploying party on the website
- Maintain and continue to display resolved tickets for later reference
- Prevent participants from closing others' tickets

This project will not:
- Automatically assign tickets
- Have a login based authentication system
- Encrypt the ticket data
- Prevent outside people with access to the website from creating tickets
- Handle any portion of hackathon registration and check-in
- Provide suggestions for ticket solutions
- Allow for lookup of hackathon participants
- Prevent hackathon mentors from abusing the powers of the desktop and Android applications
- Require a password for organizer and mentor actions on the desktop and Android applications
- Prevent duplicate ticket submissions
- Allow participants to delete their own tickets

## Deliverables
- Server for all applications hosted on Amazon Web Services
- Website with domain tiquito.com hosted with the server
- Source code and installation instructions for Android app
- Source code and installation instructions for Electron app

## Objectives
Tiquito will solve a consistent problem at hackathons, connecting mentors with hackers who need help. Utilizing a familiar IT ticket system, participants will be able to request help from knowledged industry mentors without going to find one, something that has been difficult in the past at hackathons.

## Team
|Name| Role |
|:------|:-------|
|Ken Baker| CEO|
|Chuck Zimmer| CTO|
|Kurt Lewis | Project Manager, Android Developer, Deployment Engineer|
|Laura Tebben|Backend Web Developer, Android Developer|
|Zachary Collins|Desktop Application Developer|
|James Hillman|Frontend UI/UX Developer|
|Zachary Sang|Web Developer|

## Participants
| Stakeholder| Description|
|:-------|:--------|
|Hackathon Participants|Create issues|
|Hackathon Mentors|Network with students and resolve tickets|
|Hackathon Sponsors|Fund the hackathon|
|Hackathon Organizers|Admin privileges to add, modify, resolve tickets as needed|

## Communication
Developers on this project will communicate using a private channel in slack, hosted at acmcincy.slack.com. We will host our project at github.com. Project management will occur using projects and issues on the repo at github.com. We will track hours on a shared google drive spreadsheet.

## Risks
- Team member does not do their work
- Dependency is updated and is no longer compatible/accessible
- Participants don’t want to use our software
- Mentors forget to close tickets

## Benefits
- Expedites and simplifies ticket management for future hackathons 
- Increases the interest of beginning programmers if they can easily receive help with complicated problems
- Provides an easy way for participants to get connected with mentors
- Reduces time taken from a problem arising to finding a solution

## Project Milestones
23 June, 2017 - Solution architecture complete
30 June, 2017 - Server initialized
07 July, 2017 - Backend complete
14 July, 2017 - Website frontend complete
14 July, 2017 - Android app complete
14 July, 2017 - Electron app complete
21 July, 2017 - Solution thoroughly tested and debugged

## Project Budget
Developers are paid $20/hr (good co-op pay)
- 2 hours a week on a group meeting for all five developers
- 6 hours per week on development for all five developers
- 2 hours per week on project management for Kurt Lewis

Total: 42 hours a week of billable time for $840

11 weeks of project for a total of 462 hours for $9,240

- Domain name: $15
- Hosting for duration of development: $20

#### Grand Total: $9,275

## Constraints
- Student scheduling conflicts
- Experience in needed technology, ex. Electron, Android Development
- Time constraint: 11 weeks to complete

## Assumptions
- Only hackathon participants and organizers will create tickets
- The hackathon staff and participants will only have access to their respective clients
- Hackathon organizers will have full access to all functionality
- Participants and mentors will be willing to work with the system
- Mentors will not create tickets for others to handle
- Mentors and organizers will not close tickets before they have been handled by a mentor
- Mentors and organizers will not reassign tickets to other mentors who have not agreed to handle the ticket
