# Russian Model Color Prediction
Need Min 2gb Ram Vps ubuntu 20 lts. is preffered


1. Change .Env file Info
2. Change logo files
3. cd /var
4. git clone https://github.com/Kites-Infosys/predicts.git
5. cd predicts
6. npm install
7. npm install pm2 -g
8. pm2 start server.js
9. apt install mongodb
10. apt install nginx
11. sudo ufw allow 'Nginx Full'
12. npm run build
13. sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 7777







Mongoose COnfig
1.  mongo
2.  show dbs
3. use db
4. show collections
5. db.users.find().pretty()
6. db.users.updateOne({phone : "7002469058"},{$set : {admin : true}})
7. db.users.updateOne({phone : "7002469058"},{$set : {SuperAdmin : true}})
