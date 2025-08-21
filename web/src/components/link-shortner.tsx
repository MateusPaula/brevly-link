export function LinkShortnerWidget() {

  const originalUrl = 'https://www.google.com'
  const shortUrl = ''

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg text-gray-600 font-bold">Novo Link</h1>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-600">LINK ORIGINAL</span>
        <input type="text" className="w-full p-4 rounded-xl border border-gray-300" placeholder="www.exemplo.com.br"/>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-600">LINK ENCURTADO</span>
        <input type="text" className="w-full p-4 rounded-xl border border-gray-300"/>
      </div>
      <button className="bg-blue-base text-white text-md p-5 rounded-2xl font-bold">Salvar Link</button>
    </div>
  )
}