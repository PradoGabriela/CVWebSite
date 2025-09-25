# Cloudflare Setup Instructions for Spam Protection

## Step 1: Sign up and Add Your Domain

1. Go to [cloudflare.com](https://cloudflare.com) and create a free account
2. Click "Add a Site" and enter your domain name
3. Select the "Free" plan
4. Cloudflare will scan your DNS records

## Step 2: Update DNS Settings

1. Review the DNS records Cloudflare found
2. Ensure your main domain (A record) and www subdomain (CNAME) are present
3. Make sure the cloud icon is **ORANGE** (proxied) for records you want protected
4. Click "Continue"

## Step 3: Change Nameservers

1. Cloudflare will provide you with 2 nameservers (e.g., `cara.ns.cloudflare.com`)
2. Go to your domain registrar (GoDaddy, Namecheap, etc.)
3. Find "Nameservers" or "DNS Management" settings
4. Replace your current nameservers with the Cloudflare ones
5. Save changes (can take up to 24 hours to propagate)

## Step 4: Configure Security Settings

Once your domain is active on Cloudflare:

### A. Enable Bot Fight Mode
1. Go to **Security** > **Bots**
2. Turn on **Bot Fight Mode** (Free)
3. This blocks known spam bots automatically

### B. Set Security Level
1. Go to **Security** > **Settings**
2. Set **Security Level** to "Medium" or "High"
3. This challenges suspicious visitors

### C. Enable Rate Limiting (Optional - Paid feature)
1. Go to **Security** > **Rate Limiting**
2. Create rules to limit form submissions per IP

### D. Configure Firewall Rules (Free)
1. Go to **Security** > **WAF**
2. Enable **Managed Rules** 
3. Consider blocking countries known for spam (if applicable)

## Step 5: Additional Spam Protection

### A. Enable Browser Integrity Check
1. Go to **Security** > **Settings**
2. Turn on **Browser Integrity Check**

### B. Challenge Passage (Under Attack Mode)
If spam increases:
1. Go to **Security** > **Settings**
2. Enable **Under Attack Mode** temporarily
3. This shows a challenge page to all visitors for 5 seconds

## Expected Benefits

- **Bot Detection**: Automatically blocks known spam bots
- **Rate Limiting**: Prevents spam floods from single IPs
- **Geo-blocking**: Can block problematic countries/regions
- **Challenge Pages**: Forces suspicious visitors to prove they're human
- **Analytics**: Detailed reports on blocked threats

## Verification

After setup, you can verify Cloudflare is working:
1. Check your site loads normally
2. Look for Cloudflare headers in browser dev tools
3. Monitor the **Analytics** > **Security** dashboard for blocked threats

## Cost
- Basic protection: **FREE**
- Advanced rules and analytics: $20/month (Pro plan)

This setup alone can reduce spam by 70-90% when combined with your server-side protection!