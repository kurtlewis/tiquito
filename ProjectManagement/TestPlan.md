# Tiquito Test Plan
# Revision History
| Name | Date of Change | Description of Change |
| :------: | :--------------------: | :----------------------------: |
| Kurt Lewis, James Hillman, Zachary Sang, Zach Collins, Laura Tebben | 18 July, 2017 | Created |
# Introduction
## Overview
This document describes the various tests and testing procedures for testing the tiquito suite of applications, includings its web, server, desktop, and android components. It includes descriptions of testing strategy, execution strategy, and test management.
## Audience
* Team members will both write and execute tests.
* The project manager will work on assigning tests and ensuring results are acceptable.
* Team members will reference the document when triaging and rectifying [issues](https://github.com/kurtlewis/tiquito/issues).
# Test Strategy
## Test Objectives
The objective of this testing plan is to ensure that the functionality of the Tiquito suite of software works according to the specifications and requirements laid out during design. This document will highlight issues and defects with the software, allowing for the prioritizing of issues as they fail specific test cases. Running these tests will ensure that Tiquito is a fully functional software product.
## Test Assumptions
* Production like data will be available for testing
* An issue will be filed on [github](https://github.com/kurtlewis/tiquito/issues) for all test failures.
* Testing will not affect production or testing environment uptime.
* Testers have adequate knowledge of the system, its requirements, and design.
* Kurt Lewis will be responsible for maintaining the testing environment at https://test.tiquito.com.
* Test case design activities will be performed by the development team.
* Performance testing is not considered in this test plan.
## Test Principles
* To ensure requirements are satisfied in an acceptable and expectable manner
* To help identify the appearance of new defects and their causes
* Testing will reduce the impact that defects have on the rest of the system
* Different stages of testing will incrementally grow closer to emulating a production environment
* Testing will include unit tests as a repeatable and measurable metric for quality 
* Tests will help to describe and enforce expected behavior of the system

## Test Scope
### Exploratory Testing
#### Purpose
Identify major defects and deviations from expected results during development before integration with other developers’ work
#### Scope
All newly developed code
#### Testers
Developers of new functionality
#### Method
* Triggering added functionality and checking for an expected result
* Triggering related functionality and checking for expected result
#### Timing
During development. After adding new functionality, before merging it with the stable or development branch

### Unit Testing
#### Purpose
To create and run repeatable tests on the API during different stages of development to ensure consistently expected functionality at various stages of the development process
#### Scope
API component of the system
#### Testers
API developers will write the unit tests. Tests will be run during a build of the production server
#### Method
On a push to a master branch, as a part of the build process, the unit tests will be run. All tests must be successful for the server to build successfully.
#### Timing
On push to a master branch before deployment

### Beta Testing
#### Purpose
To perform usability testing with a group of end-users. To collect information about missed defects and overlooked parts of the design that affect usability and functionality.
#### Scope
Fully integrated system
#### Testers
Group of potential end-users
#### Method
Make the system available to a group of possible end-users and collect feedback from them via a dedicated email address
#### Timing
After other testing has been completed and the system is ready for a Beta release
# Execution Strategy
## Entry and Exit Criteria
The entry condition for desirable testing criteria is the successful push of the software to the Dokku test server. In order to proceed with implementation of production use, all priority 1 tests must show a pass. If tests with priorities 2 or 3 fail, it is up to team discussion whether or not the software is pushed to production.
## Test Cycles
There will be two cycles for functional testing. The first of which will be exploratory in which developers will examine the application simply searching for bugs or glitches that have not been accounted for. The second cycle, the real testing cycle, will proceed with the testing of the below test cases.

The first cycle is intended to find bugs that may not have been thought of during development. 

The second test cycle is to identify any large functionality breaking defects that would inhibit a user from enjoying the product. 

## Validation and Defect Management
Each team member is expected to run the test cases each time a change is made to the software. If a team member identifies an aspect of the project that does not have a test case associated with it, they will be expected to execute the test and add it to the Test Cases section of this document. 

All test failures will be tracked in github as issues. The tester that finds the bug will be responsible for opening the issue and providing enough information about it that developers can follow the procedures to reproduce the bug.
# Test Management
## Test Management Tool
We are using github issues to track defects and assign them to developers to fix. This test plan is also uploaded to github for convenience. Each member of our team will have read/write access to add or modify test cases as necessary. As testers perfom their tests, they will update the status of each test in the appropirate results table below and open issues for failed tests. After the defect is fixed, the tester will be asked to perform the test again to ensure the fix works.
## Test Design Process
Each test will be designed to test one or more requirements. Each functional requirement must have at least one test case. Nonfunctional requirements will receive test cases when they are testable with normal use of the applications. Test cases will be mapped to requirements using the requirements traceability matrix.

If a test is designed to test a requirement, it must test the entire requirement. Each test case must be reviewed by the owner of the requirement(s) it is testing before it is submitted.
## Test Execution Process
Once all test cases are written and approved by their owners and by the owners of the requirements they test, the testers will use an exploratory testing of the applications to ensure they are ready to be tested. If any application is not usable, all of its tests fail. Test cases will be carried out by team members who are not owners of the test cases. Owners are free to run through their test cases, but a test result cannot be validated by the owner of the test case.

Each tester will run through the steps of the test cases they are assigned. If steps are unclear, an Issue will be opened on the Tiquito GitHub page against the test, and the test is counted as "Not Run." If any of the steps are unable to be completed, or the expected result does not occur, the test is Failed. If any problems arise that are not part of the test case, an Issue will be opened on the Tiquito GitHub page.

Each time a Pull Request is submitted to the Tiquito Master branch, every test case for the application modified in the Pull Request must be run. The Pull Request cannot be merged until it causes no regressions. If the Pull Request intentionally causes a regression, the test document must be modified to remove the test cases in question before the Pull Request is merged.
# Test Case Template
```
## TXYYY - <Title>
### Priority(1-3) - <Priority 1-3>
### Requirements Tested - <Requirements Numbers as commented list>
### Designed By - <Your Name>
### Expected Result
< Expected Result as a one-few sentences>
### Steps and Input
1. <Steps as numbered list>
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |
```
# Test Cases
## API (Backend)
## T1001 - Test successful status on creating valid ticket
### Priority(1-3) - 1
### Requirements Tested - R1001
### Designed By - Zachary Sang
### Expected Result
When a ticket with required fields (problemTitle, firstName, location, pin) is submitted to the /api/create endpoint, a 200 status code is returned
### Steps and Input
1. Navigate to the create page on the Web UI
2. Create a new valid ticket (include problemTitle, firstName, location, pin) and submit
3. Ticket should be created successfully and a 200 code should be returned.
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |

## T1002 - Creator receives notification on create of ticket
### Priority(1-3) - 3
### Requirements Tested - R1002
### Designed By - Zachary sang
### Expected Result
When creator creates a ticket, they receive an email notification
### Steps and Input
1. Navigate to the create page of the Web UI
2. Create a valid ticket (include the problemTitle, firstName, location and pin fields)
3. After successful submission, check specified email inbox for a notification
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |

## T1003 - Creator receives notification on update of ticket
### Priority(1-3) - 3
### Requirements Tested - R1002
### Designed By - Zachary sang
### Expected Result
When creator updates a ticket (edits or comments), they receive an email notification
### Steps and Input
1. Navigate to the listView of the WebUI
2. Select a specific ticket owned by you (you are the creator) and navigate to the detail view
3. Make an update to the ticket (add a comment or change a field)
4. Submit the update of the ticket
5. After successful submission, check inbox for an email notification
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |


## T1004- Tickets should be saved in the DB after submission
### Priority(1-3) - 1
### Requirements Tested - R1003
### Designed By - Zachary Sang
### Expected Result
When creating a new ticket, it should appear in a result after using the /api/load endpoint
### Steps and Input
1. Navigate to the create page of the Web UI
2. Create a new valid ticket (includes problemTitle, firstName, location and pin fields) and submit
3. Use browser to navigate to: ‘tiquito.com/api/load?limit?200’. Newly created ticket should appear as a json object near the top of the page.
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |

## T1005 - Check returning 404 status when specific ticket not found
### Priority(1-3) - 1
### Requirements Tested - R1004
### Designed By - Zachary Sang
### Expected Result
When a url specifies a nonexistent ticket, a 404 status is returned
### Steps and Input
1. Navigate to ‘tiquito.com/api/loadById?ticketId=aaaaaaaaaaaaaaaaaaaaaaaa (where ticketId is some erroneous id value (must be 24 characters))
4. A 404 status/ ‘Not Found’ error should be returned
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |

## T1006 - Test unsuccessful status on creating an invalid ticket
### Priority(1-3) - 1
### Requirements Tested - R1005
### Designed By - Zachary Sang
### Expected Result
When a ticket missing one of the required fields (problemTitle, firstName, location, pin) is submitted, it returns a 400 status code
### Steps and Input
1. Navigate to create page
2. Create an invalid ticket (Eg: all fields empty) and submit
3. Should see an error message response with status 400
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |

## T1007 - Test closing tickets using PINs
### Priority(1-3) - 1
### Requirements Tested - R1006
### Designed By - Zachary Sang
### Expected Result
User is able to successfully close a ticket using the ticket’s PIN
### Steps and Input
1. Navigate to the list view on the Web UI
2. Select a ticket with ‘Open’ status from the list view for which the PIN is known and navigate to the detail view
3. Select option to close the ticket when prompted and enter PIN when prompted
4. After confirming closing ticket, check the status is updated to ‘Closed’ (Can navigate back to the ticket from the list view to verify this)
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |

## T1008 - Testing validation of correct data types
### Priority(1-3) - 1
### Requirements Tested - R1007
### Designed By - Zachary Sang
### Expected Result
When a ticket with invalid data (too many characters) is submitted for creation, the ticket is rejected with 400 status
### Steps and Input
1. Navigate to creation page to create a new ticket
2. Create a new valid ticket (includes the problemTitle, firstName, location, pin)
3. Create a pin with more than 4 characters
4. Submit the ticket for creation
5. Should see an error for an invalid ticket (status 400)
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |

## T1009 - Test being served over https
### Priority(1-3) - 1
### Requirements Tested - R1008
### Designed By - Zachary Sang
### Expected Result
When using tiquito.com, site is served over https
### Steps and Input
1. Navigate to tiquito.com
2. Check that a green padlock icon is present in the top left of the browser window by the address bar
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |

## Website

## T2001 - Testing the creation of ticket in web front end
### Priority(1-3) - 1
### Requirements Tested - R2001, R2006
### Designed By - James Hillman
### Expected Result
Upon successfully submitting a new ticket the user should be rerouted to the list view page and see that ticket at the top of the list
### Steps and Input
1. Navigate to tiquito.com
2. Select Create New Ticket
3. Fill out Problem Title = “Test Title”, Problem Description = ‘Test Description”, First Name = “James”, Last Name = “Hillman”, Contact Info = “hillmaje@mail.uc.edu”, Location = “Hackathon”, PIN = “0000”, and Problem Tags = “Sample Tag”
4. Press Submit Ticket
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
|7-20-17 |James Hillman |Pass| |Ticket created and viewed successfully|

## T2002 - Testing the detail view of a ticket in the web front end
### Priority(1-3) - 1
### Requirements Tested - R2002, 2007
### Designed By - James Hillman
### Expected Result
Upon clicking View for a ticket, the user should be able to see in the detail view the Ticket ID, Title, First Name, Location, Ticket Status, Description, Assigned Mentor, Relevant Tags, and Creation Date
### Steps and Input
1. Navigate to tiquito.com
2. Select Create New Ticket
3. Fill out Problem Title = “Test Title”, Problem Description = ‘Test Description”, First Name = “James”, Last Name = “Hillman”, Contact Info = “hillmaje@mail.uc.edu”, Location = “Hackathon”, PIN = “0000”, and Problem Tags = “Sample Tag”
4. Press Submit Ticket
5. Locate the ticket in the list view (should be at the top) and click View
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
|7-20-17 |James Hillman|Pass | | Detail view shows correct data|

## T2003 - Testing the searching of tickets in the web front end
### Priority(1-3) - 2
### Requirements Tested - R2008
### Designed By - James Hillman
### Expected Result
Searching by a query should produce the test ticket and test ticket only in the list view
### Steps and Input
1. Navigate to tiquito.com
2. Select Create New Ticket
3. Fill out Problem Title = “Test Title”, Problem Description = ‘Test Description”, First Name = “James”, Last Name = “Hillman”, Contact Info = “hillmaje@mail.uc.edu”, Location = “Hackathon”, PIN = “0000”, and Problem Tags = “Sample Tag”
4. Press Submit Ticket
5. Enter the search query “Test” in the search box, then hit enter
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
|7-20-17 |James Hillman|Pass | |”Test” query came back with correct ticket|

## T2004 - Testing commenting of tickets on web front end
### Priority(1-3) - 2
### Requirements Tested - R2011
### Designed By - James Hillman
### Expected Result
After submitting a comment the detail view should refresh and show said comment in the comment table
### Steps and Input
1. Navigate to tiquito.com
2. Select View Existing Tickets
3. Select View on a random ticket
4. Enter the comment “This is a comment” in the comment box at the bottom of the detail view page and press enter
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
|7-18-17 |James Hillman|Pass | | The comment box worked as intended|

## T2005 - Test the editing (closing) of a ticket in web front end
### Priority(1-3) - 1
### Requirements Tested - R2013
### Designed By - James Hillman
### Expected Result
After submitting edit of a ticket, the user should be brought back to the detail view and see all of the edits made
### Steps and Input
1. Navigate to tiquito.com
2. Select Create New Ticket
3. Fill out Problem Title = “Test Title”, Problem Description = ‘Test Description”, First Name = “James”, Last Name = “Hillman”, Contact Info = “hillmaje@mail.uc.edu”, Location = “Hackathon”, PIN = “0000”, and Problem Tags = “Sample Tag”
4. Press Submit Ticket
5. Locate the ticket ( should be at the top) and click View
6. Click the Edit Ticket Button and change Problem Title = “Test Title2”, Problem Description = ‘Test Description2”, First Name = “James2”, Last Name = “Hillman2”, Contact Info = “hillmaje@mail.uc.edu2”, Location = “Hackathon2”, Status = “Closed”, and enter the PIN number decided above (0000)
7. Click Submit Changes
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
|7-20-17 |James Hillman |Pass| |Edits made viewable changes in detail and list views |

## T2006 - Testing Web Front End Compatibility with Chrome, Firefox, and Safari
### Priority(1-3) - 2
### Requirements Tested - R2016
### Designed By - James Hillman
### Expected Result
All features should work properly on all browsers
### Steps and Input
1. Repeat test cases T2001 - T2006 on each of the 3 browsers looking for failures
2. If any test cases fail on one of the browsers, mark the browser as failed
### Results Table
| Browser | Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :--------: | :---: | :--------: | :-------: | :-------------------: | :------------------: |
|Chrome |7-20-17 | James Hillman|Pass | |No Problems |
|Firefox |7-20-17 | James Hillman|Pass | |No Problems |
|Safari |7-20-17 | James Hillman|Fail | WF001 |List view not displaying Tickets Correctly |

## Desktop
## T3001 - Desktop List View Test
### Priority(1-3) - 1
### Requirements Tested - R3001
### Designed By - Zachary Collins
### Expected Result
Upon opening the desktop app, a list of tickets populates on the left pane of the app. The list view gives the title, tags, and status of each ticket.
### Steps and Input
1. Open desktop app
2. A list of tickets will be displayed. It scrolls up and down, and loads more tickets each time it is scrolled to the bottom, provided there are more tickets to load.
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |
## T3002 - Viewing Closed Tickets on Desktop
### Priority(1-3) - 1
### Requirements Tested - R3002
### Designed By - Zachary Collins
### Expected Result
Closed tickets are viewable in the list view. Tickets are sorted by status (open, in progress, closed) and closed tickets are at the bottom. Clicking on a closed ticket should load its detail view.
### Steps and Input
1. Open desktop app.
2. Scroll list view to the bottom
3. If there are visible closed tickets, the test has succeeded.
4. Otherwise, click on the detail view of a ticket, use the dropdown to change its status to closed, and press the “submit changes” button. The ticket’s status should change to closed, and the ticket should be visible with its changed status in the list view.
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |
## T3003 - Desktop Detail View
### Priority(1-3) - 1
### Requirements Tested - R3003, R3004
### Designed By - Zachary Collins
### Expected Result
Clicking on a ticket in the list view displays its detail view with all of the fields: name, title, description, date, tags, location, status, comments, and assigned mentor.
### Steps and Input
1. Open Desktop app
2. Click on a ticket in the list view
3. The ticket should change color in the list view, and the detail view should populate on the right pane with all of the aforementioned fields.
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |
## T3004
### Priority(1-3) - 1
### Requirements Tested - R3005, R3006
### Designed By - Zachary Collins
### Expected Result
In the desktop detail view, all of the fields mentioned in T3003 are displayed. All displayed fields are editable except for time of creation and PIN (not displayed).
### Steps and Input
1. Open desktop app
2. Click on a ticket in the list view. Its detail view should populate.
3. Mouse over any of the required fields in T3003. This should change the field’s background color (except for with the date). This indicates it is editable.
4. Click on and edit some of the fields.
5. Press the submit button at the bottom of the ticket.
6. Reload the app, and select the same ticket in the list view
7. The changes made to the ticket should persist.
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |
## Android
## T4001 - Android List View Testing
### Priority(1-3) - 1
### Requirements Tested - R4004, R4005
### Designed By - Kurt Lewis
### Expected Result
The list view allows for the quick scrolling of a number of tickets, displaying data on each ticket. Tapping on a specific ticket will open the detail view for that ticket.
### Steps and Input
1. Load the android app.
2. A list of tickets will be displayed, it can scroll up and down, if there are enough tickets in the current view. 
3. Clicking on a ticket will create a new view, showing the details for that specific ticket.
4. A ticket should be visible, regardless of status. This means that if there are closed tickets in the database they should be visible.
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |

## T4002 - Android Detail View
### Priority(1-3) - 1
### Requirements Tested - R4001, R4005 
### Designed By - Kurt Lewis
### Expected Result
The android activity presented when a ticket on a list is clicked should show all applicable fields.
### Steps and Input
1. Once a ticket view is opened, the following fields should be present (though some are allowed to have blank values): Creator name, date and time of creation, creator location in the hackerspace, problem title, problem description, tags for the problem, and ticket status.
2. Clicking back on the ticket will return the user to the list view.
3. There should be a drop down menu to provide options for editing and status changing.
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |

## T4003 - Claiming a ticket
### Priority(1-3) - 2
### Requirements Tested - R4002
### Designed By - Kurt Lewis
### Expected Result
The android application must have the functionality to assign tickets to mentors - chaning them to in progress.
### Steps and Input
1. Open the detail view for an open ticket.
2. At the bottom of the detail view (might require scrolling), will be a button to "Claim" a ticket.
3. Click the button to claim the ticket - and a input field should appear.
4. Enter a name and press the return key on the keyboard.
5. The name should appear in the "Mentor" field and the ticket status should update to "In Progress".
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |

## T4005 - Editing and Closing a Ticket
### Priority(1-3) - 2
### Requirements Tested - R4003
### Designed By - Kurt Lewis
### Expected Result
A ticket should be editable and closeable in the android app.
### Steps and Input
1. Open a ticket of any status from the list view.
2. Clicking on the three dot menu in the top right of the detail view, a menu should appear bearing options to edit or change status.
3. Click on edit.
4. All fields should become editable. Making a change on any field and clicking edit commits that change, and it appears on the deteail view when the user is automatically returned to it.
5. If a ticket is "Open", the menu presents the option to "Close" the ticket. If a ticket is "In Progress", the menu presents the option to "Close" the ticket. If a ticket is "Closed", the menu presents the option to "Reopen" the ticket.
6. Clicking the corresponding menu option for status updates the ticket to reflect its new selected status.
### Results Table
| Date  | Tester Name| Pass/Fail | If fail, issue number | Comments |
| :---: | :--------: | :-------: | :-------------------: | :------------------: |
| | | | | |
