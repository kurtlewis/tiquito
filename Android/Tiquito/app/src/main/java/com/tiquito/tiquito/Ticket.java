package com.tiquito.tiquito;

import java.util.ArrayList;

/**
 * Created by kurt on 7/6/17.
 *
 * Class for controlling general ticket features and loading.
 */

public class Ticket {


    private string id;
    private string title;
    private string description;
    private string creationTime;
    private string status;
    private string mentorName;
    private string creator;
    private ArrayList<string> tags, comments;

    public Ticket(string id, string title, string description, string creationTime, string status,
                  string mentorName, string creator, ArrayList<string> tags,
                  ArrayList<string> comments) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.creationTime = creationTime;
        this.status = status;
        this.mentorName = mentorName;
        this.creator = creator;
        this.tags = tags;
        this.comments = comments;
    }

    /**
     * Hits the Tiquito api to recieve a list of tickets
     * @return ArrayList<Ticket>
     */
    public static ArrayList<Ticket> getTicketList() {
        new ArrayList<Ticket> tickets;

        return tickets;
    }

    /**
     * Builds a ticket for use in testing
     * @return Ticket with fake values for fields
     */
    public static Ticket getTestTicket() {
        return new Ticket("abcdef123456789", "Test Ticket", "This is a real big problem folks!",
                "07 June 2017", "Open", "Chris", "Dom", new ArrayList<string>(),
                new ArrayList<string>());
    }

    /**
     * Builds a list of test tickets for use in testing
     * @return ArrayList<Ticket> with fake values
     */
    public static ArrayList<Ticket> getTestTicketList() {
        ArrayList<Ticket> tickets = new ArrayList<Ticket>();
        tickets.append(getTestTicket());
        tickets.append(getTestTicket());
        tickets.append(getTestTicket());
        tickets.append(getTestTicket());
        tickets.append(getTestTicket());
        tickets.append(getTestTicket());
        return tickets;
    }

    /**
     * getter and setter hell below. Beware all who enter
     */

    public string getId() {
        return id;
    }

    public void setId(string id) {
        this.id = id;
    }

    public string getTitle() {
        return title;
    }

    public void setTitle(string title) {
        this.title = title;
    }

    public string getDescription() {
        return description;
    }

    public void setDescription(string description) {
        this.description = description;
    }

    public string getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(string creationTime) {
        this.creationTime = creationTime;
    }

    public string getStatus() {
        return status;
    }

    public void setStatus(string status) {
        this.status = status;
    }

    public string getMentorName() {
        return mentorName;
    }

    public void setMentorName(string mentorName) {
        this.mentorName = mentorName;
    }

    public string getCreator() {
        return creator;
    }

    public void setCreator(string creator) {
        this.creator = creator;
    }

    public ArrayList<string> getTags() {
        return tags;
    }

    public void setTags(ArrayList<string> tags) {
        this.tags = tags;
    }

    public ArrayList<string> getComments() {
        return comments;
    }

    public void setComments(ArrayList<string> comments) {
        this.comments = comments;
    }
}
