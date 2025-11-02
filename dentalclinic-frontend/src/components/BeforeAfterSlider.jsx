import React, { useState, useRef, useEffect } from 'react'
import { MoveHorizontal } from 'lucide-react'

export default function BeforeAfterSlider({ beforeImage, afterImage, alt='Before & After' }) {
    const [pos, setPos] = useState(50)
    const [dragging, setDragging] = useState(false)
    const ref = useRef(null)

    const update = (clientX) => {
        if(!ref.current) return
        const r = ref.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(clientX - r.left, r.width))
        setPos((x / r.width) * 100)
    }

    useEffect(() => {
        const up = () => setDragging(false)
        window.addEventListener('mouseup', up)
        window.addEventListener('touchend', up)
        return () => {
            window.removeEventListener('mouseup', up)
            window.removeEventListener('touchend', up)
        }
    }, [])

    return (
        <div
            ref={ref}
            className='before-after-container'
            onMouseMove={e => dragging && update(e.clientX)}
            onTouchMove={e => dragging && update(e.touches[0].clientX)}
            style={{
                position:'relative',
                width:'100%',
                maxWidth:'900px',
                margin:'0 auto',
                borderRadius:12,
                overflow:'hidden',
                aspectRatio:'16/9',
            }}
        >
            <img
                src={afterImage}
                alt={`${alt} after`}
                className='before-after-image'
                style={{width:'100%', height:'100%', objectFit:'cover'}}
            />
            <div style={{position:'absolute', inset:0, overflow:'hidden', clipPath:`inset(0 ${100-pos}% 0 0)`}}>
                <img
                    src={beforeImage}
                    alt={`${alt} before`}
                    className='before-after-image'
                    style={{width:'100%', height:'100%', objectFit:'cover'}}
                />
            </div>
            <div
                className='slider-handle'
                style={{
                    position:'absolute',
                    top:0,
                    bottom:0,
                    left:`${pos}%`,
                    transform:'translateX(-50%)',
                    cursor:'ew-resize',
                    display:'flex',
                    alignItems:'center'
                }}
                onMouseDown={()=>setDragging(true)}
                onTouchStart={()=>setDragging(true)}
            >
                <div style={{
                    background:'#00c4ff',
                    padding:'6px',
                    borderRadius:'50%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    boxShadow:'0 2px 8px rgba(0,0,0,0.2)'
                }}>
                    <MoveHorizontal size={20} color='#fff'/>
                </div>
            </div>
        </div>


    )
}
