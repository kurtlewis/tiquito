# Requirements Document

## Revision History
|Name|Date of Change| Description of Change|
|:----------------------------------|:--------------|:------------------|
|Kurt Lewis, Laura Tebben, Zachary Collins, James Hillman, Zachary Sang|23 May, 2017|Created|
|Zachary Collins, Zachary Sang|19 June, 2017|Add roles, add constraints, add actors to requirements|
|Kurt Lewis, Laura Tebben|19 June, 2017|Add Scenarios|

## Introduction
A hackathon is a programming competition that encourages people to learn new things and to build something creative and novel. Because of the explorative nature of hackathons, it is common for participants to have questions and issues throughout the event. While mentors are usually present, it is a challenge to connect teams having issues with mentors with the relevant knowledge. Tiquito is the solution to this. Tiquito is a customer service ticket tracking system designed for hackathons that allows participants to publish a description of their issue with tags indicating the relevant topics. Mentors will then be able to view issues, assign themselves, and ultimately resolve the issues.

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

## Team
|Name| Role |
|:------|:-------|
|Ken Baker|CEO|
|Chuck Zimmer|CTO|
|Kurt Lewis |Project Manager, Android Developer, Deployment Engineer|
|Laura Tebben|Backend Web Developer, Android Developer|
|Zachary Collins|Desktop Application Developer|
|James Hillman|Frontend UI/UX Developer|
|Zachary Sang|Web Developer|

## Constraints
- Time constraint: 11 weeks to complete
- The Tiquito server will have 100% uptime during any hackathon for which it is used
- Project must be implemented without login-based authentication to prevent barriers to entry
- Ticket submission must allow omitting most fields to expedite submission
- Ticket creators must remember a 4 digit PIN for security

## Definitions

#### Web Component: 
A component of the application that will be accessible through a browser (Mobile or Desktop)

#### Mobile Component: 
A component of the application that will be accessible from a native app on a mobile device

#### Desktop Component:
A component of the application that will live on a desktop native application

#### Closing:
An action performed on a ticket that will move it from an active/ open state to a closed state that archives the issue and its solution

#### Assignment: 
An action performed on a ticket that marks a specific mentor as pursuing a solution to the issue with the creator of the ticket

## Actors

#### Participant:
A person who is participating in the hackathon who may encounter issues

#### Mentor:
A person who is at the hackathon to help participants with issues

#### Organizer: 
A person who is part of the group hosting the event

## Data Dictionary:
| Table Name| Attribute Name| Type| Length| Required| Default Value|About| Notes|
|:----------|:--------------|:----|:------|:--------|:-------------|:----|:-----|
|Tickets|TicketID|String|10|Y||A unique string used by the application to identify stored tickets|Auto-generated on creation|
|Tickets|Problem Title|String|30|Y||A one-line description of the ticket||
|Tickets|Problem Description|String|500|N|''|An explanation of the ticket that is longer and more detailed than the Problem Title||
|Tickets|Creator|{String firstName, String lastName, String location, String contactInfo}|30|Y|''|Object representing the firstName*, lastName, location* and contactInfo of the creator of the ticket||
|Tickets|Creation Time|String|11|Y||Record of the time the ticket was created/ submitted|Automatically generated on ticket creation. Takes form: 'mm/dd-hh:mm'|
|Tickets|Location|String|50|Y||A description of where the creator and their team are located at the hackathon venue||
|Tickets|PIN|String|4|Y||A passcode to be used by the ticket creator for editing and closing their ticket|Used for closing ticket|
|Tickets|Tags|[String]|15 each|N|[empty string]|A set of keywords that help categorize and describe a ticket|Set of tags used to help identify the problem|
|Tickets|Contact Info|String|50|N|''|Information on how a mentor can contact the creator of the ticket||
|Tickets|Comments|[{String name, String body,  String timestamp}]|900 each|N||Set of comments on the problem||
|Tickets|Status|String|12|Y||The current status of the ticket|"Open","Closed" or "In progress"|
|Tickets|Mentor Name|String|20|N|'None'|The name of the mentor who has claimed the ticket||

## Instructions
- Requirements are named with RXYYY where X is the project identifier and Y are increasing digits, forming a unique identifier
- Use cases are named with UCXXX where X are increasing digits, forming a unique identifier
- Priority ranges from 1-3, with 1 being the most important, and 3 being the least important 

### Project Identifiers
|Identifier| Project|
|:---------|:-------|
|0 | application-unspecific|
|1 | Backend|
|2 | Website|
|3 | Desktop|
|4 | Android|

## Requirement Template
Copy and paste the below raw markdown when creating a requirement
```
## RXYYY - <Title>
#### Priority -> <1-3> 
#### Owner -> <Owner Name>
#### Description 
<Description as formatted markdown goes here> 
```

## Use Case Template
Copy and paste the below raw markdown when creating a use case.
```
## UCXXX - <Title>
#### Actor -> <Actor>
#### Flow of Events
<Flow of events as formatted markdown goes here> 
#### Entry Condition
<Entry condition goes here>
#### Exit Condition
<Exit condition goes here>
```

## Scenario Template
Copy and paste the below raw markdown when creating a scenario.
```
## SXXX - <Title>
#### Actor -> <Actor>
#### Flow of events
<Flow of events as formatted markdown goes here>
```

# Use Cases
## UC001 - Participant Creates a Ticket
#### Actor -> Hackathon Participant
#### Flow of Events
1. Participant clicks on “Create” button on ticket webpage
2. This takes them to a form that has the following fields ( * denotes mandatory):
  * Creator first name *
  * Creator last name
  * Date and time of creation *(automatic)
  * Creator location in the hackerspace *
  * Problem title *
  * Problem description
  * 4 digit PIN * (used to close ticket)
  * Tags for the problem
  * Contact info (phone, email, slack)
3. Participant fills out at minimum all required fields
4. Participant clicks “Submit” button
5. The ticket information is stored in the database
6. The ticket information is displayed on the mobile application, Electron application, and website
#### Entry Condition
A hackathon participant navigates to the Tiquito webpage
#### Exit Condition
A ticket is created and stored in the database

## UC002 - Person comments on a ticket
#### Actor -> Hackathon participant, organizer, or mentor
#### Flow of Events
1. User clicks on a specific ticket from browsing screen
2. This takes them to a page with more details about that ticket
3. They click in the comment text box
4. User enters a comment
5. User clicks “OK”
6. The database is updated with the comment
7. The comment displays on the ticket page
#### Entry Condition
User is on the page that displays all the tickets
#### Exit Condition
A comment is associated with that ticket in the database and displays on the page with the ticket details

## UC003 - Mentors assigning a ticket to themselves
#### Actor -> Mentor
#### Flow of Events
1. Mentor selects one ticket from the list of all tickets
2. Mentor checks assignment field to determine if ticket is already assigned
3. If unclaimed and still interested, mentor selects option to claim ticket
4. Mentor enters their name.
5. Mentor confirms claiming ticket
6. Ticket assignment is sent to server to be updated in the DB
7. On DB update, status of ticket is updated to claimed
#### Entry Condition
Mentor is viewing a ticket
#### Exit Condition
Creator of ticket is notified of the change

## UC004 - Mentor/ Organizer closes ticket
#### Actor -> Mentor or Organizer
#### Flow of Events
1. Mentor or Organizer selects a ticket to close
2. Mentor or Organizer clicks button to close ticket
3. Mentor or Organizer confirms closing of ticket
4. Ticket is marked as archived
5. Update to ticket status is sent to DB through the backend
#### Entry Condition
Mentor or Organizer is viewing ticket
#### Exit Condition
Mentor or Organizer can view ticket under archived tickets

## UC005 - Organizer edits a ticket for moderation
#### Actor -> Hackathon organizer
#### Flow of events
1. Organizer selects and clicks on a specific ticket
2. Organizer chooses one of the following fields to edit:
  * Creator first name
  * Creator last name
  * Creator location in the hackerspace
  * Problem title
  * Problem description
  * Tags for the problem
  * Contact info
  * Assigned mentor
3. Organizer clicks on an “edit” button for the field
4. Field becomes an editable text box
5. Organizer makes desired change to the field
6. Oranizer clicks the “save changes” button or a “cancel” button
7. If “save changes” was selected, the update is made to the ticket page and DB
8. The editable text box becomes uneditable
#### Entry Condition
Organizer is on the page that displays all tickets
#### Exit Condition
If “Save changes” was selected, the ticket is updated in the database. Otherwise, no change is made to the ticket.

## UC006 - Participant closes their own ticket
#### Actor -> Hackathon participant
#### Flow of events
1. Participant clicks on the “close ticket” button
2. The screen updates with a prompt to enter the PIN for the ticket
3. Participant enters the PIN
4. Participant clicks the “submit” button
5. If PIN is correct, browser is redirected to ticket page
6. Else Participant is re-prompted for their PIN
7. Ticket is displayed with a “Closed” status
#### Entry Condition
Participant is viewing a ticket that they created.
#### Exit Condition
The ticket is marked as closed in the database.

## UC007 - Browsing and opening ticket for viewing
#### Actor -> Hackathon participant, Mentor, or Organizer
#### Flow of Events
1. Hackathon participant, Mentor, or Organizer selects the “View Tickets” Tab in window
2. New window opens populated with all the tickets submitted to the hackathon
3. The list of tickets shows these fields for each ticket
  * Problem Title
  * Tags
  * Ticket Status
4. Actor selects ticket of his or her choice from list view and clicks “View” button
5. Screen updates to show a new window populated with information regarding the ticket

For Hackathon Participants (Web)
  * Creator’s First Name
  * Creator’s Location at Hackathon
  * Problem Title
  * Problem Description
  * Ticket Status
  * Comments
For Hackathon Mentors and Organizers  (Electron Client and Android app)
  * Creator’s First Name
  * Creator’s Last Name
  * Creator’s Location at Hackathon
  * Problem Title
  * Problem Description
  * Creator’s Ticket PIN
  * Tags for Creator’s Problem
  * Assigned Mentor
  * Ticket Status
  * Comments
#### Entry Condition
An actor, either a member of the hackathon staff or a participant, wishes to browse the current ticket submissions and learn more about one.
####Exit Condition
The actor is successfully able to access the appropriate information from a submitted ticket

## UC008 - Reopening a ticket
#### Actor -> Hackathon participant, Mentor, or Organizer
#### Flow of Events
1. Hackathon participant, Mentor, or Organizer selects a closed ticket that  was incorrectly resolved.
2. Hackathon participant, Mentor, or Organizer clicks the “Open” button.
#### Entry Condition
A ticket is accidentally closed or it becomes understood that the previous resolution was inadequate. 
#### Exit Condition
The ticket is again visible and marked as “Open”

## UC009 - Sorting Tickets
#### Actor -> Hackathon participant, Mentor, or Organizer
#### Flow of Events
1. Hackathon participant, mentor, or organizer is viewing the list of tickets
2. At the top of the page the actor has the ability to sort ticket submissions by
  * Submission Time
  * Title
3. After clicking one of the above buttons the list of tickets will be re-ordered accordingly
#### Entry Condition
An actor is viewing the list of tickets and wants to sort the tickets
#### Exit Condition
The tickets are sorted according to the field chosen by the participant, mentor, or organizer

## UC010 - Filtering Tickets
#### Actor -> Hackathon participant, Mentor, or Organizer
#### Flow of Events
1. Hackathon participant, mentor, or organizer is viewing the list of tickets
2. At the top of the page the actor has the ability to filter ticket submissions by
  * Open Tickets
  * Closed Tickets
  * Both Open and Closed Tickets
3. After clicking buttons corresponding to the options above the list of tickets will be re-populated accordingly
#### Entry Condition
An actor is looking at the list of tickets and wants to see only either open or closed tickets and clicks the filter button responding to what they want.
#### Exit Condition
The actor sees the appropriate tickets only.

## UC011 - Searching Tickets
#### Actor -> Hackathon participant, Mentor, or Organizer
#### Flow of Events
1. Hackathon participant, mentor, or organizer is viewing the list of tickets
2. At the top of the page the actor has the ability to enter a search query in a textbox
3. Once the actor has entered their search, they then press the “Search” button
4. The list of tickets will then be re-populated with any tickets where the search query was found in their title or description
#### Entry Condition
An actor is looking at the list of tickets and wants to find a ticket related to a certain concept and searches for it.
#### Exit Condition
The actor sees a resulting list of tickets related to the topic they searched for.

# Scenarios
## S001 - Javascript Problem
#### Actor -> Noah:Participant, Chris:Mentor
#### Flow of events
1. Noah is at a local hackathon, working hard into the late hours of the night in the corner of the event space. While working on his web application, he runs into a problem where his webserver will not start. He asks his nearby friends for help, but they can't solve the problem.
2. Noah creates a ticket in the Tiquito system. He notes a description of the problem and names it descriptively. He uses tags like javascript, Nodejs, and deployment. He also includes a description of his location, and his username in the event chat room. He creates a simple pin of "5555" so that he can close the ticket if he needs to.
3. Chris, hanging out near the snacks, notices that a new ticket with the tag of "Javascript" has been created on the list in the electron app he's watching on his laptop. Knowing javascript well, he clicks on the detailed view to see if he might be able to help.
4. Chris thinks he may be able to help, so he clicks to claim the ticket as in progress on the electron app.
5. Chris uses the description of the location to walk towards Noah, but having never met Noah before, he does not know what he looks like.
6. Chris uses the contact information Noah included to message him. They find each other, and through a few minutes of debugging, manages to solve the problem.
7. Chris uses the electron app to mark the ticket as closed, and returns to the snack table.

## S002 - Inappropriate Language in a Ticket
#### Actor -> Kurt:Organizer
#### Flow of events
1. Kurt, while browsing the list of open tickets from the Tiquito android app, notices that one of the tickets includes foul language in the title.
2. Kurt looks at the description of the ticket and determines that it is a valid ticket, likely with explicitives included in the title out of frustration.
3. Kurt clicks on the edit button of the ticket, and renames the ticket to not include inappropriate language. Kurt determines that no further steps are necessary.

## S003 - A bored organizer
#### Actor -> Isiah:Organizer
#### Flow of events
1. Isiah has nothing else to do, so he begins browsing for tickets he might be able to assist with on the android app.
2. Isiah is particurarly interested in robotics, so he searches for tickets with the tag "robots."
3. Isiah finds a few tickets, and filters them for time created. He finds one that he thinks he can help with, and uses the android app to mark it as "In Progress".
4. Isiah goes to find the group, and help resolve the ticket.

## S004 - Solving your own problem
#### Actor -> Dominic:Participant
#### Flow of events
1. Dom, while working at a local hackathon, runs into a problem. He has created a website and is trying to save input to a form, but when the form is saved a field is missing. 
2. Dom creates a ticket at the Tiquito website, including a description of the problem, descriptive tags, and a title. He also creats a pin of "4321". 
3. Dom realizes that he forgot to include a simple line to save the data from the form! He changes the ticket status to resolved, using his pin of "4321" to verify closing the ticket.

# Requirements
# Application Unspecific

## R0001 - It should take no more than three seconds to retrieve a ticket from the database (Non-functional)
#### Priority -> 1 
#### Owner -> Kurt Lewis
#### Actor -> Participant, Organizer, Mentor
#### Description
The database must be fast. When viewing the list of tickets in the database, after clicking on the “view ticket” button, it should take no more than three seconds to retrieve and display the ticket from the database. This measurement should not take into account latency and network speed. The lookup and retrieval from the database of the ticket should take no more than three seconds.

## R0002 -The UI will be consistent among the website, Android app, and Electron application (Non-functional)
#### Priority -> 2 
#### Owner -> Kurt Lewis
#### Actor -> Participant, Organizer, Mentor
#### Description
All 3 platforms will use a similar color scheme. The arrangement of data and buttons will be the same on all 3 platforms. Buttons and fields will be named the same on all 3 platforms.

## R0003 - The list of tickets must always be up to date
#### Priority -> 3 
#### Owner -> Kurt Lewis
#### Actor -> Participant, Organizer, Mentor
#### Description
The list of tickets retrieved by any of the Tiquito clients should be continually updated via asynchronous functionality to show the most up to date information possible at any given time with little or no interference with the user’s experience.

## R0004 - User must be able to fluidly use the application without referencing a user manual (Non-functional)
#### Priority -> 2
#### Owner -> Kurt Lewis
#### Actor -> Participant, Organizer, Mentor
#### Description 
The application should be clear to use without the use or need for a user manual or help page. This will be accomplished through the use of placeholder text and clear UI flow. The system will not differ greatly from a traditional IT ticket system, relying on user’s native understanding of such systems for understanding of actions.

# Backend

## R1001 - Tickets must include all required fields and store appropriate information
#### Priority -> 1 
#### Owner -> Laura Tebben
#### Actor -> Participant, Organizer, Mentor
#### Description 
Tickets in the database must include information for required fields such as first name, location at the hackathon, a title for their issue, and a simple 4 digit PIN for resolving their ticket]. Additionally, tickets stored in the database should also contain the time of the ticket’s creation, the assigned mentor (if available), the status of the ticket (“Open”, “Closed”, and “In Progress”), comments on the ticket, and identification tags for the participant’s problem.

## R1002 - Creator of ticket must be notified when a ticket is created or updated
#### Priority -> 3
#### Owner -> Zachary Sang
#### Actor -> Participant
#### Description 
Tiquito should have an email notification system for when a ticket is created and updated. Upon ticket creation, the creator of a ticket will receive an email confirming that a ticket has been created. Then, additional email updates will be sent each time a comment is posted to the ticket, when the ticket is assigned to a mentor, and when the ticket is closed.

## R1003 - All tickets, including closed tickets, must be persisted using a database
#### Priority -> 1
#### Owner -> Laura Tebben
#### Actor -> Participant, Organizer, Mentor
#### Description 
The database should be able to store a reasonable number of tickets. Tickets should be persisted unless explicitly cleared. The database should be able to persist data even if the website or any of the other applications crash. What's more, tickets should be persisted even if in a closed state.

## R1004 - Error handling should be implemented that handles when the database, or a specific ticket, can not be found
#### Priority -> 2
#### Owner -> Zachary Sang
#### Actor -> Participant, Organizer, Mentor
#### Description 
In the event that any of Tiquito’s clients are unable to recall information from the ticket database, the respective clients should be redirected to a “404 page” that can be used by staff to diagnose the problem.

## R1005 - All required ticket fields must be filled out before a ticket can be created
#### Priority -> 1
#### Owner -> Zachary Sang
#### Actor -> Participant
#### Description 
Hackathon participants must fill out the minimum needed information in order to successfully create a ticket. These fields are first name, location at the hackathon, problem title, and the PIN for resolving the ticket.

## R1006 - Ticket’s creators must be able to close their tickets using predetermined PINs
#### Priority -> 1
#### Owner -> Laura Tebben
#### Actor -> Participant
#### Description 
When the hackathon participants create their tickets, they are required to submit a 4 digit PIN. When the hackathon participants move to resolve said tickets, they should be prompted for the PIN they submitted. If the PIN received matches that of the one created earlier the ticket will be successfully closed. If the PINs do not match, the ticket will not be closed.

## R1007 - Ticket submission should protect against attempts to enter the wrong data types
#### Priority -> 1
#### Owner -> Laura Tebben
#### Actor -> Participant, Organizer, Mentor
#### Description 
Item fields, such as PIN number, should not allow hackathon participants to submit inappropriate data types. PIN should only accept an int and block attempts to submit strings or special characters. All other fields filled out by the ticket creator are strings.

## R1008 - Data must be served over https (Non-functional)
#### Priority -> 1
#### Owner -> Kurt Lewis
#### Actor -> Participant, Organizer, Mentor
#### Description 
Any ticket data served over the hackathon network should be handled through https to ensure the security of hackathon participants’ personal information.

## R1009 - The database will be MongoDB (Non-functional)
#### Priority -> 2
#### Owner -> Zachary Sang
#### Actor -> None
#### Description 
The database software used to store all ticket data and other information for this application will be MongoDB. The database will be accessed by the website, and the Android and Desktop applications. The schema-less nature of this database will allow us to be flexible when collecting information. This software will enable us to define our own custom classes of objects that will exist in the database, allowing us to tailor the database’s functionality to our data.

# Website
## R2001 - Participant must be able to create a ticket on the website
#### Priority -> 1 
#### Owner -> Zachary Sang
#### Actor -> Participant
#### Description 
When a hackathon participant navigates to the Tiquito website, they must see a “Create” button to create a ticket.
That button must take them to a page where they must fill out the following fields:  creator name, date of creation, creator location, problem title, problem description, assigned mentor, status [open, closed, in progress], creation PIN for closing, comments on ticket, and tags for the problem.
Once they’ve filled out the fields, they should be able to click “Submit”, which stores the ticket and all its information in the database
The new ticket must then be viewable on the website, the mobile app, and the desktop app

## R2002 - Hackathon participants must be able to view an individual ticket on the website
#### Priority -> 1 
#### Owner -> James Hillman
#### Actor -> Participant
#### Description 
Any user of the website must be able to click on any ticket from the list of all tickets to navigate the the ticket detail view. On clicking any ticket entry from the list of all tickets, they will be navigated to a new page displaying the ticket detail view.

## R2003 - Any user must be able to view (detail view) closed tickets through the website
#### Priority -> 1 
#### Owner -> Zachary Sang
#### Actor -> Participant
#### Description 
When viewing the list of all tickets, clicking the “detail view” button on a ticket should display all of the same details that are displayed on the detail view of an open ticket. These details are:
1. Creator first name
2. Creator last name
3. Date and time of creation
4. Creator location in the hackerspace 
5. Problem title
6. Problem description
7. Tags for the problem
8. Assigned mentor
9. Ticket status

## R2004 - Website detail view must have the following fields: creator first name, creator last name, timestamp, creator location, problem title, problem description, tags, assigned mentor, and ticket status
#### Priority -> 1 
#### Owner -> Zachary Sang
#### Actor -> Participant
#### Description 
When a user selects a ticket to view in detail on the website, they should see the following details:
* Creator first name
* Creator last name
* Date and time of creation
* Creator location in the hackerspace 
* Problem title
* Problem description
* Tags for the problem
* Assigned mentor
* Ticket status

## R2005 - Hackathon participants must be able to view closed (archived) tickets on the website
#### Priority -> 2
#### Owner -> James Hillman
#### Actor -> Participant
#### Description 
On the website, the user must be able to view closed tickets to possibly find help from already closed issues. By default, closed tickets will be prioritized last and will be put at the end of the list of all tickets. Users can find these tickets by navigating to the last entries of the list of all tickets. Alternatively, users will also be able to filter tickets by status to specifically query for closed tickets using the filter functionality in the top bar.

## R2006 - Hackathon participants must be able to view a list of all tickets on the website
#### Priority -> 1 
#### Owner -> James Hillman
#### Actor -> Participant
#### Description 
When a user visits the website, they will be able to view a list of all submitted tickets that are in any status. The list will be paginated to less than 50 items per page to ensure satisfactory performance. Each ticket in the list will be represented as a small card containing the following information:
* Title
* Tags
* Ticket status (open, closed, in progress)

## R2007 - All users should be able to select the “detail view” button associated with a ticket in list view to load the detail view on the website
#### Priority -> 1
#### Owner -> James Jillman
#### Actor -> Participant
#### Description 
When viewing the list of tickets, users should be able to click “detail view” on one ticket, which will take them to a page with details about the selected ticket. See R2YYY for information about which details will be displayed.

## R2008 - All users should be able to search tickets on the website
#### Priority -> 2
#### Owner -> James Hillman
#### Actor -> Participant
#### Description 
When viewing the list of tickets, users should be able to enter a search query in a text box and click “Search.” The result will be the list of tickets that contain their search term.

## R2009 - All users should be able to filter tickets on the website
#### Priority -> 1
#### Owner -> James Hillman
#### Actor -> Participant
#### Description 
When viewing the list of tickets, users should be able to select “Open”, “Closed”, or “Open and Closed” from a dropdown to filter for tickets matching the selected status. The result will be the list of tickets matching the selected status.

## R2010 - All users should be able to sort tickets on the website
#### Priority -> 1
#### Owner -> James Hillman
#### Actor -> Participant
#### Description
When viewing the list of tickets, users should be able to sort tickets according to Submission Time or Title by clicking on the corresponding header cell. The result will be the list of tickets sorted chronologically by time or alphabetically by title. 

## R2011 - Any user must be able to comment on tickets through the website
#### Priority -> 1 
#### Owner -> Zachary Sang
#### Actor -> Participant
#### Description
The detail view of a ticket on the website should have a comments section at the bottom displaying every comment that has been posted to the ticket. There will be a text box along with a “Submit” button at the bottom of the comments section. Typing text in the text box and pressing the “Submit” button should add that comment to the bottom of the comment section.

## R2012 - The website must encourage the participant to write out the solution to a ticket when closing the ticket
#### Priority -> 2
#### Owner -> Zachary Sang
#### Actor -> Participant
#### Description 
When a participant is closing his or her own ticket on the website, the website must encourage the user to write about the solution to the problem described in the ticket. This is so that other participants can reference past tickets to find solutions to their problems. When a participant clicks on the “Close ticket” button, an editable text box with the title “Solution” must appear. The text box will not be a required field. Additionally, “Submit” and “Cancel” buttons will appear.

## R2013 - A participant must be able to close his or her own tickets through the website
#### Priority -> 1 
#### Owner -> Zachary Sang
#### Actor -> Participant
#### Description 
When a ticket is created, one of the required fields is a 4 digit PIN, used to close the ticket. When a participant is closing a ticket, clicking a “Submit” button after clicking the “Close ticket” button will cause a popup box to appear. The popup box will be titled “PIN” and the participant must enter the PIN used to create the ticket, and then hit “Enter.” If an incorrect PIN is entered, the popup box will refresh with an empty PIN field and a message saying the PIN was incorrect. Pressing a “Cancel” button on the popup box will close the box and make no changes to the ticket.

## R2014 - The website should only allow one ticket closure every 5 seconds per user client
#### Priority -> 2
#### Owner -> Zachary Sang
#### Actor -> Participant
#### Description 
For added database security, hackathon participants using the website client should only be allowed to submit one ticket close attempt every 5 seconds. This will cut down on fraudulent attempts to close tickets.

## R2015 - Website functionality must be consistent on desktop and mobile devices (Non-functional)
#### Priority -> 1 
#### Owner -> Zachary Sang
#### Actor -> Participant
#### Description 
All functionality available on the website must be available when the website is viewed through a desktop or mobile device. Following use cases must be available for both desktop and mobile version on the website:
* Create ticket
* Sorting tickets
* Searching tickets
* Selecting and viewing tickets
* Filtering tickets
* Comment on tickets
* Close ticket with PIN

## R2016 - The website will be compatible with Chrome, Firefox and Safari (Non-functional)
#### Priority -> 2
#### Owner -> James Hillman
#### Actor -> Participant
#### Description 
The website will be compatible with Chrome 56, Firefox 61 and Safari 10 (mobile and desktop versions). The website will not use any javascript, styling or html features that are not compatible with these browser versions.

## R2017 - During ticket creation, the UI will monitor if the user's input is valid and give feedback if changes are needed
#### Priority -> 2
#### Owner -> Zachary Sang
#### Actor -> Participant
#### Description 
During ticket creation, if a user puts an invalid entry for one of the fields (Eg: invalid characters in the PIN or Phone number fields), the user will get see an error displayed next to the relevant field and be blocked from submitting the ticket until the errors are corrected and the error messages are removed.

# Desktop

## R3001 - Mentors and organizers must be able to view a list of all tickets on the Electron app
#### Priority -> 1 
#### Owner -> Zach Collins
#### Actor -> Organizer, Mentor
#### Description 
The desktop app should have a list of all tickets. The list of tickets should auto-update when a new ticket is submitted. The list of information for each ticket should include ticket name, tags, and status.

## R3002 - Mentors and organizers must be able to view closed tickets on the Electron app
#### Priority -> 1
#### Owner -> Zach Collins
#### Actor -> Organizer, Mentor
#### Description 
There must be the option to view closed tickets on the electron app. On the list view of all tickets, closed tickets are not excluded unless explicitly done through sorting. Tickets that have a status of “Closed” should be visibly denoted from “Open” or “In Progress” tickets

## R3003 - Mentors and organizers must be able to view an individual ticket on the Electron app
#### Priority -> 1 
#### Owner -> Zach Collins
#### Actor -> Organizer, Mentor
#### Description 
The electron app will have an individual ticket view from the list of all tickets. The individual view should contain displays of fields including creator name, title, description, date, tags, location, status, and assigned mentor. 

## R3004 - The Electron app detail view must have the following fields: creator first name, creator last name, timestamp, creator location, problem title, problem description, tags, contact info, assigned mentor, and ticket status
#### Priority -> 1
#### Owner -> Zach Collins
#### Actor -> Organizer, Mentor
#### Description 
When the detail view is loaded for one ticket, the following fields must be present:
1. Creator first name
2. Creator last name
3. Timestamp
4. Creator location in the hackerspace
5. Problem title
6. Problem description
7. Tags
8. Contact info
9. Assigned mentor
10. Ticket status
(Fields not filled out will be left blank.)

## R3005 - Organizers must be able to edit every field of a ticket except Time of Creation and PIN
#### Priority -> 1 
#### Owner -> Zach Collins
#### Actor -> Organizer, Mentor
#### Description 
Using the desktop or Android clients, organizers must be able to edit any field of a ticket except for the Time of Creation and PIN. On the ticket view page, organizers should be able to select a field. When the field is selected, an “edit” button should appear for the field. After clicking on the edit button, the field should become an editable text box and “Confirm” and “Cancel” buttons should appear. Clicking on “Confirm” will apply the changes; clicking on “Cancel” will revert all changes. Mostly, this feature should be used for moderation. Organizers need to be able to edit tickets to remove inappropriate or hateful text in any field. The time of creation will be automated server-side, so it cannot contain anything inappropriate. The PIN should not be editable, because it is a number personal to the participant who created the ticket.

## R3006 - Mentors and organizers must be able to assign a ticket on the Electron app
#### Priority -> 1
#### Owner -> Zach Collins
#### Actor -> Organizer, Mentor
#### Description 
From the individual view on a ticket, there should be a field to enter a mentor name and a button to assign the ticket. Once the mentor has inputted a name, they can click the button to officially update the ticket to assigned. 

# Android
## R4001 - Mentors and organizers must be able to view an individual ticket on the Android app
#### Priority -> 1
#### Owner -> Laura Tebben
#### Actor -> Organizer, Mentor
#### Description 
Through the Android application, mentors and organizers must be able to click on any ticket from the list of all tickets to navigate the the ticket detail view. On clicking any ticket entry from the list of all tickets, they will be navigated to a new screen displaying the ticket detail view. The detail view should contain the following information:
* Creator first name
* Creator last name
* Date and time of creation
* Creator location in the hackerspace 
* Problem title
* Problem description
* Tags for the problem
* Ticket status

## R4002 - Mentors and organizers must be able to assign a ticket on the Android app
#### Priority -> 1
#### Owner -> Laura Tebben
#### Actor -> Organizer, Mentor
#### Description 
Through the Android App, mentors and organizers must be able to assign a ticket. The user will first need to navigate to the detail view of a specific ticket by selecting a ticket from the list of all tickets. Once the detail view is open, the user will be able to see if the ticket is already claimed, and if so, by whom. If the user wants to continue to claim the ticket, they will be able to select the claim ticket button. On selection of this action, the user will be asked to enter their name and to confirm the claim action (especially when the ticket is already claimed). Once the user has entered their name and confirmed this action, the database will update the status of the ticket to ‘In Progress’. When the database has updated the status of this ticket, the ticket status can be viewed as ‘In Progress’ from the list view and detail view.

## R4003 - Mentors and organizers must be able to close a ticket on the Android app
#### Priority -> 1
#### Owner -> Laura Tebben
#### Actor -> Organizer, Mentor
#### Description 
Through the Android app, mentors and organizers must be able to close any ticket. The user will select a specific ticket to close from the list of all tickets by choosing a ticket and navigating to it’s detail view. The user will then see a ‘Close Ticket’ button if the ticket is in an ‘Open’ or ‘In Progress’ state. Otherwise the button will be greyed out. When the user clicks on the ‘Close Ticket’ button, they will be asked to confirm the close action. If they confirm the action, the ticket will be marked as archived and the state will be updated in the database to ‘Closed’.

## R4004 - Mentors and organizers must be able to view a list of all tickets on the Android app
#### Priority -> 1
#### Owner -> Kurt Lewis
#### Actor -> Organizer, Mentor
#### Description 
Mentors and organizers using the Android app must be able to view a list of all submitted tickets that are in any status. The list will be paginated to less than 50 items at a time to ensure satisfactory performance. Each ticket in the list will be represented as a small card containing the following information:
* Title
* Tags
* Ticket status (open, closed, in progress)

## R4005 - Mentors and organizers must be able to view closed tickets on the Android app
#### Priority -> 1
#### Owner -> Kurt Lewis
#### Actor -> Organizer, Mentor
#### Description 
There must be the option to view closed tickets on the android app. On the list view of all tickets, closed tickets are not excluded unless explicitly done through sorting. Tickets that have a status of “Closed” should be visibly denoted from “Open” or “In Progress” tickets.

## R4006 - Android app will be compatible with Android KitKat and up (Non-functional)
#### Priority -> 1
#### Owner -> Kurt Lewis
#### Actor -> Organizer, Mentor
#### Description 
The Android application will be compatible with devices running Android KitKat (4.4+) as to accommodate a reasonably wide range of users.
