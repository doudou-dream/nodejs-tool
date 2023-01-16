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

echo "1. 提交代码到暂存区"
echo "2. 提交代码到本地仓库"
echo "3. 提交代码到暂存区并提交到本地仓库"
echo "4. 提交代码到远程仓库"

# 参数-n的作用是不换行，echo默认是换行
echo -n "请输入要操作的序号:"
# 从键盘输入
read id
# 显示信息
if [ $id == 1 ]; then
    echo '1'
    git add .
elif [ $id == 2 ]; then
    echo '请输入本次提交的日志'
    read desc
    git commit -m $desc
elif [ $id == 3 ]; then
    echo '请输入本次提交的日志'
    read desc
    git commit -am $desc
elif [ $id == 4 ]; then
    echo '当前远程分支有：'
    git branch -r
    read -p "请输入远程仓库（默认为origin）" origin
    origin=${origin:- 'origin'}
    read -p "请输入提交分支（默认为:master）" master
    master=${master:- 'master'}
    git push $origin $master
else
    echo '输入有误'
fi
