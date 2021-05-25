import json
import boto3
import uuid
import pymysql
import os
import hashlib
from datetime import datetime


def lambda_handler(event, context):
    # TODO implement
    print(event)
    path = event.get("path")
    items = json.loads(event.get("body"))
    
    mydb = pymysql.connect(
        host= os.environ["hostname"],
        user=os.environ["username"],
        password=os.environ["password"],
        db = "notes"
    )
    
    if path == "/addnote":
        note_id = uuid.uuid4().urn[9:]
        user_id = items.get("userId")
        title = items.get("title")
        now = datetime.now()
        formatted_date = now.strftime('%Y-%m-%d %H:%M:%S')
        content = items.get("content")
        collborators = None
        curr = mydb.cursor()
        sql = "INSERT INTO notes (note_id, uuid, date_created, title, content, collaborators) VALUES (%s, %s, %s, %s, %s, %s)"
        response = curr.execute(sql, (note_id, user_id, formatted_date, title, content, collborators))
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
                'noteId': note_id
            })
        }

    elif path == "/getnotes":
        user_id = items.get("userId")
        curr = mydb.cursor()
        sql = "Select * from notes where uuid = %s"
        response = curr.execute(sql, (user_id))
        rows = curr.fetchall()
        column = [t[0] for t in curr.description]
        items = []
        for row in rows:
            item = {}
            for i in range(len(row)-1):
                item[column[i]] = row[i]
            items.append(item)
        print(items)
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
                'data': items
            }, default=str)
        }
        
    elif path == "/deletenode":
        user_id = items.get("userId")
        note_id = items.get("noteId")
        print(user_id, note_id)
        curr = mydb.cursor()
        sql = "Delete from notes where note_id=%s and uuid=%s"
        response = curr.execute(sql, (note_id,user_id))
        print(response)
        mydb.commit()
        mydb.close()
        if response == 0:
            message = "Failure"
        elif response == 1:
            message = "Success"
        return {
            'statusCode': 200,
            'headers' : {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps({
                'message': message
            })
        }
