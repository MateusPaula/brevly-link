export function LinkShortnerCard() {

  const originalUrl = 'https://www.google.com'
  const shortUrl = ''

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg text-gray-600 font-bold">New Link</h1>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-600">ORIGINAL LINK</span>
        <input type="text" className="w-full p-4 rounded-xl border border-gray-300" placeholder="www.exemplo.com.br"/>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-600">SHORT LINK</span>
        <input type="text" className="w-full p-4 rounded-xl border border-gray-300"/>
      </div>
      <button className="bg-blue-base hover:bg-blue-dark text-white text-md p-5 rounded-2xl font-bold">Save Link</button>
    </div>
  )
}