package com.tiquito.tiquito;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;

import javax.net.ssl.HttpsURLConnection;

/**
 * Created by ltebb on 7/13/2017.
 */

public class EditView extends AppCompatActivity {
    public static final String TICKET_PARAM = "com.tiquito.tiquito.TICKET_PARAM";
    Thread ithread = null;
    Thread jthread = null;
    String httpResponse = null;
    Ticket details;
    public void MakeHttpGetRequest(final String ticketID) {

        ithread = new Thread(new Runnable() {
            @Override
            public void run(){
                try {
                    HttpsURLConnection connection = (HttpsURLConnection) (new URL("https://tiquito.com/api/loadById?ticketId="+ticketID)).openConnection();

                    // Read and store the result line by line then return the entire string.
                    InputStream in;

                    int status = connection.getResponseCode();

                    if (status != HttpURLConnection.HTTP_OK)
                        in = connection.getErrorStream();
                    else
                        in = new BufferedInputStream(connection.getInputStream());

                    java.util.Scanner s = new java.util.Scanner(in).useDelimiter("\\A");
                    String result = s.hasNext() ? s.next() : "";

                    JSONObject ticketInfo = new JSONObject(result);

                    String id = ticketInfo.getString("_id");
                    String title = ticketInfo.getString("problemTitle");
                    JSONObject creator = ticketInfo.getJSONObject("creator");
                    String name = creator.getString("firstName") + " " + creator.getString("lastName");
                    String contact = creator.getString("contactInfo");
                    String loc = creator.getString("location");
                    String mentor = ticketInfo.getString("mentorName");
                    if (mentor.equals("None")){
                        mentor = "";
                    }
                    String jstatus = ticketInfo.getString("status");
                    String description = ticketInfo.getString("problemDescription");
                    ArrayList<String> tags = new ArrayList<String>();

                    // Tags are a list, so get it as an array and iterate through it
                    JSONArray jsonTags = ticketInfo.getJSONArray("Tags");
                    for (int k = 0; k < jsonTags.length(); k++) {
                        tags.add(jsonTags.getString(k));
                    }

                    ArrayList<String> comments = new ArrayList<String>();

                    // Tags are a list, so get it as an array and iterate through it
                    JSONArray comment = ticketInfo.getJSONArray("comments");

                    for (int k = 0; k < comment.length(); k++) {
                        JSONObject jsonComments = comment.getJSONObject(k);
                        comments.add(jsonComments.getString("commentText"));
                    }

                    details = new Ticket(id, title, description, loc, "", jstatus, mentor, name, contact, tags, comments);

                    in.close();

                    httpResponse = result;

                } catch (Exception e) {
                    e.printStackTrace();
                    httpResponse=e.toString();
                }
            }
        });
        ithread.start();
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_view);

        Intent incomingIntent = getIntent();
        final String ticketId = incomingIntent.getStringExtra(TICKET_PARAM);

        MakeHttpGetRequest(ticketId);
        try {
            ithread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        final RelativeLayout rl = (RelativeLayout) findViewById(R.id.activity_edit_view);

        final ArrayList<EditText> allEditViews = new ArrayList<EditText>();

        final TextView.OnEditorActionListener enterToDone = new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView textView, int i, KeyEvent keyEvent) {
                if (i == EditorInfo.IME_NULL && keyEvent.getAction() == KeyEvent.ACTION_DOWN) {
                    return true;
                }
                return false;
            }
        };

        final EditText editTitle = (EditText) findViewById(R.id.title_edit_id);
        editTitle.setText(details.getTitle());
        allEditViews.add(editTitle);
        editTitle.setOnEditorActionListener(enterToDone);

        final EditText editCreator = (EditText) findViewById(R.id.name_edit_id);
        editCreator.setText(details.getCreator());
        allEditViews.add(editCreator);
        editCreator.setOnEditorActionListener(enterToDone);

        final EditText editContactInfo = (EditText) findViewById(R.id.contactInfo_edit_id);
        editContactInfo.setText(details.getContactInfo());
        allEditViews.add(editContactInfo);
        editContactInfo.setOnEditorActionListener(enterToDone);

        final EditText editDescription = (EditText) findViewById(R.id.description_edit_id);
        editDescription.setText(details.getDescription());
        allEditViews.add(editDescription);
        editDescription.setOnEditorActionListener(enterToDone);

        final EditText editLocation = (EditText) findViewById(R.id.location_edit_id);
        editLocation.setText(details.getLocation());
        allEditViews.add(editLocation);
        editLocation.setOnEditorActionListener(enterToDone);

        final EditText editComments = (EditText) findViewById(R.id.comments_edit_id);
        String strComments = TextUtils.join(", ", details.getComments());
        editComments.setText(strComments);
        allEditViews.add(editComments);
        editComments.setOnEditorActionListener(enterToDone);

        final EditText editTags = (EditText) findViewById(R.id.tags_edit_id);
        String strTags = TextUtils.join(", ", details.getTags());
        editTags.setText(strTags);
        allEditViews.add(editTags);
        editTags.setOnEditorActionListener(enterToDone);

        final TextView status = (TextView) findViewById(R.id.status_edit_id);
        status.setText(details.getStatus());

        final EditText editMentor = (EditText) findViewById(R.id.mentorName_edit_id);
        editMentor.setText(details.getMentorName());
        allEditViews.add(editMentor);
        editMentor.setOnEditorActionListener(enterToDone);

        for(EditText e: allEditViews){
            e.setFocusable(true);
            e.setSelectAllOnFocus(true);
        }

        final Button doneButton = (Button) findViewById(R.id.done_id);
        final Intent intent = new Intent(this, DetailView.class);
        intent.putExtra(DetailView.TICKET_PARAM, details.getId());

        doneButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String title = editTitle.getText().toString();
                String creator = editCreator.getText().toString();
                String contactInfo = editContactInfo.getText().toString();
                String description = editDescription.getText().toString();
                String location = editLocation.getText().toString();
                String mentor = editMentor.getText().toString();
                String[] nameArray = creator.split("\\s+");
                String comments = editComments.getText().toString();
                String tagsString = editTags.getText().toString();

                details.setTitle(title);
                details.setCreator(creator);
                details.setContactInfo(contactInfo);
                details.setDescription(description);
                details.setLocation(location);
                details.setMentorName(mentor);
                ArrayList<String> com = new ArrayList<String>(Arrays.asList(comments.split("\\s*,\\s*")));
                details.setComments(com);
                details.setTags(new ArrayList<String>(Arrays.asList(tagsString.split("\\s*,\\s*"))));

                JSONObject editedTicket = new JSONObject();
                try {
                    editedTicket.put("ticketId", ticketId);
                    editedTicket.put("problemTitle", title);
                    editedTicket.put("problemDescription", description);
                    editedTicket.put("firstName", nameArray[0]);
                    if(nameArray.length > 1){
                        editedTicket.put("lastName", nameArray[1]);
                    }
                    editedTicket.put("location", location);
                    editedTicket.put("contactInfo", contactInfo);
                    editedTicket.put("status", status);
                    editedTicket.put("mentorName", mentor);
                    editedTicket.put("tags", tagsString);
                    JSONObject commentElement = new JSONObject();
                    for(String c : com){
                        commentElement.put("commenterName", "Placeholder");
                        commentElement.put("commentText", c);
                    }
                    editedTicket.put("comments", commentElement);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                MakeHttpsPostRequest(ticketId, editedTicket);
                try {
                    jthread.join();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                startActivity(intent);
            }
        });
    }
    public void MakeHttpsPostRequest(final String ticketId, final JSONObject ticket) {

        jthread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    ticket.put("token", getString(R.string.API_KEY));
                    HttpsURLConnection connection = (HttpsURLConnection) (new URL("https://tiquito.com/api/edit")).openConnection();

                    connection.setRequestMethod("POST");
                    String body = ticket.toString();

                    connection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");

                    DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
                    wr.writeBytes(body);

                    InputStream in;

                    int status = connection.getResponseCode();

                    if (status != HttpURLConnection.HTTP_OK)
                        in = connection.getErrorStream();
                    else
                        in = new BufferedInputStream(connection.getInputStream());

                    BufferedReader rd = new BufferedReader(new InputStreamReader(in));
                    String line;
                    StringBuffer response = new StringBuffer();
                    while ((line = rd.readLine()) != null) {
                        response.append(line);
                        response.append('\r');
                    }
                    rd.close();
                    response.toString();

                } catch (Exception e) {

                    e.printStackTrace();

                }
            }
        });
        jthread.start();
    }
}
