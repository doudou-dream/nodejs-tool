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
echo "3. 提交代码到远程仓库"

# 参数-n的作用是不换行，echo默认是换行
echo -n "请输入要操作的序号:"
# 从键盘输入
read id
# 显示信息
if [ $id == "1" ]; then
    echo '1'
    git add .
elif [ $id == '2' ]; then
    echo '2'
    read desc
    git commit -m $desc
elif [ $id == '3' ]; then
    echo '3'
else
    echo '输入有误'
fi
