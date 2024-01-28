import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from "axios"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { Bell, ChatLeftText } from 'react-bootstrap-icons'

export default function Notification(props) {
    
    const { data: session, status } = useSession()

    const queryClient = useQueryClient()

    const {mutate: readNotif} = useMutation({
        mutationFn: async (notifiId) => {
            await axios.post("/api/readNoti", {id: notifiId})
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['notifications'])
        }
    })

    const {data, isLoading, isError} = useQuery({
        queryKey: ['notifications'],
        queryFn: async() => {
            
            const { data } = await axios.post("/api/getNotifs", {data: session.id})
            let notNum = data.data.filter((noti) => noti.read == false)
            props.setNotiNum(notNum.length)
            return data.data
        }
    })

        if(isLoading){
            return(
            <div className='notification-box'>
                    loading
            </div>
            )
        }
        return (
            <div className='notification-box'>
                
                    <h3 className='mb-4'>
                        <Bell size={28} className='me-3'/>
                        Notifications
                    </h3>
                    {data.length > 0 && data.map((notifi) => {
                        return(
                            <Link key={notifi.id} onClick={() => readNotif(notifi.id)} href={`/posts/${notifi.postId}`}>
                                <div className={`${notifi.read ? "nread" : "nreadnot"} singleNotif px-3 my-2`}>
                                    <Image src={notifi.notifier.image} width={50} height={50} className='me-3 flex-shrink-0'/>
                                    {notifi.content}
                                </div>
                            </Link>
                        )
                    })}
                
                
            </div>
        )

}
