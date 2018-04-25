#! python3
#encoding:utf-8
from flask import Flask
import PyMySql


db = pymysql.connect("localhost", "root", "", "anime")

cursor = db.cursor()


cursor.execute("select * from tencent where name='斗罗大陆'")

data = cursor.fetchone()
print("Database version : %s " % data)


db.close()

app = Flask(__name__)


@app.route('/')
def index():
    return 'Index Page'

@app.route('/hello')
def hello():
    return 'Hello, World'


if __name__ == '__main__':
    app.run()