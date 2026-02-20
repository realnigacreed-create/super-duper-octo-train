export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    // Only allow GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { channelId } = req.query;
    
    if (!channelId) {
        return res.status(400).json({ error: 'Channel ID required' });
    }
    
    const token = "MTQxMDUxODI2MTE1Nzg1NTMzNg.GLOC9s.PYbT8K_Yu7d2thF0BOdSQjzoAxxlLSnkfmLzAc";
    
    try {
        const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages?limit=1`, {
            headers: {
                'Authorization': token
            }
        });
        
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Discord API error' });
        }
        
        const messages = await response.json();
        
        res.status(200).json({ 
            success: true, 
            messages: messages 
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
