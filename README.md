# CtxWhatsApp | Simple WhatsApp API With Express
### Tested On
* NodeJS v18.15.0
* NPM v9.5.0
* Yarn v1.22.19 (npm install --global yarn)


### Reminder
First of all, you must clone or downloads this repository by executes command of 
```bash
https://github.com/Dxrry/CtxWhatsApp
```

### Installation
1. Pastikan kamu berada didalam folder Repository (CtxWhatsApp)
```bash
λ ~/CtxWhatsApp/ npm install --global yarn # if you not have yarn
λ ~/CtxWhatsApp/ yarn
```

2. Jalankan program
```bash
λ ~/CtxWhatsApp/ yarn main
```



# Usage
### Send Messages
* Send Message to User
```bash
λ ~/CtxWhatsApp/ curl "http://localhost:1337/628588000000/SendMsgToUser" -X POST -d "Hello Fucking World"
```
### Send File (application/octet-stream)
* Send File to User
```bash
λ ~/CtxWhatsApp/ curl "http://localhost:1337/628588000000/SendFileToUser -F "file=@FxxckingFiles.zip"
```

# Addtional
### Enable Cron
1. Buat screen bernama CtxWhatsApp
```bash
λ ~/CtxWhatsApp/ screen -S CtxWhatsApp
```
2. Exit screen (CTRL + A+D)
3. Execute CronForRelogin.sh
```bash
λ ~/CtxWhatsApp/ bash CronForRelogin.sh
```
4. Add "Command For Execute CronForRelogin.sh" to cron (crontab -e)
