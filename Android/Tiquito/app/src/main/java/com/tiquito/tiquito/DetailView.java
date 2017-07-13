package com.tiquito.tiquito;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.TypedValue;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.util.ArrayList;

import static android.R.attr.id;

/**
 * Created by ltebb on 7/10/2017.
 */

public class DetailView extends AppCompatActivity{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail_view);

        final RelativeLayout rl = (RelativeLayout) findViewById(R.id.activity_detail_view);

        final Ticket details = Ticket.getTestTicket();

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

        final TextView mentorName = new TextView(this);
        final EditText editMentor = new EditText(this);

        final Button claimButton = new Button(this);
        claimButton.setText("Claim");


        final Button editButton = (Button) findViewById(R.id.edit_id);
        final Intent intent = new Intent(this, EditView.class);

        editButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(intent);
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

}
