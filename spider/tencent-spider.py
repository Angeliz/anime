# -*-coding:utf-8-*-
import urllib2
from bs4 import BeautifulSoup

# import sys
# reload(sys)
# sys.setdefaultencoding('utf8')

url = 'http://v.qq.com/x/list/cartoon?sort=18&offset=0&itype=-1&iarea=1'
page = urllib2.urlopen(url).read().decode('utf-8')
soup = BeautifulSoup(page, 'html.parser')
# 以格式化的形式打印html
# print(soup.prettify().encode('gbk', 'ignore'))
soup = soup.prettify().encode('gbk', 'ignore')
def start_request(url):
    list = soup.findAll(attrs={"class":"list_item"})
    for item in list:
        src = item.find(attrs={'class':'figure'})
        name = item.find(attrs={'class':'figure'})
        # src =$(item).children().first().attr('href');
        # name =$('.figure_title', this).children().first().text();
        # score =$('.score_l', this).text() +$('.score_s', this).text();
        # count =$('.figure_count .num', this).text();
        # // 集数
        # var
        # nums =$('.figure_info', this).text();
        # videoList.push({
        #     id: id,
        #     name: name,
        #     src: src,
        #     nums: nums,
        #     score: score,
        #     count: count
        # });
print (list)