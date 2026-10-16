RICKY HEIDT REALTOR WEBSITE
===========================

WHAT'S IN THIS FOLDER
  site/                 The website itself (pages, styles, images, effects)
  netlify/functions/    The Follow Up Boss connection (runs on Netlify, not in the browser)
  netlify.toml          Tells Netlify where the site and the connection live

GO LIVE (free, about 10 minutes, no coding)
Use GitHub so the Follow Up Boss connection works. Netlify's drag and drop deploy
does not run functions, so leads would not reach Follow Up Boss that way.

1. Make a free account at github.com. Click New repository, name it rickytherealtorsd-site,
   keep it Private, and create it.
2. On the new repository page, click "uploading an existing file". Drag in everything inside
   this folder (site, netlify, netlify.toml, README.txt) and click Commit changes.
3. Make a free account at app.netlify.com. Click Add new site > Import an existing project >
   GitHub, and pick rickytherealtorsd-site. Leave the settings as they are and click Deploy.
4. Turn on forms: Site configuration > Forms > Enable form detection, then
   Deploys > Trigger deploy > Deploy site.
5. Email alerts: Site configuration > Notifications > Emails and webhooks >
   Form submission notifications > Add notification > Email notification > ricky@porchlightsocal.com

CONNECT FOLLOW UP BOSS
1. In Follow Up Boss: Admin > API > Create API Key. Copy it.
2. In Netlify: Site configuration > Environment variables > Add a variable.
   Key: FUB_API_KEY     Value: paste your key. Save.
3. Deploys > Trigger deploy > Deploy site (so the key takes effect).
4. Test: submit the contact form on your live site with your own info. Within a minute you
   should see a new lead in Follow Up Boss with the source "rickytherealtorsd.com".
   If not, check Netlify > Logs > Functions > submission-created for the error message.

HOW LEADS FLOW
- Every form submission is saved in Netlify under Forms (your backup copy).
- You get an email alert (after step 5 above).
- The lead is created in Follow Up Boss automatically, matched to an existing contact by
  email or phone so you don't get duplicates.
    Contact form   -> "General Inquiry" (or "Seller Inquiry" if they picked selling)
    Home value     -> "Seller Inquiry" with the address, beds, baths, and timeline
    Guide download -> "Registration" with where they're moving from and their timeline
    Tags           -> Website Lead, Website Contact or Home Value Request, and the page
                      they came from (for example "Web: Carmel Valley")
- In Follow Up Boss you can set a Lead Flow rule for source "rickytherealtorsd.com" to
  assign the lead and start an action plan automatically.

RELOCATION GUIDE (LEAD MAGNET)
- Landing page: relocation-guide.html. Visitors fill out the form, then land on
  guide-download.html with the download button and a link to book a relocation call.
- The PDF lives in site/downloads/. The download page and PDF are hidden from Google.
  Like any lead magnet on a simple site, someone could still share the direct link.
- In Follow Up Boss, filter by the "Relocation Guide" tag to follow up with downloaders.

UPDATING THE SITE LATER
Change files in the GitHub repository (or ask Claude to) and Netlify redeploys automatically.

BEFORE LAUNCH
- If you use a domain other than rickytherealtorsd.com, find and replace
  "https://rickytherealtorsd.com" in the site folder, including sitemap.xml and robots.txt.

AFTER LAUNCH
- Google Search Console: add the site and submit sitemap.xml.
- Bing Webmaster Tools: import from Search Console (this feeds ChatGPT search).
- Update the website link on Google Business Profile, Bing Places, Zillow, Instagram, and Facebook.

MOTION AND EFFECTS
- Animation libraries live in site/js/vendor (GSAP, ScrollTrigger, Lenis). GSAP is free for commercial use.
- All motion code is in site/js/effects.js. Particles adapt to screen size and pause off screen.
- Visitors with "reduce motion" turned on get a calm, static version. Phones get a lighter version.
- All text stays in the HTML, so search engines and AI tools read every page normally.
