package com.tiquito.tiquito;

import java.util.ArrayList;

/**
 * Created by kurt on 7/6/17.
 *
 * Class for controlling general ticket features and loading.
 */

public class Ticket {


    private String id;
    private String title;
    private String description;
    private String creationTime;
    private String status;
    private String mentorName;
    private String creator;
    private ArrayList<String> tags, comments;

    public Ticket(String id, String title, String description, String creationTime, String status,
                  String mentorName, String creator, ArrayList<String> tags,
                  ArrayList<String> comments) {
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
        ArrayList<Ticket> tickets = new ArrayList<Ticket>();

        return tickets;
    }

    /**
     * Builds a ticket for use in testing
     * @return Ticket with fake values for fields
     */
    public static Ticket getTestTicket() {
        return new Ticket("abcdef123456789", "Test Ticket", "This is a real big problem folks!",
                "07 June 2017", "Open", "Chris", "Dom", new ArrayList<String>(),
                new ArrayList<String>());
    }

    /**
     * Builds a list of test tickets for use in testing
     * @return ArrayList<Ticket> with fake values
     */
    public static ArrayList<Ticket> getTestTicketList() {
        ArrayList<Ticket> tickets = new ArrayList<Ticket>();
        tickets.add(getTestTicket());
        tickets.add(getTestTicket());
        tickets.add(getTestTicket());
        tickets.add(getTestTicket());
        tickets.add(getTestTicket());
        tickets.add(getTestTicket());
        tickets.add(getTestTicket());
        return tickets;
    }

    /**
     * getter and setter hell below. Beware all who enter
     */

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(String creationTime) {
        this.creationTime = creationTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMentorName() {
        return mentorName;
    }

    public void setMentorName(String mentorName) {
        this.mentorName = mentorName;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public ArrayList<String> getTags() {
        return tags;
    }

    public void setTags(ArrayList<String> tags) {
        this.tags = tags;
    }

    public ArrayList<String> getComments() {
        return comments;
    }

    public void setComments(ArrayList<String> comments) {
        this.comments = comments;
    }
}
