import json
import boto3
import uuid
import pymysql
import os
import hashlib

def lambda_handler(event, context):
    # TODO implement
    # print(event)
    
    path = event.get("path")
    items = json.loads(event.get("body"))
    print(path, items)
    mydb = pymysql.connect(
        host= os.environ["hostname"],
        user=os.environ["username"],
        password=os.environ["password"],
        db = "notes"
    )
    
    
    if path == "/signup":
        id = uuid.uuid4().urn[9:]
        email = items.get("email")
        name = items.get("full_name")
        password = items.get("password")
        curr = mydb.cursor()
        sql = f"INSERT INTO users (uuid, email, name, password_hash) VALUES (%s, %s, %s, %s)"
        response = curr.execute(sql, (id, email, name, password))
        mydb.commit()
        mydb.close()
    
        return {
            
            'statusCode': 200,
            'headers' : {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps({
                'message': "Success",
                'userId': id,
                'email' : email,
                'full_name' : name
            })
        }
    elif path == "/login":
        email = items.get("email")
        password = items.get("password")
        curr = mydb.cursor()
        sql = f"Select * from users where email=%s and password_hash=%s"
        count = curr.execute(sql, (email, password))
        print(count)
        if count == 0:
            return {
                'statusCode': 200,
                'headers' : {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                },
                'body': json.dumps({
                    'message': 'Failure'
                })
            }
        rows = curr.fetchall()
        column = [t[0] for t in curr.description]
        item = {}
        for row in rows:
            for i in range(len(row)-1):
                item[column[i]] = row[i]
        mydb.close()
        return {
            'statusCode': 200,
            'headers' : {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps({
                'message': "Success",
                'userId': item.get("uuid"),
                'email' : item.get("email"),
                'full_name' : item.get("name")
            })
        }
    
