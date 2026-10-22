export async function submitOrders(order) {
    const response = await fetch('http://localhost:3000/orders',{
        method: 'POST',
            headers: { 'Content-Type': 'application/json' },
body:JSON.stringify({order})
    });

    const data  =  await response.json().catch(()=>{});

 if (!response.ok) {
    throw new Error(data.message || 'Failed to submit order.');
  }

  return data;
}

