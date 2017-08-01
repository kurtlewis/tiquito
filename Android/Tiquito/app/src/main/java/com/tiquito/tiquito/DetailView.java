package com.tiquito.tiquito;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.PopupMenu;
import android.text.TextUtils;
import android.util.TypedValue;
import android.view.KeyEvent;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

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
import java.net.URLConnection;
import java.util.ArrayList;

import javax.net.ssl.HttpsURLConnection;

import static android.R.attr.id;

/**
 * Created by ltebb on 7/10/2017.
 */

public class DetailView extends AppCompatActivity{
    public static final String TICKET_PARAM = "com.tiquito.tiquito.TICKET_PARAM";
    Thread ithread = null;
    Thread jthread = null;
    String httpResponse = null;
    Ticket details;
    JSONObject editedTicket;
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
        setContentView(R.layout.activity_detail_view);

        Intent incomingIntent = getIntent();
        final String ticketId = incomingIntent.getStringExtra(TICKET_PARAM);

        MakeHttpGetRequest(ticketId);
        try {
            ithread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


        final RelativeLayout rl = (RelativeLayout) findViewById(R.id.activity_detail_view);

        final ArrayList<TextView> allTextViews = new ArrayList<TextView>();

        final TextView title = (TextView) findViewById(R.id.title_id);
        title.setText(details.getTitle());
        allTextViews.add(title);

        final TextView creator = (TextView) findViewById(R.id.name_id);
        creator.setText(details.getCreator());
        allTextViews.add(creator);

        final TextView contactInfo = (TextView) findViewById(R.id.contactInfo_id);
        contactInfo.setText(details.getContactInfo());
        allTextViews.add(contactInfo);

        final TextView description = (TextView) findViewById(R.id.description_id);
        description.setText(details.getDescription());
        allTextViews.add(description);

        final TextView location = (TextView) findViewById(R.id.location_id);
        location.setText(details.getLocation());
        allTextViews.add(location);

        final TextView status = (TextView) findViewById(R.id.status_id);
        status.setText(details.getStatus());

        final TextView comments = (TextView) findViewById(R.id.comments_id);
        String strComments = TextUtils.join(", ", details.getComments());
        comments.setText(strComments);
        allTextViews.add(comments);

        final TextView tags = (TextView) findViewById(R.id.tags_id);
        String strTags = TextUtils.join(", ", details.getTags());
        tags.setText(strTags);
        allTextViews.add(tags);

        final TextView mentorName = new TextView(this);
        final EditText editMentor = new EditText(this);

        final Button claimButton = new Button(this);
        claimButton.setText("Claim");

        final ImageButton popupMenu = (ImageButton) findViewById(R.id.popup_id);
        final Intent intent = new Intent(this, EditView.class);
        intent.putExtra(DetailView.TICKET_PARAM, details.getId());

        popupMenu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final PopupMenu popupOptions = new PopupMenu(DetailView.this, popupMenu);
                popupOptions.getMenu().add("Edit");
                if(status.getText().equals("In Progress") || status.getText().equals("In progress") || status.getText().equals("Open")) {
                    popupOptions.getMenu().add("Close");
                }
                else{
                    popupOptions.getMenu().add("Reopen");
                }
                popupOptions.getMenuInflater().inflate(R.menu.popup_menu, popupOptions.getMenu());

                popupOptions.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
                    public boolean onMenuItemClick(MenuItem item) {
                        if(item.getTitle() == "Edit"){
                            startActivity(intent);
                        }
                        else if (item.getTitle() == "Close"){
                            status.setText("Closed");
                            JSONObject closeTicket = new JSONObject();
                            try {
                                closeTicket.put("ticketId", ticketId);
                                closeTicket.put("status", "Closed");
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            MakeHttpsPostRequest(ticketId, closeTicket);
                            try {
                                jthread.join();
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                        else {
                            status.setText("Open");
                            JSONObject openTicket = new JSONObject();
                            try {
                                openTicket.put("ticketId", ticketId);
                                openTicket.put("status", "Open");
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            MakeHttpsPostRequest(ticketId, openTicket);
                            try {
                                jthread.join();
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                        return true;
                    }
                });
                popupOptions.show();
            }
        });

        final RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.MATCH_PARENT);
        params.addRule(RelativeLayout.BELOW, R.id.mentorName_label_id);
        params.addRule(RelativeLayout.ALIGN_LEFT, R.id.status_id);

        final TextView.OnEditorActionListener enterToDone = new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView textView, int i, KeyEvent keyEvent) {
                if (i == EditorInfo.IME_NULL && keyEvent.getAction() == KeyEvent.ACTION_DOWN) {

                    rl.removeView(editMentor);
                    rl.addView(mentorName, params);

                    if (!editMentor.getText().toString().isEmpty()) {
                        mentorName.setText(editMentor.getText());
                        status.setText("In Progress");
                        mentorName.setTextSize(TypedValue.COMPLEX_UNIT_SP, 22);
                        details.setMentorName(editMentor.getText().toString());

                        editedTicket = new JSONObject();
                        try {
                            editedTicket.put("ticketId", ticketId);
                            editedTicket.put("token", "test-api-key123");
                            editedTicket.put("mentorName", editMentor.getText().toString());
                            editedTicket.put("status", "In progress");
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                        MakeHttpsPostRequest(ticketId, editedTicket);
                        try {
                            jthread.join();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                    else{
                        rl.addView(claimButton, params);
                    }
                }
                return true;
            }
        };

        if (!details.getMentorName().isEmpty()) {
            mentorName.setText(details.getMentorName());
            mentorName.setTextSize(TypedValue.COMPLEX_UNIT_SP, 22);
            rl.addView(mentorName, params);
        } else if (mentorName.getText().toString().isEmpty()) {
            rl.addView(claimButton, params);

            claimButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    rl.removeView(claimButton);
                    final RelativeLayout.LayoutParams editMentorParams = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
                    editMentorParams.addRule(RelativeLayout.BELOW, R.id.mentorName_label_id);
                    editMentorParams.addRule(RelativeLayout.ALIGN_LEFT, R.id.status_id);

                    editMentor.setText("Enter Name");
                    editMentor.setTextSize(TypedValue.COMPLEX_UNIT_SP, 20);
                    editMentor.setSelectAllOnFocus(true);
                    editMentor.setOnEditorActionListener(enterToDone);

                    rl.addView(editMentor, editMentorParams);
                }
            });
        }
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
