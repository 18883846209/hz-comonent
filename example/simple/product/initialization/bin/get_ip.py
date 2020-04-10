#!/usr/bin/python
# coding=UTF-8

import requests 
import json
import os

result=os.popen("kubectl get node | grep -vi 'NAME'| awk '{print $1}'|head -1")
re=result.read()
url = "http://" + re.replace("\n","").replace(" ","") + ":6000/api/v1/minicloud/nodeip"
res = requests.get(url)



class D(object):
 
    def __init__(self,map):
        self.map = map
 
    def __setattr__(self, name, value):
        if name == 'map':
             object.__setattr__(self, name, value)
             return True
        print ('set attr called ',name,value)
        self.map[name] = value
 
    def __getattr__(self,name):
        v = self.map[name]
        if isinstance(v,(dict)):
            return (v)
        if isinstance(v, (list)):
            r = []
            for i in v:
                r.append(i)
            return (r)
        else:
            return (self.map[name])
        
    def __getitem__(self,name):
        return (self.map[name])
 
if __name__ == '__main__':
 
      # json转换成字典
      #实际上JSON就是Python中的字符串，所以在这里首先定义一个字符串充当从网络请求中得到的json
      json_obj='{"key1":[1,2,3],"key2":"str2"}' 
      # 注意json键值对的边界符只能用双引号
      t=json.loads(res.text.replace("-","_"))
 
      # 字典转换成自定义对象
      model = D(t)
      ip_list=[]
      for v in model.data:
         model2 = D(v)
         list2 = model2.net_devices
         for v2 in list2:
            v3 = D(v2)
            if v3.physical_network_card and not v3.management_network and v3.ip.strip()!='':
                ip_list.append(v3.ip)
                break
      if len(ip_list) > 0:
         print ip_list[0]
      else:
         print (model.host_ip)

