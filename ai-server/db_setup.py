import sqlite3

def add_priority_column():
    # Connect to SQLite database
    conn = sqlite3.connect('railmadad_grievances.db')
    cursor = conn.cursor()

    # Add the priority column to the grievances table
    try:
        cursor.execute('ALTER TABLE grievances ADD COLUMN priority REAL')
        print("Priority column added successfully.")
    except sqlite3.OperationalError as e:
        print("Error:", e)
    finally:
        # Commit the changes and close the connection
        conn.commit()
        conn.close()

# Call the function to add the column
add_priority_column()
