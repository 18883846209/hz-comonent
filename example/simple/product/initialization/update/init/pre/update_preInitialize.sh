#!/bin/bash

#各个服务通用
#1.#添加端口范围到微云compent.json文件
weiyun="/var/lib/restful/common/src/"
mg_str='\"mg-wr\": \"9999-9999\",'                 #--------------待修改-----------------------
vcloud_backend_name=`kubectl get pod | grep vcloud-ui | awk '{print $1}'`
kubectl exec -it $vcloud_backend_name -c vcloud-ui-backend-celery-ctr -- /bin/bash -c "sed -i \"/$mg_str/d\" $weiyun/component.json"
kubectl exec -it $vcloud_backend_name -c vcloud-ui-backend-celery-ctr -- /bin/bash -c "sed -i \"2i\ \ $mg_str\" $weiyun/component.json"



#2.修改配置文件
SHELL_FOLDER=$(dirname $(readlink -f "$0"))
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


#config.properties配置文件路径,不用修改
public_config_path="${SHELL_FOLDER}/../../install_${env_type}_config.txt"
#dynamic.properties配置文件路径，不用修改
public_dynamic_path="${SHELL_FOLDER}/../../install_${env_type}_config.txt"  


#前端配置文件路径
front_config_path="${SHELL_FOLDER}/../../../../configFile/${env_type}/mobile-war-room-fe/index.js"                 #----待修改-----


#前后端每个配置项前面加上项目名字以便区分
project_name="mobile-war-room"   #--------待修改------!!!!!后面不要加上 -be 或者 -fe


#前端在config.properties中的配置项的key
public_front_config_items=""
#前端在dynamic.properties配置文件中的配置key
dynamic_front_config_items="${project_name}.appStatus"


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

#通过key设置value(仅对前端非公共配置修改)    参数1-被设置文件的路径       参数2-key  参数3-value
function set_front_value_by_key() {
  path=$1
  key=$2
  value=$3
  value_replace=${value//\//\\/}    #坑货，必须要将请求路径中的/替换成\/,转义
  front_key=${key#*.}  #去除项目名字，保留后面的
  sed -ri "/${front_key}:/s/(${front_key}:)\s*[^ ]+(,.*)/\1'$value_replace'\2/" $path
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

#修改配置, 参数1外层配置文件路径  参数2-配置文件的类型，1-dynamic,2-公共的config 参数3- 1-修改前端，2-修改后端  参数4-需要覆盖的配置参数名
function cover_config() {
     if [ $2 == 1 ];then    #dynamic类型
           for arg in $*
           do
              if [ $public_dynamic_path != $arg -a 1 != $arg -a 2 != $arg ];then   #排除前两个参数
                 value=$(get_value_by_key $public_dynamic_path $arg)
                 if [ $3 == 2 ];then
                   set_value_by_key $appilcation_config_path $arg "$value"    #修改后端配置
                 elif [ $3 == 1 ];then
                   set_front_value_by_key $front_config_path $arg "$value"    #修改前端配置
                 fi
              fi
           done
     elif [ $2 == 2 ];then  #公共配置类型
           for arg in $*
           do
              if [ $public_config_path != $arg -a 2 != $arg -a 1 != $arg ];then   #排除前两个参数
                 value=$(get_value_by_key $public_config_path $arg)
                 if [ $3 == 2 ];then
                   set_value_by_key $appilcation_config_path $arg "$value"    #修改后端配置
                 elif [ $3 == 1 ];then
                   set_front_config_value_by_key $front_config_path $arg "$value"    #修改前端配置
                 fi
              fi
           done
     fi
}

hostIp=`python $SHELL_FOLDER/../../../bin/get_ip.py`


#针对特殊的配置修改，比如serverIp，ugisIp
function spec_config() {
   current_ip=$hostIp
   #替换前端的部署ip
   set_front_config_value_by_key $front_config_path 'serverIp' $current_ip
   #替换后端的部署ip
   set_value_by_key $appilcation_config_path 'serverIp' $current_ip
 
   #修改前端ugisIp
   ugisIp=$(get_value_by_key $public_config_path 'public.ugisIp')
   if [ "$ugisIp" == "0.0.0.0" ];then
       set_front_config_value_by_key $front_config_path 'ugisIp' $current_ip
   fi
}

#初始化
function init() {
    #1.修改配置
    # cover_config $public_dynamic_path 1 2 $dynamic_backend_config_items #覆盖dynamic配置，后端
    # cover_config $public_dynamic_path 1 1 $dynamic_front_config_items   #覆盖前端dynamic配置
    # cover_config $public_config_path 2 2 $public_backend_config_items   #覆盖公共配置，后端
    # cover_config $public_config_path 2 1 $public_front_config_items     #覆盖公共配置，前端
    # spec_config

    
    # #2.导入菜单、API网关
    # import_menu=$(get_value_by_key $public_config_path 'import_menu')
    # for_VCBR=$(get_value_by_key $public_config_path 'for_VCBR')
    # sh $SHELL_FOLDER/../../../bin/import.sh $import_menu $for_VCBR
}


#安装前初始化
init