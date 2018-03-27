
import urllib2
from bs4 import BeautifulSoup
# from pyquery import PyQuery as pq
# from lxml import etree

import sys
reload(sys)
# sys.setdefaultencoding('utf-8')
# type = sys.getfilesystemencoding()

url = 'http://v.qq.com/x/list/cartoon?sort=18&offset=0&itype=-1&iarea=1'
video_list = []
def start_request(url):
    page = urllib2.urlopen(url).read()
    # page = page.decode('utf-8').encode(type)
    # print page
    soup = BeautifulSoup(page, 'html.parser',  fromEncoding='gb18030')
    # print soup.encode('gb18030')
    # 以格式化的形式打印html
    # # print(soup.prettify().encode('gbk', 'ignore'))
    list = soup.findAll(attrs={"class": "list_item"})


    # print (list)
    for item in list:
        src = item.a['href']
        name = item.find(attrs={"class": "figure_title"}).a.string
        count = item.find(attrs={"class": "num"}).string
        score = item.find(attrs={"class": "score_l"}).string + item.find(attrs={"class": "score_s"}).string
        nums = item.find(attrs={"class": "figure_info"}).string
        video_list.append({
            # id: id,
            'name': name.encode('gbk', 'ignore'),
            'src': src,
            'nums': nums,
            'score': score,
            'count': count
        })
        print video_list
        break

start_request(url)