# MIMIR - LLM Chatbot

Mimir is an LLM chatbot made using the Mistral-7B-Instruct-v0.3 model for inference.
It is an open source chat model based on the Mistral-7B architecture having 7.25B params.
Mistral-7B-Instruct-v0.3 offers a high degree of versatility and performance for many real-world applications, providing a strong alternative for those needing a lightweight yet powerful instruction-following model.
<br>
It supports the creation of multiple chats and implements JWT based User Authentication to handle user sessions.

![alt text](Images/LoginPage.png)

<!-- ![alt text](RegisterPage.png) -->

![alt text](Images/Chatbot.png)

# Project Deployment Information

Link - http://65.1.130.88:3000/

The project has been deployed on an Amazon AWS EC2 Instance. A PostgreSQL RDS has been configured to function only with the particular EC2 instance in the same security group.

# Technology

- Django - server side logic.
- React.Js - UI and client side functionality.
- MUI - React Components Library
- Mistral-7B-Instruct-v0.3 from HuggingfaceHub.

# Steps To Run

1. Clone the repository locally an open up the directory in a terminal.

```bash
git clone https://github.com/VishistB/LLM-Chatbot.git
```

2. Download the client side packages.

```bash
npm i
```

3. Download the Python modules.

```bash
python -m pip install -r requirements.txt
```

<!-- 4. Download Ollama.
```bash
curl -fsSL https://ollama.com/install.sh | sh
``` -->

4. Download huggingface-cli

```bash
pip install -U "huggingface_hub[cli]"
```

5. Now log into the cli using the command below. You will be prompted to paste your HF token (read).

```bash
huggingface-cli login
```

<!-- 5. Pull and run mistral(7B). If no error shows up you are good to go.

```bash
ollama run mistral
``` -->

6. Start Server after going to server base folder with manage.py

```bash
python manage.py runserver
```

7. Start Client by going into the client folder.

```bash
npm start
```
