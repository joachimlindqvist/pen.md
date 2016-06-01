# TODO

* ~~rails 5~~
* ~~monospace textarea~~
* markdown cheat sheet
* automatiskt 100% height på writing pad och render pad
* ladda ner-knapp
  * möjlighet att ladda ner i flera format
    * markdown
    * pdf
    * word
* presentationsvy
  * sockets för att uppdatera presentationen i realtid
* bättre flöde för sparande av dokumentet. ~~spara en gång först sen sker det automatiskt när man skriver något?~~ funkar, men inte 100%-igt
* visa när senaste sparningen gjordes
* ~~spara 1000ms efter senaste ändringen~~
* slå ihop flera chunks och skicka 250ms efter sista knapptrycket. tvinga skickande
 efter 500ms.
* ~~skapa egna kanaler för varje dokument. just nu använder alla dokument samma kanal.~~
* ~~möjliggör sparande av nya dokument~~
* om någon joinar ett dokument någon annan skriver i men inte ha sparat måste
  de osparade förändringarna på något sätt visas för den nya deltagaren.
* DocumentStore.num_actions fungerar inte 100%igt. man måste på något sätt
  ta hänsyn till senaste uppdateringen när update.order sätts. (fixat?)
* Markören hoppar längst ner i dokumentet när någon annan användare än en själv skriver.
