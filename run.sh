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
