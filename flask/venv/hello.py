#! python3
#encoding:utf-8
#encoding:utf8


from flask import Flask
from flask import jsonify
import json
import pymysql
# import sys
import collections
from flask_cors import CORS
# reload(sys)
# sys.setdefaultencoding('utf8')

# conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='', db='anime', charset='utf8mb4')
conn = pymysql.connect(host='hdm440659420.my3w.com', port=3306, user='hdm440659420', passwd='lq671615', db='hdm440659420_db', charset='utf8mb4')
cursor = conn.cursor()
label_list = ['萌系', '搞笑', '热血', '催泪', '后宫', '机战', '基腐', '恋爱', '百合', '科幻', '奇幻', '推理', '音乐', '校园', '运动', '少女', '装逼',
              '智斗', '战斗', '日常', '魔法', '治愈', '声控', '泡面', '历史', '猎奇', '致郁', '美食', '少儿', '励志', '神魔', '轻改', '漫改', '原创',
              '游戏改', '冒险', '经典', '玄幻', '魔幻', '武侠', '竞技', '偶像', '亲子', '青春', '番剧']

def time():
    sql = "select time,count(*),sum(play),avg(play) from three2 group by time"
    cursor.execute(sql)
    rows = cursor.fetchall()
    list = []
    for row in rows:
        d = {}
        if "19" in row[0] or "20" in row[0]:
            d['time'] = row[0]
            d['count'] = row[1]
            d['sumplay'] = row[2]
            d['avgplay'] = row[3]
            list.append(d)
    result = {
        "code": "success",
        "data": list
    }
    return json.dumps(result)

def timeone(ti):
    sql = "select * from three2 where time like '%" + ti + "%'"
    cursor.execute(sql)
    rows = cursor.fetchall()
    list = []
    for row in rows:
        d = {}
        d['id'] = row[0]
        d['name'] = row[1]
        d['tsrc'] = row[2]
        d['isrc'] = row[3]
        d['bsrc'] = row[4]
        d['time'] = row[5]
        d['nums'] = row[6]
        d['score'] = row[7]
        d['tscore'] = row[8]
        d['iscore'] = row[9]
        d['play'] = row[10]
        d['tplay'] = row[11]
        d['iplay'] = row[12]
        d['bplay'] = row[13]
        d['label'] = row[14]
        d['actor'] = row[15]
        d['description'] = row[16]
        d['video'] = row[17]
        list.append(d)
    result = {
        "code": "success",
        "data": list
    }
    return json.dumps(result)

def label():
    list = []
    for item in label_list:
        sql = "select count(*) from three2 where label like '%" + item +"%'"
        cursor.execute(sql)
        rows = cursor.fetchall()
        d = {}
        d['label'] = item
        d['count'] = rows[0][0]
        list.append(d)
    result = {
        "code": "success",
        "data": list
    }
    return json.dumps(result)

def labelone(lab):
    sql = "select * from three2 where label like '%" + lab + "%'"
    cursor.execute(sql)
    rows = cursor.fetchall()
    list = []
    for row in rows:
        d = {}
        d['id'] = row[0]
        d['name'] = row[1]
        d['tsrc'] = row[2]
        d['isrc'] = row[3]
        d['bsrc'] = row[4]
        d['time'] = row[5]
        d['nums'] = row[6]
        d['score'] = row[7]
        d['tscore'] = row[8]
        d['iscore'] = row[9]
        d['play'] = row[10]
        d['tplay'] = row[11]
        d['iplay'] = row[12]
        d['bplay'] = row[13]
        d['label'] = row[14]
        d['actor'] = row[15]
        d['description'] = row[16]
        d['video'] = row[17]
        list.append(d)
    result = {
        "code": "success",
        "data": list
    }
    return json.dumps(result)

def score(number):
    sql = "select name,score from three2 order by score desc limit "+number
    cursor.execute(sql)
    rows = cursor.fetchall()
    list = []
    for row in rows:
        d = {}
        d['name'] = row[0]
        d['score'] = row[1]
        list.append(d)
    result = {
        "code": "success",
        "data": list
    }
    return json.dumps(result)

def play(number):
    sql = "select name,play from three2 order by play desc limit " + number
    cursor.execute(sql)
    rows = cursor.fetchall()
    list = []
    for row in rows:
        d = {}
        d['name'] = row[0]
        d['score'] = row[1]
        list.append(d)
    result = {
        "code": "success",
        "data": list
    }
    return json.dumps(result)

def self(name):
    sql = "select * from three2 where name='" + name +"'"
    cursor.execute(sql)
    rows = cursor.fetchall()
    list = []
    for row in rows:
        d = {}
        d['id'] = row[0]
        d['name'] = row[1]
        d['tsrc'] = row[2]
        d['isrc'] = row[3]
        d['bsrc'] = row[4]
        d['time'] = row[5]
        d['nums'] = row[6]
        d['score'] = row[7]
        d['tscore'] = row[8]
        d['iscore'] = row[9]
        d['play'] = row[10]
        d['tplay'] = row[11]
        d['iplay'] = row[12]
        d['bplay'] = row[13]
        d['label'] = row[14]
        d['actor'] = row[15]
        d['description'] = row[16]
        d['video'] = row[17]
        list.append(d)
    result = {
        "code": "success",
        "data": list
    }
    return json.dumps(result)



app = Flask(__name__)
# app = Flask(__name__,
#             static_folder = "./dist/static",
#             template_folder = "./dist")
CORS(app)

@app.route('/anime/api')
def index():
    return "flask部署成功"

@app.route('/anime/api/time')
def time_():
    return str(time()).decode("unicode-escape")
@app.route('/anime/api/time/<ti>')
def timeone_(ti):
    return str(timeone(ti)).decode("unicode-escape")

@app.route('/anime/api/label')
def label_():
    return str(label()).decode("unicode-escape")
@app.route('/anime/api/label/<lab>')
def labelone_(lab):
    return str(labelone(lab)).decode("unicode-escape")

@app.route('/anime/api/score/<number>')
def score_(number):
    return str(score(number)).decode("unicode-escape")
@app.route('/anime/api/play/<number>')
def play_(number):
    return str(play(number)).decode("unicode-escape")


@app.route('/anime/api/self/<name>')
def self_(name):
    return str(self(name)).decode("unicode-escape")

if __name__ == '__main__':
    app.run()


conn.commit()
cursor.close()
conn.close()