import { useNavigate } from 'react-router-dom'
import notFoundIcon from '../assets/404.svg'
import { Button } from './ui/button'

export function PageNotFound() {
    const navigate = useNavigate()
    
    return (
        <div className="min-h-dvh bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md w-full text-center">
                <div className="mb-6">
                    <img src={notFoundIcon} alt="404 Not Found" className="w-32 h-32 mx-auto mb-4" />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Link not found
                </h1>
                
                <p className="text-gray-600 mb-6">
                    The short link you're looking for doesn't exist or has been removed.
                </p>
                
                <Button 
                    onClick={() => navigate('/')}
                    className="w-full"
                >
                    Go back to home
                </Button>
            </div>
        </div>
    )
}
