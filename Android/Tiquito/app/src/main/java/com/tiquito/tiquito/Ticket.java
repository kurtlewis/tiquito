package com.tiquito.tiquito;

import android.os.AsyncTask;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;

import javax.net.ssl.HttpsURLConnection;

/**
 * Created by kurt on 7/6/17.
 *
 * Class for controlling general ticket features and loading.
 */

public class Ticket {


    private String id;
    private String title;
    private String description;
    private String location;
    private String creationTime;
    private String status;
    private String mentorName;
    private String creator;
    private String contactInfo;
    private ArrayList<String> tags, comments;

    public Ticket(String id, String title, String description, String location, String creationTime, String status,
                  String mentorName, String creator, String contactInfo, ArrayList<String> tags,
                  ArrayList<String> comments) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.creationTime = creationTime;
        this.status = status;
        this.mentorName = mentorName;
        this.creator = creator;
        this.contactInfo = contactInfo;
        this.tags = tags;
        this.comments = comments;
    }

    /**
     * Hits the Tiquito api to recieve a list of tickets
     * @return ArrayList<Ticket>
     */
    public static ArrayList<Ticket> getTicketList() {
        try {
            return new RetrieveTicketListTask().execute("").get();
        } catch (Exception e) { // TODO: catch more specific exceptions
            e.printStackTrace();
            // Something went wrong - return a blank list.
            return new ArrayList<Ticket>();
        }
    }


    /**
     * Static class for hitting the api for loading lists in the background
     * TODO: catch more specific exceptions
     */
    private static class RetrieveTicketListTask extends AsyncTask<String, Void, ArrayList<Ticket>> {

        @Override
        protected ArrayList<Ticket> doInBackground(String... params) {
            ArrayList<Ticket> tickets = new ArrayList<Ticket>();

            try {
                // TODO: figure out a way to load tickets dynamically instead of 40 at a time
                URL url = new URL("https://test.tiquito.com/api/load?limit=40");
                HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();

                try {

                    InputStream in = new BufferedInputStream(urlConnection.getInputStream());

                    // Convert input stream to string
                    java.util.Scanner s = new java.util.Scanner(in).useDelimiter("\\A");
                    String result = s.hasNext() ? s.next() : "";

                    // Convert the string of the json array to a json array object
                    JSONArray jsonTicketList = new JSONArray(result);

                    for (int i = 0; i < jsonTicketList.length(); i++) {
                        JSONObject jT = jsonTicketList.getJSONObject(i);
                        String id = jT.getString("_id");
                        String title = jT.getString("problemTitle");
                        String status = jT.getString("status");
                        String description = jT.getString("problemDescription");
                        ArrayList<String> tags = new ArrayList<String>();

                        // Tags are a list, so get it as an array and iterate through it
                        JSONArray jsonTags = jT.getJSONArray("Tags");
                        for (int k = 0; k < jsonTags.length(); k++) {
                            tags.add(jsonTags.getString(k));
                        }

                        // ***************************************************************
                        // NOTE - COME BACK HERE IF I WANT MORE ACTUAL DATA IN THE TICKETS
                        // ***************************************************************
                        // Create the actual ticket
                        // plugging in blank values for now, because the list doesn't display them
                        Ticket ticket = new Ticket(id, title, description, "", "", status, "", "",
                                "", tags, new ArrayList<String>());
                        tickets.add(ticket);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    // Free up the connection
                    urlConnection.disconnect();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            return tickets;
        }

    }

    /**
     * Builds a ticket for use in testing
     * @return Ticket with fake values for fields
     */

    public static Ticket getTestTicket() {
        return new Ticket("abcdef123456789", "Test Ticket", "This is a real big problem folks!",
                "Rhodes 802", "07 June 2017", "Open", "", "Dom", "123-456-7890", new ArrayList<String>(),
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

    public String getLocation() { return location; }

    public void setLocation(String location) { this.location = location; }

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

    public String getContactInfo() { return contactInfo; }

    public void setContactInfo(String contactInfo) { this.contactInfo = contactInfo; }

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
