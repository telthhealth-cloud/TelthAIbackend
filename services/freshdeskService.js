const axios = require('axios');

class FreshdeskService {
  async createTicket(webappConfig, orderData) {
    try {
      const { name, email, phone, hubs, selectedColor, selectedDevices } = orderData;
      
      const domain = process.env.FRESHDESK_DOMAIN;
      const apiKey = process.env.FRESHDESK_API_KEY;

      if (!domain || !apiKey) {
        console.log('Freshdesk credentials missing. Returning mock response.');
        return this.createMockTicket(webappConfig, orderData);
      }

      // Format order details for Freshdesk
      const orderDetails = this.formatOrderDetails(orderData);

      const payload = {
        subject: `${webappConfig.freshdesk.subjectPrefix} ${orderData.category} - ${name}`,
        description: this.generateTicketDescription(orderData, orderDetails),
        email: email,
        phone: phone,
        priority: 2,
        status: 2,
        source: 2,
        group_id: webappConfig.freshdesk.groupId ? Number(webappConfig.freshdesk.groupId) : null,
        custom_fields: {
          cf_category: orderData.category,
          cf_color: selectedColor,
          cf_webapp: webappConfig.name
        }
      };

      const authHeader = `Basic ${Buffer.from(`${apiKey}:X`).toString('base64')}`;
      
      const response = await axios.post(
        `https://${domain}.freshdesk.com/api/v2/tickets`,
        payload,
        { 
          headers: { 
            Authorization: authHeader, 
            'Content-Type': 'application/json' 
          } 
        }
      );

      console.log(`✅ Freshdesk ticket created for ${webappConfig.name}:`, response.data.id);
      
      return {
        success: true,
        ticketId: response.data.id,
        ticketUrl: `https://${domain}.freshdesk.com/helpdesk/tickets/${response.data.id}`
      };

    } catch (error) {
      console.error('Freshdesk ticket creation error:', error.response?.data || error.message);
      return this.createMockTicket(webappConfig, orderData);
    }
  }

  formatOrderDetails(orderData) {
    const { hubs, selectedDevices } = orderData;
    
    let details = '## Hub Configurations:\n';
    
    Object.entries(hubs).forEach(([hubName, hubData]) => {
      if (hubData.selectedAddons && hubData.selectedAddons.length > 0) {
        details += `\n### ${hubName} Hub:\n`;
        
        // Addons
        if (hubData.selectedAddons.length > 0) {
          details += `**Addons:** ${hubData.selectedAddons.map(addon => addon.name).join(', ')}\n`;
        }
        
        // Careplan quantities
        if (hubData.careplanQuantities) {
          const careplans = Object.entries(hubData.careplanQuantities)
            .filter(([_, qty]) => qty > 0)
            .map(([careplan, qty]) => `${careplan}: ${qty}`);
          
          if (careplans.length > 0) {
            details += `**Careplans:** ${careplans.join(', ')}\n`;
          }
        }
      }
    });

    // Global devices
    if (selectedDevices && selectedDevices.length > 0) {
      details += `\n## Selected Devices: ${selectedDevices.map(device => device.name).join(', ')}`;
    }

    return details;
  }

  generateTicketDescription(orderData, orderDetails) {
    return `
# New Medical Device Order

## Customer Information:
- **Name:** ${orderData.name}
- **Email:** ${orderData.email} 
- **Phone:** ${orderData.phone}

## Order Configuration:
- **Selected Color:** ${orderData.selectedColor}
- **Order Category:** ${orderData.category}

${orderDetails}

## Technical Details:
- **Order ID:** ${orderData.timestamp}
- **Submitted At:** ${new Date(orderData.timestamp).toLocaleString()}
    `.trim();
  }

  createMockTicket(webappConfig, orderData) {
    const mockTicketId = `MOCK-${Date.now()}`;
    console.log(`📝 Mock ticket created for ${webappConfig.name}:`, mockTicketId);
    
    return {
      success: true,
      ticketId: mockTicketId,
      ticketUrl: null,
      isMock: true
    };
  }
}

module.exports = new FreshdeskService();