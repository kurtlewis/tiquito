package com.tiquito.tiquito;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.ArrayList;

/**
 * Created by kurt on 7/16/17.
 */

public class TicketAdapter extends RecyclerView.Adapter<TicketAdapter.ViewHolder> {
    private Context mContext;
    private ArrayList<Ticket> mticketList;

    // provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder

    public static class ViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public Ticket ticket;
        public TextView mTitle;
        public TextView mDescription;
        public ViewHolder(View itemView) {
            super(itemView);
            mTitle = (TextView) itemView.findViewById(R.id.ticket_list_title);
            mDescription = (TextView) itemView.findViewById(R.id.ticket_list_description);

            // Click listener for item clicks
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override public void onClick(View itemView) {
                    if (getAdapterPosition() != RecyclerView.NO_POSITION) {
                        Context context = itemView.getContext();
                        Intent intent = new Intent(context, DetailView.class);
                        getItemId();
                        intent.putExtra(DetailView.TICKET_PARAM, ticket.getId());
                        context.startActivity(intent);
                    }
                }
            });
        }
    }

    // provide a suitable constructor (depends on the kind of dataset)
    public TicketAdapter(Context context, ArrayList<Ticket> tickets) {
        mticketList = tickets;
        mContext = context;
    }

    // Create new views (invoked by layout manager)
    @Override
    public TicketAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        Context context = parent.getContext();
        LayoutInflater inflater = LayoutInflater.from(context);

        // Inflate the cusotm layout
        View ticketView = inflater.inflate(R.layout.item_ticket, parent, false);

        // Return a new holder instance
        ViewHolder vh = new ViewHolder(ticketView);
        return vh;

    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        // get the ticket based on position
        Ticket ticket = mticketList.get(position);

        holder.ticket = ticket;
        // - replace the contents of the view with that element
        TextView textView = holder.mTitle;
        textView.setText(ticket.getTitle());
        textView = holder.mDescription;
        textView.setText(ticket.getDescription());
    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return mticketList.size();
    }

    private Context getContext() {
        return mContext;
    }
}