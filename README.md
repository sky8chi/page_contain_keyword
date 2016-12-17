# page_contain_keyword

用于检查少量网站渲染后是否包含指定关键词

(一) 环境

http://phantomjs.org/download.html

 1 . 下载安装phantomjs
 
 (二) 运行
  
  参数一：关键词文件 按行分隔
  
  参数二：url文件  按行分隔
  
  参数三：输出文件  url   （请求失败|无|匹配关键词）
  
  参数四：给予浏览器渲染的时间（单位：s）
  
  1 . windows： 
   cmd 进入安装目录 D:\software\phantomjs-2.1.1-windows\bin
   
   执行：phantomjs keyword.js d:/temp/keyWord.txt d:/temp/readUrl.txt d:/temp/result.txt 10
   
  2 . linux:
   cd 安装目录/phantomjs/bin
   
   执行./phantomjs keyword.js ./keyWord.txt ./readUrl.txt ./result.txt 20
