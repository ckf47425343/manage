下载xshell: 用于远程连linux系统的命令工具


查看当前文件夹
pwd

linux: sudo超级管理员, 具有最高权限

更新ubuntu apt-get 源
sudo apt-get update 

安装nodejs
sudo apt-get install nodejs

安装npm
sudo apt-get install npm

安装nodejs版本管理工具n
sudo npm install -g n

更新nodejs
安装稳定版本的node
sudo n stable

查看nodejs版本
sudo node -v

更新npm
sudo npm install npm -g

查看npm版本
sudo npm -v

ubuntu18.04安装服务器版本的 mysql8.0
1、先使用 wget 下载存储库软件包：
wget -c https://dev.mysql.com/get/mysql-apt-config_0.8.15-1_all.deb


2、然后使用以下 dpkg 命令安装下载好的 MySQL 存储库软件包 (注意换成你的版本)
sudo dpkg -i mysql-apt-config_0.8.15-1_all.deb
执行过程中出现弹窗，选择ok

3、更新apt源
sudo apt update

4、安装mysql8.0
sudo apt install mysql-server

5、输入密码，选择mysql5.x加密方式

登录mysql
mysql -u root -p


6、使用navicat for mysql图形界面工具远程连接阿里云服务器的mysql

使用xshell连接阿里云服务器的mysql
mysql -u root -p
输入密码

选择mysql数据库
use mysql;

设置root用户连接
update user set host='%' where user='root';

更新权限
flush privileges;

退出mysql
exit;

重启mysql
service mysql restart;

打开navicat for mysql图形界面工具远程连接阿里云mysql服务器


开发时
使用nodemon启动服务器
sudo npm i nodemon -g

启动服务器文件
nodemon 服务器入口文件

生产时
使用pm2启动服务器
sudo npm i pm2 -g

启动服务器文件
pm2 start 服务器入口文件


停止服务器文件
pm2 stop 服务器入口文件


开发测试服务器
	sudo npm i nodemon -g

	启动服务器
	nodemon 服务器入口文件

生产服务器, 如果出现错误，会在0s内重启
	sudo npm i pm2 -g

	启动服务器
	pm2 start 入口文件

	停止服务器
	pm2 stop 入口文件

	重启服务器
	pm2 restart 入口文件





	其他

	xshell断开远程连接
	ctrl + alt + ]

	修改文件名
	mv 旧的文件名 新的文件名

	启动mysql
	service mysql start

	停止mysql
	service mysql stop

	重启mysql
	service mysql restart


删除
rm -rf 文件夹名