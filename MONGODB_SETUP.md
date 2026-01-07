# MongoDB Setup Guide for Linux

## Step-by-Step Installation on Ubuntu/Debian

### 1. Import MongoDB GPG Key
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
```

### 2. Add MongoDB Repository
```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

**Note**: Replace `jammy` with your Ubuntu version:
- Ubuntu 24.04: `noble`
- Ubuntu 22.04: `jammy`
- Ubuntu 20.04: `focal`

### 3. Update Package Database
```bash
sudo apt-get update
```

### 4. Install MongoDB
```bash
sudo apt-get install -y mongodb-org
```

### 5. Start MongoDB Service
```bash
sudo systemctl start mongod
```

### 6. Enable MongoDB to Start on Boot
```bash
sudo systemctl enable mongod
```

### 7. Verify MongoDB is Running
```bash
sudo systemctl status mongod
```

You should see "active (running)" status.

### 8. Test MongoDB Connection
```bash
mongosh
```

This will open the MongoDB shell. Type `exit` to leave.

---

## For CentOS/RHEL/Fedora

### 1. Create Repository File
```bash
sudo nano /etc/yum.repos.d/mongodb-org-7.0.repo
```

Add the following content:
```
[mongodb-org-7.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/9/mongodb-org/7.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-7.0.asc
```

### 2. Install MongoDB
```bash
sudo yum install -y mongodb-org
```

### 3. Start and Enable MongoDB
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

## Configure MongoDB for Eden Rest Application

### 1. Access MongoDB Shell
```bash
mongosh
```

### 2. Create Database and User
```javascript
use edenrest

db.createUser({
  user: "edenrest_user",
  pwd: "your_secure_password_here",
  roles: [
    { role: "readWrite", db: "edenrest" }
  ]
})
```

### 3. Update Backend .env File
Edit `/app/backend/.env`:
```bash
MONGO_URL=mongodb://edenrest_user:your_secure_password_here@localhost:27017/edenrest
DB_NAME=edenrest
JWT_SECRET=your-random-secret-key-here
```

**Generate a secure JWT secret**:
```bash
openssl rand -hex 32
```

### 4. Restart Backend Service
```bash
sudo supervisorctl restart backend
```

---

## Quick Start (For Development - No Authentication)

If you're just testing locally and don't need authentication:

### 1. Install MongoDB
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2. Use Default Connection
Your current `.env` should work with:
```
MONGO_URL=mongodb://localhost:27017/edenrest
DB_NAME=edenrest
```

### 3. Verify Connection
```bash
mongosh
use edenrest
show collections
```

---

## Common MongoDB Commands

### Check MongoDB Status
```bash
sudo systemctl status mongod
```

### Start MongoDB
```bash
sudo systemctl start mongod
```

### Stop MongoDB
```bash
sudo systemctl stop mongod
```

### Restart MongoDB
```bash
sudo systemctl restart mongod
```

### View MongoDB Logs
```bash
sudo tail -f /var/log/mongodb/mongod.log
```

### Backup Database
```bash
mongodump --db edenrest --out /backup/mongo/
```

### Restore Database
```bash
mongorestore --db edenrest /backup/mongo/edenrest/
```

---

## Firewall Configuration (If Needed)

If you need to access MongoDB remotely:

### 1. Allow MongoDB Port
```bash
sudo ufw allow 27017/tcp
```

### 2. Edit MongoDB Config
```bash
sudo nano /etc/mongod.conf
```

Change bindIp:
```yaml
net:
  port: 27017
  bindIp: 0.0.0.0  # Warning: Use with authentication only!
```

### 3. Restart MongoDB
```bash
sudo systemctl restart mongod
```

---

## Troubleshooting

### MongoDB Won't Start
```bash
# Check logs
sudo tail -f /var/log/mongodb/mongod.log

# Check if port is already in use
sudo lsof -i :27017

# Check permissions
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown mongodb:mongodb /tmp/mongodb-27017.sock
```

### Connection Refused Error
```bash
# Verify MongoDB is running
sudo systemctl status mongod

# Check if listening on correct port
sudo netstat -plnt | grep 27017
```

### Out of Disk Space
```bash
# Check disk usage
df -h

# Clean old logs
sudo find /var/log/mongodb/ -type f -name "*.log.*" -delete
```

---

## Production Security Best Practices

1. **Always use authentication** in production
2. **Use strong passwords** (minimum 16 characters)
3. **Enable TLS/SSL** for encrypted connections
4. **Limit network exposure** (bind to localhost if possible)
5. **Regular backups** using mongodump
6. **Monitor logs** for suspicious activity
7. **Keep MongoDB updated** to latest stable version

---

## Verify Eden Rest Backend is Working

After setting up MongoDB, test the API:

```bash
# Check if backend is running
curl http://localhost:8001/api/

# Get rooms list
curl http://localhost:8001/api/rooms

# Check room availability
curl "http://localhost:8001/api/rooms/availability?roomType=double-1&checkIn=2025-01-10T00:00:00Z&checkOut=2025-01-12T00:00:00Z"
```

All set! Your Eden Rest application should now have persistent data storage with MongoDB.
