package com.tiquito.tiquito;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;

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
        mTicketList = Ticket.getTestTicketList();
        mTicketList.addAll(Ticket.getTestTicketList());
        mTicketList.addAll(Ticket.getTestTicketList());


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
}
