export async function GET(request) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + process.env.API_KEY;
    const { searchParams } = new URL(request.url)
    console.log(searchParams.get('prompt'))
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const product = await res.json()
   
    return Response.json({ searchParams })
  }