system_os="$(uname)"
if [ $system_os == "Darwin" ]; then
    echo "Do something under Mac OS X platform"
elif [ ${system_os:0:5} == "Linux" ]; then
    echo "Do something under GNU/Linux platform"
elif [ "${system_os:0:10}" == "MINGW32_NT" ]; then
    echo "Do something under 32 bits Windows NT platform"
elif [ "${system_os:0:10}" == "MINGW64_NT" ]; then
    echo "Do something under 64 bits Windows NT platform"
fi

# 展示文件夹
function ls_dir {
    for dir in $(ls ./); do
        [ -d $dir ] && echo $dir
    done
}
# 拷贝文件
function cp_run_sh {
    for dir in $(ls ./); do
        [ -d $dir ] && cp ./run.sh ./$dir
    done
}

# 进入文件夹
function entry_dir {
    for dir in $(ls ./); do
        [ -d $dir ] && cd ./$dir
        [ -d $dir ] && break
    done
}
echo "当前运行目录:"$(
    cd $(dirname $0)
    pwd
)
sshrun=true
while $sshrun; do

    echo "1. 提交代码到暂存区"
    echo "2. 提交代码到本地仓库"
    echo "3. 提交代码到暂存区并提交到本地仓库"
    echo "4. 提交代码到远程仓库"
    echo "5. 查看当前代码状态"
    echo "6. 拉取远程分支到本地"
    echo "7. 创建新仓库到当前路径"
    echo "q. 退出"

    # 参数-n的作用是不换行，echo默认是换行
    echo -n "请输入要操作的序号:"
    # 从键盘输入
    read id
    # 显示信息
    if [ $id == 1 ]; then
        git add .
    elif [ $id == 2 ]; then
        read -p "请输入本次提交的日志" desc
        git commit -m $desc
    elif [ $id == 3 ]; then
        read -p "请输入本次提交的日志" desc
        git commit -am $desc
    elif [ $id == 4 ]; then
        echo '当前远程分支有：'
        git branch -r
        read -p "请输入远程仓库（默认为origin）" origin
        origin=${origin:- 'origin'}
        read -p "请输入提交分支（默认为:master）" master
        master=${master:- 'master'}
        git push $origin $master
    elif [ $id == 5 ]; then
        git status
    elif [ $id == 6 ]; then
        echo '当前远程分支有：'
        git branch -r
        read -p "请输入远程仓库（默认为origin）" origin
        origin=${origin:- 'origin'}
        read -p "请输入拉取分支（默认为:master）" master
        master=${master:- 'master'}
        git pull $origin $master
    elif [ $id == 7 ]; then
        read -p "请输入远程仓库地址：" url
        git clone $url
        echo '目录：'
        ls_dir
        cp_run_sh
        echo '1. cd 目录名 进入项目'
        echo '2. 进入项目后运行sh run.sh'
        entry_dir
    elif [ $id == q ]; then
        echo '退出'
        exit
    else
        echo '输入有误'
    fi
    read -p "回车继续操作."
done
