import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Sparkles, Users, Award, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
    const observerRef = useRef(null);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);

        observerRef.current = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("animate-fade-in-up")),
            { threshold: 0.15 }
        );
        document.querySelectorAll(".observe-animation").forEach((el) => observerRef.current?.observe(el));

        return () => {
            window.removeEventListener("resize", handleResize);
            observerRef.current?.disconnect();
        };
    }, []);

    const goToContact = () => navigate("/contact", { state: { scrollToForm: true } });

    const stats = [
        { icon: Users, value: "1000+", label: "Happy Patients" },
        { icon: Award, value: "5+", label: "Years Experience" },
        { icon: Sparkles, value: "98%", label: "Success Rate" },
        { icon: Heart, value: "5-Star", label: "Reviews" },
    ];

    const doctors = [
        {
            name: "Dr. Vigan Hashani",
            img: "/images/vigan.jpeg",
            desc: "Expert in dental aesthetics, dedicated to precise, comfortable, and beautiful results.",
        },
        {
            name: "Dr. Besnik Aliu",
            img: "/images/besnik.jpeg",
            desc: "Expert in aesthetic dentistry with an artistic approach to creating confident smiles.",
        },

    ];

    return (
        <div style={{ backgroundColor: "#f7faff" }}>
            <div style={{ position: "relative", height: "90vh", overflow: "hidden" }}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "100vw",
                        height: "100vh",
                        objectFit: "cover",
                        transform: isMobile
                            ? "translate(-50%, -50%) scale(1.3)"
                            : "translate(-50%, -50%) scale(1)",
                        objectPosition: "center",
                        zIndex: 1,
                        filter: "brightness(0.5)"
                    }}
                >
                    <source src="/images/drbesnik.mp4" type="video/mp4" />
                </video>


                <Container
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        color: "white",
                        zIndex: 2
                    }}
                >
                    <h1 className="display-3 fw-bold observe-animation">
                        We do art on your <span className="led-text">smile</span>
                    </h1>


                    {/*<div className="d-flex gap-3 justify-content-center mt-4 observe-animation flex-wrap">*/}
                    {/*    <Button className="px-4 py-2 rounded-pill shadow" style={{ backgroundColor: "#0047ab", border: "none" }} onClick={goToContact}>*/}
                    {/*        Book Appointment*/}
                    {/*    </Button>*/}
                    {/*    <Button variant="outline-light" className="px-4 py-2 rounded-pill shadow" onClick={goToServices}>*/}
                    {/*        Discover Services*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </Container>
            </div>

            <Container className="py-5">
                <Row className="text-center g-4">
                    {stats.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <Col key={i} xs={6} md={3} className="observe-animation">
                                <Card className="p-4 shadow-sm text-center" style={{ borderRadius: "16px" }}>
                                    <Icon size={36} color="#0047ab" className="mb-3" />
                                    <h4 className="fw-bold">{s.value}</h4>
                                    <div className="text-muted">{s.label}</div>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>

            <Container className="py-5">
                <h2 className="fw-bold text-center mb-5 observe-animation" style={{ color: "#0a2342" }}>
                    Meet Our <span style={{ color: "#0047ab" }}>Doctors</span>
                </h2>

                {doctors.map((d, i) => (
                    <Row
                        key={i}
                        className={`align-items-center mb-5 observe-animation`}
                        style={{ flexDirection: i % 2 === 1 ? "row-reverse" : "row" }}
                    >
                        <Col md={6} className="text-center mb-3 mb-md-0">
                            <img
                                src={d.img}
                                alt={d.name}
                                style={{
                                    width: "100%",
                                    maxWidth: 380,
                                    borderRadius: "12px",
                                    boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
                                    transition: "transform 0.3s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            />
                        </Col>
                        <Col md={6}>
                            <Card
                                className="p-4 shadow-lg"
                                style={{ borderLeft: "5px solid #0047ab", backgroundColor: "#e8f0ff" }}
                            >
                                <Card.Body>
                                    <h3 style={{ color: "#0047ab" }}>{d.name}</h3>
                                    <p className="text-muted">{d.desc}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ))}
            </Container>
            <Container className="py-5 observe-animation">
                <h2 className="fw-bold text-center mb-5" style={{ color: "#0a2342" }}>
                    Our <span style={{ color: "#0047ab" }}>Clinic</span>
                </h2>

                <Card
                    className="shadow-lg border-0 p-4"
                    style={{
                        borderRadius: "18px",
                        background: "linear-gradient(135deg, #f8fbff 0%, #e9f1ff 100%)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                        e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,0.15)";
                    }}
                >
                    <Row className="align-items-center g-4">
                        <Col md={6} className="text-center">
                            <img
                                src="/images/our-space.jpeg"
                                alt="Clinic Office"
                                style={{
                                    width: "80%",
                                    borderRadius: "16px",
                                    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                                    transition: "transform 0.3s ease",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            />
                        </Col>
                        <Col md={6}>
                            <h3 className="fw-bold mb-3" style={{ color: "#0047ab" }}>
                                Designed for Comfort & Care
                            </h3>
                            <p style={{ fontSize: "1.1rem", color: "#4a4a4a" }}>
                                Step into a modern and relaxing environment where advanced dental technology meets genuine care.
                                Our clinic is built to make every patient feel calm, comfortable, and confident from the moment they walk in.
                            </p>
                            <Button
                                className="mt-3 px-4 py-2 rounded-pill shadow"
                                style={{
                                    backgroundColor: "#0047ab",
                                    border: "none",
                                    transition: "background 0.3s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#003a8c")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0047ab")}
                                onClick={goToContact}
                            >
                                Visit Us
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Container>

            <Footer/>
        </div>
    );
}
