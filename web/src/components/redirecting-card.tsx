import brevlyLogo from '../assets/logo_Icon.svg'

export function RedirectingCard() {
    return (
        <div className="min-h-dvh bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md w-full text-center">
                <div className="mb-6">
                    <img src={brevlyLogo} alt="Brevly Logo" className='w-16 h-16 mx-auto mb-4' />
                </div>
                
                <div className='flex flex-col items-center justify-center gap-4'>
                    <h1 className='text-2xl font-bold text-gray-900'>Redirecting...</h1>
                    
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <span className='text-sm text-gray-500'>The link will open within a few seconds.</span>
                        <span className='text-xs text-gray-500'>
                            Were you not redirected? <a href="/" className='text-blue-500 hover:underline'>Click here</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}