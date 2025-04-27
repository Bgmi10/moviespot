export async function brevoAdminEmail({ userEmail, userData, query, searchType, language }) {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.REACT_APP_BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: 'MovieSpot Admin',
          email: 'subashchandraboseravi45@gmail.com',
        },
        to: [{ email: 'subashchandraboseravi45@gmail.com' }], // Admin's Email
        subject: '📩 New Movie Request Received on MovieSpot!',
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin:0; padding:0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; background-color:#0a0a0a;">
  
            <div style="max-width:600px; margin:0 auto; background-color:#000; color:#fff; padding:20px; border-radius:8px;">
              
              <h1 style="text-align:center; color:#f43f5e;">New Movie Request</h1>
              <p style="text-align:center; font-size:16px; margin-bottom:30px;">A user has submitted a new movie request on MovieSpot!</p>
  
              <div style="background-color:#111; padding:20px; border-radius:6px; border-left:4px solid #f43f5e; margin-bottom:20px;">
                <h3 style="color:#f43f5e; margin-bottom:10px;">User Details</h3>
                <p><strong>Email:</strong> ${userEmail}</p>
                <p><strong>IP Address:</strong> ${userData.ip}</p>
                <p><strong>Country:</strong> ${userData.country.name} (${userData.country.flag})</p>
                <p><strong>State:</strong> ${userData.state.name}</p>
                <p><strong>City:</strong> ${userData.city.name}</p>
                <p><strong>Continent:</strong> ${userData.continent.name}</p>
                <p><strong>Currency:</strong> ${userData.country.currency}</p>
                <p><strong>Phone Code:</strong> ${userData.country.phone_code}</p>
              </div>
  
              <div style="background-color:#111; padding:20px; border-radius:6px; border-left:4px solid #f43f5e;">
                <h3 style="color:#f43f5e; margin-bottom:10px;">Request Details</h3>
                <p><strong>Query Title:</strong> ${query}</p>
                <p><strong>Type:</strong> ${searchType}</p>
                <p><strong>Language:</strong> ${language}</p>
              </div>
  
              <p style="text-align:center; color:#999; font-size:14px; margin-top:30px;">This is an automated notification from MovieSpot Admin Panel.</p>
            </div>
  
          </body>
          </html>
        `,
      }),
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Admin email send failed:', errorData);
      throw new Error('Failed to send admin notification email');
    }
  
    const data = await res.json();
    return data;
  }
  