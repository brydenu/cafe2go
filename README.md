# Biolife cafe

Website is live at www.biolifecafe.com

Web app to create an easy ordering system for internal coffee orders at Biolife Solutions.
---

## List of known bugs
- Temperature option (extra hot, light ice) doesn't work.
- DashboardDrinkTracker component doesn't render
- Time in db is +6 hours

## List of features to be added
- **Quick order/favorites system**
  
  These two systems should go hand in hand - edit favorites should allow users to create preset "favorite" drinks, which should show up in the quick order options to order with one or two buttons. (Quick order should also include the most recent order if the most recent order isn't already on the favorites)

- **Comments/notes option for drink orders**
  
  Should add a new option in drink ordering for additional comments that might not have an option in the ordering system. Maybe make a character limit to prevent spam.

- **Report a bug/suggest a new feature**
  
  Add a button to the dashboard that allows users to easily report bugs or suggest new features to be added. Would need a new db table for this.

- **Guest ordering**
  
  Index should add a new button for guests to order - that is, order without registering for an account. This ordering system should add a new option on the order screen for guest name.

- **Personal cup option in order**

  Add a checkbox in the user ordering system for personal cup

- **Schedule an order**

  Users should be able to put an order in that should be made at a specific time. This could possibly lead to a second row in the queue; one row for the current queue and one row for scheduled/upcoming orders

- **Order completion estimate**

  After ordering, users get a estimated time the order will be completed, based on how many orders are ahead of the user. Could also be let known when the user's drink is being worked on, i.e. the user is at the front of the queue.

- **User settings**

  Users should be able to change their settings, and potentiall eventually add a phone number to allow twilio to text them.

- **Cancel orders**

  Users can cancel orders after ordering, removing the drink from the queue.