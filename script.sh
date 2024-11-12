git pull origin main
npm install
pm2 restart portfolio-server || pm2 start server.js --name "portfolio-server"