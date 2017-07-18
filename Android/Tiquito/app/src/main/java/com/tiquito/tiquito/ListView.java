package com.tiquito.tiquito;

import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.os.Bundle;
import android.widget.Toast;


import java.util.ArrayList;

public class ListView extends AppCompatActivity {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mTicketAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private ArrayList<Ticket> mTicketList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_view);

        // Get ticket list
        mTicketList = Ticket.getTicketList();

        // if the list size is 0, an error probably occurred
        if (mTicketList.size() == 0) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "An error occurred while loading tickets", Toast.LENGTH_LONG);
            toast.show();
        }

        mRecyclerView = (RecyclerView) findViewById(R.id.ticket_recycler_view);

        // Use this setting because change sin content won't change the layout size
        mRecyclerView.setHasFixedSize(true);


        // use a linear layout manager
        mLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLayoutManager);

        // specify an adapter
        mTicketAdapter = new TicketAdapter(this, mTicketList);
        mRecyclerView.setAdapter(mTicketAdapter);

    }

    // Overriding this function to force the list to update anytime it is reopened.
    @Override
    protected void onResume() {
        super.onResume();
        // Get ticket list
        mTicketList = Ticket.getTicketList();

        // if the list size is 0, an error probably occurred
        if (mTicketList.size() == 0) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "An error occurred while loading tickets", Toast.LENGTH_LONG);
            toast.show();
        }
        mTicketAdapter = new TicketAdapter(this, mTicketList);
        mRecyclerView.setAdapter(mTicketAdapter);
    }
}
