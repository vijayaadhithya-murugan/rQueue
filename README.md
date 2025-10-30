## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your API key
3. Run the app:
   `npm run dev`

## View Application

**URL**

## User Guide

1. Import Your Tickets

Upload file:
Supports CSV or plain text (.txt) files.
For CSVs, ensure you have columns named:

`id, subject, body, createdAt`

2. AI-Powered Queue

Once imported, the data is sent to a powerful AI model which analyzes each ticket based on a specific set of rules.

The AI assesses:

**Category**: Assigns labels like Bug Report, Feature Request, Billing Inquiry, Technical Support, or Other.

**Urgency (P1–P4)**: Prioritizes based on keywords (e.g., “outage”, “critical error”, “delay”) and the age of the ticket.

**Suggested Assignee**: Recommends the best team (e.g., Frontend, Backend, DevOps, Testing, Billing) to handle the issue.

**Confidence**: Flags tickets that are ambiguous or lack sufficient details so you can review them manually.

3. Review and Export

The tickets are displayed in a clean, easy-to-read list. You can quickly see the AI’s suggestions and reasoning.

Features:

Analytics Dashboard:
Visualizes category and urgency trends over time.

Export to CSV:
Once you’re happy with the triage results, export the categorized and prioritized data (including AI’s confidence and suggested team) as a .csv file for reporting or integration with other tools.

## How It Works

1. Import tickets (CSV or plain text).

2. Run categorization — keywords (like “bug”, “invoice”, “request”) map tickets to one of the five defined categories.

3. Urgency is assigned based on:

   Keyword severity (e.g., “critical”, “down”, “urgent”)

   Ticket age (older tickets increase urgency)

4. Next Assignee/Team is suggested based on category:

   Bug Reports → QA / Engineering

   Feature Requests → Product Team

   Billing → Finance

   Technical Support → Support Team


## Screenshots

1. Queued Tickets

![Queued Tickets](image.png)

2. Analytics

![Analytics](image-1.png)