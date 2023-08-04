# BioLife Cafe

Welcome to the BioLife Cafe repository!

BioLife Cafe is a web-based system for internal coffee orders at BioLife Solutions. Find it at [biolifecafe.com](https://biolifecafe.com).

As of 2023-08-04, BioLife Cafe is deployed and hosted on Vercel.

---

## List of features to be added

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
