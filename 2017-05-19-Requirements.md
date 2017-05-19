---
title: Requirements
layout: post
author: zacharysang
permalink: /requirements/
source-id: 1R4t30yRFajL0CDEupEo1qUmOu1v6Z6fEgR-aQ9OYsn4
published: true
---
* Requirement in a requirements document needs:

    * Title

    * Description

    * Unique identifier (number or number-letter identification)

    * Owner

    * Priority (1-3)

    * Change information

        * When created and by whom

        * When updated and by whom

    * Optional info:

        * Pre/post conditions

 

* We need:

    * 4-5 distinct modules

        * Separate document for each?

    * List of requirements separated by functional, non-functional

    * Intro/overview

    * Scope

    * Definitions

    * Actors

    * Use cases

        * Use UML stuff

    * Constraints

# Tiquito Requirements

Functional:

* User must be able to create a ticket on the website

* Any user should be able to browse and search tickets on the website

* Organizer's have full control over ticket data

* Any user should be able to comment on tickets through the website

* Any user must be able to view closed tickets on the website

* Application will encourage/ prompt user to include a solution to the issue when closing a ticket

* All users must be able to optionally leave a name when commenting, claiming a ticket or otherwise taking part in the collaboration process

* Ticket creator must be able to close their own ticket on the website

* Mentor must be able to view an individual ticket on the Android app

* Mentor must be able to view a list of all tickets on the Android app

* Mentor must be able to close a ticket on the Android app

* Mentor must be able to assign a ticket on the Android app

* Mentor must be able to view an individual ticket on the Electron app

* Mentor must be able to view a list of all tickets on the Electron app

* Mentor must be able to close a ticket on the Electron app

* Mentor must be able to assign a ticket on the Electron app

* Mentors must be able to view closed tickets on the Electron app

* The database must store tickets

* Tickets should contain creator name, date of creation, creator location, problem title, problem description, assigned mentor, status [open, closed, in progress], creation PIN for closing, comments on ticket, and tags for the problem

* Handling if database can't find ticket

* Handling when the user doesn't input all information

* Handling when ticket saving fails

* Keep track of PIN number for creator to close ticket

* If user enters wrong data type

* Data served over https

* We will only allow 1 close attempts of a particular ticket every 5 seconds

Non-functional:

* It should take no more than 3 seconds to retrieve a ticket from the database

* The database will be MongoDB

* The UI will be consistent among the website, Android app, and Electron application

* No component of the project will crash when loading a large number of tickets

* The list of tickets must always be up to date

* Website must be usable on desktop and mobile device

## Amendment History

<table>
  <tr>
    <td>Name</td>
    <td>Date of Change</td>
    <td>Description of Change</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>


## Introduction

A hackathon is a programming competition that encourages people to learn new things and to build something creative and novel. Because of the explorative nature of hackathons, it is common for participants to have questions and issues throughout the event. While mentors are usually present, it is a challenge to connect teams having issues with mentors with the relevant knowledge. **_Tiquito_** is the solution to this. Tiquito is a customer service ticket tracking system designed for hackathons that will allow participants to publish a description of their issue with tags indicating the relevant topics. Mentors will then be able to view issues, assign themselves, and ultimately resolve the issues.

## Scope

This project will:

* Allow hackathon participants to create a help ticket on the website

* Allow assignment of a mentor to a ticket using the desktop and mobile apps

* Allow mentors to resolve tickets using the desktop and mobile apps

* Allow for participants or mentors to add comments to tickets

* Allow participants to resolve only their own tickets

* Allow for custom theming by deploying party on the website

* Maintain and continue to display resolved tickets for later reference

This project will not:

* Automatically assign tickets

* Allow participants to close others' tickets

## Definitions

* Web Component: A component of the application that will be accessible through a browser (Mobile or Desktop)

* Mobile Component: A component of the application that will be accessible from a native app on a mobile device

* Desktop Component: A component of the application that will live on a desktop native application

* Closing: An action performed on a ticket that will move it from an active/ open state to a state that archives the issue and its solution

* Assignment: An action performed on a ticket that marks a specific mentor as pursuing a solution to the issue with the creator of the ticket

## Actors

* Participant: A person who is participating in the hackathon who may encounter issues

* Mentor: A person who is at the hackathon to help participants with issues

* Organizer: A person who is part of the group hosting the event

## Instructions

- Requirements are named with RXXX where X are increasing digits

- Priority ranges from 1-3, with 1 being the most important, and 3 being the least important 

## Requirement Template

Copy and paste the below raw markdown when creating a requirement

```

### RXXX - <Title>

#### Priority -> <1-3> 

#### Owner -> <Owner Name>

#### Description 

<Description as formatted markdown goes here> 

```

## Use Case Template

Copy and paste the below raw markdown when creating a use case.

```

### UCXXX - <Title>

#### Actor -> <Actor>

#### Flow of Events

<Flow of events as formatted markdown goes here> 

#### Entry Condition

<Entry condition goes here>

#### Exit Condition

<Exit condition goes here>

```

FROM BOOK SAMPLE - DELETE THIS

![image alt text]({{ site.url }}/public/4vyGG9fYZy8GEXC9fRRTbA_img_0.png)

## Use Cases

* Participant creating a ticket

### UC001 - Participant Creates a Ticket

#### Actor -> Hackathon Participant

#### Flow of Events

1. Participant clicks on "Create" button on ticket webpage

2. This takes them to a form that has the following fields:

Creator first name

Creator last name

Date and time of creation

Creator location in the hackerspace

Problem title

Problem description

Prompt to create a PIN number

Tags for the problem

3. Participant fills out all forms

4. Participant clicks "Submit" button

5. The ticket information is stored in the database

6. The ticket information is displayed on the mobile application and Electron application

#### Entry Condition

A hackathon participant navigates to the Tiquito webpage

#### Exit Condition

A ticket is created and stored in the database

* Person commenting on a ticket

### UC001 - Person comments on a ticket

#### Actor -> Hackathon participant, organizer, or mentor

#### Flow of Events

1. User clicks on a specific ticket from browsing screen

2. This takes them to a page with more details about that ticket

3. They select "Enter a Comment" with optional username (to be stored in cookie)

4. User enters a comment

5. User clicks "OK"

6. The database is updated with the comment

7. The comment displays on the ticket page

#### Entry Condition

User is on the page that displays all the tickets

#### Exit Condition

A comment is associated with that ticket in the database and displays on the page with the ticket details

* Mentors assigning a ticket to themselves

### UC003 - Mentors assigning a ticket to themselves

#### Actor -> Mentor

#### Flow of Events

1. Mentor views ticket with interest in assigning it to themself

2. Mentor checks assignment field if ticket is already assigned

3. If unclaimed and still interested, mentor selects option to claim ticket

4. Mentor confirms claiming ticket

5. Ticket assignment is sent to server to be updated in the DB

6. On DB update, creator of ticket is notified

#### Entry Condition

Mentor is viewing a ticket

#### Exit Condition

Creator of ticket is notified of the change

* Mentor/ Organizer closing a ticket

### UC004 - Mentor/ Organizer closes ticket

#### Actor -> Mentor or Organizer

#### Flow of Events

1. User selects a ticket to close

2. User selects option to close ticket

3. User confirms closing of ticket

4. Ticket is marked as archived

5. Update to ticket status is sent to DB through the backend

#### Entry Condition

Mentor or Organizer is viewing ticket

#### Exit Condition

Mentor or Organizer can view ticket under archived tickets

* Organizer editing a ticket

### UC001 - Organizer edits a ticket

#### Actor -> Hackathon organizer

#### Flow of events

1. Organizer selects and clicks on a specific ticket

2. They choose a field to edit out of:

    1. Creator first name

    2. Creator last name

    3. Creator location in the hackerspace

    4. Problem title

    5. Problem description

    6. PIN

    7. Tags for the problem

3. They click on an "edit" button for the field

4. Field becomes an editable text box

5. They make their desired change to the field

6. They click the "save changes" button or a “cancel” button

7. If "save changes" was selected, the update is made to the ticket page

8. The editable text box becomes uneditable

#### Entry Condition

Organizer is on the page that displays all tickets

#### Exit Condition

If "Save changes" was selected, the ticket is updated in the database. Otherwise, no change is made to the ticket.

* Participant closing their own ticket

### UC001 - Participant closes their own ticket

#### Actor -> Hackathon participant

#### Flow of events

1. Participant clicks on the "close ticket" button

2. The screen updates with a prompt to enter the PIN for the ticket

3. Participant enters the PIN

4. Participant clicks the "submit" button

5. Browser is redirected to ticket page

6. Ticket is displayed with a "Closed" status

#### Entry Condition

Participant is viewing a ticket that they created.

#### Exit Condition

The ticket is marked as closed in the database.

* Person browsing through tickets and selecting one to view

* Mentor reassigning a ticket

* Mentor/ Organizer reopening a ticket

### UCXXX - Reopening a ticket

#### Actor -> Hackathon participant, Mentor, or Organizer

#### Flow of Events

1. User selects a closed ticket that needs was incorrectly resolved.

2. User locates the status drop down.

3. User selects "Open" from the status drop down.

4. User clicks "Save" button to save changes.

#### Entry Condition

A ticket is accidentally closed or it becomes understood that the previous resolution was inadequate. 

#### Exit Condition

The ticket is again visible and marked as "Open"

* Organizer moderating inappropriate comments

### UCXXX - Organizer moderating inappropriate comments

#### Actor -> Organizer

#### Flow of Events

1. An organizer notices an inappropriate comment.

2. The organizer selects the options button on the comment.

3. The organizer selects `delete`.

4. The organizer authenticates and the comment is removed from the database.

#### Entry Condition

`Organizer` is viewing tickets and notices a comment that is inappropriate, possibly due to a api key, password, or Code of Conduct breach.

#### Exit Condition

The comment is successfully deleted and no longer visible to users of the system.

* Mentors and Organizers viewing updating list/dashboard of opening tickets

### UCXXX - Mentors and Organizers viewing ticket dashboard

#### Actor -> Mentors or Organizers

#### Flow of Events

1. A list of tickets is consistently updating as tickets come in.

2. Without interaction the dashboard shows a list of tickets.

3. The mentor identifies a ticket that interests them through a mixture of tags, title, and description.

4. The mentor notes the location.

5. The mentor notes the ticket as "In Progress".

#### Entry Condition

The `Organizer` or `Mentor` stands in front of a monitor.

#### Exit Condition

The actor sees a ticket that interests them, and leaves to attempt to resolve it

## Constraints

* Student scheduling conflicts

* Experience in needed technology, ex. Electron, Android Development

* Time constraint: 11 weeks to complete

