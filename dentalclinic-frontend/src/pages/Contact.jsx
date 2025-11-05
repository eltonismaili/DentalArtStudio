import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Footer from "../components/Footer";

export default function Contact(){
    const [formData, setFormData] = useState({name:'',email:'',phone:'',message:''})
    const [status, setStatus] = useState({message:'',type:''})
    const [loading, setLoading] = useState(false)
    const [disabledUntil, setDisabledUntil] = useState(null)
    const observerRef = useRef(null)
    const location = useLocation()
    const formRef = useRef(null)

    useEffect(() => {
        const stored = localStorage.getItem('contactDisabledUntil')
        if(stored) setDisabledUntil(new Date(stored))
    }, [])

    useEffect(()=>{
        observerRef.current = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('animate-fade-in-up')),
            {threshold:0.12}
        )
        document.querySelectorAll('.observe-animation').forEach(el => observerRef.current?.observe(el))
        return () => observerRef.current?.disconnect()
    },[])

    useEffect(()=>{
        if(location.state?.scrollToForm && formRef.current){
            formRef.current.scrollIntoView({behavior:'smooth'})
        }
    },[location])

    const handleChange = (e) => {
        const { name, value } = e.target


        if(name === 'phone') {
            const digits = value.replace(/[^\d+]/g,'')
            setFormData({...formData, [name]: digits})
        } else {
            setFormData({...formData, [name]: value})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const now = new Date()
        if(disabledUntil && now < disabledUntil){
            setStatus({ message: `Please wait before sending another message.`, type: 'danger' });
            return;
        }


        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setStatus({ message: 'Please fill required fields', type: 'danger' });
            return;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(formData.email)){
            setStatus({ message:'Please enter a valid email address', type:'danger' })
            return
        }

        setLoading(true)
        setStatus({ message:'', type:'' })

        try {
            const response = await axios.post(
                'https://dentalartstudio.onrender.com/api/v1/contact',
                { ...formData },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                setStatus({ message: 'Message sent successfully!', type: 'success' });
                setFormData({ name: '', email: '', phone: '', message: '' });

                const disableTime = new Date()
                disableTime.setMinutes(disableTime.getMinutes() + 5)
                setDisabledUntil(disableTime)
                localStorage.setItem('contactDisabledUntil', disableTime)
            } else {
                setStatus({ message: 'Error sending message. Try again later.', type: 'danger' });
            }
        } catch (err) {
            console.error(err);
            setStatus({ message: 'Error sending message. Try again later.', type: 'danger' });
        } finally {
            setLoading(false)
        }
    }

    const contactInfo = [
        {icon:MapPin,title:'Address',content:'Dental Art Studio, Garcia Lorka, Prishtina 10000'},
        {icon:Phone,title:'Phone',content:'+383 49 938 999'},
        {icon:Mail,title:'Email',content:'dentalartstudio.ks@gmail.com'},
    ]

    return (
        <div style={{background:'#f5f7fa', minHeight:'100vh', paddingTop:'40px'}}>
            <div className='container py-5' style={{minHeight:'80vh'}}>
                <div className='text-center mb-5 observe-animation' style={{marginTop:'50px'}}>
                    <h1 className='display-4 fw-bold gradient-text' style={{ fontSize: '3rem' }}>Get in Touch</h1>
                    <p className='text-muted'>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="row g-4">
                    <div className="col-lg-6 observe-animation" ref={formRef}>
                        <div className="card shadow-lg p-5 rounded-4 contact-form-card">
                            <h2 className="h4 fw-bold mb-4">Send Us a Message</h2>
                            {status.message && <div className={`mb-3 ${status.type === 'success' ? 'text-success' : 'text-danger'}`}>{status.message}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Full Name</label>
                                    <input className="form-control rounded-pill form-input" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Email Address</label>
                                    <input className="form-control rounded-pill form-input" name="email" type="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Phone Number</label>
                                    <input
                                        className="form-control rounded-pill form-input"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        pattern="^\+?[0-9]{7,15}$"
                                        title="Please enter a valid phone number (digits only, optional + at start)"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Message</label>
                                    <textarea className="form-control rounded-3 form-input" name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Tell us how we can help you..." required />
                                </div>
                                <button className="btn btn-gradient w-100 fw-bold" style={{backgroundColor:'#0A1F44F2',color:'#fff'}} type="submit" disabled={loading || (disabledUntil && new Date() < disabledUntil)}>
                                    {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="col-lg-6 observe-animation">
                        <div className="card shadow-lg p-4 rounded-4">
                            <h2 className="h4 fw-bold mb-4">Visit Our Clinic</h2>
                            <div className="ratio ratio-16x9 rounded mb-3">
                                <iframe
                                    src="https://www.google.com/maps?q=Dental%20Art%20Studio%2C%20Garcia%20Lorka%2C%20Prishtina%2010000&output=embed"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Dental Art Studio Location"
                                    style={{ border: 0 }}
                                />
                            </div>
                            <p className="text-muted">We're conveniently located in the heart of Prishtinë. Free parking is available for patients.</p>
                        </div>
                    </div>
                </div>


                <div className='row row-cols-1 row-cols-md-3 g-4 mt-5'>
                    {contactInfo.map((info,i)=>{
                        const Icon = info.icon
                        return (
                            <div key={i} className='col observe-animation'>
                                <div
                                    className='card text-center p-4 h-100 border-0 shadow-sm contact-card'
                                    style={{borderRadius:'20px', transition:'all 0.3s'}}
                                >
                                    <div
                                        className='icon-container mb-3'
                                        style={{
                                            width:80,
                                            height:80,
                                            display:'inline-flex',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            borderRadius:'50%',
                                            background:'linear-gradient(135deg, #3b82f6, #60a5fa)',
                                            margin:'0 auto',
                                            color:'white',
                                            fontSize:'1.5rem'
                                        }}
                                    >
                                        <Icon size={32} color='white' />
                                    </div>
                                    <h5 className='fw-bold mt-2'>{info.title}</h5>
                                    <p className='text-muted mb-0'>{info.content}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>


            </div>

            <Footer/>
        </div>
    )
}

