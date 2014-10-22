# neste møte 14:00 fredag 17. okt

# oppgaver
## torgeir
- send mail om teams
- lag bekk-repo
- sett opp browserify, less
- legg inn openlayers, leaflet
- branch for løsningsforslag
- legg ved fylker.json og kommuner.json
- finn kule data

## rolf
- forske på leaflet med utm33
- lage slides for teori?
- finn kule data
- skriv confluence-dokument

--

# teori

## hva er gis?

## bakgrunnskart

### oppgaver
- få opp et bakgrunnskart
- vise to bakgrunnskart i forskjellige projeksjoner
- vise ett med leaflet (web mercator)
- vise ett med openlayers (utm33)
- hvorfor ser norge forskjellige ut i kartene?

## muligheter med en kartkomponent

- enkelt vise forskjellige typer data, layers, features, geojson
- finne min lokasjon
- få lat lon basert på klikk i kart
- vise markers
- gruppere markers i layers
- zoome

### oppgaver

- vis min posisjon i kart
- legg til en marker der jeg er
- vis popup med tekst "Her er jeg!"
- zoom til et passende nivå

## kort om data

Formater

- forskjell på raster og vector
- features, kan ha mer informasjon enn bare lat lon, navn etc.
- geojson
- lat lon
- x y

### oppgaver

TODO finn lenke

- vis data fra et feature-lag i leaflet
- vis data fra et feature-lag i openlayers

## projeksjoner og konvertering mellom de
- hva er datum
- epsg-koder (wgs)
- ersi

### oppgaver

TODO enkle lenker til features i forskjellige koordinatsystem

- vise noe data som har riktig koordinatsystem i openlayers
- vis samme data i leaflet, som krever en annen projeksjon

## datakilder

Datakilder kan være

- rest api
- geoserver
- geowebcache
- arcgis
- bekk ansatte bosted?

TODO artige datakilder
- ssb - http://data.ssb.no/api/
- vegkart - http://vegvesen.no/nvdb/api/

Gå gjennom

- geoserver
- rest api

### oppgaver

TODO her må vi lage oppgaver tilhørende hvert av datakildene og legge til rette for det i javascriptklienten (ajax ++)


# Extras, for de raske

## clustring av data?
## styling
## vise fylker og kommuner som er klikkbare
## vise obskure stats for forskjellige fylker kommuner
## tegning i kart, ta vare på geometrien
## vise bilder i kart, flickr?
## vis de siste 10 tweetsa i området i nræheten av deg
## finn offentlige toalett i nærheten

## hvilke kart?
- kartverket (åpent gråtonekart, kan hente bakgrunnskart i utm33 så vi får en annen projeksjon)
- open street maps 3
