export async function GET(request) {
    console.log({ request })
    // const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + process.env.API_KEY;
    // const res = await fetch(url, {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    // })

    return Response.json({ "message" :"hi" })
}
