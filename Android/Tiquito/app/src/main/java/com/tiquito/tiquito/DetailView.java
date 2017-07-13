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

        Ticket details = Ticket.getTestTicket();

        final ArrayList<TextView> allTextViews = new ArrayList<TextView>();
        final ArrayList<EditText> allEditViews = new ArrayList<EditText>();

        final TextView title = (TextView) findViewById(R.id.title_id);
        EditText editTitle = new EditText(this);
        editTitle.setId(View.generateViewId());
        title.setText(details.getTitle());
        editTitle.setText(details.getTitle());
        allTextViews.add(title);
        allEditViews.add(editTitle);

        final TextView creator = (TextView) findViewById(R.id.name_id);
        EditText editCreator = new EditText(this);
        editCreator.setId(View.generateViewId());
        creator.setText(details.getCreator());
        editCreator.setText(details.getCreator());
        allTextViews.add(creator);
        allEditViews.add(editCreator);

        final TextView contactInfo = (TextView) findViewById(R.id.contactInfo_id);
        EditText editContactInfo = new EditText(this);
        editContactInfo.setId(View.generateViewId());
        contactInfo.setText(details.getContactInfo());
        editContactInfo.setText(details.getContactInfo());
        allTextViews.add(contactInfo);
        allEditViews.add(editContactInfo);

        final TextView description = (TextView) findViewById(R.id.description_id);
        EditText editDescription = new EditText(this);
        editDescription.setId(View.generateViewId());
        description.setText(details.getDescription());
        editDescription.setText(details.getDescription());
        allTextViews.add(description);
        allEditViews.add(editDescription);

        final TextView location = (TextView) findViewById(R.id.location_id);
        EditText editLocation = new EditText(this);
        editLocation.setId(View.generateViewId());
        location.setText(details.getLocation());
        editLocation.setText(details.getLocation());
        allTextViews.add(location);
        allEditViews.add(editLocation);

        final TextView status = (TextView) findViewById(R.id.status_id);
        status.setText(details.getStatus());

        final TextView mentorName = new TextView(this);
        final EditText editMentor = new EditText(this);
        editMentor.setId(View.generateViewId());
        editMentor.setText(details.getMentorName());
        allEditViews.add(editMentor);

        final Button claimButton = new Button(this);
        claimButton.setText("Claim");

        final Button editButton = (Button) findViewById(R.id.edit_id);
        final Button doneButton = new Button(this);
        final int buttonDims = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 62, getResources().getDisplayMetrics());
        final RelativeLayout.LayoutParams doneButtonParams = new RelativeLayout.LayoutParams(buttonDims, buttonDims);

        doneButtonParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
        doneButton.setText("Done");

        editButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                rl.addView(doneButton, doneButtonParams);
                RelativeLayout.LayoutParams titleParams = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
                //titleParams.addRule(RelativeLayout.ALIGN_BOTTOM);
                //rl.addView(title, titleParams);
                rl.removeView(claimButton);
                rl.removeView(editMentor);
                rl.removeView(editButton);
                rl.removeView(mentorName);
                int leftMargin = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 17, getResources().getDisplayMetrics());
                 for(int i=0; i<allEditViews.size(); i++){
                     EditText e = allEditViews.get(i);
                     TextView t;
                     final RelativeLayout.LayoutParams editAllParams = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
                     if (i==0){
                         t = allTextViews.get(i);
                         rl.removeView(t);
                         e.setPadding(leftMargin, 178, 0, 0);
                     }
                     else if(i<allTextViews.size() && i>0){
                         editAllParams.addRule(RelativeLayout.BELOW, allEditViews.get(i - 1).getId());
                         t = allTextViews.get(i);
                         rl.removeView(t);
                         e.setPadding(leftMargin, 120, 0, 0);
                     }
                     else{
                         editAllParams.addRule(RelativeLayout.BELOW, status.getId());
                         e.setPadding (leftMargin, 120, 0, 0);
                     }

                     e.setFocusable(true);
                     e.setSelectAllOnFocus(true);
                     e.setTextSize(TypedValue.COMPLEX_UNIT_SP, 22);
                     if(!e.isInLayout())
                        rl.addView(e, editAllParams);
                }

            }
        });

        doneButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                rl.removeView(doneButton);
                rl.addView(editButton);
                for(int i=0; i<allEditViews.size(); i++){
                    EditText e = allEditViews.get(i);
                    rl.removeView(e);

                    if(i<allTextViews.size()) {
                        TextView t = allTextViews.get(i);
                        t.setText(e.getText());
                        rl.addView(t);
                    }
                    else {
                        //TODO: if user erases mentor name, re-add claim button on done
                        if(!e.getText().toString().isEmpty() || !mentorName.getText().toString().isEmpty()) {
                            final RelativeLayout.LayoutParams mentorParams = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
                            mentorParams.addRule(RelativeLayout.BELOW, status.getId());
                            int leftMargin = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 17, getResources().getDisplayMetrics());
                            mentorName.setPadding(leftMargin, 120, 0, 0);
                            mentorName.setText(e.getText());
                            mentorName.setTextSize(TypedValue.COMPLEX_UNIT_SP, 22);
                            rl.addView(mentorName, mentorParams);
                        }
                        else{
                            rl.addView(claimButton);
                        }
                    }
                }
            }
        });

        final RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.MATCH_PARENT);
        params.addRule(RelativeLayout.BELOW, R.id.mentorName_label_id);
        params.addRule(RelativeLayout.ALIGN_LEFT, R.id.status_id);

        if(!details.getMentorName().isEmpty()) {
            mentorName.setText(details.getMentorName());
            mentorName.setTextSize(TypedValue.COMPLEX_UNIT_SP, 22);
            rl.addView(mentorName, params);
        }
        else if (mentorName.getText().toString().isEmpty()){
            rl.addView(claimButton, params);

            claimButton.setOnClickListener(new View.OnClickListener(){
                @Override
                public void onClick(View v){
                    editMentor.setText("Enter Name");
                    editMentor.setTextSize(TypedValue.COMPLEX_UNIT_SP, 22);
                    editMentor.setSelectAllOnFocus(true);
                    rl.removeView(claimButton);

                    //TODO: switch to In Progress and update editMentor after mentor commits their name
                    status.setText("In Progress");

                    final RelativeLayout.LayoutParams editMentorNameParams = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.MATCH_PARENT);
                    editMentorNameParams.addRule(RelativeLayout.BELOW, R.id.mentorName_label_id);
                    editMentorNameParams.addRule(RelativeLayout.ALIGN_LEFT, R.id.mentorName_label_id);

                    rl.addView(editMentor, editMentorNameParams);
                }
            });
        }

    }
}
