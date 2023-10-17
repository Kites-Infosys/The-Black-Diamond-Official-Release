# The Black Diamond Official Source Code(Release 10.0.7)
 React Js + MongoDB + Node JS


#Server Requirements:
1. Ubuntu  20.04 LTS
2. Node Version v10.19.0
3. npm Version v6.14.4
4. MongoDB Version v3.6.8

#Configuration:
1. Edit dotenv file
2. Change domain & App Name
3. Relplace logo in /public and /src DIR
4. change sms api in  /src/controller/user.js file (its FAST2SMS API)

#Installation Guide Step by Step(COMMAND SHELL)
1. sudo apt update
2. sudo apt install npm
3. sudo apt install nginx
4. sudo apt install mongodb
5. Select your file DIR using cd command
6. sudo ufw allow 'Nginx Full'
7. sudo ufw allow 'Nginx HTTP'
8. sudo ufw allow 'Nginx HTTPS'
9. sudo ufw allow 7777/tcp
10. npm install pm2 -g
11. npm install
12. npm run build
13. pm2 start server.js
14. Point your domain to Port 7777
    (sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 7777)

				
#MongoDB Configuration
1. mongo
2. show dbs
3. use db
4. show collections
5. db.users.find().pretty()
6. db.users.updateOne({phone : "put your registered phone number here"},{$set : {admin : true}})
7. db.users.updateOne({phone : "put your registered phone number here"},{$set : {superAdmin : true}})
