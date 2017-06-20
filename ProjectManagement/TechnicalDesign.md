# Tiquito Technical Design
 
# Revision History
|Name|Date of Change| Description of Change|
|:----------------------------------|:--------------|:------------------|
|Kurt Lewis, Laura Tebben, Zachary Collins, James Hillman, Zachary Sang| 19 June, 2017|Created|
 
# Introduction
Tiquito is an application built for connecting students with mentors and other support options at hackathons. It is a customer service ticket tracking system designed for hackathons that allows participants to publish a description of their issue with tags indicating the relevant topics. Mentors will then be able to view, assign, and resolve the issues.
 
## Solution Description
Our solution uses a Model-View-Controller (MVC) architecture. The Android, Desktop and Web Clients will serve as the view component in this solution, the API class will act as the controller component and the database will serve as the model. Our desktop application will be built using Electron, to allow for cross-platform compatibility. The Android application will be written in Java. Our API will be written in NodeJS using the ExpressJS framework. Additionally, the database will use MongoDB with the Mongoose framework.
 
For development, we will use Visual Studio Code for the desktop and web applications and Android Studio for the Android applications.
 
We will log errors using functionality built into the respective frameworks we are using. This is so that we can have logs that are more descriptive and more reliable.
 
## Development Guidelines
The three different components of the project will follow their appropriate language conventions. 
All projects will adhere to the following conventions:
```
Use four spaces and never tabs for indentation
Each code blocks wrapped with braces
Variable names should be descriptive of use and type
Variable and function names follow camelCase
Class names follow CamelCase
Brackets go on the same line as the start of the block.
```
 
The android project will follow the android and java best practices [outlined by google](https://source.android.com/source/code-style). 
 
Except for where they differ from the above, the [Airbnb javascript style guide](https://github.com/airbnb/javascript) will be followed.
 
The repository will be a single git repo. There will be a folder for each project.
 
Additionally, all projects will follow a git feature branch style of development. All features will be completed on a topic branch. Each project will also use a develop branch, in the style of `web-develop` or `android-develop`. These branches will be merged into master periodically when they are stable.  When the topic branch is ready to merge, it will be rebased on top of the develop branch, and a pull request created for code review. If necessary, the commits in the feature branch will be squashed before being merged. Commits should state `PROJECT - short commit message` to differentiate commits. Longer commit messages should be written in the commit body. Once a commit has been tested, it will be merged into master. Otherwise, the git style guidelines found [here](https://github.com/agis/git-style-guide) will be followed. 
 
## Best practices
Try to keep commits non-breaking once they’re merged into the development branch; do this either through squashing or rebasing. This way any given commit can be reverted without breaking the build.
 
Before merging into master, do a quick round of testing to ensure that there were no regressions due to changes.
 
When making changes to the api, test Electron and Android apps for compatibility, and create a merge topic branch so that all applications work with changes.
 
 
## Assumptions and Constraints
 
List of Assumptions
 
1. It will be assumed that any information to be stored in a database, from both mentors and participants alike, will be of a type that Tiquito’s clients will have no trouble sending to or retrieving from a database. Additionally, the datatype of the submitted information will be compatible with that of the chosen MongoDB infrastructure.
 
2. Due to the technical requirements of modern web components, such as HTML5, it will be assumed that participants using Tiquito’s web client will have Chrome 56 or above, Firefox 61 or above, or Safari 10 or above.
 
3. It will be assumed that all participants using the web client will have disabled any type of “Ad-blocker” or other 3rd party application that may interfere with any functional components of the client.
 
4. It will be assumed that regardless of the type of operating system on which the desktop application is installed, Windows, Mac OS, or Linux, that the client will run properly. Electron, the base of the desktop application, is infrastructure intended for cross platform installation between these three operating systems.
 
List of Dependencies
 
1. Despite the different functions of the Android, Web, and desktop applications, all of them are dependent on access to the program’s MongoDB database. Proper program functionality requires internet access. If the database goes down or the clients are restricted from pulling and pushing information to it, the clients will be unable to retrieve the proper data, preventing the connection of hackathon participants with mentors.
 
2. Proper functionality between the clients is dependent on a unifying format of information. Due to the nature of sharing information between different clients, it is required that all the clients store similarly used information in the database using a common data type. If a client needs to use data stored in the database as a different datatype than the one stored, it will first have to retrieve the information and then convert it to the correct data type. Conversely, if the client wants to store data in the database it must first convert it to the common data type being used for that type of information.
 
3. Proper functionality of Tiquito’s web client will be dependent on the use of a current version of Chrome, Safari, or Firefox. If the web client is viewed using a different browser, not all features will be guaranteed to work.
 
4. Proper functionality of Tiquito’s Android application will be dependent on its installation on Android 6.0 or above. It will be necessary to prevent users without the proper version of android from completing installation.
 
5. Proper functionality of Tiquito’s desktop application will be dependent on its installation on an acceptable operating system. Electron functions on macOS 10.9 and above, Windows 7 and above, and Linux distributions Ubuntu 12.04 and above, Fedora 21 and above, and Debian 8 and above. It is not guaranteed to work on other operating systems.
 
6. Notification features for created or updated tickets will be dependent on access to a working mail server. If Tiquito’s chosen mail server is the feature will be inoperable. This failure will not break Tiquito’s main functions and the application will otherwise continue to work as intended.
 
## Security
PINs will be created with a ticket. Any changes to the ticket after creation through the web interface will need to use a PIN
The Android and Desktop applications will have full access to modifying and deleting tickets, but this will only be available to mentors and organizers
 
|Actor:|Creator (with PIN)| Participant | Mentors/Organizers |
|:----------------------------------|:--------------:|:------------------:|:---------------:|
| Create Ticket | YES | YES | NO|
| Edit Ticket | YES | NO | YES |
| Delete Ticket | NO | NO | YES |
| View Ticket List | YES | YES | YES |
| View Ticket | YES | YES | YES |
| Comment | YES | YES | YES |
 
## Architecture Overview
The high-level architecture of this project will follow an Model-View-Controller style. The desktop, Android and Web clients will serve as the views. Additionally, an API will be serve as a controller that accepts requests from each of the clients and responds with data from the database structured in JSON format. Lastly, the models made in MongoDB will serve as the model component of this architecture.
 
# Technologies and Components
- Model (Used for persistent storage): MongoDB
- View (Used to build user interface): HTML, CSS, Sass, Pug, JavaScript, Java
- Controller (Used to take client requests and return data from DB): NodeJS, ExpressJS
- Developer Environment: Android Studio, Visual Studio Code, Vim
- Runtime Environment: Windows, Linux, Mac, Chrome, Firefox, Electron
- Deployment: Dokku (Docker), Ubuntu
 
# Diagram of Technologies Being Used
[See file TechnologyInteractions.PNG.](TechnologyInteractions.PNG)
 
# Diagram of How Application Components Fit Together
 
[See file DiagramOfHowComponentsFitTogether.JPG.](DiagramOfHowComponentsFitTogether.JPG)

#Diagram of How Classes Fit Together

[See file 'Class Diagram.pdf'](ClassDiagram.pdf)
 
 
Note: Mentors and Organizers have the same access privileges and can each access both the Android and desktop applications
 
# Approach
Our approach is to make this as user-friendly as possible to maximize the number of participants who choose to adopt this system. Because of this, we will not be implementing authentication. Instead, we will impose a rate limit to deter users from creating a lot of spam tickets.
We will use Dokku’s built in logging system to track errors.
 
# Testing
We will implement system testing for the UI. Our developers will manually execute the use cases and end-user work flows and verify everything works as expected. We will write autotests for database queries to ensure we are getting correct results back after each change.
 
## Web Client Architecture
The web client is a tool used by the participants at the hackathon. It is a “basic rights” program capable of creating, resolving, and commenting on tickets. The web address to the client will be distributed to participants at the hackathon. Additionally, the client will require no authentication to eliminate barriers to entry for hackathon participants. Ticket creators using this client will be prompted to create a PIN which will can later be used to resolve their ticket.
 
The web client will be written in HTML, CSS, PUG, and Javascript.
 
The web client has the following objects.

[For the UI mockup for creating a new ticket, see file WebUI/form.tiff](WebUI/Form.tiff)

[For the UI mockup for viewing a list of tickets, see file WebUI/ListView.tiff](WebUI/ListView.tiff)

[For the UI mockup for viewing the landing page for the web client, see file WebUI/MainPage.tiff](WebUI/MainPage.tiff)

[For the UI mockup for viewing a specific ticket's information on the detail page, see file WebUI/Ticket1.tiff](WebUI/Ticket1.tiff)

[For the UI mockup for viewing a tickets comments from the detail view, see file WebUI/Ticket2.tiff](WebUI/Ticket2.tiff)

[For the UI mockup of the 'Resolve Ticket' button on the detail view, see file WebUI/Ticket3.tiff](WebUI/Ticket3.tiff)

[For the UI mockup of the 'Reopen Ticket' button on the detail view, see file WebUI/Ticket3-reopen.tiff](WebUI/Ticket3-reopen.tiff)

[For the UI mockup of the popup for resolving tickets, see file WebUI/ticket-resolve.tiff](WebUI/ticket-resolve.tiff)

[For the UI mockup of the popup for a failed attempt to resolve ticket (invalid PIN), see file WebUI/ticket-resolve-fail.tiff](WebUI/ticket-resolve-fail.tiff)

 
| ListView |
|:-----------:|
| <ul><li>TicketList</li></ul>|
| <ul><li>Select(ticket)</li><li>LoadTickets()</li><li>Sort(criteria)</li><li>Filter(criteria)</li><li>Search(criteria)</li></ul>|
 
|DetailView|
|:-----------:|
| <ul><li>Ticket</li></ul>|
| <ul><li>AddComment(comment)</li><li>ChangeStatus(status,PIN)</li></ul>|
 
|CreateView|
|:-----------:|
| <ul><li>newTicket</li></ul>|
| <ul><li>Create(ticket)</li></ul>|
 
## Desktop Application Architecture
The desktop application is a tool used by mentors and organizers but not participants at the hackathon. It is an administration program feature-equivalent to the Android application. The desktop application will be distributed to mentors and organizers at a hackathon. The desktop application gives users the ability to edit all fields of a ticket except PIN and date. Additionally, the desktop application can be used to permanently delete tickets.
 
The desktop application will be written in HTML, CSS, and JavaScript, using Electron.
 
The desktop application has the following objects.
 
| ListView |
|:-----------:|
| <ul><li>TicketList</li></ul>|
| <ul><li>Select(ticket)</li><li>Load()</li><li>Sort(criteria)</li><li>Filter(criteria)</li><li>Search(criteria)</li></ul>|
 
|DetailView|
|:-----------:|
| <ul><li>Ticket</li></ul>|
| <ul><li>Update()</li></ul>|
 
[For the desktop user interface mockup, see file DesktopView.pdf](DesktopView.pdf)
 
## Android Application Architecture
The Android application is a tool used by mentors and organizers but not participants at the hackathon. It is an administration program feature-equivalent to the desktop application. The Android application will be distributed to mentors and organizers at a hackathon. The Android application gives users the ability to edit all fields of a ticket except PIN and date. Additionally, the Android application can be used to permanently delete tickets.
 
| ListView |
|:-----------:|
| <ul><li>TicketList</li></ul>|
| <ul><li>onCreate(Bundle)</li><li>viewTicket(View)</li><li>Sort(View)</li><li>Filter(View)</li><li>Search(View)</li></ul>|
 
|DetailView|
|:-------------:|
| <ul><li>Ticket</li></ul> |
| <ul><li>onCreate(Bundle)</li><li>openEditView(View)</li></ul>|
 
|EditView|
|:--------------:|
| <ul><li>Ticket</li></ul> |
| <ul><li>onCreate(Bundle)</li><li>submitEdit(View)</li></ul> |
 
[For Android list view UI, see file Android-List-View.pdf.](Android-List-View.pdf) 
 
[For Android detail view UI, see file Android-Individual-View.pdf.](Android-Individual-View.pdf)

## API Architecture
The API component will consist of just one class ‘API’ that will have methods for taking requests and either returning data back from the database component or performing required updates to the database’s persistent data.
 
| API|
|:-----------:|
| <ul><li>The API class will not have any state in itself. Instead, it will only work to return structured Ticket data from the DB to the requesting client.</li></ul>|
|<ul><li>SendTickets(criteria)</li><li>CreateTicket(ticket)</li><li>UpdateTicket(ticket)</li><li>Delete(ticketID)</li></ul>|
 
## Database Architecture
### ER Diagram illustrating the organization of the data for this application
[See file DatabaseERD.JPG](DatabaseERD.JPG)
 
Since MongoDB is non-relational, the weak entities: ‘Creator’ and ‘Comment’ will just be nested objects defined under the Ticket model. While this causes the loss of the ability to join and manipulate entities, because all of the data will be in one structure, we are able to more succinctly and more easily query the data we need. Additionally, because our data model is not overly complex, the manipulations and processing that would be achievable with a relational database are not truly necessary.
 
### Jobs
None - Because hackathons only take place over the span of a weekend, scheduled tasks and jobs will not be needed.
 
### Views
None - Because of the simplicity of our data model, and because our data is to be viewed in the same way by all actors, separate views will not be needed to present different perspectives of the data.
 
### Stored Procedures
- SortTickets(criteria) : This will order a list of tickets based on a criteria such as the creation time or title.
- SearchTickets(criteria) : This will search a list of tickets based on a certain criteria and return matches in order of relevance.
- FilterTickets(criteria) : This will return a list of tickets that match a certain criteria.
 
### Triggers
- Record time of creation on a Ticket: When a user creates a new ticket, a trigger will cause a timestamp to be saved to the Ticket during creation of the database entry.
- Record time of a comment: When a user adds a new comment to a ticket, a trigger will cause a timestamp to be added to the comment object.
- Generate ticketID: This trigger will generate a new unique id for each new ticket
 
### Entities
- Ticket: Stores all data required for a Ticket (See Data Dictionary) including the nested Creator object and a nested list of Comment objects
- Creator: Stores the first name (required), last name, location (required) and contact-info of the creator of each ticket. This object is contained within each Ticket object.
- Comment: Stores the comment text, time and commenter name of each comment added to a ticket. The Ticket object holds a list of these objects.

| Ticket|
|:-----------:|
|<ul><li>ID: String</li><li>Title: String</li><li>Description: String</li><li>Creation time: String</li><li>Tags: List of Strings</li><li>Status: String</li><li>Mentor name: String</li><li>Creator: Creator object</li><li>Comments: List of Comment objects</li><li>PIN: String</li></ul>|
|<ul><li>RecordCreationTime()</li><li>GenerateTicketId()</li><li>UpdateStatus(newStatus,[PIN])</li><li>UpdateMentor(newMentor,[PIN])</li><li>Reopen([PIN])</li><li>AddComment(Comment)</li><li>RemoveComment(Comment)</li><li>UpdateTicket(ticket)</li><li>DeleteTicket()</li><li>GetTickets(criteria)</li></ul>|
 
| Creator|
|:-----------:|
|<ul><li>First name: String</li><li>Last name: String</li><li>Contact info: String</li><li>Location: String</li></ul>|
|<ul><li>The creator will just be an object nested within the Ticket object and therefore does not need methods of its own</li></ul>|
 
| Comment|
|:-----------:|
|<ul><li>CommentText: String</li><li>CommentTime: String</li><li>CommenterName: String</li></ul>|
|<ul><li>RecordCommentTime()</li></ul>|
 
## Network Architecture
 
Tiquito will be hosted on an Amazon EC2 server, pointed to by https://tiquito.com. All of the API endpoints for all three applications will be on https://tiquito.com. Because all of the traffic is through https, the only port used by network traffic is port 443.
 
[For the network architecture diagram, see file NetworkDiagram.png](NetworkDiagram.png)
## Appendix Definitions

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

## Appendix - Data Dictionary:
| Table Name| Attribute Name| Type| Length| Required| Default Value|About| Notes|
|:----------|:--------------|:----|:------|:--------|:-------------|:----|:-----|
|Tickets|TicketID|String|10|Y||A unique string used by the application to identify stored tickets|Auto-generated on creation|
|Tickets|Problem Title|String|30|Y||A one-line description of the ticket||
|Tickets|Problem Description|String|500|N|''|An explanation of the ticket that is longer and more detailed than the Problem Title||
|Tickets|First Name|String|20|Y||First name of the ticket creator||
|Tickets|Last Name|String|30|N|''|Last name of the ticket creator||
|Tickets|Creation Time|String|11|Y||Record of the time the ticket was created/ submitted|Automatically generated on ticket creation. Takes form: 'mm/dd-hh:mm'|
|Tickets|Location|String|50|Y||A description of where the creator and their team are located at the hackathon venue||
|Tickets|PIN|String|4|Y||A passcode to be used by the ticket creator for editing and closing their ticket|Used for closing ticket|
|Tickets|Tags|[String]|15 each|N|[empty string]|A set of keywords that help categorize and describe a ticket|Set of tags used to help identify the problem|
|Tickets|Contact Info|String|50|N|''|Information on how a mentor can contact the creator of the ticket||
|Tickets|Comments|[{String name, String body,  String timestamp}]|900 each|N||Set of comments on the problem||
|Tickets|Status|String|12|Y||The current status of the ticket|"Open","Closed" or "In progress"|
|Tickets|Mentor Name|String|20|N|'None'|The name of the mentor who has claimed the ticket||
 
