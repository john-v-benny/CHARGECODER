# CHARGECODER

![Home Page](https://github.com/ASHISH-28-02/CHARGECODER/blob/main/UI/WhatsApp%20Image%202025-03-31%20at%2013.02.38.jpeg)

ChargeCoder is an innovative project aimed at automating the assignment of legal charges in cybercrime cases by leveraging Natural Language Processing (NLP) techniques. The initiative addresses the challenges posed by the complexity and evolving nature of cyber laws under the IT Act and the BNS, where manual interpretation often leads to inconsistencies and errors. By employing advanced machine learning models, particularly the BERT Tokenizer and BERT Sequence Classifier, ChargeCoder ensures accurate and consistent charge prediction based on textual case descriptions. This tool is designed to support legal practitioners, law enforcement agencies, and victims in navigating cyber laws more effectively, thereby enhancing efficiency and promoting fairness in the justice system. While focusing specifically on cases governed by the IT Act and BNS, ChargeCoder streamlines the mapping of offenses to relevant legal provisions, addressing the growing volume and complexity of cybercrime incidents.

## Workflow
The ChargeCoder system follows a structured workflow that integrates a React frontend, a Django backend, a BERT model for processing, and an SQLite3 database. The user begins by logging in through the frontend, where authentication controls access to two primary features: Scenario-Based Prediction (which predicts the relevant legal section based on a textual description) and Legal Section Search (which retrieves legal details using a section number or keyword).

The backend, built using Django, handles prediction requests through a Prediction API that communicates with the BERT model for text preprocessing and legal section classification. Simultaneously, the backend also handles database queries through a Database API, allowing retrieval of legal section details from the SQLite3 database. Data transfer between the frontend and backend is facilitated using JSON via Axios, with CORS ensuring secure cross-origin communication. The final prediction or search result is then displayed to the user, completing the process.

<p align="center">
<img src="https://github.com/ASHISH-28-02/CHARGECODER/blob/main/UI/WhatsApp%20Image%202025-03-31%20at%2011.31.29%20(1).jpeg" alt="Workflow Diagram" width="600" height="700">
</p>

## Project Structure
- Learn more about the [Frontend](https://github.com/ASHISH-28-02/CHARGECODER/blob/main/Front-end/README.md)
- Explore details on the [Backend](https://github.com/ASHISH-28-02/CHARGECODER/blob/main/Back-end/README.md)

## Contributors
<p align="center">
  <a href="https://github.com/Aswini-ks04"><img src="https://github.com/Aswini-ks04.png" width="100" height="100" alt="ASWINI K S"></a>
  <a href="https://github.com/john-v-benny"><img src="https://github.com/john-v-benny.png" width="100" height="100" alt="JOHN BENNY VARGHESE"></a>
  <a href="https://github.com/ASHISH-28-02"><img src="https://github.com/ASHISH-28-02.png" width="100" height="100" alt="ASHISH B"></a>
  <a href="https://github.com/1ISODD"><img src="https://github.com/1ISODD.png" width="100" height="100" alt="SASANK M"></a>
</p>

Feel free to explore the project and contribute !

