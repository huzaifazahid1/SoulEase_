// app/api/islamic/random-verse/route.js
export async function GET() {
    try {
      const res = await fetch(
        'https://api.quran.com/api/v4/verses/random?language=en&words=true&translations=131'
      );
  
      if (!res.ok) {
        return new Response(JSON.stringify({ error: 'Failed to fetch verse' }), {
          status: 500,
        });
      }
  
      const data = await res.json();
      return new Response(JSON.stringify(data.verse), { status: 200 });
    } catch (error) {
      console.error('Verse API error:', error);
      return new Response(JSON.stringify({ error: 'Server error' }), {
        status: 500,
      });
    }
  }
  