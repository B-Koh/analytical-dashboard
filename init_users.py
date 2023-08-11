import pymysql

DATABASE_NAME = 'UserData'
TABLE = 'users'

# Connect to the MySQL server
conn = pymysql.connect(host='157.230.221.51', user='jared', password='jtvillan')
cursor = conn.cursor()

# Switch to the database
cursor.execute(f'USE {DATABASE_NAME}')
conn.commit()

cursor.execute(f'drop table if exists {TABLE}')

# Create the table if it doesn't exist
cursor.execute(
    f'CREATE TABLE IF NOT EXISTS {TABLE} (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(254), password VARCHAR(254), admin VARCHAR(20))'
)
conn.commit()

# Insert into users
cursor.execute(
    f'INSERT INTO {TABLE} (username, password, admin) values ("jared", "jtvillan", "true"), ("brandon", "brkoh", "true"), ("grader", "grader", "false")'
)
conn.commit()

# Close the connection
conn.close()