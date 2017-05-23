# Requirements Document

## Amendment History

|Name|Date of Change| Description of Change|
|:----------------------------------|:--------------|:------------------|
|Kurt Lewis, Laura Tebben, Zachary Collins, James Hillman, Zachary Sang| 23-May-2017|Created|


## Introduction

A hackathon is a programming competition that encourages people to learn new things and to build something creative and novel. Because of the explorative nature of hackathons, it is common for participants to have questions and issues throughout the event. While mentors are usually present, it is a challenge to connect teams having issues with mentors with the relevant knowledge. Tiquito is the solution to this. Tiquito is a customer service ticket tracking system designed for hackathons that allows participants to publish a description of their issue with tags indicating the relevant topics. Mentors will then be able to view issues, assign themselves, and ultimately resolve the issues.


## Scope

This project will:
- Allow hackathon participants to create a help ticket on the website
- Allow assignment of a mentor to a ticket using the desktop and mobile apps
- Allow mentors to resolve tickets using the desktop and mobile apps
- Allow for participants or mentors to add comments to tickets
- Allow participants to resolve only their own tickets
- Allow for custom theming by deploying party on the website
- Maintain and continue to display resolved tickets for later reference

This project will not:
- Automatically assign tickets
- Allow participants to close others’ tickets
- Require participants to login

## Constraints
* Student scheduling conflicts
* Experience in needed technology, ex. Electron, Android Development
* Time constraint: 11 weeks to complete

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

## Instructions

- Requirements are named with RXYYY where X is the project identifier and Y are increasing digits
- Use cases are named with UCXXX where X are increasing digits
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

# Use Cases
## UC001 - Participant Creates a Ticket
#### Actor -> Hackathon Participant
#### Flow of Events
1. Participant clicks on “Create” button on ticket webpage
2. This takes them to a form that has the following fields ( * denotes mandatory):
  *  Creator first name *
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
  * Creator’s Hackathon Registration ID
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

# Requirements