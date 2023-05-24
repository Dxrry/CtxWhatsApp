import fs from 'fs';
import path from 'path';
import multer from 'multer';
import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';

// Multer Configuration
const diskStorage = multer.diskStorage({
	destination: function (req: any, file: any, cb: (arg0: null, arg1: string) => void) {
        cb(null, path.join(__dirname, "/SendFileLogs"));
	},
	filename: function (req: any, file: { originalname: string; }, cb: (arg0: null, arg1: string) => void) {
        cb(
            null,
            path.basename(file.originalname, path.extname(file.originalname)) + "-" + Date.now() + path.extname(file.originalname)
        );
	},
});

export function startExpressJs(sock: { sendMessage: (arg0: string, arg1: any) => Promise<any>; }, store: any) {
    const app: Application = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.text({ type: 'text/html' }));
    
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World');
    });

    // SendMsg to USER
    app.post('/:userNumber/SendMsgToUser', (req, res) => {
        const sendToClient: { [key: string]: any } = {};
        const chatId: string = req.params.userNumber;
        const chatText: string = Object.keys(req.body)[0];
        let clientId: string = (chatId + '@s.whatsapp.net');
        
        const fuckChatText = chatText
            .replace(/\\n/g, "\n")
            .replace(/\\t/g, "\t")
            .replace(/\\r/g, "\r");

        sendToClient.error = false;
        sock.sendMessage(clientId, { text: fuckChatText }).then((response: any) => {
            if (!response) {
                sendToClient.error = true;
            }
        });

        
        sendToClient.receiverInfo = {};
        sendToClient.receiverInfo.chatId = chatId;
        sendToClient.receiverInfo.chatIdFormated = clientId;
        sendToClient.receiverInfo.chatText = chatText;
      
        res.send(sendToClient);
    });

    // SendFile to User
    app.post('/:userNumber/SendFileToUser', multer({ storage: diskStorage }).single('file'), (req, res) => {
        const sendToClient: { [key: string]: any } = {};
        const chatId: string = req.params.userNumber;
        let clientId: string = (chatId + '@s.whatsapp.net');

        sendToClient.error = false;
        if(req.file) {
            const file = req.file.path;
            const fileName = path.basename(file);
            const fileNameWithoutTimestamp = fileName.replace(/\-\d+\./, '.');

            sock.sendMessage(clientId,
                {
                    document: {
                        stream: fs.createReadStream(file)
                    },
                    mimetype: "application/octet-stream",
                    fileName: fileNameWithoutTimestamp
                }
            ).then(function(response) {
                if(!response) {
                    sendToClient.error = true;
                }
            }).finally(() => {
                fs.unlink(file, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            });            
        }
        
        sendToClient.receiverInfo = {};
        sendToClient.receiverInfo.chatId = chatId;
        sendToClient.receiverInfo.chatIdFormated = clientId;
        sendToClient.receiverInfo.chatText = "File Docs";
      
        res.send(sendToClient);
    });

    app.listen(1337, () => {
        console.log('Express app listening on port 1337');
    });
}

export default startExpressJs;
