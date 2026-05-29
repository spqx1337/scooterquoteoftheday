fetch('quotes.json')
    .then(response => response.json())
    .then(quotes => {
        // Aktuelles Datum holen
        const today = new Date();
        
        // Eindeutigen Seed generieren (z.B. 20260529)
        const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        
        // Index bestimmen, der immer sauber durchrotieren kann
        const index = dateSeed % quotes.length;
        const dailyQuote = quotes[index];

        // Zitat in den HTML-Container pushen
        document.getElementById('quote-text').textContent = `"${dailyQuote.text}"`;
        
        // String für Urheber und Songtitel zusammenbauen
        let songInfo = `— Scooter, ${dailyQuote.song}`;
        
        // Timestamp anhängen, falls in der JSON vorhanden
        if (dailyQuote.timestamp) {
            songInfo += ` [${dailyQuote.timestamp}]`;
        }
        
        document.getElementById('quote-song').textContent = songInfo;
    })
    .catch(error => {
        console.error('Error fetching quotes:', error);
        // Fallback für den Fall von CORS-Blockaden bei lokaler Ausführung ohne Server
        document.getElementById('quote-text').textContent = "\"How much is the fish?!\"";
        document.getElementById('quote-song').textContent = "— Scooter, System-Error [00:00]";
    });