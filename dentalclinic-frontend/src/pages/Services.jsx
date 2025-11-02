import React, { useEffect, useRef } from 'react'
import { Sparkles, Shield, Smile, Zap, Heart, Star } from 'lucide-react'
import Footer from "../components/Footer";

export default function Services() {
    const observerRef = useRef(null)

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('animate-fade-in-up')),
            { threshold: 0.15 }
        )
        document.querySelectorAll('.observe-animation').forEach(el => observerRef.current?.observe(el))
        return () => observerRef.current?.disconnect()
    }, [])

    const services = [
        { icon: Sparkles, title: 'Zirconia Crowns', desc: 'Achieve a naturally white smile with our zirconia crowns.', bg: '#EAF4FF' },
        { icon: Smile, title: 'E-max Veneers', desc: 'Perfect your smile with durable, custom-made porcelain veneers.', bg: '#FFF8F5' },
        { icon: Shield, title: 'Dental Implants', desc: 'Permanent, natural-looking tooth replacement that restores your confidence.', bg: '#E9FFF6' },
        { icon: Zap, title: 'Orthodontics', desc: 'Modern clear aligners and braces to give you a perfectly aligned smile.', bg: '#FFFDEB' },
        { icon: Heart, title: 'Composite Veneers', desc: 'Smile transformations customized to your facial features and goals.', bg: '#F9F6FF' },
        { icon: Star, title: 'Teeth whitening', desc: 'Comprehensive checkups and cleanings to maintain lifelong oral health.', bg: '#EAF6FF' }
]
    return (
        <div style={{ background: '#fafcff' }}>
            <div className="container py-5">

                <div className="text-center mb-5 observe-animation" style={{ marginTop: '80px' }}>
                    <h1 className="display-5 fw-bold mb-3 gradient-text">Our Services</h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: 600 }}>
                        Experience world-class dental care with advanced technology and gentle treatment tailored to your needs.
                    </p>
                </div>

                <div className="row g-4 mb-5">
                    {services.map((s, i) => {
                        const Icon = s.icon
                        return (
                            <div key={i} className="col-12 col-sm-6 col-lg-4 observe-animation">
                                <div
                                    className="card border-0 h-100 shadow-sm p-4 text-center service-card"
                                    style={{
                                        background: s.bg,
                                        borderRadius: 20,
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    }}
                                >
                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                        style={{
                                            width: 90,
                                            height: 90,
                                            background: '#007bff',
                                            color: '#fff',
                                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                        }}
                                    >
                                        <Icon size={36} />
                                    </div>
                                    <h4 className="fw-bold mb-2">{s.title}</h4>
                                    <p className="text-muted small">{s.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="observe-animation mb-5">
                    <div
                        className="card p-5 mx-auto border-0 shadow-lg"
                        style={{
                            maxWidth: 950,
                            borderRadius: 25,
                            background: 'linear-gradient(135deg, #ffffff, #f8fbff)',
                        }}
                    >
                        <h2 className="fw-bold text-center mb-4">Why Choose Dental Art Studio?</h2>
                        <div className="row g-3">
                            {[
                                'Specialised in aesthetic dentistry',
                                'Highly experienced professionals',
                                'Personalized treatment plans',
                                'Comfortable, modern facilities',
                                'Flexible scheduling options',
                                'Exceptional aftercare support',
                            ].map((f, i) => (
                                <div key={i} className="col-md-6 d-flex align-items-center">
                                    <div
                                        style={{
                                            width: 26,
                                            height: 26,
                                            background: '#007bff',
                                            borderRadius: 8,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff',
                                            marginRight: 10,
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        ✓
                                    </div>
                                    <span className="fw-medium">{f}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4">
                            <a href="/contact" className="btn btn-primary px-4 py-2 fs-5 rounded-pill shadow-sm">
                                Book Your Appointment
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>

            <style>
                {`
                    .service-card:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 12px 30px rgba(0,0,0,0.12);
                    }
                    .gradient-text {
                        background: linear-gradient(90deg, #0066ff, #00c4ff);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                    @media (max-width: 768px) {
                        .display-5 { font-size: 1.9rem; }
                        .lead { font-size: 1rem; }
                    }
                `}
            </style>
        </div>
    )
}
