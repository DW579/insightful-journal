___Insightful Journal___
========================

##Summary
Insightful Journal is a journaling application with analytics. A user can perform an in-depth analysis of their journal entries to better understand how their writing comes across. The app provides feedback on the personality of the entries, as well as the language, social and emotional tones. To help the user dive deeper into their topic, the app provides Wikipedia definitions and related TED Talks. This application is to help spree ideas and provide a greater understanding of the user's tone of writing.

Web Link: https://insightful-journal.herokuapp.com
Github Link: https://github.com/DW579/insightful-journal

### Technologies Used:
* Node.js
* Express
* Angular
* Postgres database with Knex
* HTML
* CSS
* Javascript
* Deployed on Heroku

### APIs Used:
* IBM Watson AI API
* Youtube

The technology behind the analysis is based on IBM's Watson API created by using the modern theories and research from psycholinguistics. The tone results that are received from the analysis of the text run through a comparison method and provide relevant information to the user to see how they write or how others write. The details of the tone results are as follows:

### Emotional Tone:
* Joy
* Fear
* Disgust
* Sadness
* Anger

### Social Tone:
* Openness
* Conscientiousness
* Extraversion
* Agreeableness
* Emotional Range

### Language Tone:
* Analytic
* Confidence
* Tentative

As a user populates a particular folder with multiple entries, another analysis will be performed to receive the personality of the all the entries as a whole. This will provide insights to the user's particular writing personality or the personality of another individual, organization, or concept. Below are the subcategories of the personality tone:

### Big Five
* Agreeableness
* Conscientiousness
* Extraversion
* Emotional Range
* Openness

### Needs
* Excitement
* Harmony
* Curiosity
* Ideal
* Closeness
* Self-expression
* Liberty
* Love
* Practicality
* Stability
* Challenge
* Structure

### Values
* Self-transcendence/Helping others
* Conservation/Tradition
* Hedonism/Taking Pleasure in Life
* Self-enhancement/Achieving Success
* Open to Change/Excitement
