"""
=============================================================
  Cipher Guessing Game Using Caesar Cipher
  Author  : Student Project
  Subject : Introduction to Cryptography / Programming
  Marks   : 50 Marks Final Project
=============================================================

CONCEPTS COVERED:
  - Variables and Data Types
  - Lists and Dictionaries
  - Functions
  - Loops (for, while)
  - Conditional Statements (if / elif / else)
  - String Manipulation (.upper(), join())
  - ASCII Conversion (ord(), chr())
  - Modular Arithmetic (mod 26)
  - Random Module (random.choice())
  - Caesar Cipher Encryption Formula: E(x) = (x + n) mod 26
=============================================================
"""

import random   # Needed to randomly pick a word each round


# ----------------------------------------------------------------
# STEP 1: Word List with Hints
#         Each entry is a dictionary with 'word' and 'hint' keys.
# ----------------------------------------------------------------
WORD_LIST = [
    {"word": "APPLE",   "hint": "It is a fruit that keeps the doctor away"},
    {"word": "HOUSE",   "hint": "A place where people live"},
    {"word": "TRAIN",   "hint": "A long transport vehicle on rails"},
    {"word": "TIGER",   "hint": "A wild striped big cat"},
    {"word": "HELLO",   "hint": "A common greeting word"},
    {"word": "SCHOOL",  "hint": "A place where students study"},
    {"word": "WATER",   "hint": "Essential liquid for life, H2O"},
    {"word": "CLOCK",   "hint": "A device that shows time"},
    {"word": "MUSIC",   "hint": "Art of sound and rhythm"},
    {"word": "BREAD",   "hint": "A baked food made from flour"},
    {"word": "EARTH",   "hint": "The planet we live on"},
    {"word": "KNIFE",   "hint": "A sharp cutting tool"},
    {"word": "OCEAN",   "hint": "A vast body of salt water"},
    {"word": "PLANE",   "hint": "A vehicle that flies in the sky"},
    {"word": "QUEEN",   "hint": "A female ruler of a kingdom"},
]


# ----------------------------------------------------------------
# STEP 2: Caesar Cipher Encryption Function
#
# Formula: E(x) = (x + shift) mod 26
#   - ord(char) converts a character to its ASCII value
#   - Subtracting 65 converts ASCII to 0-25 range (A=0, B=1, ...)
#   - Adding shift and applying mod 26 wraps around the alphabet
#   - Adding 65 back converts to ASCII, chr() converts back to char
# ----------------------------------------------------------------
def encrypt_caesar(word, shift):
    """
    Encrypts a word using Caesar Cipher.

    Parameters:
        word  (str) : The original word in UPPERCASE
        shift (int) : The number of positions to shift each letter

    Returns:
        str : The encrypted (ciphered) word
    """
    encrypted_word = ""  # Will store the final encrypted result

    for letter in word:                         # Loop through each letter
        ascii_value   = ord(letter)             # Get ASCII code (e.g. 'A' = 65)
        position      = ascii_value - 65        # Shift to 0-25 range
        new_position  = (position + shift) % 26 # Apply shift with wrap-around
        new_ascii     = new_position + 65       # Shift back to ASCII range
        encrypted_letter = chr(new_ascii)       # Convert ASCII back to character
        encrypted_word   += encrypted_letter    # Append to result

    return encrypted_word


# ----------------------------------------------------------------
# STEP 3: Caesar Cipher Decryption Function (Bonus)
#
# Formula: D(x) = (x - shift) mod 26
#   Decryption is the reverse of encryption.
# ----------------------------------------------------------------
def decrypt_caesar(encrypted_word, shift):
    """
    Decrypts a Caesar Cipher encrypted word.

    Parameters:
        encrypted_word (str) : The encrypted word
        shift          (int) : The shift value used during encryption

    Returns:
        str : The original (decrypted) word
    """
    decrypted_word = ""

    for letter in encrypted_word:
        ascii_value      = ord(letter)
        position         = ascii_value - 65
        original_position = (position - shift) % 26   # Reverse the shift
        new_ascii        = original_position + 65
        decrypted_letter = chr(new_ascii)
        decrypted_word   += decrypted_letter

    return decrypted_word


# ----------------------------------------------------------------
# STEP 4: Display Banner
# ----------------------------------------------------------------
def display_banner():
    """Prints the game title banner."""
    print("=" * 55)
    print("    CIPHER GUESSING GAME - Caesar Cipher Edition")
    print("=" * 55)
    print("  How to play:")
    print("  - The computer picks a secret word.")
    print("  - It encrypts the word using Caesar Cipher.")
    print("  - You see the encrypted word + a hint.")
    print("  - Guess the ORIGINAL word to earn points!")
    print("=" * 55)
    print()


# ----------------------------------------------------------------
# STEP 5: Main Game Function
# ----------------------------------------------------------------
def play_game():
    """
    Main function that controls the entire game flow.

    Game Rules:
        - 5 rounds per game
        - Correct Guess : +10 points
        - Wrong Guess   : -5  points
        - Minimum score : 0 (cannot go below zero)
    """
    display_banner()

    total_rounds  = 5    # Number of rounds
    score         = 0    # Player's starting score
    shift_value   = 3    # Fixed Caesar Cipher shift (can be changed)

    print(f"  Shift Value Used for Encryption : {shift_value}")
    print(f"  Total Rounds                    : {total_rounds}")
    print(f"  Points per Correct Answer       : +10")
    print(f"  Points per Wrong Answer         : -5")
    print()

    # ---- Round Loop ----
    for round_number in range(1, total_rounds + 1):

        print(f"--- Round {round_number} of {total_rounds} ---")

        # Randomly select a word from the list
        selected_entry = random.choice(WORD_LIST)
        original_word  = selected_entry["word"]
        hint           = selected_entry["hint"]

        # Encrypt the word using Caesar Cipher
        encrypted_word = encrypt_caesar(original_word, shift_value)

        # Display encrypted word and hint to the player
        print(f"  Encrypted Word : {encrypted_word}")
        print(f"  Hint           : {hint}")
        print()

        # Take input from the player
        guess = input("  Your Guess: ").upper().strip()  # Convert to uppercase for fair comparison

        # Check the guess
        if guess == original_word:
            print("  ✅ Correct Answer! +10 points\n")
            score += 10
        else:
            print(f"  ❌ Wrong! The correct word was: {original_word}")
            score -= 5
            if score < 0:           # Score cannot go below zero
                score = 0
            print(f"     -5 points deducted\n")

        print(f"  Current Score: {score} points")
        print()

    # ---- Final Result ----
    print("=" * 55)
    print("              GAME OVER - Final Results")
    print("=" * 55)
    print(f"  Your Final Score : {score} / {total_rounds * 10} points")

    # Grade the player based on score
    percentage = (score / (total_rounds * 10)) * 100
    if percentage == 100:
        grade = "PERFECT! Outstanding!"
    elif percentage >= 80:
        grade = "Excellent!"
    elif percentage >= 60:
        grade = "Good Job!"
    elif percentage >= 40:
        grade = "Keep Practicing!"
    else:
        grade = "Better Luck Next Time!"

    print(f"  Performance     : {grade}")
    print("=" * 55)
    print()

    # Ask if player wants to play again
    again = input("  Would you like to play again? (yes/no): ").lower().strip()
    if again in ("yes", "y"):
        play_game()          # Recursively restart the game
    else:
        print("\n  Thanks for playing! Goodbye! 👋")
        print("=" * 55)


# ----------------------------------------------------------------
# STEP 6: Entry Point
#         This block runs only when the file is executed directly,
#         not when imported as a module.
# ----------------------------------------------------------------
if __name__ == "__main__":
    play_game()
