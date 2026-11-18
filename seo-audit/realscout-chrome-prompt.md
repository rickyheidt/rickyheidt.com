Use Claude in Chrome to build neighborhood search links in my RealScout agent account. I'm already logged in at realscout.com in Chrome. Work in a new tab.

GOAL
My website has 35 neighborhood pages. For each neighborhood, I need one public RealScout search link that opens already filtered to that neighborhood, showing homes for sale. At the end, give me a list of every neighborhood and its link.

HOW TO MAKE EACH LINK (try in this order)

1. Quick Search Link (try this first)
   Go to Marketing > Shareable Links > Quick Search Link.
   Type the neighborhood name in the location box ("City, Neighborhood or Zip Code").
   - If RealScout suggests a match that is clearly the right place (for example "North Park, San Diego" or the city "Carlsbad"), select it. Leave price, beds and baths blank, and set For Sale only.
   - Open the preview and make sure the listings really are in that neighborhood.
   - If it looks right, copy the link and record it. Done.
   - If there is no match, or the only match is the wrong place or a whole ZIP code that is much bigger than the neighborhood, DO NOT use it. Go to step 2.

2. Drawn shape plus Advanced Search Link (only if step 1 fails)
   a. Go to Search. Expand "School & Location Boundaries". Under "Drawn Map Shapes", click "Select shapes or draw on the map", then use the pencil icon in the top right of the map and choose "Draw a polygon".
   b. Draw the neighborhood boundary using commonly accepted borders (major streets, freeways, canyons, coastline). Close the shape by clicking the starting point. Set For Sale only, with no price, bed or bath limits.
   c. STOP AND SHOW ME the drawn shape (a screenshot plus the streets you used as borders) and wait for my OK before saving. I want to approve every boundary.
   d. Once I approve it, click "Save as Template". Name it "Website: <Neighborhood>" (for example "Website: North Park"). For the tag, enter "Web: <Neighborhood>". Choose the least frequent alert schedule offered.
   e. Go to Marketing > Shareable Links > Advanced Search Link (it may be called Search Links > + Create Search Link). Choose the "Website: <Neighborhood>" template. Set the public display name to "<Neighborhood> Homes for Sale". Add the tag "Web: <Neighborhood>" if asked. Click Create Search Link and copy the URL.
   f. Use "View Search Criteria" or the preview to confirm the link shows the right area.

If the Advanced Search Link option doesn't exist in my account, stop and tell me before drawing any shapes.

RULES
- Don't delete or edit any existing searches, templates, links or contacts.
- Don't create alerts for contacts or send anything to anyone.
- Avoid anything that triggers a pop-up confirmation dialog. If you must, warn me first.
- If something fails 2 or 3 times, stop and tell me what happened. Don't keep retrying.
- Do the city/town ones first (they should be quick), then the San Diego neighborhoods.

NEIGHBORHOODS (name | main ZIP | my page)
Cities and towns, a Quick Link will likely work:
Del Mar | 92014 | del-mar
Solana Beach | 92075 | solana-beach
Encinitas | 92024 | encinitas
Carlsbad | 92008 | carlsbad
Oceanside | 92054 | oceanside
Rancho Santa Fe | 92067 | rancho-santa-fe
Poway | 92064 | poway
Escondido | 92025 | escondido
San Marcos | 92078 | san-marcos
Vista | 92081 | vista
Fallbrook | 92028 | fallbrook
Bonsall | 92003 | bonsall
Coronado | 92118 | coronado
La Jolla | 92037 | la-jolla

San Diego neighborhoods, try the Quick Link first, then draw a shape if needed:
Downtown San Diego | 92101 | downtown-san-diego
Little Italy | 92101 | little-italy
Hillcrest | 92103 | hillcrest
North Park | 92104 | north-park
South Park | 92104 | south-park
University Heights | 92116 | university-heights
Normal Heights | 92116 | normal-heights
Kensington | 92116 | kensington
City Heights | 92105 | city-heights
Mission Valley | 92108 | mission-valley
Pacific Beach | 92109 | pacific-beach
Mission Beach | 92109 | mission-beach
Ocean Beach | 92107 | ocean-beach
Point Loma | 92106 | point-loma
Carmel Valley | 92130 | carmel-valley
University City | 92122 | university-city
Clairemont | 92117 | clairemont
Mira Mesa | 92126 | mira-mesa
Rancho Bernardo | 92127 | rancho-bernardo
Rancho Peñasquitos | 92129 | rancho-penasquitos
Scripps Ranch | 92131 | scripps-ranch

FINAL OUTPUT
When done, or if I tell you to stop, give me this list as plain text, one line per neighborhood:
page | Neighborhood | method (quick or shape) | URL
For example:
north-park | North Park | shape | https://porchlight964.realscout.com/...
Mark any neighborhood you skipped or couldn't finish as TODO with the reason.
