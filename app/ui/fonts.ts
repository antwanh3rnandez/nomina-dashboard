import { Poppins, Lusitana } from 'next/font/google'

export const poppins = Poppins({
    subsets: ['latin'], 
    weight: ['100', '200', '300', '400'] 
})

export const lusitana = Lusitana({ 
    subsets: ['latin'], 
    weight: ['400', '700']    
})