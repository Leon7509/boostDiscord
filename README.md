# Ticket-Bot
Semplice bot discord discord.js v13


# Comandi
```
/aggiungi (Aggiungere qualcuno al ticket)
/rimuovi (Rimuovere qualcuno al ticket)
/setup (Crea il messaggio)
```

# Come installare?
```
npm install
```

# Come startare?
```
node .
node index.js
```
# Config?
```
{
    "bot": {
        "token": "token bot",
        "clientid": "client id bot",
        "nomebot": "nome bot"
    },

    "server": {
        "idguild": "id discord",
        "nomeserver": "nome server"
    },

    "ruoli": {
        "staffgen": "id ruolo staff"
    },

    "stanze": {
        "ticket": {
            "scelta": "categoria id",
            "generale": "categoria id",
            "fazioni": "categoria id",
            "donazioni": "categoria id",
            "rimborsi": "categoria id",
            "ban": "categoria id"
        },

        "log": {
            "transcript": "id canale transcripts"
        }
    }

}
