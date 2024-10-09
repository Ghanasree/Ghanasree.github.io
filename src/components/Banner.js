import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/ghana.jpeg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Software Engineer", "Back-End Developer", "Full Stack Developer" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi! I'm Ghana Sree Kamidri`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Back-End Developer", "Software Engineer", "Full-Stack Developer" ]'><span className="wrap">{text}</span></span></h1>
                  <p>A Software Engineer I with over two years of experience, recently contributing to NCR Corporation's digital banking innovations. Specializes in developing microservices workflows and RESTful APIs, which improved scalability and transactional data delivery for millions of users. Notable achievements include utilizing CI/CD pipelines and Apache Beam to significantly enhance data processing efficiency. Additionally proficient in .NET technologies, bringing a versatile skill set for developing scalable, high-performance solutions. Aims to leverage proven software development expertise to create innovative solutions in a forward-thinking environment.</p>
                  <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col><Col xs={12} md={6} xl={5}>
          <TrackVisibility>
            {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
          </TrackVisibility>
        </Col>
        </Row>
      </Container>
    </section>
  )
}
