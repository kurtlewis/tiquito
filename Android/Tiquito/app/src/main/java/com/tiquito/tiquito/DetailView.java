package com.tiquito.tiquito;

import android.app.ActionBar;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.TypedValue;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;
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

        final RelativeLayout rl = (RelativeLayout) findViewById(R.id.activity_detail_view);
        final RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.MATCH_PARENT);
        params.addRule(RelativeLayout.BELOW, R.id.mentorName_label_id);
        params.addRule(RelativeLayout.ALIGN_LEFT, R.id.status_id);

        if(!details.getMentorName().isEmpty()) {
            TextView mentorName = new TextView(this);
            mentorName.setText(details.getMentorName());
            mentorName.setTextSize(TypedValue.COMPLEX_UNIT_SP, 22);
            rl.addView(mentorName, params);
        }
        else{
            final Button claimButton = new Button(this);
            claimButton.setText("Claim");
            rl.addView(claimButton, params);
            final EditText enterMentorName = new EditText(this);

            claimButton.setOnClickListener(new View.OnClickListener(){
                public void onClick(View v){
                    enterMentorName.setText("Enter Name");
                    enterMentorName.setTextSize(TypedValue.COMPLEX_UNIT_SP, 22);
                    enterMentorName.setSelectAllOnFocus(true);

                    rl.removeView(claimButton);

                    final RelativeLayout.LayoutParams editMentorNameParams = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.MATCH_PARENT);
                    editMentorNameParams.addRule(RelativeLayout.BELOW, R.id.mentorName_label_id);
                    editMentorNameParams.addRule(RelativeLayout.ALIGN_LEFT, R.id.mentorName_label_id);

                    rl.addView(enterMentorName, params);
                }
            });
        }

    }
}
