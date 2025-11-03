import React, {useEffect, useRef} from 'react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import Footer from "../components/Footer";

export default function BeforeAfter() {
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('animate-fade-in-up')), {threshold: 0.12});
        document.querySelectorAll('.observe-animation').forEach(el => observerRef.current?.observe(el));
        return () => observerRef.current?.disconnect();
    }, []);

    const cases = [{
        id: 1,
        before: '/images/veneers-before.jpg',
        after: '/images/veneers-after.jpg',
        title: 'E-max Veneers',
        desc: 'Smile transformation with veneers'
    }, {
        id: 3,
        before: '/images/before1.jpg',
        after: '/images/after1.jpg',
        title: 'Zirconia Crowns',
        desc: 'Smile transformation with zirconia crowns'
    }, {
        id: 2,
        before: '/images/zirconia-before.jpg',
        after: '/images/zirconia-after.jpg',
        title: 'Zirconia Crowns',
        desc: 'Smile transformation with zirconia crowns'
    },];

    return (<div style={{background: '#f5f7fa', minHeight: '100vh'}}>
            <div className='container'>

                <div className='text-center mb-5 observe-animation' style={{marginTop: '120px'}}>
                    <h1 className='display-4 fw-bold gradient-text' style={{fontSize: '3rem'}}>Before & After</h1>
                    <p className='lead text-muted mx-auto' style={{maxWidth: 650, fontSize: '1.3rem'}}>
                        See the transformations we've achieved. Drag the slider to compare and witness the amazing
                        results.
                    </p>
                </div>

                {cases.map(c => (<div key={c.id} className='mb-5 observe-animation'>
                        <div className="row align-items-center g-4 justify-content-center text-center text-lg-start">

                            <div className="col-12 col-lg-5 mb-3 mb-lg-0">
                                <BeforeAfterSlider
                                    beforeImage={c.before}
                                    afterImage={c.after}
                                    alt={c.title}
                                    style={{
                                        borderRadius: '15px',
                                        overflow: 'hidden',
                                        width: '100%',
                                        maxWidth: '100%',
                                        maxHeight: '300px'
                                    }}
                                />
                            </div>

                            {/* Info Card */}
                            <div className="col-12 col-lg-7">
                                <div className="card p-4 shadow-lg h-100 mx-auto" style={{
                                    borderRadius: '20px',
                                    background: 'linear-gradient(135deg, #ffffff, #f0f4ff)',
                                    maxWidth: 600
                                }}>
                                    <h3 className='fw-bold mb-3'
                                        style={{fontSize: '1.8rem', color: '#0a2342'}}>{c.title}</h3>
                                    <p className='text-muted' style={{fontSize: '1.1rem'}}>{c.desc}</p>
                                    <a href='/contact' className='btn btn-primary mt-3 px-4 py-2'>Book Now</a>
                                </div>
                            </div>

                        </div>
                    </div>))}

                <div className='observe-animation text-center mb-5'>
                    <div className='card p-5 shadow-lg mx-auto' style={{
                        maxWidth: 1000, background: 'linear-gradient(135deg, #ffffff, #f0f4ff)', borderRadius: '20px'
                    }}>
                        <h2 className='fw-bold mb-3' style={{fontSize: '2rem'}}>Ready for Your Transformation?</h2>
                        <p className='text-muted mb-3' style={{fontSize: '1.2rem'}}>Book a consultation today and let us
                            create your perfect smile.</p>
                        <a href='/contact' className='btn btn-primary btn-lg px-5 py-3 shadow-sm cta-btn'>Schedule
                            Consultation</a>
                    </div>
                </div>

            </div>

            <Footer/>


            <style>
                {`
    .animate-fade-in-up {
      opacity: 1;
      transform: translateY(0);
      transition: all 0.8s ease-out;
    }
    .observe-animation {
      opacity: 0;
      transform: translateY(30px);
    }
    .gradient-text {
      background: linear-gradient(90deg, #0066ff, #00c4ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    /* Responsive fonts */
    @media (max-width: 992px) {
      h3 { font-size: 1.5rem; }
      p { font-size: 1rem; }
    }
    @media (max-width: 768px) {
      .display-4 { font-size: 2rem; }
      .lead { font-size: 1rem; }
      h3 { font-size: 1.3rem; }
      p { font-size: 0.95rem; }

      /* Shrink CTA button on mobile */
      .cta-btn {
        padding: 0.6rem 1.8rem;
        font-size: 0.9rem;
      }
    }
  `}
            </style>
        </div>)
}
