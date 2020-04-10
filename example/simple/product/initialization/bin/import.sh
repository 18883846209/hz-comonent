#!/bin/bash
SHELL_FOLDER=$(cd "$(dirname "$0")";pwd)
hostIp=`python $SHELL_FOLDER/get_ip.py`


#导入菜单
function import_menu() {
  SHELL_FOLDER=$(cd "$(dirname "$0")";pwd)
  #导入菜单
  #当前服务器ip
  current_ip=$hostIp
  #当前脚本路径
  if [ ! -f $SHELL_FOLDER/$1 ];then
     return
  fi
  #导入菜单
  echo "正在导入$project_name菜单..."
  result=$(curl -s http://$current_ip:80/api/infra-uuv/v0.1/applications/menus/import -F "file=@$SHELL_FOLDER/$1" -H "user: usercode:admin&username:admin" -v)
  re=$(echo $result | grep "total_num")
  num=0
  while [ -z "$re" ]
  do
    sleep 5
    result=`curl -s http://$current_ip:80/api/infra-uuv/v0.1/applications/menus/import -F "file=@$SHELL_FOLDER/$1" -H "user: usercode:admin&username:admin" -v`
    re=$(echo $result | grep "total_num")
    num=$(($num+1))
    echo "导入$project_name菜单第$num次重试..."
    if [ $num == 5 ];then
        echo "导入$project_name菜单失败！请手动导入..."
        exit 0
    fi
  done
}


#导入api_group
function import_api_group() {
  #导入菜单
  #当前服务器ip
  current_ip=$hostIp
  #当前脚本路径
  SHELL_FOLDER=$(cd "$(dirname "$0")";pwd)
  if [ ! -f $SHELL_FOLDER/api_group.xls ];then
     exit
  fi

  #导入菜单
  echo "正在导入API分组..."
  result=$(curl -s http://$current_ip:11124/api/bss/v1/gateway-manager/groups/import -F "file=@$SHELL_FOLDER/api_group.xls" -H "user: usercode:admin&username:admin" -v)
  re=$(echo $result | grep "total_num")
  num=0
  while [ -z "$re" ]
  do
    sleep 5
    result=`curl -s http://$current_ip:11124/api/bss/v1/gateway-manager/groups/import -F "file=@$SHELL_FOLDER/api_group.xls" -H "user: usercode:admin&username:admin" -v`
    re=$(echo $result | grep "total_num")
    num=$(($num+1))
    echo "导入API分组第$num次重试..."
    if [ $num == 5 ];then
        echo "导入API分组失败！请手动导入..."
        exit 0
    fi
  done
}



#导入api_menu
function import_api_menu() {
  #导入菜单
  #当前服务器ip
  current_ip=$hostIp
  #当前脚本路径
  SHELL_FOLDER=$(cd "$(dirname "$0")";pwd)
  if [ ! -f $SHELL_FOLDER/$1 ];then
     exit
  fi

  #导入菜单
  echo "正在导入API管理..."
  result=$(curl -s http://$current_ip:11124/api/bss/v1/gateway-manager/apis/import -F "file=@$SHELL_FOLDER/$1" -H "user: usercode:admin&username:admin" -v)
  re=$(echo $result | grep "total_num")
  num=0
  while [ -z "$re" ]
  do
    sleep 5
    result=`curl -s http://$current_ip:11124/api/bss/v1/gateway-manager/apis/import -F "file=@$SHELL_FOLDER/doc/$1" -H "user: usercode:admin&username:admin" -v`
    re=$(echo $result | grep "total_num")
    num=$(($num+1))
    echo "导入API管理第$num次重试..."
    if [ $num == 5 ];then
        echo "导入API管理失败！请手动导入..."
        exit 0
    fi
  done
}

#自动导入，非作战室
if [[ "$1" -eq 1 && "$2" -eq 0 ]];then
   import_menu menu.xlsx
elif [[ "$1" -eq 1 && "$2" -eq 1 ]];then
   import_menu menu_vcbr.xlsx
fi
import_api_group
import_api_menu api_menu.xls

#非综合主题 下面的代码删除
num=$(kubectl get node|wc -l)
if [ "$num" -le 2 ];then
  echo "单机版本导入"
  import_api_menu api_menu_algo_single.xls
else
  echo "集群版本导入"
  import_api_menu api_menu_algo_cluster.xls
fi








