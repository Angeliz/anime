<template>
  <div>
    <Appbar></Appbar>
    <div class="mdui-typo" style="width:80%;margin: 0 auto">
      <h3>主题</h3>
      <p>基于数据的国产动漫可视化分析</p>
      <hr/>
      <h3>技术栈</h3>
      <ul>
        <li>爬虫
          <ul>
            <li><code>nodejs</code>版本</li>
            <li><code>python</code>版本</li>
          </ul>
        </li>
        <li>数据库
          <ul>
            <li><code>MySQL</code></li>
          </ul>
        </li>
        <li>后台
          <ul>
            <li><code>PHP</code></li>
          </ul>
        </li>
        <li>前端
          <ul>
            <li><code>Vue2</code>+<code>VueRouter2</code>+<code>Webpack</code>+<code>Axios</code></li>
            <li><code>MDUI</code>+<code>element UI</code></li>
          </ul>
        </li>
        <li>服务器
          <ul>
            <li>阿里云</li>
          </ul>
        </li>
      </ul>
      <hr/>
      <h3>数据处理部分</h3>
      <h4>数据源</h4>
      <ul>
        <li>爬取
          <div class="mdui-panel" mdui-panel style="margin: 10px">
            <div class="mdui-panel-item mdui-panel-item-open">
              <div class="mdui-panel-item-header"><code>tencent</code></div>
              <div class="mdui-panel-item-body">
            <pre>
      //table:
      //静态
      [name,src,nums,score,play]
      //xtable:
      //静态
      [time,label,description,name]</pre>
              </div>
            </div>

            <div class="mdui-panel-item mdui-panel-item-open">
              <div class="mdui-panel-item-header"><code>bilibili</code></div>
              <div class="mdui-panel-item-body">
            <pre>
      //table:
      //js
      [name,src,nums]
      //xtable:
      //静态
      [time,play,label,actor,description,name]</pre>
              </div>
            </div>

            <div class="mdui-panel-item mdui-panel-item-open">
              <div class="mdui-panel-item-header"><code>iqiyi</code></div>
              <div class="mdui-panel-item-body">
            <pre>
      //table:
      [name,src,nums]
      //xtable:
      if(!url.includes("a_")&&!url.includes("v_")){
        //既不是列表也不是播放的页面，目前只发现一个，https://www.iqiyi.com/dongman/dmj2014.html#vfrm=2-4-0-1
        //跳过这个解析下一个页面
      }else if(url.includes("a_")&&small){
        // 出现最多的情况，列表形式，小图
        //静态
        [time,label,description,play,name]
        //js
        [score]
      }else{
        if(url.includes("a_")&&!small){
          //列表形式，大图
          //静态
          [time,label,description,name];
          //js
          [score]
          //另一个js
          [play]
        }else if(url.includes("v_")){
          //播放形式
          //静态
          [time,label,description,name];
          //js
          [score]
          //另一个js
          [play]
        }
      }</pre>
              </div>
            </div>
          </div>
        </li>
        <li>数据源分析
          <ul>
            <li>数据分布
              <div >
                <img src="../../static/img/data.png" style="height: 400px;width: 600px"/>
              </div>
            </li>
            <li>数据完整性和准确性（不合格数据统计：）
              <div style="height: 10px;"></div>
              <div class="mdui-table-fluid">
                <table class="mdui-table mdui-table-hoverable">
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>description</th>
                    <th>nums</th>
                    <th>time</th>
                    <th>play</th>
                    <th>score</th>
                    <th>label</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>tencent</td>
                    <td>10</td>
                    <td>55</td>
                    <td>69</td>
                    <td>1</td>
                    <td>1</td>
                    <td>53</td>
                  </tr>
                  <tr>
                    <td>bilibili</td>
                    <td>0</td>
                    <td>12</td>
                    <td>0</td>
                    <td>4</td>
                    <td>225</td>
                    <td>41</td>
                  </tr>
                  <tr>
                    <td>iqiyi</td>
                    <td>78</td>
                    <td>75</td>
                    <td>0</td>
                    <td>9</td>
                    <td>35</td>
                    <td>8</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <h4>数据清洗</h4>
      <ul>
        <li>优先级评估</li>
        <li>融合方式
          <ul>
            <li><code>play</code>,<code>score</code>计算</li>
            <li><code>description</code>,<code>time</code>,<code>nums</code>优先级筛选</li>
            <li><code>label</code>保留原数据</li>
          </ul>
        </li>
        <li>噪声排查处理
          <ul>
            <li>优先使用其他数据源替换</li>
            <li>逻辑替换</li>
          </ul>
        </li>
      </ul>
      <hr/>
      <h3>附录</h3>
      <ul>
        <li>文档目录结构
          <pre>

          </pre>
        </li>
        <li>API接口
          <pre>
      //返回每一年的番剧数和播放量
      http://www.angeliz.info/test.php?type=time&value=all

      //返回某一年番剧的所有信息
      http://www.angeliz.info/test.php?type=time&value=[var]

      //返回每一个标签番剧的数量
      http://www.angeliz.info/test.php?type=label&value=all

      //返回某一个标签番剧的所有信息
      http://www.angeliz.info/test.php?type=label&value=[var]

      //返回播放量前n的番剧
      http://www.angeliz.info/test.php?type=play&value=[var]

      //返回评分前n的番剧
      http://www.angeliz.info/test.php?type=score&value=[var]

      //返回某一个番剧的详细信息
      http://www.angeliz.info/test.php?type=self&value=[var]
          </pre>
        </li>
      </ul>
      <hr/>
      <h3>写在后面</h3>
    </div>
  </div>
</template>
<script>
  import Appbar from '../components/Appbar.vue'
  export default {
    components: {Appbar},
    created () {
      this.getData()
    },
    methods: {
      getData () {
//        this.$api.get('/test.php?type=time', null, r => {
//          console.log(r);
//        })
      }
    }
  }

</script>
