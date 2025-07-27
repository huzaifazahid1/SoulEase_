// app/api/islamic/random-hadith/route.js
export async function GET() {
    try {
      const res = await fetch(
        'https://random-hadith-generator.vercel.app/bukhari/'
      );
  
      if (!res.ok) {
        return new Response(JSON.stringify({ error: 'Failed to fetch hadith' }), {
          status: 500,
        });
      }
  
      const data = await res.json();
      return new Response(JSON.stringify(data.data), { status: 200 });
    } catch (error) {
      console.error('Hadith API error:', error);
      return new Response(JSON.stringify({ error: 'Server error' }), {
        status: 500,
      });
    }
  }
  