#!/bin/bash


#判断集群还是非集群
function judge_single_or_cluster() {
   num=$(kubectl get node|wc -l)
   if [[  "$num" -le 2 ]];then
       echo "single"
   else
       echo "cluster"
   fi
}
env_type=$(judge_single_or_cluster)

weiyun_path=/var/lib/restful/common/product/uninstall/mg-aw            #----待修改，这是进入到微云自带容器里面的路径，注意有uninstall-----
#config.properties配置文件路径,不用修改
public_config_path="$weiyun_path/initialization/install/install_${env_type}_config.txt"
#dynamic.properties配置文件路径，不用修改
public_dynamic_path="$weiyun_path/initialization/install/install_${env_type}_config.txt"



#前端配置文件路径
front_config_path="$weiyun_path/configFile/${env_type}/algorithm-warehouse-fe/index.js"                      #----待修改-----


#通过配置文件中的key获取value，参数1-被读取的文件   参数2-key
function get_value_by_key() {
   key=$2
   VER_TMP=$(grep "\<$key\>" $1)
   num=1
   len1=$((${#key}+$num))
   value=${VER_TMP:$len1}
   echo $value
}


#通过key设置value(仅对后端配置修改)     参数1-被设置文件的路径       参数2-key  参数3-value
function set_value_by_key() {
  #sed -i "/^$2\s*=/c$2=$3" $1
  path=$1
  key=$2
  value=$3
  value_replace=${value//\//\\/}    #坑货，必须要将请求路径中的/替换成\/,转义
  key=${key#*.}  #去除项目名字，保留后面的
  sed -i "/^${key}\s*=/c${key}=$3" $1
}

#通过key设置value(仅对前端公共配置修改)    参数1-被设置文件的路径       参数2-key  参数3-value
function set_front_config_value_by_key() {
  path=$1
  key=$2
  value=$3
  value_replace=${value//\//\\/}    #坑货，必须要将请求路径中的/替换成\/,转义
  front_key=${key#*.}  #去除项目名字，保留后面的
  sed -ri "/const ${front_key} = /s/(const ${front_key} = )\s*[^ ]+(;.*)/\1'$value_replace'\2/" $path
}

SHELL_FOLDER=$(cd "$(dirname "$0")";pwd)
hostIp=`python $SHELL_FOLDER/get_ip.py`


#针对特殊的配置修改，比如serverIp，ugisIp
function spec_config() {
   current_ip=$hostIp
   #替换前端的部署ip
   set_front_config_value_by_key $front_config_path 'serverIp' $current_ip
   

   #修改前端ugisIp
   ugisIp=$(get_value_by_key $public_config_path 'public.ugisIp')
   if [ "$ugisIp" == "0.0.0.0" ];then
       set_front_config_value_by_key $front_config_path 'ugisIp' $current_ip
   fi
}

spec_config

appId=`curl -s  http://$hostIp:6000/api/v2/vcloud/applications/name/mg-aw | grep -Po 'id[" :]+\K[^"]+'`             #------------mg-ac待修改-----------------
if [ -n "$appId" ];then
   echo "调用微云接口使配置生效"
   curl -s -X PUT http://$hostIp:6000/api/v2/vcloud/products/config_map/$appId
fi
