// Simple email service to trigger backend email for streak loss
export const emailService = {
    sendStreakLossEmail: async (userId: string, email: string) => {
    const response = await fetch('http://127.0.0.1:5001/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            userId: userId
        })
    });
    if (!response.ok) throw new Error('Failed to send streak loss email');
    return response.json();
    }
};
