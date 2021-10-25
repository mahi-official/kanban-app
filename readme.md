# Kanban App
KanBan Application is the one of the best project management and roadmap tracking application in the market.

# Docs
Docs folder contains the DB diagram(schema), sequence Diagrams(flow), Technical Document and the Functional Document. You can refer to these docs for better understanding of the application.

# Installation Guide
To run the project locally, you can start with creating the virtual environment.
- To create the virtual env, run the following command in your terminal:
```
python -m venv kanban_venv
```
- activate the environment from command: `\> kanban_venv\Scripts\activate`

- create a folder `source` inside `kanban_venv` folder and clone the repository in it. 

-  **To run the backend APIs**, go inside the backend folder using command prompt.

    - Make sure to install all the dependencies from the requirements.txt file in your virtual environment using this command:
        ```
        python -m pip install -r requirements.txt
        ```

    - Create a `.env` file in the backend folder and add the below mentioned details in it:
        ```
        {
            "debug": true,
            "allowed_hosts": ["*"],
            "secret_key": "django_secret_key",
            "db_name": "your_postgres_db_name",
            "db_user": "your_postgres_db_user_name",
            "db_password": "your_postgres_db_user_name",
            "db_host": "localhost",
            "db_port": ""
        }
        ```

    - run the following commands:
        ```
        python manage.py makemigrations
        python manage.py migrate
        python manage.py runserver
        ```
    Your APIs are now up!
    You can test the APIs using postman.

-  **To run the User Interface**, go inside the frontend folder using another command prompt.

    - Make sure to install all the node packages from the package.json file using this command:
        ```
        npm install
        ```

    - run the following command after downloading all the packages:
        ```
        npm start
        ```
    Your Website is up now!
    You can view the contents at **`http://localhost:3000`**

# Contributing
We are working on integrating multiple functionalities. If you want to contribute to it, please fork the development branch and create a pull request with changes.

You can contribute in documentation, linting, styling, performance issues.

Please mark your pull request with others if contributing in any other category from the mentioned above categories.

# Follow us
You can reach out to us on below social media platforms:

<a href=""><img src="https://github.com/aritraroy/social-icons/blob/master/medium-icon.png?raw=true" width="60"></a>
<a href=""><img src="https://github.com/aritraroy/social-icons/blob/master/twitter-icon.png?raw=true" width="60"></a>
<a href=""><img src="https://github.com/aritraroy/social-icons/blob/master/linkedin-icon.png?raw=true" width="60"></a>
<a href=""><img src="https://github.com/aritraroy/social-icons/blob/master/facebook-icon.png?raw=true" width="60"></a>
<a href=""><img src="https://github.com/aritraroy/social-icons/blob/master/instagram-icon.png?raw=true" width="60"></a>