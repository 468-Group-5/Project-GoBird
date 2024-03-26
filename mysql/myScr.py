#!/usr/bin/env python3

import mysql.connector

mydb = mysql.connector.connect(
  host="mysql",
  user="root",
  password="m_Tf+90V9&&z??6z4n66;.BmwEaNTXl1",
  database="test"
)

mycursor = mydb.cursor()

# Your SQL commands here (create db, tables, insert data)

mycursor.close()
mydb.close()
