# app.py

from flask import Flask, request, render_template, render_template_string
import sqlite3
import os

app = Flask(__name__)

# Vulnerability 1: Hardcoded Secret Key 🔑
# SonarQube will flag this as a hardcoded secret.
app.config['SECRET_KEY'] = 'my-super-secret-key-that-is-not-secure'

# Set up a simple database for demonstration
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)')
    cursor.execute("INSERT INTO users VALUES ('admin', 'password')")
    conn.commit()
    conn.close()

@app.route('/')
def home():
    return "Hello, this is a vulnerable Flask application."

# Vulnerability 2: SQL Injection 💉
# SonarQube will identify the unsanitized user input in the SQL query.
@app.route('/user/<username>')
def get_user(username):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    query = f"SELECT * FROM users WHERE username = '{username}'"
    print(f"Executing query: {query}")
    cursor.execute(query)
    user_data = cursor.fetchone()
    conn.close()
    if user_data:
        return f"User found: {user_data[0]}"
    return "User not found."

# Vulnerability 3: Command Injection 💣
# SonarQube will detect the use of os.system with user-supplied input.
@app.route('/ping')
def ping():
    host = request.args.get('host', '127.0.0.1')
    command = f"ping -c 1 {host}"
    output = os.popen(command).read()
    return f"<pre>{output}</pre>"

# Vulnerability 4: Cross-Site Scripting (XSS) 😈
# SonarQube will flag render_template_string with unsanitized user input.
@app.route('/search')
def search():
    query = request.args.get('query', '')
    # The user input is directly embedded into the HTML template without escaping.
    html = f"<h2>Search Results for: {query}</h2>"
    return render_template_string(html)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)