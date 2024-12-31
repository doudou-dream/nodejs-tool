import os
import subprocess
import shutil

def get_modified_files():
    # 使用 Git 获取最新提交中修改的文件列表
    result = subprocess.run(['git', 'log', '-n', '1', '--name-only', '--pretty=format:'], stdout=subprocess.PIPE, text=True)
    files = result.stdout.strip().splitlines()
    return files

def copy_files_to_new_dir(files, new_dir):
    # 遍历每个文件，复制到目标目录
    for file in files:
        if os.path.exists(file):  # 确保文件存在
            destination = os.path.join(new_dir, file)
            dest_dir = os.path.dirname(destination)

            # 创建目标目录，如果不存在
            os.makedirs(dest_dir, exist_ok=True)

            # 复制文件
            shutil.copy(file, destination)
            print(f"复制文件: {file} 到 {destination}")
        else:
            print(f"文件 {file} 不存在，跳过复制")

def main():
    # 获取最新提交修改的文件列表
    files = get_modified_files()
    print(files)
#     files = 'file_list.txt'
    # 目标目录
    new_dir = 'new_dir'

    # 创建目标目录
    if not os.path.exists(new_dir):
        os.makedirs(new_dir)

    # 将文件复制到目标目录
    copy_files_to_new_dir(files, new_dir)

if __name__ == '__main__':
    main()
