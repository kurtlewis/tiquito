
# Project Charter

## Background
A hackathon is a programming competition that encourages people to learn new things and to build something creative and novel. Because of the explorative nature of hackathons, it is common for participants to have questions and issues throughout the event. While mentors are usually present, it is a challenge to connect teams having issues with mentors with the relevant knowledge. Tiquito is the solution to this. Tiquito is a customer service ticket tracking system designed for hackathons that will allow participants to publish a description of their issue with tags indicating the relevant topics. Mentors will then be able to view issues, assign themselves, and ultimately resolve the issues.

## Scope
This project will:
- Consist of a website (frontend and backend), desktop application, and mobile application
- Allow hackathon participants to create a help ticket on the website
- Allow assignment of a mentor to a ticket using the desktop and mobile apps
- Allow mentors to resolve tickets using the desktop and mobile apps
- Allow for participants or mentors to add comments to tickets
- Allow participants to resolve only their own tickets
- Allow for custom theming by deploying party on the website
Maintain and continue to display resolved tickets for later reference

This project will not:
- Automatically assign tickets
- Allow participants to close others’ tickets

## Objectives
Tiquito will solve a consistent problem at hackathons, connecting mentors with hackers who need help. Utilizing a familiar IT ticket system, participants will be able to request help from knowledged industry mentors without going to find one, something that has been difficult in the past at hackathons.

## Team
|Name| Role |
|:------|:-------|
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

## Project Milestones
1. Project initialized
2. Basic file structure setup
3. Dev environments setup
4. Web pages created and routed to
5. Backend for creating ticket
6. Web frontend for creating tickets
7. Android frontend for creating tickets
8. Desktop frontend for viewing tickets
9. Backend for resolving tickets
10. Desktop frontend for resolving tickets
11. Android frontend for resolving tickets
12. Backend for commenting on tickets
13. Web frontend for commenting on tickets
14. Android frontend for commenting on tickets
15. Web frontend for resolving tickets
16. Web component complete
17. Deployment of web backend and site
18. Tests for web component complete

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
- Only hackathon participants will create tickets
- The hackathon staff and participants will only have access to their respective clients
- Hackathon organizers will have full access to all functionality
- Participants and mentors will be willing to work with the system
