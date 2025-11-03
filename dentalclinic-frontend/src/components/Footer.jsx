import React from "react";
import { Instagram, Mail, MapPin, Phone, Clock, Facebook } from "lucide-react";

export default function Footer() {
    return (
        <footer
            className="pt-5 pb-4"
            style={{
                background: "linear-gradient(135deg, #0a2342, #003366)",
                fontFamily: "'Poppins', sans-serif",
                color: "#e0e0e0",
            }}
        >
            <div className="container">
                <div className="row text-center text-md-start">

                    <div className="col-md-4 mb-4">
                        <img
                            src="/images/LOGOOO.png"
                            alt="Logo"
                            style={{ width: 120, marginBottom: "1rem" }}
                        />
                        <p style={{ fontSize: "0.95rem", lineHeight: "1.6", fontWeight: 300 }}>
                            Welcome to <strong>Dental Art Studio</strong> — where your smile becomes art.
                            We combine modern technology with artistic precision to give you the perfect smile.
                        </p>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h5 style={{ fontWeight: 600, letterSpacing: "0.5px", marginBottom: "1rem" }}>Working Hours</h5>
                        <ul className="list-unstyled" style={{ lineHeight: "1.8" }}>
                            <li><Clock size={16} className="me-2" /> Mon - Fri: 11:00 - 19:00</li>
                            <li><Clock size={16} className="me-2" /> Saturday: 11:00 - 17:00</li>
                            <li><Clock size={16} className="me-2" /> Sunday: Closed</li>
                        </ul>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h5 style={{ fontWeight: 600, letterSpacing: "0.5px", marginBottom: "1rem" }}>Contact Us</h5>
                        <ul className="list-unstyled" style={{ lineHeight: "1.8" }}>
                            <li><Mail size={16} className="me-2" /> dentalartstudio.ks@gmail.com</li>
                            <li><Phone size={16} className="me-2" /> +383 49 938 999</li>
                            <li><MapPin size={16} className="me-2" /> Garcia Lorka, Prishtina</li>
                        </ul>
                        <div className="d-flex gap-3 mt-3 justify-content-center justify-content-md-start">
                            {[
                                { icon: <Instagram size={22} />, link: "https://www.instagram.com/dentalartstudio.ks/" },
                                { icon: <Mail size={22} />, link: "mailto:dentalartstudio.ks@gmail.com" },
                                { icon: <Phone size={22} />, link: "tel:+383 49 938 999" },
                                { icon: <Facebook size={22} />, link: "https://www.facebook.com/profile.php?id=61566126190588" }
                            ].map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.link}
                                    className="text-white d-flex align-items-center justify-content-center"
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: "50%",
                                        background: "rgba(255,255,255,0.1)",
                                        transition: "all 0.3s",
                                        fontWeight: 500
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(0,196,255,0.2)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "1.5rem 0" }} />

                <p
                    className="text-center mb-0"
                    style={{ fontSize: "0.85rem", color: "#b0bec5", letterSpacing: "0.3px", fontWeight: 300 }}
                >
                    © 2025 Dental Art Studio. All Rights Reserved. | Designed by Elton Ismaili
                </p>
            </div>
        </footer>
    );
}
