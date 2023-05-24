#!/bin/bash
screen -r CtxWhatsApp -X stuff "sudo kill -9 $(sudo lsof -t -i:1337)"$(echo -ne '\015')
screen -r CtxWhatsApp -X stuff "^C"$(echo -ne '\015')
screen -r CtxWhatsApp -X stuff "clear"$(echo -ne '\015')
screen -r CtxWhatsApp -X stuff "date"$(echo -ne '\015')
screen -r CtxWhatsApp -X stuff "yarn main"$(echo -ne '\015')
