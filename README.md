# 🔐 Cipher Guessing Game using Caesar Cipher

A beginner-friendly cryptography project that demonstrates the implementation of the **Caesar Cipher** algorithm through an interactive word guessing game. The project is designed to help users understand classical encryption techniques while practicing basic programming concepts in Python.

---

## 📖 Project Overview

The game randomly selects a word from a predefined list, encrypts it using the **Caesar Cipher** algorithm, and provides the player with an encrypted word along with a hint. The player's objective is to correctly guess the original word and earn points.

This project was developed as part of an academic cryptography/programming course to demonstrate the practical implementation of classical encryption techniques.

---

## ✨ Features

* Caesar Cipher encryption
* Caesar Cipher decryption
* Random word selection
* Hint-based gameplay
* Score tracking system
* Five-round game mode
* Performance grading
* Play Again option
* Clean and well-commented source code

---

## 🛠️ Technologies Used

* Python
* HTML
* CSS
* JavaScript

---

## 📚 Programming Concepts Used

* Functions
* Loops (`for`, `while`)
* Conditional Statements
* Lists & Dictionaries
* String Manipulation
* ASCII Conversion (`ord()` & `chr()`)
* Modular Arithmetic
* Random Module

---

## 🔒 Caesar Cipher

The Caesar Cipher is one of the oldest and simplest encryption techniques.

Encryption Formula:

```text
E(x) = (x + n) mod 26
```

Decryption Formula:

```text
D(x) = (x - n) mod 26
```

where **n** represents the shift value.

---

## 🎮 Game Rules

* The computer randomly selects a word.
* The word is encrypted using the Caesar Cipher.
* A hint is displayed.
* Guess the original word.
* Correct answer = **+10 points**
* Wrong answer = **-5 points**
* Total rounds = **5**

---

## 📂 Project Structure

```text
cipher-game/
│── caesar_cipher.py
│── index.html
│── style.css
│── script.js
```

---

## ▶️ How to Run

Clone the repository:

```bash
git clone https://github.com/lailmah-47/cipher-game.git
```

Open the project folder and run:

```bash
python caesar_cipher.py
```

If you want to explore the frontend files, simply open `index.html` in your browser.

---

## 🚀 Future Improvements

* User-defined shift value
* Multiple encryption algorithms
* Difficulty levels
* High-score system
* Better UI/UX
* Responsive web version
* Database integration

---

## 👩‍💻 Author

**Lailmah**

Computer Science Student

Interested in:

* Web Development
* UI/UX Design
* Software Development
* Cybersecurity
* Cryptography

GitHub: https://github.com/lailmah-47

Live demo: https://lailmah-47.github.io/cipher-game/

