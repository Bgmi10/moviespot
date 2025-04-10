export default async function brevoEmailService(email, contentDetails, movieBackdropImage, movieName, type) {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.REACT_APP_BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: 'MovieSpot',
          email: 'subashchandraboseravi45@gmail.com',
        },
        to: [{ email }],
        subject: '🎬 Your Requested Movie is Ready on MovieSpot!',
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0a0a0a;">
            <!-- Main Container -->
            <div style="max-width: 600px; margin: 0 auto; background-color: #000000;">
              <!-- Header -->
              <div style="padding: 20px; text-align: center; background-color: #000000; border-bottom: 1px solid #222222;">
                <div style="display: inline-block; padding: 10px 0;">
                  <span style="color: #f43f5e; font-size: 32px; font-weight: bold; letter-spacing: 1px;">Movie</span>
                  <span style="color: #ffffff; font-size: 32px; font-weight: bold; letter-spacing: 1px;">Spot</span>
                </div>
              </div>
              
              <!-- Banner Image -->
              <div style="position: relative; text-align: center;">
                <img src=${movieBackdropImage} alt="Movie Banner" style="width: 100%; max-width: 600px; height: auto; border-radius: 0px; object-fit: cover;">
                <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.9), #000000); padding: 40px 20px 20px; text-align: left;">
                  <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">${contentDetails.query}</h1>
                  <p style="color: #f43f5e; margin: 5px 0 0; font-size: 16px; font-weight: 500;">${contentDetails.type} • ${contentDetails.language}</p>
                </div>
              </div>
              
              <!-- Main Content -->
              <div style="padding: 30px 25px; background-color: #000000; color: #ffffff;">
                <h2 style="color: #ffffff; font-size: 22px; margin: 0 0 20px;">Your Request is Now Ready to Stream!</h2>
                
                <p style="color: #dddddd; font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
                  Great news! The ${contentDetails.type} you requested is now available on MovieSpot. Jump right in and start watching with just a click.
                </p>
                
                <!-- Content Details Box -->
                <div style="background-color: #111111; border-radius: 8px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #f43f5e;">
                  <h3 style="color: #f43f5e; font-size: 18px; margin: 0 0 15px;">Request Details</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #999999; width: 100px;">Title:</td>
                      <td style="padding: 8px 0; color: #ffffff; font-weight: 500;">${contentDetails.query}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #999999;">Type:</td>
                      <td style="padding: 8px 0; color: #ffffff; font-weight: 500;">${contentDetails.type}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #999999;">Language:</td>
                      <td style="padding: 8px 0; color: #ffffff; font-weight: 500;">${contentDetails.language}</td>
                    </tr>
                  </table>
                </div>
                
                <!-- CTA Button -->
                <div style="text-align: center; margin: 35px 0;">
                  <a href="https://moviespot.fun/search?query=${encodeURIComponent(movieName)}&type=${type}" style="display: inline-block; background-color: #f43f5e; color: white; padding: 14px 28px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 6px; transition: all 0.3s ease;">WATCH NOW</a>
                </div>
          
              <!-- Footer -->
              <div style="padding: 25px; background-color: #0a0a0a; text-align: center; border-top: 1px solid #222222;">
                <div style="margin-bottom: 20px;">
                  <span style="color: #f43f5e; font-size: 20px; font-weight: bold;">Movie</span>
                  <span style="color: #ffffff; font-size: 20px; font-weight: bold;">Spot</span>
                </div>
                <p style="color: #999999; font-size: 14px; margin: 0 0 15px;">
                  Watch unlimited movies and TV shows anytime, anywhere.
                </p>
                <div style="margin-bottom: 20px;">
                  <a href="moviespot.fun" style="display: inline-block; margin: 0 10px; color: #dddddd; text-decoration: none;">Website</a>
                  <a href="moveiespot.fun" style="display: inline-block; margin: 0 10px; color: #dddddd; text-decoration: none;">Help Center</a>
                  <a href="moviespot.fun" style="display: inline-block; margin: 0 10px; color: #dddddd; text-decoration: none;">Privacy</a>
                </div>
                <p style="color: #666666; font-size: 12px; margin: 20px 0 0;">
                  This is an automated email from MovieSpot. Please do not reply to this message.
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Email send failed:', errorData);
      throw new Error('Failed to send email');
    }
  
    const data = await res.json();
    return data;
  }