package com.tiquito.tiquito;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.TypedValue;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.util.ArrayList;

/**
 * Created by ltebb on 7/13/2017.
 */

public class EditView extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_view);

        final RelativeLayout rl = (RelativeLayout) findViewById(R.id.activity_edit_view);

        final Ticket details = Ticket.getTestTicket();

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

        doneButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                details.setTitle(editTitle.getText().toString());
                details.setCreator(editCreator.getText().toString());
                details.setContactInfo(editContactInfo.getText().toString());
                details.setDescription(editDescription.getText().toString());
                details.setLocation(editLocation.getText().toString());
                details.setMentorName(editMentor.getText().toString());

                startActivity(intent);
            }
        });
    }
}
