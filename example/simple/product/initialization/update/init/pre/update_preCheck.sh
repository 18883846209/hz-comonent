#!/bin/bash


function check_deploy_is_ok()
{
        ret_curl=$(curl http://${master_ip}:8080/apis/apps/v1/namespaces/default/$1/$2)
        if [ $? -ne 0 ]; then
                echo "the crul operaton error: $1, $2"
                return 1
        fi

        if [ $(echo ${ret_curl}|jq '.code') != 'null' ];then
                echo "the $1 $2 has not been created"
                return 1
        else
                replicas=$(echo ${ret_curl}|jq '.spec.replicas')
                readyreplicas=$(echo ${ret_curl}|jq '.status.readyReplicas')
                if [ "X${3}" = "X" ]; then
                        if [ ${replicas} == ${readyreplicas} ]; then
                                echo 'ready'
                                return 0
                        else
                                echo 'notReady'
                                return 1
                        fi
                else
                        que=$3
                        let replicas_2=replicas-que
                        if [ ${replicas_2} -le ${readyreplicas} ]; then
                                echo 'ready'
                                return 0
                        else
                                echo 'notReady'
                                return 1
                        fi
                fi
        fi
        return 1
}

function check_zookeeper_is_ok()
{
        if check_deploy_is_ok statefulsets zookeeper; then
                return 0
        fi

        count=0
        if check_deploy_is_ok statefulsets st-zoo1; then
                let count+=1
        fi
        if check_deploy_is_ok statefulsets st-zoo2; then
                let count+=1
        fi
        if check_deploy_is_ok statefulsets st-zoo3; then
                let count+=1
        fi
        if [ $count -ge 2 ]; then
                return 0
        fi
        return 1
}


for i in $(seq 1 10)
do
        init_check_key=init_check_${i}
        init_check_value=$(eval echo '$'"$init_check_key")

        if [ "X${init_check_value}" = "X" ]; then
                echo "${init_check_key} is empty, the init check stop"
                break
        else
                while true
                do
                        sleep 5
                        type_pod_arr=(${init_check_value//;/ })
                        echo ${type_pod_arr[*]}
                        length=${#type_pod_arr[@]}
                        if [ $length -ge 2 -a ${type_pod_arr[0]} == "statefulsets" -a ${type_pod_arr[1]} == "zookeeper" ]; then
                                echo "start check the pod state: ${type_pod_arr[*]}"
                                if ! check_zookeeper_is_ok; then
                                        echo "the pod ${type_pod_arr[*]} is not ready"
                                        continue
                                else
                                        echo "the pod ${type_pod_arr[*]} is all ready"
                                        break
                                fi
                        fi

                        if [ $length -eq 2 -o $length -eq 3 ]; then
                                echo "start check the pod state: ${type_pod_arr[*]}"
                                if ! check_deploy_is_ok ${type_pod_arr[*]}; then
                                        echo "the pod ${type_pod_arr[*]} is not ready"
                                        continue
                                else
                                        echo "the pod ${type_pod_arr[*]} is all ready"
                                        break
                                fi
                        else
                                echo "the value type is error: ${init_check_value}"
                                break
                        fi
                done
        fi
done


