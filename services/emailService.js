const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOrderConfirmationEmail = async (orderData) => {
  try {
    console.log('📧 Preparing order email for:', orderData.email);

    const emailHtml = createOrderEmailHTML(orderData);

    const { data, error } = await resend.emails.send({
      from: 'Medical Hub <info@mytelth.com>',
      to: orderData.email,
      subject: `Order Confirmation - ${orderData.category} Medical Hub`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend API error:', error);
      throw error;
    }

    console.log('✅ Email sent via Resend');
    return data;

  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};

// Create beautiful HTML email              
const createOrderEmailHTML = (orderData) => {
  const { name, category, selectedColor, hubs, selectedDevices, orderId } = orderData;

  return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            padding: 30px; 
            text-align: center; 
        }
        .content { 
            padding: 30px; 
        }
        .section { 
            margin: 20px 0; 
            padding: 20px; 
            background: #f8f9fa; 
            border-radius: 8px; 
            border-left: 4px solid #667eea;
        }
        .order-id {
            background: #e7f3ff;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            color: #0066cc;
        }
        .device-list {
            margin: 10px 0;
        }
        .device-item { 
            padding: 8px 0; 
            border-bottom: 1px solid #ddd; 
        }
        .device-item:last-child { 
            border-bottom: none; 
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            padding: 20px; 
            color: #666; 
            font-size: 14px;
            background: #f8f9fa;
            border-top: 1px solid #eee;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Order Confirmed!</h1>
            <p>Your Medical AI Hub Order #${orderId}</p>
        </div>
        
        <div class="content">
            <div class="order-id">
                Order ID: ${orderId}
            </div>

            <div class="section">
                <h2>👤 Customer Information</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${orderData.email}</p>
                <p><strong>Phone:</strong> ${orderData.phone}</p>
            </div>

            <div class="section">
                <h2>📦 Order Summary</h2>
                <p><strong>Hub Category:</strong> ${category}</p>
                <p><strong>Selected Color:</strong> ${selectedColor}</p>
                <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>

            ${createHubSectionsHTML(hubs)}

            ${createSelectedDevicesHTML(selectedDevices)}

            <div class="section">
                <h2>📞 What Happens Next?</h2>
                <p>✅ <strong>Order Confirmation</strong> - You'll receive this email</p>
                <p>✅ <strong>Team Contact</strong> - Our specialist will call you within 24 hours</p>
                <p>✅ <strong>Order Processing</strong> - We'll prepare your medical devices</p>
                <p>✅ <strong>Delivery Setup</strong> - We'll schedule convenient delivery</p>
            </div>
        </div>

        <div class="footer">
            <p><strong>Medical AI Hub</strong></p>
            <p>Transforming Healthcare with Advanced Technology</p>
            <p>📞 Support: 1800-570-0140 | ✉️ info@mytelth.com</p>
            <p>Thank you for choosing us for your healthcare needs!</p>
        </div>
    </div>
</body>
</html>
  `;
};

// Create hub sections HTML
const createHubSectionsHTML = (hubs) => {
  if (!hubs) return '';

  let html = '';

  Object.entries(hubs).forEach(([hubId, hubConfig]) => {
    if (hubConfig.selectedAddons && hubConfig.selectedAddons.length > 0) {
      html += `
        <div class="section">
          <h2>🔧 ${hubId} Hub Configuration</h2>
          <div class="device-list">
            ${hubConfig.selectedAddons.map(addon => `
              <div class="device-item">
                <strong>${addon.name}</strong>
                ${addon.description ? `<br><small>${addon.description}</small>` : ''}
              </div>
            `).join('')}
            
            ${Object.entries(hubConfig.careplanQuantities || {}).map(([careplanId, qty]) =>
        qty > 0 ? `
                <div class="device-item">
                  <strong>${careplanId}</strong> - ${qty} unit(s)
                </div>
              ` : ''
      ).join('')}
          </div>
        </div>
      `;
    }
  });

  return html;
};

// Create selected devices HTML
const createSelectedDevicesHTML = (selectedDevices) => {
  if (!selectedDevices || selectedDevices.length === 0) return '';

  return `
    <div class="section">
      <h2>🎯 Selected Medical Devices</h2>
      <div class="device-list">
        ${selectedDevices.map(device => `
          <div class="device-item">
            <strong>${device.name}</strong> - ₹${device.finalPrice || 'Price on request'}
            ${device.description ? `<br><small>${device.description}</small>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

// services/emailService.js - FIXED EXPORT
module.exports = {
  sendOrderConfirmationEmail
};
// Add to your existing emailService.js

// Send internal notification to your team
const sendInternalContactNotification = async (contactData) => {
  try {
    console.log('📧 Preparing internal contact notification...');

    const emailHtml = createInternalContactEmailHTML(contactData);

    const { data, error } = await resend.emails.send({
      from: 'Medical AI Contact <contact@mytelth.com>',
      to: 'kabilan@mytelth.com', // Your company email
      subject: `New Contact Form Submission - ${contactData.name}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend API error (internal):', error);
      throw error;
    }

    console.log('✅ Internal contact notification sent');
    return data;

  } catch (error) {
    console.error('Internal contact email error:', error);
    throw error;
  }
};

// Send confirmation email to customer
const sendContactConfirmationEmail = async (contactData) => {
  try {
    console.log('📧 Preparing customer confirmation email...');

    const emailHtml = createContactConfirmationEmailHTML(contactData);

    const { data, error } = await resend.emails.send({
      from: 'Medical Hub <contact@mytelth.com>',
      to: contactData.email,
      subject: 'Thank You for Contacting Medical AI Solutions',
      html: emailHtml,
    });

    if (error) {
      console.error('Resend API error (confirmation):', error);
      throw error;
    }

    console.log('✅ Contact confirmation email sent to customer');
    return data;

  } catch (error) {
    console.error('Confirmation email error:', error);
    throw error;
  }
};

// HTML template for internal notification
const createInternalContactEmailHTML = (contactData) => {
  const { name, email, company, message, contactId } = contactData;

  return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 700px; 
            margin: 0 auto; 
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header { 
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: white; 
            padding: 25px; 
            text-align: center; 
        }
        .content { 
            padding: 30px; 
        }
        .section { 
            margin: 20px 0; 
            padding: 20px; 
            background: #f8f9fa; 
            border-radius: 8px; 
            border-left: 4px solid #ff6b6b;
        }
        .contact-id {
            background: #ffeaa7;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            color: #e17055;
        }
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        .info-table td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
        }
        .info-table tr:last-child td {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #2d3436;
            width: 30%;
        }
        .message-box {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 15px;
            margin: 10px 0;
            font-style: italic;
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            padding: 20px; 
            color: #666; 
            font-size: 14px;
            background: #f8f9fa;
            border-top: 1px solid #eee;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📬 New Contact Form Submission</h1>
            <p>Contact ID: ${contactId}</p>
        </div>
        
        <div class="content">
            <div class="contact-id">
                Contact Reference: ${contactId}
            </div>

            <div class="section">
                <h2>👤 Contact Information</h2>
                <table class="info-table">
                    <tr>
                        <td class="label">Name:</td>
                        <td>${name}</td>
                    </tr>
                    <tr>
                        <td class="label">Email:</td>
                        <td>${email}</td>
                    </tr>
                    <tr>
                        <td class="label">Company:</td>
                        <td>${company || 'Not provided'}</td>
                    </tr>
                    <tr>
                        <td class="label">Submitted:</td>
                        <td>${new Date().toLocaleString()}</td>
                    </tr>
                </table>
            </div>

            <div class="section">
                <h2>💬 Message</h2>
                <div class="message-box">
                    ${message.replace(/\n/g, '<br>')}
                </div>
            </div>

            <div class="section">
                <h2>🚀 Action Required</h2>
                <p>Please follow up with this contact within 24 hours.</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">info@mytelth.com</a></p>
            </div>
        </div>

        <div class="footer">
            <p><strong>Medical AI Solutions</strong></p>
            <p>AI-Powered Healthcare Transformation</p>
            <p>📍 Automated Contact System</p>
        </div>
    </div>
</body>
</html>
  `;
};

// HTML template for customer confirmation
const createContactConfirmationEmailHTML = (contactData) => {
  const { name, contactId } = contactData;

  return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            padding: 30px; 
            text-align: center; 
        }
        .content { 
            padding: 30px; 
        }
        .section { 
            margin: 20px 0; 
            padding: 20px; 
            background: #f8f9fa; 
            border-radius: 8px; 
            border-left: 4px solid #667eea;
        }
        .thank-you {
            text-align: center;
            font-size: 24px;
            color: #2d3436;
            margin: 20px 0;
        }
        .reference-id {
            background: #e7f3ff;
            padding: 12px;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
            color: #0066cc;
            margin: 15px 0;
        }
        .next-steps {
            margin: 20px 0;
        }
        .step {
            display: flex;
            align-items: flex-start;
            margin: 15px 0;
        }
        .step-number {
            background: #667eea;
            color: white;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            flex-shrink: 0;
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            padding: 20px; 
            color: #666; 
            font-size: 14px;
            background: #f8f9fa;
            border-top: 1px solid #eee;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Thank You for Contacting Us!</h1>
            <p>We've received your message and will get back to you soon</p>
        </div>
        
        <div class="content">
            <div class="thank-you">
                Thank You, ${name}!
            </div>

            <div class="reference-id">
                Reference ID: ${contactId}
            </div>

            <div class="section">
                <h2>📞 What Happens Next?</h2>
                <div class="next-steps">
                    <div class="step">
                        <div class="step-number">1</div>
                        <div>
                            <strong>Review Your Message</strong><br>
                            Our team is currently reviewing your inquiry
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">2</div>
                        <div>
                            <strong>Expert Contact</strong><br>
                            A specialist will contact you within 24 hours
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">3</div>
                        <div>
                            <strong>Personalized Solution</strong><br>
                            We'll discuss how AI can transform your healthcare practice
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>💼 Need Immediate Assistance?</h2>
                <p>If you have urgent questions, feel free to contact us directly:</p>
                <p>📞 <strong>Phone:</strong> 1800-570-0140</p>
                <p>✉️ <strong>Email:</strong> info@mytelth.com</p>
            </div>
        </div>

        <div class="footer">
            <p><strong>Medical AI Solutions</strong></p>
            <p>Transforming Healthcare with Advanced AI Technology</p>
            <p>The Chambers Vardhaman
Trade Center, 3 rd
Floor, Nehru Place,
New Delhi 110019, India
1800-570-0140</p>
            <p>🔗 <a href="https://mytelth.com">Visit our website</a></p>
        </div>
    </div>
</body>
</html>
  `;
};

// Update your existing exports to include the new methods
module.exports = {
  sendOrderConfirmationEmail,
  sendInternalContactNotification,
  sendContactConfirmationEmail
};


