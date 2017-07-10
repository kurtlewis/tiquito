package com.tiquito.tiquito;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

/**
 * Created by ltebb on 7/10/2017.
 */

public class DetailView extends AppCompatActivity{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail_view);

        Ticket details = Ticket.getTestTicket();

        final TextView title = (TextView) findViewById(R.id.title_id);
        title.setText(details.getTitle());

        final TextView creator = (TextView) findViewById(R.id.name_id);
        creator.setText(details.getCreator());

        final TextView contactInfo = (TextView) findViewById(R.id.contactInfo_id);
        contactInfo.setText(details.getContactInfo());

        final TextView description = (TextView) findViewById(R.id.description_id);
        description.setText(details.getDescription());

        final TextView location = (TextView) findViewById(R.id.location_id);
        location.setText(details.getLocation());

        final TextView status = (TextView) findViewById(R.id.status_id);
        status.setText(details.getStatus());

        final TextView mentorName = (TextView) findViewById(R.id.mentorName_id);
        mentorName.setText(details.getMentorName());

    }
}
